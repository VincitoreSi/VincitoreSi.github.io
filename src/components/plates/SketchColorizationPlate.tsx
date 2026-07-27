export default function SketchColorizationPlate() {
  return (
    <svg viewBox="0 0 640 360" fill="none" stroke="currentColor" strokeWidth="1.1"
         role="img" aria-label="A hand-drawn sketch enters on the left, passes through a segmentation pipeline in the middle, then a color palette is applied and the colorized output appears on the right.">
      {/* left — incoming sketch */}
      <rect x="30" y="74" width="100" height="130" data-draw />
      <path d="M55 100C65 95 75 110 85 100C95 90 105 105 110 95" data-draw />
      <path d="M55 120C65 130 80 115 85 125C90 115 100 130 110 120" data-draw />
      <text x="80" y="236" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10.5" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">SKETCH IN</text>

      {/* arrow from left to pipeline */}
      <path d="M134 139h28" data-draw />
      <polygon points="162,134 170,139 162,144" data-draw fill="currentColor" stroke="none" />

      {/* middle — segmentation pipeline: edge detect, region grow, contour analyze */}
      <rect x="178" y="40" width="112" height="34" data-draw />
      <text x="234" y="62" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="0.8">EDGE DETECT</text>
      <path d="M234 74v12" data-draw />

      <rect x="178" y="86" width="112" height="34" data-draw />
      <text x="234" y="108" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="0.8">REGION GROW</text>
      <path d="M234 120v12" data-draw />

      <rect x="178" y="132" width="112" height="34" data-draw />
      <text x="234" y="154" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="0.8">CONTOUR ANALYZE</text>

      {/* pipeline bracket annotation */}
      <path d="M174 46h-10v126h10" data-draw />
      <text x="138" y="118" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="0.8"
            transform="rotate(-90 138 118)">CLASSICAL CV PIPELINE</text>

      {/* arrow from pipeline to palette */}
      <path d="M294 139h22" data-draw />
      <polygon points="316,134 324,139 316,144" data-draw fill="currentColor" stroke="none" />

      {/* color palette */}
      <rect x="330" y="94" width="52" height="52" data-draw />
      <circle cx="345" cy="109" r="7" fill="currentColor" stroke="none" opacity="0.25" />
      <circle cx="367" cy="109" r="7" fill="currentColor" stroke="none" opacity="0.5" />
      <circle cx="356" cy="131" r="7" fill="currentColor" stroke="none" opacity="0.75" />
      <text x="356" y="172" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="0.8">PALETTE</text>

      {/* arrow from palette to output */}
      <path d="M386 139h22" data-draw />
      <polygon points="408,134 416,139 408,144" data-draw fill="currentColor" stroke="none" />

      {/* right — colorized output (accent) */}
      <rect x="424" y="74" width="100" height="130" data-draw-accent />
      <path d="M449 100C459 95 469 110 479 100C489 90 499 105 504 95" stroke="currentColor" data-draw-accent />
      <path d="M449 120C459 130 474 115 479 125C484 115 494 130 504 120" stroke="currentColor" data-draw-accent />
      <text x="474" y="150" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="0.8">COLORIZED</text>
      <text x="474" y="164" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="0.8">OUTPUT</text>

      {/* annotation line */}
      <path d="M80 294h200" strokeDasharray="3 4" data-draw />
      <text x="80" y="316" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">NO DEEP LEARNING</text>
      <text x="80" y="334" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">TRADITIONAL CV ONLY</text>
    </svg>
  )
}
