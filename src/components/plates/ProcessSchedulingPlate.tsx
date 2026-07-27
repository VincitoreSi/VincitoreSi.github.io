export default function ProcessSchedulingPlate() {
  return (
    <svg viewBox="0 0 640 360" fill="none" stroke="currentColor" strokeWidth="1.1"
         role="img" aria-label="A workload of processes enters on the left, passes through a scheduling algorithm in the center, and produces a Gantt chart on the right showing each process execution interval with alternating colours.">
      {/* === LEFT — incoming processes === */}
      {/* process cards entering from the left */}
      <text x="28" y="28" fill="currentColor" stroke="none"
            fontSize="10.5" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">INCOMING</text>
      <path d="M28 34v18" data-draw />

      {/* P1 */}
      <rect x="28" y="52" width="88" height="34" data-draw />
      <text x="72" y="66" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10.5" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">P1</text>
      <text x="72" y="78" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="8.5" fontFamily="var(--font-mono), monospace" letterSpacing="0.8">AT 0  BT 6</text>

      {/* P2 */}
      <rect x="28" y="92" width="88" height="34" data-draw />
      <text x="72" y="106" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10.5" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">P2</text>
      <text x="72" y="118" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="8.5" fontFamily="var(--font-mono), monospace" letterSpacing="0.8">AT 2  BT 4</text>

      {/* P3 */}
      <rect x="28" y="132" width="88" height="34" data-draw />
      <text x="72" y="146" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10.5" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">P3</text>
      <text x="72" y="158" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="8.5" fontFamily="var(--font-mono), monospace" letterSpacing="0.8">AT 4  BT 3</text>

      {/* flow arrow into algorithm */}
      <path d="M116 100h22" data-draw />
      <path d="M134 94l6 6-6 6" data-draw />

      {/* === CENTER — scheduling algorithm === */}
      <rect x="138" y="60" width="120" height="94" data-draw />
      <text x="198" y="100" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="12" fontFamily="var(--font-mono), monospace" letterSpacing="1.6">SCHEDULER</text>
      <path d="M152 120h92" strokeDasharray="2 3" data-draw />
      <text x="198" y="136" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1">FCFS · SJF · RR · PRI</text>

      {/* flow arrow out of algorithm */}
      <path d="M258 107h20" data-draw />
      <path d="M274 101l6 6-6 6" data-draw />

      {/* === RIGHT — Gantt chart === */}
      <text x="296" y="28" fill="currentColor" stroke="none"
            fontSize="10.5" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">GANTT CHART</text>
      <path d="M296 34v18" data-draw />

      {/* Gantt chart background */}
      <rect x="296" y="52" width="316" height="148" data-draw />

      {/* time labels */}
      <text x="296" y="208" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="8.5" fontFamily="var(--font-mono), monospace" letterSpacing="0.6">0</text>
      <text x="359" y="208" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="8.5" fontFamily="var(--font-mono), monospace" letterSpacing="0.6">2</text>
      <text x="422" y="208" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="8.5" fontFamily="var(--font-mono), monospace" letterSpacing="0.6">4</text>
      <text x="485" y="208" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="8.5" fontFamily="var(--font-mono), monospace" letterSpacing="0.6">6</text>
      <text x="548" y="208" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="8.5" fontFamily="var(--font-mono), monospace" letterSpacing="0.6">8</text>
      <text x="596" y="208" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="8.5" fontFamily="var(--font-mono), monospace" letterSpacing="0.6">10</text>

      {/* time grid lines */}
      <path d="M359 52v148M422 52v148M485 52v148M548 52v148" strokeDasharray="1 4" data-draw />

      {/* Gantt bars — each process row */}
      {/* P1 row (y=60): burst 0-6 */}
      <rect x="296" y="60" width="189" height="28" data-draw-accent />
      <text x="390" y="78" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1">P1</text>

      {/* P2 row (y=94): arrival at 2, burst 2-6 */}
      <rect x="296" y="94" width="63" height="28" fill="currentColor" fillOpacity="0" data-draw />
      <rect x="359" y="94" width="126" height="28" fill="currentColor" fillOpacity="0.08" data-draw />
      <text x="422" y="112" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1">P2</text>

      {/* P3 row (y=128): arrival at 4, burst 4-7 */}
      <rect x="296" y="128" width="126" height="28" fill="currentColor" fillOpacity="0" data-draw />
      <rect x="422" y="128" width="126" height="28" fill="currentColor" fillOpacity="0.08" data-draw />
      <text x="485" y="146" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1">P3</text>

      {/* row labels */}
      <text x="286" y="78" textAnchor="end" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="0.8">P1</text>
      <text x="286" y="112" textAnchor="end" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="0.8">P2</text>
      <text x="286" y="146" textAnchor="end" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="0.8">P3</text>

      {/* annotation — currently executing */}
      <path d="M485 60v-18" data-draw-accent />
      <text x="485" y="36" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="0.8"
            data-draw-accent>CURRENT</text>
    </svg>
  )
}
