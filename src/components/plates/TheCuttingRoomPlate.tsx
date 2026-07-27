export default function TheCuttingRoomPlate() {
  return (
    <svg viewBox="0 0 640 360" fill="none" stroke="currentColor" strokeWidth="1.1"
         role="img" aria-label="Four agent boxes—Blueprint, Score, Render, Review—arranged in a diamond around a central Hub. Solid arrows from Hub to each agent represent orchestration, dashed arrows back represent results. A clockwise flow Blueprint→Score→Render→Review forms the pipeline around the outside.">
      <defs>
        <marker id="tcr-arr" viewBox="0 0 8 8" refX="8" refY="4"
                markerWidth="5" markerHeight="5" orient="auto" markerUnits="strokeWidth">
          <path d="M0 0L8 4L0 8Z" fill="currentColor" stroke="none"/>
        </marker>
        <marker id="tcr-arr-dashed" viewBox="0 0 8 8" refX="8" refY="4"
                markerWidth="5" markerHeight="5" orient="auto" markerUnits="strokeWidth">
          <path d="M0 0L8 4L0 8Z" fill="currentColor" stroke="none"/>
        </marker>
      </defs>

      {/* ---- Pipeline flow: BLUEPRINT → SCORE → RENDER → REVIEW (outer cycle) ---- */}
      {/* Blueprint → Score */}
      <path d="M178 55 L458 55" data-draw markerEnd="url(#tcr-arr)"/>
      {/* Score → Render */}
      <path d="M518 73 L518 268" data-draw markerEnd="url(#tcr-arr)"/>
      {/* Render → Review */}
      <path d="M462 288 L182 288" data-draw markerEnd="url(#tcr-arr)"/>
      {/* Review → Blueprint — scoring feedback loop (accent) */}
      <path d="M122 268 L122 73" data-draw-accent markerEnd="url(#tcr-arr)"/>

      {/* ---- Orchestration arrows: Hub → Agent ---- */}
      <path d="M298 152 L178 55" data-draw markerEnd="url(#tcr-arr)"/>
      <path d="M342 152 L458 55" data-draw markerEnd="url(#tcr-arr)"/>
      <path d="M342 188 L458 268" data-draw markerEnd="url(#tcr-arr)"/>
      <path d="M298 188 L178 268" data-draw markerEnd="url(#tcr-arr)"/>

      {/* ---- Result arrows: Agent → Hub (dashed) ---- */}
      <path d="M122 73 L298 152" strokeDasharray="4 4" data-draw markerEnd="url(#tcr-arr-dashed)"/>
      <path d="M518 73 L342 152" strokeDasharray="4 4" data-draw markerEnd="url(#tcr-arr-dashed)"/>
      <path d="M518 268 L342 188" strokeDasharray="4 4" data-draw markerEnd="url(#tcr-arr-dashed)"/>
      <path d="M122 268 L298 188" strokeDasharray="4 4" data-draw markerEnd="url(#tcr-arr-dashed)"/>

      {/* ---- Hub ---- */}
      <rect x="276" y="152" width="88" height="36" data-draw />
      <text x="320" y="175" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="13" fontFamily="var(--font-mono), monospace" letterSpacing="1.6">HUB</text>

      {/* ---- Blueprint ---- */}
      <rect x="56" y="37" width="122" height="36" data-draw />
      <text x="117" y="60" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">BLUEPRINT</text>

      {/* ---- Score ---- */}
      <rect x="462" y="37" width="122" height="36" data-draw />
      <text x="523" y="60" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">SCORE</text>

      {/* ---- Render ---- */}
      <rect x="462" y="270" width="122" height="36" data-draw />
      <text x="523" y="293" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">RENDER</text>

      {/* ---- Review ---- */}
      <rect x="56" y="270" width="122" height="36" data-draw />
      <text x="117" y="293" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">REVIEW</text>

      {/* ---- Flow direction labels ---- */}
      <text x="318" y="49" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="8.5" fontFamily="var(--font-mono), monospace" letterSpacing="1.2"
            opacity="0.65">ORCHESTRATE</text>
      <text x="318" y="312" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="8.5" fontFamily="var(--font-mono), monospace" letterSpacing="1.2"
            opacity="0.65">RESULTS</text>

      {/* ---- Annotation: no shared filesystem ---- */}
      <path d="M484 310h100" strokeDasharray="3 4" data-draw />
      <text x="484" y="328" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">NO SHARED</text>
      <text x="484" y="344" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">FILESYSTEM</text>
    </svg>
  )
}
