import type { ProjectDetail } from '../types'

const detail: ProjectDetail = {
  slug: 'cnn-optimization',
  summary:
    'Decides the shape of a convolutional network by scoring every connection and keeping only the survivors, rather than hand-tuning depth and width. Seven scoring rules share one masking loop, so they can be compared under identical conditions.',
  plateCaption:
    'Dense backbone → one scoring pass over its weights → threshold into a binary mask → the surviving sparse network is trained. No candidate architectures are generated or compared.',
  blocks: [
    {
      heading: 'Problem',
      body: [
        'Designing a convolutional network normally means picking depth, width and kernel sizes by hand, training the result, and finding out afterwards whether the guess was any good. Each guess costs a full training run, and the reasoning behind it rarely survives contact with a new dataset.',
        'The alternative this project takes is to start from a standard over-parameterised backbone — VGG or ResNet — and let a scoring rule decide which connections are worth keeping. Design then becomes an optimization problem over a binary mask: every prunable weight gets a score, a threshold falls somewhere in the ranking, and whatever survives is the architecture. The mask is chosen before training, not after, so the cost is one scoring pass rather than one training run per candidate. The open question is which score to rank by, and the repository is built to answer it by making the criteria interchangeable.',
      ],
    },
    {
      heading: 'Approach',
      body: [
        'A single entry point takes a dataset, a model, a pruner and a target density, and runs one of four experiment modes. The default one, singleshot, loads the dataset, builds the model, optionally pre-trains it, scores and masks the weights, trains what is left, and prints a compression report. Pre-training defaults to zero epochs, which is the case the project cares about: the mask is decided at initialization, from a randomly initialized network that has never seen a gradient step.',
        'Target density is expressed as an exponent rather than a fraction. The compression argument feeds 0.8 raised to that power, so each increment removes a fixed proportion of what remains and a sweep over integers gives an evenly spaced curve on a log axis. Five datasets are wired in, from MNIST through CIFAR-10 and CIFAR-100 to Tiny ImageNet and ImageNet, and the model registry carries three variants of the same architectures — one per input resolution — so a VGG-16 run on CIFAR and on ImageNet differ in the model class flag and nothing else.',
        'Scoring reads from its own dataloader, a small random subset sized at ten examples per class by default. It is deliberately tiny: the point of scoring at initialization is that it should not need much data, and some of the criteria below need none at all.',
      ],
      diagram: `flowchart LR
  A[Dataset and model] --> B[Optional pre-train]
  B --> C[Score every weight]
  C --> D[Threshold into a mask]
  D --> E[Train the survivors]
  E --> F[Sparsity and FLOP report]`,
    },
    {
      heading: 'Masks as parameters',
      body: [
        'Pruning is implemented by subclassing the layers rather than by deleting weights. Linear, Conv2d, BatchNorm1d and BatchNorm2d are each redefined to register a weight_mask buffer of ones alongside the weight, and the forward pass multiplies the two together before calling the underlying convolution or matrix multiply. A pruned model therefore has exactly the same shape as a dense one, loads from the same checkpoint format, and trains through the same code path; the only difference is how many entries of the mask are zero.',
        'That choice buys the thing the scoring criteria actually need. Because the mask participates in the forward pass, it is a tensor in the autograd graph, and a gradient can be taken with respect to it. Several of the pruners switch requires_grad on for the masks and read mask.grad directly — that quantity measures how much the loss responds to a connection being present at all, which is a different and more useful signal than how much it responds to the connection changing value.',
        'Two extra modules, Identity1d and Identity2d, exist only to hold a mask. They multiply their input by a per-channel vector initialized to ones, and that vector never moves: the helper that collects trainable parameters excludes both modules by type, so the optimizer never sees them and they act purely as mask carriers. Identity2d is the one the ResNet families instantiate, on the shortcut branch, so that a skip connection can be scored and removed like any other parameter when the prune-residual flag is set.',
      ],
      diagram: `flowchart LR
  W[Weight tensor] --> P[Elementwise product]
  K[Weight mask] --> P
  P --> F[Conv2d or Linear forward]
  F --> L[Loss]
  L -->|gradient| K`,
    },
    {
      heading: 'The scoring criteria',
      body: [
        'A base Pruner class owns everything that is not the score: it collects the mask and parameter pairs, thresholds scores either globally across the whole network or locally within each tensor, applies the mask, and reports how many parameters remain. Each criterion subclasses it and implements one method. Adding a rule means writing a score function and registering it in a dictionary.',
        'Rand assigns Gaussian noise and exists as the control. Mag ranks by absolute weight value, the classical magnitude criterion applied before any training has happened. SNIP runs a backward pass over the scoring subset and takes the absolute gradient with respect to the mask, normalized to sum to one; IterSNIP is the same routine with the score line changed, ranking by gradient times weight instead.',
        'GraSP needs two passes over the same batches. The first accumulates gradients with no graph retained, the second recomputes them with a graph and backpropagates the inner product of the two, which yields a Hessian-vector product; the score is that product times the weight. Logits are divided by a temperature of 200 before the loss, which keeps the second-order term numerically sane.',
        'SynFlow uses no data at all. It replaces every parameter with its absolute value, pushes a tensor of ones through the network, sums the output and backpropagates, scoring each weight by the magnitude of gradient times value; the original signs are restored afterwards from a saved copy. It touches the dataloader only to read the input shape. NTK-SAP takes the same idea in the other direction: it deep-copies the model, perturbs the copy by Gaussian noise scaled by a small epsilon, feeds random noise through both, and backpropagates the squared difference between the two outputs. That difference is a finite-difference estimate of how far the network function moves under a small weight perturbation, and the mask gradient of it is the score. The weights are reinitialized before every batch, inside each of the configured repeats, so the estimate is averaged over initializations rather than tied to one draw.',
      ],
      diagram: `flowchart TD
  P[Pruner base class] --> A[Rand random control]
  P --> B[Mag weight magnitude]
  P --> C[SNIP mask gradient]
  P --> D[IterSNIP gradient times weight]
  P --> E[GraSP Hessian vector product]
  P --> F[SynFlow all ones forward pass]
  P --> G[NTK-SAP perturbed function difference]`,
    },
    {
      heading: 'Schedules, rewinding and measurement',
      body: [
        'Cutting straight to the target density in one step is a special case. The prune loop repeats score-and-mask for a configurable number of rounds and ramps the density towards the target on an exponential, linear or inverse-exponential schedule, so each round rescores a network that is already partly masked instead of ranking the dense one once. After the loop it counts the surviving parameters and aborts if the total has drifted five or more parameters away from the requested count, which catches a threshold that silently failed rather than letting the run continue against a mask nobody asked for.',
        'The multishot mode wraps that in the lottery-ticket protocol. For each compression ratio and each number of levels it alternates training and pruning, and after every prune it copies the original weight and bias values back from the checkpoint saved before anything started, leaving the masks in place. The optimizer and scheduler are reloaded from their saved states too, so each level begins from the same initialization and the only thing carried forward is the surviving connectivity.',
        'Reporting measures two different things. A set of forward hooks counts the multiply-accumulate work of every parameter tensor for the given input shape, and the summary weighs each tensor by both its size and its FLOP count. Parameter sparsity and FLOP sparsity are printed separately, because a mask that removes most of the weights from the wide fully connected head and few from the early convolutions saves far less compute than its density suggests.',
        'The two DDP modes exist because the ImageNet runs are long. They split the pipeline in half: one process prunes the model with DataParallel and writes out a checkpoint carrying the masks, and a separate DistributedDataParallel job spawns one process per GPU to train it, resuming from checkpoints and tracking the best top-1 epoch so an interrupted run does not start over. SynFlow on ImageNet is run in double precision, since its product of absolute values across a deep network is what underflows first.',
      ],
      diagram: `flowchart LR
  A[Saved initialization] --> B[Train for pre-epochs]
  B --> C[Score and mask to level density]
  C --> D[Restore weights keep masks]
  D --> B
  D --> E[Final training and report]`,
    },
  ],
  metrics: [
    { value: '7', label: 'pruning criteria behind one interface' },
    { value: '5', label: 'datasets from MNIST to ImageNet' },
    { value: '0', label: 'training epochs before the mask is chosen' },
  ],
  stackFull: ['Python', 'PyTorch', 'torchvision', 'NumPy', 'pandas', 'DistributedDataParallel'],
}

export default detail
