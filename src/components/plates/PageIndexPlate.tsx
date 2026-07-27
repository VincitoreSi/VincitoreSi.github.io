export default function PageIndexPlate() {
  return (
    <svg viewBox="0 0 640 360" fill="none" stroke="currentColor" strokeWidth="1.1"
         role="img" aria-label="A document tree with one traversal path highlighted from root to the answer span.">
      {/* root */}
      <rect x="264" y="26" width="112" height="34" data-draw />
      <text x="320" y="48" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="11" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">DOC ToC</text>

      {/* level 1 */}
      <path d="M320 60v28M120 88h400M120 88v26M520 88v26M320 88v26" data-draw />
      <rect x="64" y="114" width="112" height="30" data-draw />
      <rect x="264" y="114" width="112" height="30" data-draw />
      <rect x="464" y="114" width="112" height="30" data-draw />

      {/* level 2 */}
      <path d="M120 144v24M72 168h96M72 168v22M168 168v22" data-draw />
      <path d="M320 144v24M272 168h144M272 168v22M416 168v22" data-draw-accent />
      <path d="M520 144v24M480 168h120M480 168v22M600 168v22" data-draw />

      <rect x="36" y="190" width="72" height="26" data-draw />
      <rect x="132" y="190" width="72" height="26" data-draw />
      <rect x="236" y="190" width="72" height="26" data-draw />
      <rect x="380" y="190" width="72" height="26" data-draw-accent />
      <rect x="564" y="190" width="72" height="26" data-draw />

      {/* traversal descent to the selected leaf */}
      <path d="M416 216v40" data-draw-accent />
      <rect x="356" y="256" width="120" height="38" data-draw-accent />
      <text x="416" y="280" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10.5" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">ANSWER SPAN</text>

      {/* annotation */}
      <path d="M40 300h180" strokeDasharray="3 4" data-draw />
      <text x="40" y="322" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">NO EMBEDDINGS</text>
      <text x="40" y="338" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">LLM-GUIDED DESCENT</text>
    </svg>
  )
}
