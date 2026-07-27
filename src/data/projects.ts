import type { ProjectMeta } from './types'

export const projects: ProjectMeta[] = [
  { slug: 'pageindex', fig: 1, depth: 'full', repo: 'pageindex', year: '2026',
    title: 'PageIndex',
    tagline: 'A retrieval engine that replaces the vector database with hierarchical table-of-contents generation and LLM-guided traversal.',
    stack: ['Rust', 'SQLite', 'async-openai', 'serde'] },

  { slug: 'the-cutting-room', fig: 2, depth: 'full', repo: 'TheCuttingRoom', year: '2026',
    title: 'The Cutting Room',
    tagline: 'A multi-agent GenAI video pipeline: three agents coordinating over HTTP with no shared filesystem.',
    stack: ['FastAPI', 'React 19', 'Gemini', 'Docker'] },

  { slug: 'echolearn', fig: 3, depth: 'full', repo: null, year: '2026',
    title: 'EchoLearn',
    tagline: 'A real-time educational podcast platform where students interrupt the audio mid-sentence to ask a question.',
    stack: ['System Design', 'RAG', 'WebSockets', 'FastAPI'] },

  { slug: 'adaptive-reels', fig: 4, depth: 'full', repo: null, year: '2026',
    title: 'Adaptive Educational Reels',
    tagline: 'An event-driven pipeline that expands a topic and grade level into a sequenced set of short-form video lessons.',
    stack: ['System Design', 'Kubernetes', 'Pub/Sub', 'PostgreSQL'] },

  { slug: 'ntk-pruning', fig: 5, depth: 'full', repo: null, year: '2023',
    title: 'NTK-Aware Pruning',
    tagline: 'A pruning method that removes connections while preserving the training dynamics of the dense network.',
    stack: ['PyTorch', 'NTK Theory'] },

  { slug: 'table-structure-recognition', fig: 6, depth: 'short', repo: null, year: '2023 — 24',
    title: 'Table Structure Recognition',
    tagline: 'CNN models for table detection and structural parsing in document understanding.',
    stack: ['PyTorch', 'CNN', 'OpenCV'] },

  { slug: 'facial-emotion-recognition', fig: 7, depth: 'full', repo: 'FacialEmotionRecognition', year: '2025',
    title: 'Facial Emotion Recognition',
    tagline: 'A ResNet fine-tuned on FER-2013 for seven-class expression recognition, with the first convolution rebuilt for single-channel 48x48 input.',
    stack: ['PyTorch', 'ResNet-34', 'torchvision'] },

  { slug: 'electronic-nose', fig: 8, depth: 'full', repo: 'ElectronicNoseSystem', year: '2023 — 24',
    title: 'Electronic Nose',
    tagline: 'Gas classification and concentration prediction from 10,000+ sensor readings, running entirely on a Raspberry Pi.',
    stack: ['Python', 'PyTorch', 'Raspberry Pi'] },

  { slug: 'hardware-patch-generation', fig: 9, depth: 'full', repo: 'resource-aware-patch-generation', year: '2022',
    title: 'Resource-Aware Hardware Patch Generation',
    tagline: 'A resource-aware patch-generation algorithm for functional ECO, solving 10,000+ cases at roughly 90% efficiency.',
    stack: ['Python', 'Verilog', 'Berkeley ABC'] },

  { slug: 'dbms-normalization', fig: 10, depth: 'full', repo: 'AutoNormalizationForTables', year: '2022',
    title: 'Automated Table Normalization',
    tagline: 'Normalizes database tables from 1NF through BCNF with step-by-step visualization of each decomposition.',
    stack: ['Python', 'C++', 'SQL'] },

  { slug: 'toxic-comment-classification', fig: 11, depth: 'short', repo: null, year: '2022',
    title: 'Toxic Comment Classification',
    tagline: 'NLP models compared on accuracy for detecting toxic content in social-media text.',
    stack: ['PyTorch', 'NLP', 'Streamlit'] },

  { slug: 'sketch-colorization', fig: 12, depth: 'full', repo: 'HandMade-Sketch-Colorization', year: '2022',
    title: 'Handmade Sketch Colorization',
    tagline: 'Colorizes hand-drawn sketches using classical segmentation, with no deep learning at any stage.',
    stack: ['Python', 'OpenCV', 'Streamlit'] },

  { slug: 'cnn-optimization', fig: 13, depth: 'full', repo: 'optimization-for-cnn', year: '2023',
    title: 'CNN Design via Optimization',
    tagline: 'Treats convolutional architecture selection as an optimization problem rather than a manual search.',
    stack: ['Python', 'PyTorch'] },

  { slug: 'covid-dashboard', fig: 14, depth: 'short', repo: null, year: '2023',
    title: 'Covid-19 Statistics Portal',
    tagline: 'An interactive dashboard visualizing the state of Covid-19 across India.',
    stack: ['Plotly Dash', 'Python', 'Flask'] },

  { slug: 'process-scheduling-visualizer', fig: 15, depth: 'short', repo: null, year: '2022',
    title: 'Process-Scheduling Visualizer',
    tagline: 'Animates classical CPU scheduling algorithms step by step against a shared workload.',
    stack: ['JavaScript', 'HTML/CSS'] },
]
