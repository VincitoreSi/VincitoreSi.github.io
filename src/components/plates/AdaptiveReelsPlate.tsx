export default function AdaptiveReelsPlate() {
  return (
    <svg viewBox="0 0 640 360" fill="none" stroke="currentColor" strokeWidth="1.1"
         role="img" aria-label="Event-driven pipeline: topic and grade level flow into a generate stage, then an event queue feeding render workers with a queue-depth autoscaler, then distribute.">
      {/* TOPIC+GRADE input */}
      <rect x="34" y="50" width="130" height="48" data-draw />
      <text x="99" y="70" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">TOPIC</text>
      <text x="99" y="86" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">+ GRADE</text>

      {/* GENERATE */}
      <path d="M164 74h40" data-draw />
      <rect x="204" y="50" width="130" height="48" data-draw />
      <text x="269" y="70" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">GENERATE</text>
      <text x="269" y="86" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">(LLM + SCHEMA)</text>

      {/* EVENT QUEUE */}
      <path d="M334 74h40" data-draw />
      <rect x="374" y="50" width="130" height="48" data-draw-accent />
      <text x="439" y="70" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">EVENT QUEUE</text>
      <text x="439" y="86" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">(PUB / SUB)</text>

      {/* DISTRIBUTE */}
      <path d="M504 74h40" data-draw />
      <rect x="544" y="50" width="100" height="48" data-draw />
      <text x="594" y="74" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">DISTRIBUTE</text>

      {/* downward flow from queue to render workers */}
      <path d="M439 98v30" data-draw-accent />
      <path d="M349 128h180" data-draw />
      <path d="M389 128v30" data-draw />
      <path d="M439 128v30" data-draw />
      <path d="M489 128v30" data-draw />

      {/* RENDER WORKERS row */}
      <rect x="334" y="158" width="90" height="38" data-draw />
      <text x="379" y="181" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1">RENDER</text>
      <rect x="384" y="158" width="90" height="38" data-draw />
      <text x="429" y="181" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1">RENDER</text>
      <rect x="434" y="158" width="90" height="38" data-draw />
      <text x="479" y="181" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1">RENDER</text>

      {/* autoscaler box */}
      <rect x="140" y="158" width="120" height="38" data-draw-accent />
      <text x="200" y="175" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9.5" fontFamily="var(--font-mono), monospace" letterSpacing="1.1">QUEUE-DEPTH</text>
      <text x="200" y="189" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9.5" fontFamily="var(--font-mono), monospace" letterSpacing="1.1">AUTOSCALER</text>

      {/* autoscaler → queue: monitor link */}
      <path d="M260 177h74" strokeDasharray="3 3" data-draw />
      <text x="297" y="170" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="8" fontFamily="var(--font-mono), monospace" letterSpacing="0.8">monitor</text>

      {/* autoscaler → workers: scale signal */}
      <path d="M200 158v-8" data-draw />
      <path d="M200 150h50" data-draw />
      <path d="M250 150v-4" data-draw />
      <path d="M250 146v-6l40-40" strokeDasharray="3 3" data-draw />
      <text x="280" y="120" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="8" fontFamily="var(--font-mono), monospace" letterSpacing="0.8">scale</text>

      {/* RENDER → DISTRIBUTE link */}
      <path d="M524 177h20v-103h-4" data-draw />

      {/* COST MODEL annotation */}
      <path d="M40 118h120" strokeDasharray="3 4" data-draw />
      <text x="40" y="112" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1">COST MODEL</text>
      <text x="40" y="126" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1">(2 RENDER PATHS)</text>

      {/* render outputs */}
      <path d="M379 196v14" data-draw />
      <path d="M429 196v14" data-draw />
      <path d="M479 196v14" data-draw />

      {/* output bucket */}
      <rect x="340" y="210" width="180" height="24" data-draw />
      <text x="430" y="226" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1">RENDERED VIDEOS</text>

      {/* 3NF annotation */}
      <path d="M430 240v14" data-draw />
      <text x="200" y="268" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">SCHEMA → 3NF TABLES</text>
      <path d="M240 256h140" strokeDasharray="3 4" data-draw />
    </svg>
  )
}
