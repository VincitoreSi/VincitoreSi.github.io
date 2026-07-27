import type { ProjectDetail } from '../types'

const detail: ProjectDetail = {
  slug: 'sketch-colorization',
  summary:
    'Colorizes hand-drawn sketches using classical segmentation techniques, with no deep learning at any stage.',
  plateCaption:
    'Hand-drawn sketch → classical segmentation → region labeling → colorized output, using no deep learning.',
  blocks: [
    {
      heading: 'Overview',
      body: [
        'A web application that colorizes hand-drawn sketches using classical (pre-deep-learning) segmentation techniques — edge detection, region growing, and contour analysis.',
        'The pipeline was containerized with Docker and deployed via Streamlit, supporting 100+ concurrent sessions. No deep learning model is used at any stage; the approach relies entirely on traditional computer vision methods.',
      ],
      diagram: `flowchart LR
  Hand-drawn Sketch --> Edge Detect --> Region Grow --> Color Map --> Colorized Output`,
    },
  ],
  metrics: [
    { value: '100+', label: 'concurrent sessions' },
    { value: '0', label: 'deep learning models' },
  ],
  stackFull: ['Python', 'OpenCV', 'Streamlit', 'Docker'],
}

export default detail
