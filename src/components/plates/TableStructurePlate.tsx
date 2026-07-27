export default function TableStructurePlate() {
  return (
    <svg viewBox="0 0 640 360" fill="none" stroke="currentColor" strokeWidth="1.1"
         role="img" aria-label="Document page with detected table regions and recognized row/column structure overlaid.">
      {/* document page — left side */}
      <rect x="20" y="20" width="220" height="310" rx="2" data-draw />

      {/* text lines on page */}
      <rect x="36" y="36" width="80" height="6" rx="1" data-draw />
      <rect x="36" y="50" width="140" height="6" rx="1" data-draw />
      <rect x="36" y="64" width="120" height="6" rx="1" data-draw />
      <rect x="36" y="78" width="180" height="6" rx="1" data-draw />
      <rect x="36" y="92" width="60" height="6" rx="1" data-draw />
      <rect x="36" y="106" width="160" height="6" rx="1" data-draw />

      {/* detected table region */}
      <rect x="40" y="120" width="180" height="100" rx="2" data-draw-accent />
      <text x="130" y="174" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">TABLE DETECTED</text>

      {/* more text below */}
      <rect x="36" y="232" width="100" height="6" rx="1" data-draw />
      <rect x="36" y="246" width="160" height="6" rx="1" data-draw />
      <rect x="36" y="260" width="130" height="6" rx="1" data-draw />
      <rect x="36" y="274" width="70" height="6" rx="1" data-draw />
      <rect x="36" y="288" width="140" height="6" rx="1" data-draw />
      <rect x="36" y="302" width="90" height="6" rx="1" data-draw />

      {/* arrow from document to grid */}
      <path d="M244 180 L280 180" data-draw />

      {/* parsed grid — right side */}
      <rect x="286" y="60" width="330" height="240" rx="2" data-draw />

      {/* grid header row */}
      <rect x="286" y="60" width="82" height="36" data-draw />
      <rect x="368" y="60" width="82" height="36" data-draw />
      <rect x="450" y="60" width="82" height="36" data-draw />
      <rect x="532" y="60" width="84" height="36" data-draw />

      {/* grid data rows */}
      <rect x="286" y="96" width="82" height="34" data-draw />
      <rect x="368" y="96" width="82" height="34" data-draw />
      <rect x="450" y="96" width="82" height="34" data-draw />
      <rect x="532" y="96" width="84" height="34" data-draw />

      <rect x="286" y="130" width="82" height="34" data-draw />
      <rect x="368" y="130" width="82" height="34" data-draw />
      <rect x="450" y="130" width="82" height="34" data-draw />
      <rect x="532" y="130" width="84" height="34" data-draw />

      <rect x="286" y="164" width="82" height="34" data-draw />
      <rect x="368" y="164" width="82" height="34" data-draw />
      <rect x="450" y="164" width="82" height="34" data-draw />
      <rect x="532" y="164" width="84" height="34" data-draw />

      <rect x="286" y="198" width="82" height="34" data-draw />
      <rect x="368" y="198" width="82" height="34" data-draw />
      <rect x="450" y="198" width="82" height="34" data-draw />
      <rect x="532" y="198" width="84" height="34" data-draw />

      <rect x="286" y="232" width="82" height="34" data-draw />
      <rect x="368" y="232" width="82" height="34" data-draw />
      <rect x="450" y="232" width="82" height="34" data-draw />
      <rect x="532" y="232" width="84" height="34" data-draw />

      <rect x="286" y="266" width="82" height="34" data-draw />
      <rect x="368" y="266" width="82" height="34" data-draw />
      <rect x="450" y="266" width="82" height="34" data-draw />
      <rect x="532" y="266" width="84" height="34" data-draw />

      {/* column header labels */}
      <text x="327" y="83" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.1">COL A</text>
      <text x="409" y="83" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.1">COL B</text>
      <text x="491" y="83" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.1">COL C</text>
      <text x="574" y="83" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.1">COL D</text>

      {/* cell content dots = data present */}
      <rect x="300" y="108" width="54" height="6" rx="1" data-draw />
      <rect x="382" y="108" width="54" height="6" rx="1" data-draw />
      <rect x="464" y="108" width="54" height="6" rx="1" data-draw />
      <rect x="546" y="108" width="54" height="6" rx="1" data-draw />

      <rect x="300" y="142" width="54" height="6" rx="1" data-draw />
      <rect x="382" y="142" width="54" height="6" rx="1" data-draw />
      <rect x="464" y="142" width="54" height="6" rx="1" data-draw />
      <rect x="546" y="142" width="54" height="6" rx="1" data-draw />

      <rect x="300" y="176" width="54" height="6" rx="1" data-draw />
      <rect x="382" y="176" width="54" height="6" rx="1" data-draw />
      <rect x="464" y="176" width="54" height="6" rx="1" data-draw />
      <rect x="546" y="176" width="54" height="6" rx="1" data-draw />

      {/* annotation */}
      <text x="286" y="326" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">DETECTION + STRUCTURE PARSING</text>
    </svg>
  )
}
