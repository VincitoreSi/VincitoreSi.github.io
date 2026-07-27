export default function EchoLearnPlate() {
  return (
    <svg viewBox="0 0 640 360" fill="none" stroke="currentColor" strokeWidth="1.1"
         role="img" aria-label="RAG retrieval pattern: student icon with audio in, interrupt arrow to a four-box pipeline INGEST, INDEX, RETRIEVE, RERANK, and a stream arrow back.">
      {/* title */}
      <text x="320" y="28" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="11" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">RAG RETRIEVAL PATTERN</text>

      {/* ————— pipeline ————— */}

      {/* INGEST */}
      <rect x="140" y="50" width="78" height="36" data-draw />
      <text x="179" y="72" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="11" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">INGEST</text>

      {/* INDEX */}
      <rect x="255" y="50" width="78" height="36" data-draw />
      <text x="294" y="72" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="11" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">INDEX</text>

      {/* RETRIEVE */}
      <rect x="370" y="50" width="78" height="36" data-draw />
      <text x="409" y="72" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="11" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">RETRIEVE</text>

      {/* RERANK */}
      <rect x="485" y="50" width="78" height="36" data-draw-accent />
      <text x="524" y="72" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="11" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">RERANK</text>

      {/* arrows between boxes */}
      <path d="M218 68h32M245 63l5 5-5 5" data-draw />
      <path d="M333 68h32M360 63l5 5-5 5" data-draw />
      <path d="M448 68h32M475 63l5 5-5 5" data-draw />

      {/* annotation under each box */}
      <text x="179" y="108" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">SEMANTIC CHUNKING</text>
      <text x="294" y="108" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">HYBRID BM25 + DENSE</text>
      <text x="409" y="108" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">TENANT ISOLATION</text>
      <text x="524" y="108" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">CROSS-ENCODER</text>

      {/* ————— student icon ————— */}
      <circle cx="60" cy="200" r="20" data-draw />
      <path d="M36,220 Q60,233 84,220" data-draw />
      <path d="M36,220 L28,258 L92,258 L84,220" data-draw />
      <text x="60" y="282" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="11" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">STUDENT</text>

      {/* ————— audio in waves ————— */}
      <line x1="20" y1="190" x2="33" y2="190" data-draw />
      <line x1="15" y1="200" x2="33" y2="200" data-draw />
      <line x1="20" y1="210" x2="33" y2="210" data-draw />
      <text x="16" y="228" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">AUDIO</text>
      <text x="16" y="240" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">IN</text>

      {/* ————— interrupt arrow (accent) ————— */}
      <path d="M80,200 Q200,170 409,86" data-draw-accent />
      <path d="M401,95 L409,86 L403,81" data-draw-accent />
      <text x="250" y="162" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">INTERRUPT</text>

      {/* ————— stream return ————— */}
      <path d="M524,86 L524,252 L83,252" data-draw />
      <path d="M91,248 L83,252 L91,256" data-draw />
      <text x="303" y="270" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">STREAM</text>

      {/* ————— barge-in annotation ————— */}
      <text x="303" y="286" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">BARGE-IN &lt;200 MS</text>
    </svg>
  )
}
