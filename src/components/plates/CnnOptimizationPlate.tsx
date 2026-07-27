export default function CnnOptimizationPlate() {
  return (
    <svg viewBox="0 0 640 360" fill="none" stroke="currentColor" strokeWidth="1.1"
         role="img" aria-label="Search space of architecture configurations on the left, optimization loop in the center, and evaluated candidates with the best architecture highlighted on the right.">
      {/* ---- SEARCH SPACE (left) ---- */}
      <text x="110" y="32" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="11" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">SEARCH SPACE</text>

      {/* grid: 3 cols × 3 rows of config cells */}
      {[0, 1, 2].map((col) =>
        [0, 1, 2].map((row) => (
          <rect key={`cell-${col}-${row}`}
                x={36 + col * 48} y={50 + row * 36}
                width={38} height={26} data-draw />
        ))
      )}

      {/* row labels */}
      <text x="28" y="68" textAnchor="end" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1">L1</text>
      <text x="28" y="104" textAnchor="end" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1">L2</text>
      <text x="28" y="140" textAnchor="end" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1">L3</text>

      {/* col headers */}
      <text x="55" y="46" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="8" fontFamily="var(--font-mono), monospace" letterSpacing="0.6">C</text>
      <text x="103" y="46" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="8" fontFamily="var(--font-mono), monospace" letterSpacing="0.6">F</text>
      <text x="151" y="46" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="8" fontFamily="var(--font-mono), monospace" letterSpacing="0.6">S</text>

      {/* annotation */}
      <text x="110" y="166" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1" opacity="0.7">grid of configs</text>

      {/* ---- OPTIMIZATION LOOP (center) ---- */}
      <circle cx="320" cy="180" r="78" data-draw-accent />

      {/* loop arrows — clockwise curved paths */}
      <path d="M284 102A108 108 0 0 1 374 110" data-draw-accent />
      <path d="M398 148A108 108 0 0 1 400 212" data-draw-accent />
      <path d="M372 258A108 108 0 0 1 280 260" data-draw-accent />
      <path d="M242 216A108 108 0 0 1 240 148" data-draw-accent />

      {/* loop labels */}
      <text x="320" y="102" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">EVALUATE</text>
      <text x="400" y="182" textAnchor="start" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">SELECT</text>
      <text x="320" y="268" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">MUTATE</text>
      <text x="228" y="182" textAnchor="end" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">INIT</text>

      {/* ---- EVALUATED CANDIDATES (right) ---- */}
      <text x="560" y="32" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="11" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">CANDIDATES</text>

      {[0, 1, 2].map((i) => (
        <rect key={`cand-${i}`}
              x={478} y={50 + i * 36}
              width={120} height={26} data-draw />
      ))}

      {/* best architecture highlighted */}
      <rect x="478" y={50 + 3 * 36} width={120} height="26" data-draw-accent />
      <text x="538" y={50 + 3 * 36 + 17} textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1">BEST ARCH</text>

      {/* connection arrow from loop to results */}
      <path d="M398 180h30" data-draw />
      <polygon points="432,176 432,184 440,180" fill="currentColor" stroke="none" />

      {/* connection arrow from search space to loop */}
      <path d="M182 180h22" data-draw />
      <polygon points="208,176 208,184 216,180" fill="currentColor" stroke="none" />

      {/* ---- ANNOTATIONS (bottom) ---- */}
      <path d="M110 186L110 328" strokeDasharray="3 4" data-draw />
      <text x="110" y="346" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1.1">SEARCH</text>
      <text x="110" y="358" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1.1">SPACE</text>

      <path d="M320 268L320 310" strokeDasharray="3 4" data-draw />
      <text x="320" y="328" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1.1">OPT LOOPS</text>

      <path d="M538 188L538 320" strokeDasharray="3 4" data-draw />
      <text x="538" y="338" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1.1">ARCH SEARCH</text>
    </svg>
  )
}
