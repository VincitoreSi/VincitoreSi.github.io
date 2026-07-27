import type { ProjectDetail } from '../types'

const detail: ProjectDetail = {
  slug: 'adaptive-reels',
  summary:
    'An event-driven pipeline that expands a topic and grade level into a sequenced set of short-form video lessons, with schema-constrained LLM output feeding the database directly.',
  plateCaption:
    'Event-driven expansion pipeline — topic and grade level in, sequenced lesson videos out, with queue-depth autoscaling on the render workers.',
  blocks: [
    {
      heading: 'Problem',
      body: [
        'Producing short-form educational video at scale means writing a new script and storyboard for every combination of topic and grade level — manual work that does not generalize beyond the first few variants.',
      ],
    },
    {
      heading: 'Approach',
      body: [
        'An event-driven pipeline that accepts a topic and grade level and expands them into a sequenced lesson set. LLM output is constrained by a JSON schema for direct database insertion, eliminating the free-text-to-structured-data translation step.',
        'Media generation routes down two paths — full generative video or programmatic animation over generated stills — chosen by a cost model that keeps per-reel expense viable at scale.',
      ],
    },
    {
      heading: 'Key decisions',
      body: [
        'Schema-constrained LLM output means the database receives structured records without a parsing step — the model\'s response is valid INSERT statements.',
        'Curriculum and telemetry tables are modeled to 3NF, and queue-depth autoscaling on render workers matches capacity to demand without over-provisioning.',
      ],
    },
    {
      heading: 'Result',
      body: [
        'An adaptive video pipeline that turns a topic and grade level into sequenced lesson videos with cost-optimized rendering and direct database insertion from the language model.',
      ],
    },
  ],
  metrics: [
    { value: '2', label: 'render paths' },
    { value: '3NF', label: 'schema design' },
  ],
  stackFull: ['System Design', 'Kubernetes', 'Pub/Sub', 'PostgreSQL', 'Gemini', 'Python'],
  confidential: true,
}

export default detail
