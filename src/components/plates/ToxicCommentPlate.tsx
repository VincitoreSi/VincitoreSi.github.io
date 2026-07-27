export default function ToxicCommentPlate() {
  return (
    <svg viewBox="0 0 640 360" fill="none" stroke="currentColor" strokeWidth="1.1"
         role="img" aria-label="Social media text entering on the left, splitting into three parallel NLP classifier pipelines (embedding layers through LSTM, CNN, and Transformer), then merging into a single toxicity score output on the right.">
      {/* input text box */}
      <rect x="32" y="150" width="120" height="60" data-draw />
      <text x="92" y="170" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">SOCIAL</text>
      <text x="92" y="185" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">MEDIA</text>
      <text x="92" y="200" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">TEXT</text>

      {/* branching paths from input to each classifier pipeline */}
      <path d="M152 180h24M176 180v-60M176 180v-10M176 180v70M176 180v130" data-draw />

      {/* pipeline 1 — LSTM (top) */}
      <rect x="200" y="68" width="88" height="24" data-draw />
      <text x="244" y="84" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">EMBEDDING</text>
      <path d="M288 80h16M304 80v16M304 96h-16M288 96v24" data-draw />
      <rect x="200" y="120" width="88" height="24" data-draw />
      <text x="244" y="136" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">LSTM</text>
      <path d="M288 132h16M304 132v56" data-draw />

      {/* pipeline 2 — CNN (middle, best performing → accent) */}
      <rect x="200" y="156" width="88" height="24" data-draw-accent />
      <text x="244" y="172" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">EMBEDDING</text>
      <path d="M288 168h16M304 168v16M304 184h-16M288 184v24" data-draw-accent />
      <rect x="200" y="208" width="88" height="24" data-draw-accent />
      <text x="244" y="224" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">CNN</text>
      <path d="M288 220h16M304 220v20" data-draw-accent />

      {/* pipeline 3 — Transformer (bottom) */}
      <rect x="200" y="254" width="88" height="24" data-draw />
      <text x="244" y="270" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">EMBEDDING</text>
      <path d="M288 266h16M304 266v16M304 282h-16M288 282v24" data-draw />
      <rect x="200" y="306" width="88" height="24" data-draw />
      <text x="244" y="322" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">TRANSFORMER</text>
      <path d="M288 318h16M304 318v-98" data-draw />

      {/* merging paths into output */}
      <path d="M304 188h24M304 220h24M304 240h24M328 188v52M328 240v-52" data-draw />
      <path d="M304 240h24" data-draw-accent />
      <path d="M328 220h24" data-draw-accent />
      <path d="M352 220v-16M352 220v16M352 220h24" data-draw />

      {/* toxicity score output */}
      <rect x="376" y="134" width="120" height="60" data-draw />
      <text x="436" y="156" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">TOXICITY</text>
      <text x="436" y="172" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">SCORE</text>

      {/* side-by-side comparison annotation */}
      <path d="M380 310h200" strokeDasharray="3 4" data-draw />
      <text x="380" y="330" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">SIDE-BY-SIDE COMPARISON</text>
    </svg>
  )
}
