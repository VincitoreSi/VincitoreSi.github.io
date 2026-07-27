import type { ProjectDetail } from '../types'

const detail: ProjectDetail = {
  slug: 'echolearn',
  summary:
    'A real-time educational podcast platform where students interrupt the audio mid-sentence to ask a question, with barge-in response under 200 milliseconds.',
  plateCaption:
    'Duplex audio stream with an interrupt-driven retrieval path — semantic chunking, hybrid search, cross-encoder reranking, tenant-isolated namespaces — all before audio resumes.',
  blocks: [
    {
      heading: 'Problem',
      body: [
        'Educational podcasts are one-way: the student listens, and if something is unclear there is no way to ask until the end — by which point the specific question has likely dissolved.',
      ],
    },
    {
      heading: 'Approach',
      body: [
        'A real-time platform where teachers curate a bounded corpus and students interrupt the audio mid-sentence to ask questions. The streaming layer runs on full-duplex WebSockets so render work never stalls audio, holding barge-in response under 200 ms.',
        'The retrieval path uses semantic chunking, hybrid BM25 and dense vector search, and cross-encoder reranking over per-student namespaces that enforce tenant isolation. When a student interrupts, the query is vectorized, searched, reranked, and the top result is streamed back — all before audio playback would naturally resume.',
      ],
    },
    {
      heading: 'Key decisions',
      body: [
        'Redis Streams decouples the render pipeline from audio delivery so a slow generation never blocks playback. The student hears uninterrupted audio until their interrupt is processed.',
        'Jitter buffering and graceful degradation — from animation to static assets — ensure audio never drops mid-session even under load.',
      ],
    },
    {
      heading: 'Result',
      body: [
        'The platform produced over 100 hours of lecture content for more than 5,000 students, with a barge-in budget of under 200 ms to halt playback and return an answer.',
      ],
    },
  ],
  metrics: [
    { value: '100+', label: 'hours of content' },
    { value: '5000+', label: 'students served' },
    { value: '<200', label: 'ms barge-in' },
  ],
  stackFull: ['System Design', 'RAG', 'WebSockets', 'FastAPI', 'Redis', 'Gemini'],
  confidential: true,
}

export default detail
