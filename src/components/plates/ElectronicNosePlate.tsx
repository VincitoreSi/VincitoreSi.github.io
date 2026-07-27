export default function ElectronicNosePlate() {
  return (
    <svg viewBox="0 0 640 360" fill="none" stroke="currentColor" strokeWidth="1.1"
         role="img"
         aria-label="Gas sensor array on the left feeding a Raspberry Pi in the centre performing PCA, LDA, and t-SNE feature extraction, then splitting into two output paths — gas type classification and concentration prediction — flowing into a dashboard on the right.">
      {/* sensor array — left */}
      <rect x="20" y="104" width="130" height="152" rx="3" data-draw />
      <circle cx="46" cy="130" r="12" data-draw />
      <circle cx="84" cy="130" r="12" data-draw />
      <circle cx="122" cy="130" r="12" data-draw />
      <circle cx="46" cy="170" r="12" data-draw />
      <circle cx="84" cy="170" r="12" data-draw />
      <circle cx="122" cy="170" r="12" data-draw />
      <circle cx="46" cy="210" r="12" data-draw />
      <circle cx="84" cy="210" r="12" data-draw />
      <circle cx="122" cy="210" r="12" data-draw />
      <text x="85" y="280" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">SENSOR ARRAY</text>

      {/* arrow from sensor array to Pi */}
      <path d="M150 180h30" data-draw />
      <path d="M175 174l8 6-8 6" data-draw />

      {/* Raspberry Pi — centre */}
      <rect x="190" y="124" width="150" height="112" rx="3" data-draw />
      <rect x="196" y="130" width="138" height="24" rx="2" data-draw />
      <text x="265" y="146" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="11" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">RASPBERRY PI</text>
      <text x="265" y="174" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9.5" fontFamily="var(--font-mono), monospace" letterSpacing="1.1">PCA</text>
      <text x="265" y="192" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9.5" fontFamily="var(--font-mono), monospace" letterSpacing="1.1">LDA</text>
      <text x="265" y="210" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9.5" fontFamily="var(--font-mono), monospace" letterSpacing="1.1">t-SNE</text>

      {/* exit from Pi */}
      <path d="M340 180h24" data-draw />
      <path d="M360 174l8 6-8 6" data-draw />

      {/* split point */}
      <path d="M368 180v-44h44M368 180v44h44" data-draw-accent />

      {/* gas type branch — top */}
      <rect x="412" y="116" width="118" height="40" rx="3" data-draw />
      <text x="471" y="140" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="11" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">GAS TYPE</text>

      {/* concentration branch — bottom */}
      <rect x="412" y="204" width="118" height="40" rx="3" data-draw />
      <text x="471" y="228" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="11" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">CONCENTRATION</text>

      {/* arrows to dashboard */}
      <path d="M530 136h26M530 224h26" data-draw />
      <path d="M552 130l8 6-8 6M552 218l8 6-8 6" data-draw />

      {/* dashboard — right */}
      <rect x="560" y="98" width="65" height="164" rx="3" data-draw />
      <rect x="566" y="104" width="53" height="14" rx="2" data-draw />
      <text x="592" y="115" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="8" fontFamily="var(--font-mono), monospace" letterSpacing="1">LIVE</text>
      <rect x="568" y="124" width="49" height="28" rx="2" data-draw />
      <rect x="568" y="158" width="49" height="28" rx="2" data-draw />
      <rect x="568" y="192" width="49" height="28" rx="2" data-draw />
      <rect x="568" y="226" width="49" height="20" rx="2" data-draw />
      <text x="592" y="146" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="7" fontFamily="var(--font-mono), monospace" letterSpacing="0.8">GAS</text>
      <text x="592" y="156" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="7" fontFamily="var(--font-mono), monospace" letterSpacing="0.8">TYPE</text>
      <text x="592" y="180" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="7" fontFamily="var(--font-mono), monospace" letterSpacing="0.8">PPM</text>
      <text x="592" y="214" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="7" fontFamily="var(--font-mono), monospace" letterSpacing="0.8">TREND</text>

      {/* annotation */}
      <path d="M20 320h200" strokeDasharray="3 4" data-draw />
      <text x="20" y="340" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">EDGE DEPLOYMENT</text>
      <text x="20" y="356" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">THINGSPEAK INGESTION</text>
    </svg>
  )
}
