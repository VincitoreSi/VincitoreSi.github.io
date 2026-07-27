export default function CovidDashboardPlate() {
  return (
    <svg viewBox="0 0 640 360" fill="none" stroke="currentColor" strokeWidth="1.1"
         role="img" aria-label="Data sources flowing through an ETL pipeline into a Plotly Dash dashboard showing a map of India with regional data, time-series curves, and state-wise bar charts.">
      {/* data sources — left */}
      <rect x="32" y="36" width="96" height="30" data-draw />
      <text x="80" y="55" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10.5" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">CSV / API</text>

      <rect x="32" y="80" width="96" height="30" data-draw />
      <text x="80" y="99" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10.5" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">PUBLIC DATA</text>

      {/* ETL pipeline — centre-left */}
      <path d="M128 66h16l8-8h12l8 8h16" data-draw />
      <rect x="192" y="46" width="100" height="40" rx="3" data-draw />
      <text x="242" y="70" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10.5" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">ETL PIPELINE</text>

      {/* Plotly Dash server — centre-right */}
      <path d="M292 66h16" data-draw />
      <rect x="316" y="46" width="120" height="40" rx="3" data-draw />
      <text x="376" y="70" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10.5" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">PLOTLY DASH</text>

      {/* arrow to dashboard */}
      <path d="M436 66h32" data-draw />

      {/* dashboard screen — right side */}
      <rect x="476" y="20" width="144" height="240" rx="3" data-draw-accent />
      <text x="548" y="44" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1">DASHBOARD</text>

      {/* map of India (simplified outline) */}
      <path d="M496 140q4-8 12-6 6-2 10 4 6 2 8 8t-2 12q-4 4-10 2-4 4-10 2-8 2-10-6-2-6 2-16z"
            data-draw />
      <text x="510" y="152" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="7" fontFamily="var(--font-mono), monospace" letterSpacing="0.6">INDIA</text>

      {/* time-series curve on dashboard */}
      <path d="M496 180l10-6 10 2 10-8 10 6 10-4 10 8 10-2 10 6"
            strokeWidth="1.5" data-draw />

      {/* bar chart on dashboard */}
      <rect x="496" y="196" width="8" height="20" data-draw />
      <rect x="506" y="188" width="8" height="28" data-draw />
      <rect x="516" y="192" width="8" height="24" data-draw />
      <rect x="526" y="200" width="8" height="16" data-draw />
      <rect x="536" y="186" width="8" height="30" data-draw />
      <rect x="546" y="194" width="8" height="22" data-draw />

      {/* annotation labels */}
      <path d="M40 300h180" strokeDasharray="3 4" data-draw />
      <text x="40" y="322" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">INTERACTIVE CHARTS</text>
      <text x="40" y="338" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">STATE-WISE DISTRIBUTIONS</text>
    </svg>
  )
}
