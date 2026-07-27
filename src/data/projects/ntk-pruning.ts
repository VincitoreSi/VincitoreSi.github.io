import type { ProjectDetail } from '../types'

const detail: ProjectDetail = {
  slug: 'ntk-pruning',
  summary:
    'A pruning method that removes connections while preserving the training dynamics of the dense network, achieving ~20% compression with minimal accuracy loss.',
  plateCaption:
    'NTK spectrum analysis — connections with minimal influence on the spectrum are pruned, preserving the network\u2019s training dynamics.',
  blocks: [
    {
      heading: 'Problem',
      body: [
        'Standard pruning methods remove connections based on magnitude or gradient \u2014 criteria that do not consider the network\u2019s training dynamics. The pruned network often requires extensive retraining to recover accuracy.',
      ],
    },
    {
      heading: 'Approach',
      body: [
        'A pruning method based on Neural Tangent Kernel (NTK) theory that removes connections with minimal influence on the NTK spectrum, preserving the training dynamics of the dense network. By identifying and eliminating connections whose removal least affects the NTK spectrum, the method maintains the network\u2019s capacity to align its training dynamics with its dense counterpart.',
        'Research conducted under Prof. Binod Kumar at IIT Jodhpur.',
      ],
      diagram: 'flowchart LR\n  A[Dense Network] --> B[Compute NTK]\n  B --> C[Analyze Spectrum]\n  C --> D[Prune Low-Influence]\n  D --> E[Compressed Network]\n  E --> F[Train]\n  F --> A',
    },
    {
      heading: 'Key decisions',
      body: [
        'Aligning pruning with the NTK spectrum rather than weight magnitude means the method preserves convergence rate \u2014 the pruned network trains at the same speed as its dense version, reducing the retraining burden.',
      ],
    },
    {
      heading: 'Result',
      body: [
        'Approximately 20% model compression with minimal accuracy loss on benchmark datasets.',
      ],
    },
  ],
  metrics: [
    { value: '~20%', label: 'compression' },
    { value: 'Minimal', label: 'accuracy loss' },
  ],
  stackFull: ['PyTorch', 'NTK Theory', 'Python'],
}

export default detail
