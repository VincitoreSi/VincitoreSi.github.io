import type { ProjectDetail } from '../types'

const detail: ProjectDetail = {
  slug: 'facial-emotion-recognition',
  summary:
    'A ResNet fine-tuned on FER-2013 for seven-class expression recognition, with the first convolution rebuilt for single-channel 48x48 input and the whole data, training and evaluation pipeline written from scratch in PyTorch.',
  plateCaption:
    '48 by 48 grayscale face crop → ResNet with a rebuilt single-channel stem → log softmax over seven emotion classes.',
  blocks: [
    {
      heading: 'Problem',
      body: [
        'FER-2013 does not arrive as images. It is one CSV where each row is an emotion label, a string of 2,304 space-separated integers, and a Usage column recording which of the original Kaggle contest splits the row belonged to. Turning that into 48 by 48 grayscale tensors, under a split that stays honest, is most of the work before any model runs.',
        'Seven classes — angry, disgust, fear, happy, sad, surprise, neutral — across 35,887 labelled faces. The intended use is per-face classification on a live frame, so the classifier has to be cheap enough to run once for every face detected in a frame, not once per frame.',
      ],
    },
    {
      heading: 'Data pipeline',
      body: [
        'The dataset class parses the pixel strings once, at construction, and writes the result back into the dataframe as 2,304 float columns scaled to zero-to-one. After that __getitem__ is a row lookup and a reshape rather than a string split per sample, which matters when the loader is asked for the same rows thirty-two times over.',
        'Splits follow the contest structure rather than a fresh random cut. Training and PublicTest rows become the training pool, PrivateTest is held out untouched as the test set, and a fifth of the pool is peeled off for validation. On the recorded run that comes out as 25,839 training images, 6,459 validation, and 3,589 test.',
        'The training pool is augmented with a reflect-padded random crop back to 48, a fifteen-degree rotation, a small affine translate and shear, and a horizontal flip. Only the test set gets ToTensor and nothing else, so the headline accuracy is measured on unmodified images. Validation is carved out of the training pool with random_split, so it inherits the training transforms and is scored on augmented images — which matters, because checkpoint selection keys on validation loss.',
      ],
      diagram: `flowchart LR
  CSV["fer2013 csv"] --> Parse["parse pixel strings once"]
  Parse --> Cols["2304 float columns per row"]
  Cols --> Usage{"Usage column"}
  Usage -->|Training and PublicTest| Pool["training pool"]
  Usage -->|PrivateTest| Test["test set 3589"]
  Pool --> Split["random split 80 20"]
  Split --> Train["train 25839"]
  Split --> Val["validation 6459"]`,
    },
    {
      heading: 'Model surgery',
      body: [
        'torchvision ships ResNet with a three-channel stem and a thousand-way classifier. FER-2013 is one channel and seven classes, so both ends are replaced. The common shortcut is to tile the grayscale image across three channels and keep the pretrained stem intact; here conv1 is rebuilt instead as a 1-to-64 channel convolution with the same 7x7 kernel, stride and padding. That trades the first layer, which now trains from scratch, for an input tensor that stays one channel wide the whole way through. Every residual block behind it keeps its ImageNet weights.',
        'The classifier head becomes a 512 to 256 linear layer, ReLU, dropout at 0.2, then 256 to 7 and a log softmax. get_model switches over resnet18, resnet34, resnet50 and resnet101, adjusting the head input between 512 and 2048 to match the backbone, so depth is a command-line flag rather than an edit.',
      ],
      diagram: `flowchart LR
  Inp["1 by 48 by 48 grayscale"] --> Conv1["conv1 rebuilt 1 to 64 channels"]
  Conv1 --> Body["pretrained residual blocks"]
  Body --> Pool["global average pool"]
  Pool --> FC1["linear 512 to 256"]
  FC1 --> Act["relu and dropout 0.2"]
  Act --> FC2["linear 256 to 7"]
  FC2 --> Out["log softmax over 7 classes"]`,
    },
    {
      heading: 'Training loop',
      body: [
        'Adam with weight decay, cross entropy, and a OneCycle schedule stepped once per batch rather than once per epoch — the scheduler is constructed with steps_per_epoch set to the length of the train loader, so the learning rate rises and falls across the whole run instead of restarting each epoch.',
        'Checkpointing keys on validation loss, not on epoch count. Every epoch evaluates against the validation loader, and when the loss improves the state dict is deep-copied into memory. Only at the end is the best copy loaded back into the model and written to disk, so a late epoch that overfits cannot overwrite a better earlier one.',
        'The loop prints running loss and accuracy every hundred batches as well as at the epoch boundary. That is there because the useful signal on this dataset is whether accuracy is still climbing within an epoch, which an epoch-level number cannot show.',
      ],
      diagram: `flowchart TD
  Batch["batch from train loader"] --> Fwd["forward pass"]
  Fwd --> Loss["cross entropy loss"]
  Loss --> Back["backward and adam step"]
  Back --> Sched["one cycle lr step"]
  Sched --> More{"more batches"}
  More -->|yes| Batch
  More -->|no| Eval["evaluate on validation set"]
  Eval --> Better{"val loss improved"}
  Better -->|yes| Keep["deep copy state dict"]
  Better -->|no| Next["next epoch"]
  Keep --> Next
  Next --> Done["restore best state and save"]`,
    },
    {
      heading: 'Result',
      body: [
        'One pass over the test loader returns three things: mean loss, accuracy, and a 7 by 7 confusion matrix accumulated by hand as counts of label against prediction. A one-vs-rest ROC helper sits alongside it, taking the class to isolate as an argument; the recorded run draws it for angry and disgust only, and it feeds hard argmax predictions rather than class scores, so those two curves are coarse.',
        'The run recorded in the notebook uses resnet18 at a 3e-3 peak learning rate, batch size 64, for 32 epochs, and reaches 0.6383 accuracy on the held-out PrivateTest split. main.py exposes the same run as a CLI over learning rate, weight decay, epochs, batch size, backbone and save path; a standalone predict.py loads a saved checkpoint and returns the argmax class for a single image.',
        'The live version is that same call in a loop — detect the faces in a frame, crop each one, classify the crop. What the repository holds is the classifier half of it: the dataset, the model, the training loop, the evaluation, and single-image prediction.',
      ],
      diagram: `flowchart LR
  Model["best checkpoint"] --> TestL["test loader 3589 images"]
  TestL --> Logits["logits per batch"]
  Logits --> Acc["mean loss and accuracy"]
  Logits --> CM["7 by 7 confusion matrix"]
  Logits --> ROC["one vs rest roc for a chosen class"]`,
    },
  ],
  metrics: [
    { value: '7', label: 'emotion classes' },
    { value: '35,887', label: 'labelled images' },
    { value: '63.8%', label: 'accuracy, ResNet-18 run' },
  ],
  stackFull: ['PyTorch', 'torchvision', 'ResNet-34', 'pandas', 'NumPy', 'scikit-learn', 'Python'],
}

export default detail
