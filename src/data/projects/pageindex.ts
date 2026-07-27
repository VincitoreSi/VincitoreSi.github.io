import type { ProjectDetail } from '../types'

const detail: ProjectDetail = {
  slug: 'pageindex',
  summary:
    'A retrieval engine written in Rust that answers questions over a document corpus without computing a single embedding. Instead of a vector index it builds a hierarchical table of contents in SQLite and reasons over that structure.',
  plateCaption:
    'Hierarchical table of contents held in SQLite, walked from the root node down through its section nodes. No embedding is computed at any stage.',
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
        'PageIndex keeps the structure and drops the vectors. Ingestion turns each file into a small tree of nodes and writes it to a SQLite database; querying reads that tree back and hands the relevant text to a model. Those are the only two commands the binary exposes, and they share nothing but the database file, so an index built with one provider can be queried with another.',
        'The two halves of the tool look like this. Everything to the left of the database happens once per document; everything to the right happens once per question.',
      ],
      diagram: [
        'flowchart LR',
        '  A[Files md txt pdf zip] --> B[Ingest]',
        '  B --> C[Split into nodes]',
        '  C --> D[LLM writes root summary]',
        '  D --> E[(index.db)]',
        '  F[Question] --> G[Query]',
        '  E --> G',
        '  G --> H[Collect node text]',
        '  H --> I[LLM writes answer]',
      ].join('\n'),
    },
    {
      heading: 'Building the index',
      body: [
        'Ingestion accepts a file, a directory, or a zip archive. Directories are walked recursively with walkdir and each readable file becomes its own document; archives are expanded into a temporary directory, ingested as a directory, then deleted. PDFs go through pdf-extract for their text layer, everything else is read as UTF-8, and a file that turns out to be binary or unreadable is skipped with a message rather than aborting the run.',
        'Each document gets one row in the documents table and a tree of rows in the nodes table, keyed on the pair of node id and document id. A node carries a parent id, a title, an optional summary, and optional text content. The root node is titled after the file and holds an LLM-written summary of its opening; the section nodes below it hold the actual chunk text. Chunking today is deliberately blunt — the text is split on blank lines and each piece becomes a child of the root — so the tree the schema allows is deeper than the tree the ingester currently builds. The start and end index columns are in the schema for character spans that the current chunker does not yet populate.',
      ],
      diagram: [
        'flowchart TD',
        '  A[documents row per file] --> B[root node with LLM summary]',
        '  B --> C[Section 0]',
        '  B --> D[Section 1]',
        '  B --> E[Section n]',
        '  C --> F[chunk text]',
        '  D --> G[chunk text]',
        '  E --> H[chunk text]',
      ].join('\n'),
    },
    {
      heading: 'Answering a query',
      body: [
        'A query opens the database, takes the most recently ingested document, and walks its tree from the root outward. Children are fetched a level at a time and pushed onto a stack, so the walk is depth-first and every node with text contributes its chunk to a single context string, labelled by section title. That string and the question go to the model in one call, and the answer is printed.',
        'This is the honest state of the retrieval step: the tree is what gets walked, but the walk is currently exhaustive rather than selective. The structure needed for summary-guided descent is already in place — every node has a summary field and a parent link, and the children of a node can be fetched without loading the rest of the tree — so narrowing the walk is a change to the loop below rather than to the schema or the storage layer.',
      ],
      diagram: [
        'sequenceDiagram',
        '  participant CLI',
        '  participant DB as SQLite',
        '  participant LLM',
        '  CLI->>DB: latest document',
        '  DB-->>CLI: doc id and filename',
        '  CLI->>DB: nodes with no parent',
        '  DB-->>CLI: root node',
        '  loop until stack is empty',
        '    CLI->>DB: children of node',
        '    DB-->>CLI: more nodes',
        '  end',
        '  CLI->>LLM: question plus collected text',
        '  LLM-->>CLI: answer',
      ].join('\n'),
    },
    {
      heading: 'Key decisions',
      body: [
        'The model is reached through one client type with exactly two methods — summarize a section, answer a query — and both funnel into a single dispatch point. Below that point the transport differs by provider: OpenAI, Grok, and any custom endpoint go through async-openai over the chat completions shape, while Claude and Gemini are called directly over REST with reqwest because neither speaks that shape natively. Claude uses the Anthropic messages endpoint with a pinned API version header, Gemini the v1beta generateContent endpoint with the system prompt in its own field. Switching providers is a flag or an environment variable, not a rewrite.',
        'Ingestion picks its summarization model from the provider and exposes no override: gpt-4o for OpenAI, gemini-2.5-flash for Gemini, claude-3-haiku-20240307 for Claude. Querying does take a model flag, since that is the call whose quality the answer depends on, but its default is gpt-4o whatever the provider — Gemini coerces a non-Gemini model name back to its own default, Claude does not, so querying through Claude means naming the model explicitly.',
        'Storage is a single SQLite file through rusqlite, so there is no service to run and no index to keep in sync — the whole state of the system is one file you can copy. Retrieval itself is local reads against that file, which is what keeps lookups fast; the wall-clock cost of a question is dominated by the one model call at the end. The result is a single Rust binary that does reasoning-based retrieval with no embeddings, no vector store, and no re-indexing step.',
      ],
      diagram: [
        'flowchart TD',
        '  A[summarize section] --> C[dispatch]',
        '  B[answer query] --> C',
        '  C --> D{provider}',
        '  D --> E[Claude via REST]',
        '  D --> F[Gemini via REST]',
        '  D --> G[OpenAI compatible client]',
        '  G --> H[OpenAI gpt-4o]',
        '  G --> I[Grok]',
        '  G --> J[Custom base url]',
      ].join('\n'),
    },
  ],
  metrics: [
    { value: '5', label: 'interchangeable LLM providers' },
    { value: '0', label: 'embeddings computed' },
  ],
  stackFull: ['Rust', 'SQLite', 'rusqlite', 'Tokio', 'clap', 'async-openai', 'reqwest', 'pdf-extract', 'serde'],
}

export default detail
