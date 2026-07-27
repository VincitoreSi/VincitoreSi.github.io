import type { ProjectDetail } from '../types'

const detail: ProjectDetail = {
  slug: 'the-cutting-room',
  summary:
    'A multi-agent GenAI video pipeline: a FastAPI hub and React 19 dashboard with four agents coordinating over HTTP and no shared filesystem.',
  plateCaption:
    'Four agents — Blueprint, Score, Render, Review — coordinating over HTTP around a central hub, with no shared filesystem.',
  blocks: [
    {
      heading: 'Problem',
      body: [
        'Building a GenAI video pipeline typically means a monolithic service where every component shares a filesystem and a process. That couples ingestion, generation, scoring, and rendering so tightly that scaling one means scaling everything, and a failure in any stage takes down the whole pipeline.',
      ],
    },
    {
      heading: 'Approach',
      body: [
        'Four agents — Blueprint, Score, Render, Review — each a separate FastAPI service communicating over HTTP with no shared filesystem. The hub orchestrates: the Blueprint agent generates a shot-by-shot breakdown via Gemini 2.5 Pro with JSON schema validation and automatic repair loops, the Score agent blends engagement signals into a configurable 0–100 score, and the Render stage produces the final video.',
        'The whole pipeline is containerized as a multi-arch Docker image with a custom ffmpeg build stripped to approximately 130 MB, keeping it deployable on edge hardware.',
      ],
    },
    {
      heading: 'Key decisions',
      body: [
        'HTTP as the coordination protocol rather than a message queue keeps each agent independently deployable and testable — swap any agent without touching the others.',
        'The scoring engine is purely arithmetic — rate, reach, outlier, velocity — so it runs without a model call, keeping the feedback loop fast.',
        'Gemini 2.5 Pro blueprint generation uses jsonschema validation with automatic repair loops, so malformed output is caught and corrected before it reaches the render stage.',
      ],
    },
    {
      heading: 'Result',
      body: [
        'A multi-arch Docker image published to GHCR running a multi-agent video pipeline with four independently scalable services and no single point of failure.',
      ],
    },
  ],
  metrics: [
    { value: '4', label: 'agents' },
    { value: '1', label: 'hub' },
    { value: '0', label: 'shared filesystem' },
  ],
  stackFull: ['FastAPI', 'React 19', 'Gemini', 'Docker', 'Python', 'TypeScript'],
}

export default detail
