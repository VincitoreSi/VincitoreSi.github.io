import type { ProjectDetail } from '../types'

const detail: ProjectDetail = {
  slug: 'toxic-comment-classification',
  summary:
    'NLP models compared on accuracy for detecting toxic content in social-media text, deployed as a Streamlit web application.',
  plateCaption:
    'Social media text → multiple NLP classifiers → toxicity scores compared side by side.',
  blocks: [
    {
      heading: 'Overview',
      body: [
        'PyTorch NLP models were trained to detect toxic content in social media datasets, comparing several classifier architectures on accuracy.',
        'The best models were deployed as a Docker container with a Streamlit web application for interactive testing — users type or paste text and see toxicity predictions from all models side by side.',
      ],
    },
  ],
  metrics: [{ value: 'Multiple', label: 'classifiers compared' }],
  stackFull: ['PyTorch', 'NLP', 'Streamlit', 'Docker', 'Python'],
}

export default detail
