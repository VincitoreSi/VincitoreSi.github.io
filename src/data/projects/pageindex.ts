import type { ProjectDetail } from '../types'

const detail: ProjectDetail = {
  slug: 'pageindex',
  summary:
    'A retrieval engine written in Rust that answers questions over a document corpus without computing a single embedding. Instead of a vector index it builds a hierarchical table of contents and lets the model walk it.',
  plateCaption:
    'Hierarchical table of contents with an LLM-guided descent, from root to the answer span. No embedding is computed at any stage.',
  blocks: [
    {
      heading: 'Problem',
      body: [
        'The default answer to retrieval is a vector database: embed every chunk, embed the query, take the nearest neighbours. It works, and it brings an embedding model, a vector store, a dimensionality choice, and a re-indexing job along with it. For a corpus that already has structure — chapters, sections, headings — that machinery discards the very thing that makes the document navigable.',
      ],
    },
    {
      heading: 'Approach',
      body: [
        'PageIndex generates a hierarchical table of contents for the corpus and treats retrieval as traversal. The model is given the current level of the tree and asked which branch to descend, repeatedly, until it reaches a span small enough to answer from. Selection is a reasoning step over structure rather than a distance computation in a latent space.',
        'The index is stored in SQLite, so state is a single file with no service to run. Ingestion handles markdown, plain text, PDF, and ZIP archives, walking directories recursively, and the whole thing ships as one Rust binary.',
      ],
    },
    {
      heading: 'Key decisions',
      body: [
        'A multi-provider abstraction sits behind the traversal step, so OpenAI, Grok, Gemini, Claude, or a custom endpoint are interchangeable. Traversal is the only place a model is called, which keeps that seam narrow and makes provider comparison a configuration change rather than a rewrite.',
        'Queries execute asynchronously against the SQLite-backed index, which is what holds lookups under 200 milliseconds despite a model sitting in the retrieval path.',
      ],
    },
    {
      heading: 'Result',
      body: [
        'A single-binary CLI that performs retrieval with no embeddings, no vector store, and no re-indexing step, with sub-200ms lookups against a SQLite index.',
      ],
    },
  ],
  metrics: [
    { value: '200', label: 'ms lookup ceiling' },
    { value: '5', label: 'interchangeable LLM providers' },
    { value: '0', label: 'embeddings computed' },
  ],
  stackFull: ['Rust', 'SQLite', 'async-openai', 'serde', 'Tokio'],
}

export default detail
