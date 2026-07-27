export default function DbmsNormalizationPlate() {
  return (
    <svg viewBox="0 0 640 360" fill="none" stroke="currentColor" strokeWidth="1.1"
         role="img" aria-label="Pipeline diagram: raw unnormalized table enters from left, passes through 1NF, 2NF, 3NF, BCNF normalization stages with functional dependency annotations between each stage, producing normalized output tables on the right.">
      {/* Raw unnormalized table — left */}
      <rect x="18" y="60" width="60" height="48" data-draw />
      <rect x="18" y="60" width="60" height="14" data-draw />
      <line x1="45" y1="60" x2="45" y2="108" data-draw />
      <text x="24" y="71" fill="currentColor" stroke="none"
            fontSize="7" fontFamily="var(--font-mono), monospace">ID</text>
      <text x="52" y="71" fill="currentColor" stroke="none"
            fontSize="7" fontFamily="var(--font-mono), monospace">V</text>
      <text x="24" y="87" fill="currentColor" stroke="none"
            fontSize="7" fontFamily="var(--font-mono), monospace">1</text>
      <text x="52" y="87" fill="currentColor" stroke="none"
            fontSize="7" fontFamily="var(--font-mono), monospace">a</text>
      <text x="24" y="101" fill="currentColor" stroke="none"
            fontSize="7" fontFamily="var(--font-mono), monospace">1</text>
      <text x="52" y="101" fill="currentColor" stroke="none"
            fontSize="7" fontFamily="var(--font-mono), monospace">b</text>

      {/* arrow */}
      <path d="M78 84 h16 l-5 -3.5 M94 84 l-5 3.5" data-draw />

      {/* 1NF */}
      <rect x="98" y="62" width="48" height="24" data-draw />
      <text x="122" y="78" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1">1NF</text>

      {/* arrow */}
      <path d="M146 74 h14 l-4 -3 M160 74 l-4 3" data-draw />

      {/* 2NF */}
      <rect x="164" y="62" width="48" height="24" data-draw />
      <text x="188" y="78" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1">2NF</text>

      {/* arrow */}
      <path d="M212 74 h14 l-4 -3 M226 74 l-4 3" data-draw />

      {/* 3NF */}
      <rect x="230" y="62" width="48" height="24" data-draw />
      <text x="254" y="78" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1">3NF</text>

      {/* arrow */}
      <path d="M278 74 h14 l-4 -3 M292 74 l-4 3" data-draw />

      {/* BCNF — accent */}
      <rect x="296" y="62" width="48" height="24" data-draw-accent />
      <text x="320" y="78" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1">BCNF</text>

      {/* arrow */}
      <path d="M344 74 h14 l-4 -3 M358 74 l-4 3" data-draw />

      {/* Normalized output tables — right */}
      <rect x="364" y="55" width="52" height="20" data-draw />
      <text x="390" y="68" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="7" fontFamily="var(--font-mono), monospace">T₁</text>
      <rect x="364" y="79" width="52" height="20" data-draw />
      <text x="390" y="92" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="7" fontFamily="var(--font-mono), monospace">T₂</text>
      <rect x="364" y="103" width="52" height="20" data-draw />
      <text x="390" y="116" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="7" fontFamily="var(--font-mono), monospace">T₃</text>

      {/* FD annotations — dashed lines down to explanations */}
      <path d="M78 100 l-18 12" strokeDasharray="2 2" data-draw />
      <text x="50" y="122" fill="currentColor" stroke="none"
            fontSize="7" fontFamily="var(--font-mono), monospace"
            letterSpacing="0.6">RM REPEAT</text>
      <text x="50" y="133" fill="currentColor" stroke="none"
            fontSize="7" fontFamily="var(--font-mono), monospace"
            letterSpacing="0.6">GROUPS</text>

      <path d="M146 100 l-5 12" strokeDasharray="2 2" data-draw />
      <text x="128" y="122" fill="currentColor" stroke="none"
            fontSize="7" fontFamily="var(--font-mono), monospace"
            letterSpacing="0.6">RM PARTIAL</text>
      <text x="128" y="133" fill="currentColor" stroke="none"
            fontSize="7" fontFamily="var(--font-mono), monospace"
            letterSpacing="0.6">FDs</text>

      <path d="M212 100 l5 12" strokeDasharray="2 2" data-draw />
      <text x="204" y="122" fill="currentColor" stroke="none"
            fontSize="7" fontFamily="var(--font-mono), monospace"
            letterSpacing="0.6">RM TRANSITIVE</text>
      <text x="204" y="133" fill="currentColor" stroke="none"
            fontSize="7" fontFamily="var(--font-mono), monospace"
            letterSpacing="0.6">FDs</text>

      <path d="M278 100 l10 12" strokeDasharray="2 2" data-draw />
      <text x="275" y="122" fill="currentColor" stroke="none"
            fontSize="7" fontFamily="var(--font-mono), monospace"
            letterSpacing="0.6">RM NON-KEY</text>
      <text x="275" y="133" fill="currentColor" stroke="none"
            fontSize="7" fontFamily="var(--font-mono), monospace"
            letterSpacing="0.6">FDs</text>

      {/* Bottom annotation bar */}
      <path d="M18 240 h180" strokeDasharray="3 4" data-draw />
      <text x="18" y="260" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">DECOMPOSITION</text>
      <text x="18" y="277" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">VISUALIZED</text>
    </svg>
  )
}
