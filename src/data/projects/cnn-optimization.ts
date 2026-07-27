import type { ProjectDetail } from '../types'

const detail: ProjectDetail = {
  slug: 'cnn-optimization',
  summary:
    'Treats convolutional architecture selection as an optimization problem rather than a manual search.',
  plateCaption:
    'Architecture search space → optimization loop → evaluated candidate → best CNN architecture.',
  blocks: [
    {
      heading: 'Overview',
      body: [
        'A design project that treats convolutional neural network architecture selection as an optimization problem. Instead of manually tuning layer counts, filter sizes, and stride values, the approach defines a search space of architectural choices and lets an optimization method navigate it.',
        'The optimization evaluates candidates on a validation metric and iterates toward better architectures, producing a CNN design that is justified by the search process rather than designer intuition.',
      ],
    },
  ],
  metrics: [
    { value: 'Optimization', label: 'driven architecture search' },
  ],
  stackFull: ['Python', 'PyTorch'],
}

export default detail
