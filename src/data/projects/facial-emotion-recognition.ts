import type { ProjectDetail } from '../types'

const detail: ProjectDetail = {
  slug: 'facial-emotion-recognition',
  summary:
    'A ResNet-34 fine-tuned on FER-2013 for seven-class expression recognition, with face detection enabling live webcam inference.',
  plateCaption:
    'Webcam feed → face detection → ResNet-34 → seven emotion classes with confidence scores.',
  blocks: [
    {
      heading: 'Overview',
      body: [
        'A ResNet-34 fine-tuned on FER-2013 (35,887 grayscale images, 7 emotion classes) for facial expression recognition. Transfer learning from ImageNet weights with a custom classifier head.',
        'The preprocessing, training, and hyperparameter-tuning pipeline was written from scratch in PyTorch. Face detection was added so the model runs on a live webcam feed, detecting faces before classifying expressions.',
      ],
      diagram: `flowchart LR
  Webcam Frame --> Face Detection --> ResNet-34 --> 7 Emotion Classes`,
    },
  ],
  metrics: [
    { value: '7', label: 'emotion classes' },
    { value: '35,887', label: 'training images' },
  ],
  stackFull: ['PyTorch', 'ResNet-34', 'OpenCV', 'Python'],
}

export default detail
