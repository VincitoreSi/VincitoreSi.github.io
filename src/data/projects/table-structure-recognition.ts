import type { ProjectDetail } from '../types'

const detail: ProjectDetail = {
  slug: 'table-structure-recognition',
  summary:
    'Trained CNN models for table detection and structure recognition on benchmark document datasets, improving detection accuracy and structural parsing for document understanding.',
  plateCaption:
    'Document page with detected table regions and recognized row/column structure overlaid.',
  blocks: [
    {
      heading: 'Overview',
      body: [
        'A research project at IIT Jodhpur that trains CNN models to detect tables in document images and parse their internal structure — rows, columns, and cell boundaries.',
        'The detection stage localizes table regions on the page, and the structure recognition stage parses each detected region into a structured grid. Both stages use convolutional neural networks trained on benchmark document datasets.',
        'The work aimed to improve detection accuracy and structural parsing for document understanding applications.',
      ],
      diagram: `flowchart LR
  Doc Image --> CNN Detector --> Table Regions --> CNN Structure Parser --> Row/Column Grid`,
    },
  ],
  metrics: [],
  stackFull: ['PyTorch', 'CNN', 'OpenCV', 'Python'],
}

export default detail
