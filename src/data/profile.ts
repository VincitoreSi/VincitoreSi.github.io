export const profile = {
  name: 'Tushar Kumar',
  role: 'AI Engineer',
  location: 'Noida, India',
  email: 'tusharparthsarathi@gmail.com',
  phone: '+91 9917677832',
  github: 'https://github.com/VincitoreSi',
  linkedin: 'https://linkedin.com/in/tusharkumarparthsarathi',
  resume: '/tushar-kumar-resume.pdf',

  /** Two-column lede. Column one positions, column two evidences. */
  lede: [
    'I build retrieval and multi-agent systems. At Samsung R&D India I work on a three-person team that shipped a RAG chatbot answering spec, feature, and test-case questions for Tizen modules, replacing scattered documents with a single reference point. The retrieval path is mine: semantic chunking, hybrid keyword and dense search, cross-encoder reranking over isolated per-corpus namespaces.',
    'The same year I wrote the streaming layer for an interactive learning platform that produced over 100 hours of lecture content for more than 5,000 students, holding barge-in response under 200 milliseconds. Underneath all of it is C and C++: profiling work that cut memory use by 25 percent across 10,000-plus deployed devices, and a diagnostics rewrite that cut issue-resolution time by 30 to 40 percent.',
  ],

  experience: {
    company: 'Samsung R&D Institute India, Delhi',
    title: 'Software Engineer I',
    start: 'Jul 2024',
    end: 'Present',
    location: 'Noida, UP, India',
    groups: [
      {
        heading: 'GenAI & RAG Systems',
        items: [
          'Built a RAG chatbot with a team of 3 that answers spec, feature, and test-case questions for Tizen modules such as SignagePlayer, replacing scattered documents with one reference point.',
          'Extended it to generate test cases automatically for module features and to walk engineers through first-line troubleshooting.',
          'Implemented the retrieval path: semantic chunking, hybrid keyword and dense vector search, and cross-encoder reranking over isolated per-corpus namespaces.',
        ],
      },
      {
        heading: 'AI Learning Platforms',
        items: [
          'Developed an interactive educational podcast platform that produced 100+ hours of lecture content for 5,000+ students, letting students interrupt playback mid-sentence to ask questions.',
          'Wrote the streaming layer on full-duplex WebSockets so heavy render work never stalls audio, holding barge-in response under 200 ms.',
          'Shipped an adaptive short-form video pipeline that expands a topic and grade level into a sequenced lesson set, with schema-constrained LLM output feeding the database directly.',
          "Prototyped Code2Documentation, which won Samsung's Good Idea Award (1 of 50 globally).",
        ],
      },
      {
        heading: 'Smart Diagnostics & Logging',
        items: [
          'Wrote a diagnostics service that collects log, CPU, and memory telemetry from 10,000+ Samsung devices.',
          'Cut issue-resolution time by 30–40%; scaled log collection to 2 GB+ per session.',
          "Integrated the logging pipeline into Samsung's internal portal, now used by 500+ engineers in 20+ countries.",
        ],
      },
      {
        heading: 'Tizen Signage Core Modules (C/C++)',
        items: [
          'Maintain Tizen modules (SignagePlayer, OfficeViewer, Event Manager, Remote Manager) across 100+ deployments.',
          'Reduced memory usage by 25% via profiling and C/C++ optimization; resolved 50+ production crashes.',
          'Added subtitle support to SignagePlayer for multilingual accessibility in international deployments.',
        ],
      },
    ],
  },

  education: {
    school: 'Indian Institute of Technology (IIT) Jodhpur',
    degree: 'B.Tech. Artificial Intelligence & Data Science',
    start: 'Jul 2020',
    end: 'May 2024',
    coursework: [
      'Data Structures & Algorithms', 'Operating Systems', 'Computer Networking',
      'Database Management Systems', 'Computer Architecture', 'Machine Learning',
      'Deep Learning', 'Pattern Recognition & ML', 'Computer Vision',
      'Natural Language Processing', 'System Design',
    ],
  },

  skills: [
    {
      heading: 'LLM & RAG',
      items: ['Retrieval-Augmented Generation', 'Agentic RAG', 'Multi-Agent Systems', 'Prompt Engineering', 'Large Language Models', 'LangChain', 'LangGraph', 'Model Context Protocol', 'FAISS', 'Vector Databases', 'Semantic Chunking', 'Hybrid Search (BM25 + Dense)', 'Cross-Encoder Reranking', 'Knowledge Graphs', 'Gemini API'],
    },
    {
      heading: 'Machine Learning',
      items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'OpenCV', 'NLTK', 'Deep Learning', 'Computer Vision', 'NLP', 'Transfer Learning', 'Model Compression', 'PCA / LDA / t-SNE'],
    },
    {
      heading: 'Languages',
      items: ['Python', 'C / C++', 'Rust', 'Go', 'Java', 'JavaScript / TypeScript', 'SQL'],
    },
    {
      heading: 'Backend & Architecture',
      items: ['FastAPI', 'Django', 'Flask', 'REST APIs', 'WebSockets', 'Async & Streaming Pipelines', 'Event-Driven Architecture', 'Microservices', 'System Design (HLD/LLD)', 'SQLite'],
    },
    {
      heading: 'DevOps & Tools',
      items: ['Docker', 'AWS', 'GitHub Actions', 'CI/CD', 'Git', 'Linux', 'Neovim', 'LaTeX'],
    },
    {
      heading: 'Web & IoT',
      items: ['React', 'Next.js', 'Node.js', 'Raspberry Pi', 'ThingSpeak'],
    },
  ],

  certifications: [
    { title: 'LangChain & LangGraph — Agentic AI Engineering', issuer: 'Udemy', date: 'May 2026' },
    { title: 'Prompt Engineering for Everyone Bootcamp', issuer: 'Udemy', date: 'May 2026' },
    { title: 'The Complete MCP (Model Context Protocol) Masterclass', issuer: 'Udemy', date: 'May 2026' },
    { title: "Rust: The Complete Developer's Guide", issuer: 'Udemy', date: 'Feb 2026' },
    { title: 'Fundamentals of Operating Systems', issuer: 'Udemy', date: 'Jun 2025' },
    { title: 'Mathematics for Machine Learning', issuer: 'Coursera', date: '2022 — 23' },
  ],

  colophon: {
    note: 'Set in Fraunces, Newsreader, and JetBrains Mono. Built with Next.js, animated with GSAP, drawn by hand in SVG. No template.',
  },
} as const
