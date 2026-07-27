import type { ProjectDetail } from '../types'

const detail: ProjectDetail = {
  slug: 'electronic-nose',
  summary:
    'Gas classification and concentration prediction from 10,000+ sensor readings, running entirely on a Raspberry Pi with ThingSpeak integration.',
  plateCaption:
    'Sensor array → PCA/LDA/t-SNE feature extraction → gas type classifier + concentration regressor → live dashboard.',
  blocks: [
    {
      heading: 'Overview',
      body: [
        'An ML pipeline processing 10,000+ sensor readings for gas classification and concentration prediction, running entirely on a Raspberry Pi with ThingSpeak for data ingestion.',
        'PCA, LDA, and t-SNE were used for feature extraction from raw sensor data, then classifiers were trained for gas type identification alongside regression models for concentration levels. A dashboard provides live sensor visualization and automated predictions.',
      ],
    },
  ],
  metrics: [
    { value: '10,000+', label: 'sensor readings' },
    { value: 'Raspberry Pi', label: 'edge deployment' },
  ],
  stackFull: ['Python', 'PyTorch', 'Raspberry Pi', 'Scikit-learn', 'ThingSpeak'],
}

export default detail
