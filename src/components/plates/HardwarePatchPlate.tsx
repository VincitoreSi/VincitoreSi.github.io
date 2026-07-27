export default function HardwarePatchPlate() {
  return (
    <svg viewBox="0 0 640 360" fill="none" stroke="currentColor" strokeWidth="1.1"
         role="img" aria-label="Circuit logic design entering from the left meets ECO constraints from above, feeding a resource-aware patch generation algorithm in the center, which produces an optimized Verilog patch on the right. A resource-constraint meter limits the algorithm block.">
      {/* circuit / logic design input (left) */}
      <rect x="36" y="140" width="130" height="80" rx="3" data-draw />
      <text x="101" y="170" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10.5" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">CIRCUIT</text>
      <text x="101" y="186" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10.5" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">DESIGN</text>

      {/* ECO constraints input (top-right area) */}
      <rect x="340" y="32" width="140" height="60" rx="3" data-draw />
      <text x="410" y="56" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">ECO</text>
      <text x="410" y="72" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">CONSTRAINTS</text>

      {/* resource constraints meter (above algorithm) */}
      <rect x="214" y="42" width="106" height="20" rx="2" data-draw />
      <rect x="216" y="44" width="60" height="16" rx="1" fill="currentColor" fillOpacity="0.35" stroke="none" data-draw />
      <text x="267" y="56" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="8" fontFamily="var(--font-mono), monospace" letterSpacing="1">RESOURCE</text>

      {/* arrows from meter down to algorithm */}
      <path d="M267 62v28" data-draw />

      {/* arrow from circuit design to algorithm */}
      <path d="M166 180h44" data-draw />
      <path d="M200 174l6 6 -6 6" data-draw />

      {/* arrow from ECO constraints to algorithm */}
      <path d="M410 92v58" data-draw />
      <path d="M404 140l6 6 6-6" data-draw />

      {/* patch generation algorithm (center) — accent */}
      <rect x="210" y="130" width="180" height="100" rx="3" data-draw-accent />
      <text x="300" y="166" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="11" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">PATCH</text>
      <text x="300" y="182" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="11" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">GENERATION</text>
      <text x="300" y="198" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="11" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">ALGORITHM</text>

      {/* arrow from algorithm to optimized patch output */}
      <path d="M390 180h44" data-draw />
      <path d="M424 174l6 6 -6 6" data-draw />

      {/* optimized Verilog patch output (right) */}
      <rect x="430" y="140" width="136" height="80" rx="3" data-draw />
      <text x="498" y="168" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">VERILOG</text>
      <text x="498" y="184" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">PATCH</text>

      {/* annotation under meter */}
      <text x="267" y="104" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1">CONSTRAINED</text>

      {/* efficiency annotation at bottom */}
      <path d="M200 324h160" strokeDasharray="3 4" data-draw />
      <text x="280" y="346" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">~90% EFFICIENCY · SUB-SECOND</text>
    </svg>
  )
}
