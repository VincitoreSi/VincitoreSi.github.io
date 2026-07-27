export default function NtkPruningPlate() {
  return (
    <svg viewBox="0 0 640 360" fill="none" stroke="currentColor" strokeWidth="1.1"
         role="img" aria-label="Dense neural network on the left, NTK spectrum heatmap in the center with diagonal accent showing high-influence connections, and a pruned sparse network on the right with retained connections highlighted.">
      {/* ============= LEFT: DENSE NETWORK ============= */}
      {/* labels */}
      <text x="41" y="75" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">INPUT</text>
      <text x="111" y="75" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">OUTPUT</text>
      <text x="41" y="325" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10.5" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">DENSE</text>

      {/* connections — input to hidden */}
      <path d="M47 134 L76 104" data-draw />
      <path d="M47 134 L76 169" data-draw />
      <path d="M47 134 L76 234" data-draw />
      <path d="M47 199 L76 104" data-draw />
      <path d="M47 199 L76 169" data-draw />
      <path d="M47 199 L76 234" data-draw />
      {/* connections — hidden to output */}
      <path d="M76 104 L111 134" data-draw />
      <path d="M76 104 L111 199" data-draw />
      <path d="M76 169 L111 134" data-draw />
      <path d="M76 169 L111 199" data-draw />
      <path d="M76 234 L111 134" data-draw />
      <path d="M76 234 L111 199" data-draw />

      {/* input nodes */}
      <rect x="35" y="130" width="12" height="8" data-draw />
      <rect x="35" y="195" width="12" height="8" data-draw />
      {/* hidden nodes */}
      <rect x="70" y="100" width="12" height="8" data-draw />
      <rect x="70" y="165" width="12" height="8" data-draw />
      <rect x="70" y="230" width="12" height="8" data-draw />
      {/* output nodes */}
      <rect x="105" y="130" width="12" height="8" data-draw />
      <rect x="105" y="195" width="12" height="8" data-draw />

      {/* ============= CENTER: NTK SPECTRUM HEATMAP ============= */}
      <text x="233" y="75" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">NTK SPECTRUM</text>

      {/* 5×5 grid: start (185, 95), cell 14×14, stride 16 */}
      <text x="175" y="108" textAnchor="end" fill="currentColor" stroke="none"
            fontSize="7" fontFamily="var(--font-mono), monospace" letterSpacing="1">L</text>
      <text x="175" y="124" textAnchor="end" fill="currentColor" stroke="none"
            fontSize="7" fontFamily="var(--font-mono), monospace" letterSpacing="1">O</text>
      <text x="175" y="140" textAnchor="end" fill="currentColor" stroke="none"
            fontSize="7" fontFamily="var(--font-mono), monospace" letterSpacing="1">W</text>
      <text x="291" y="95" textAnchor="start" fill="currentColor" stroke="none"
            fontSize="7" fontFamily="var(--font-mono), monospace" letterSpacing="1">HIGH</text>

      {/* diagonal = high influence (accent) */}
      <rect x="185" y="95" width="14" height="14" data-draw-accent fill="currentColor" />
      <rect x="201" y="111" width="14" height="14" data-draw-accent fill="currentColor" />
      <rect x="217" y="127" width="14" height="14" data-draw-accent fill="currentColor" />
      <rect x="233" y="143" width="14" height="14" data-draw-accent fill="currentColor" />
      <rect x="249" y="159" width="14" height="14" data-draw-accent fill="currentColor" />

      {/* off-diagonal = low influence (crossed out) */}
      {/* row 0 */}
      <rect x="201" y="95" width="14" height="14" data-draw />
      <path d="M201 95 L215 109 M215 95 L201 109" data-draw />
      <rect x="217" y="95" width="14" height="14" data-draw />
      <path d="M217 95 L231 109 M231 95 L217 109" data-draw />
      <rect x="233" y="95" width="14" height="14" data-draw />
      <path d="M233 95 L247 109 M247 95 L233 109" data-draw />
      <rect x="249" y="95" width="14" height="14" data-draw />
      <path d="M249 95 L263 109 M263 95 L249 109" data-draw />
      {/* row 1 */}
      <rect x="185" y="111" width="14" height="14" data-draw />
      <path d="M185 111 L199 125 M199 111 L185 125" data-draw />
      <rect x="217" y="111" width="14" height="14" data-draw />
      <path d="M217 111 L231 125 M231 111 L217 125" data-draw />
      <rect x="233" y="111" width="14" height="14" data-draw />
      <path d="M233 111 L247 125 M247 111 L233 125" data-draw />
      <rect x="249" y="111" width="14" height="14" data-draw />
      <path d="M249 111 L263 125 M263 111 L249 125" data-draw />
      {/* row 2 */}
      <rect x="185" y="127" width="14" height="14" data-draw />
      <path d="M185 127 L199 141 M199 127 L185 141" data-draw />
      <rect x="201" y="127" width="14" height="14" data-draw />
      <path d="M201 127 L215 141 M215 127 L201 141" data-draw />
      <rect x="233" y="127" width="14" height="14" data-draw />
      <path d="M233 127 L247 141 M247 127 L233 141" data-draw />
      <rect x="249" y="127" width="14" height="14" data-draw />
      <path d="M249 127 L263 141 M263 127 L249 141" data-draw />
      {/* row 3 */}
      <rect x="185" y="143" width="14" height="14" data-draw />
      <path d="M185 143 L199 157 M199 143 L185 157" data-draw />
      <rect x="201" y="143" width="14" height="14" data-draw />
      <path d="M201 143 L215 157 M215 143 L201 157" data-draw />
      <rect x="217" y="143" width="14" height="14" data-draw />
      <path d="M217 143 L231 157 M231 143 L217 157" data-draw />
      <rect x="249" y="143" width="14" height="14" data-draw />
      <path d="M249 143 L263 157 M263 143 L249 157" data-draw />
      {/* row 4 */}
      <rect x="185" y="159" width="14" height="14" data-draw />
      <path d="M185 159 L199 173 M199 159 L185 173" data-draw />
      <rect x="201" y="159" width="14" height="14" data-draw />
      <path d="M201 159 L215 173 M215 159 L201 173" data-draw />
      <rect x="217" y="159" width="14" height="14" data-draw />
      <path d="M217 159 L231 173 M231 159 L217 173" data-draw />
      <rect x="233" y="159" width="14" height="14" data-draw />
      <path d="M233 159 L247 173 M247 159 L233 173" data-draw />

      {/* spectrum annotation */}
      <text x="233" y="188" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="7.5" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">X = LOW INFLUENCE</text>
      <text x="233" y="200" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="7.5" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">▣ = HIGH INFLUENCE</text>

      {/* ============= RIGHT: PRUNED SPARSE NETWORK ============= */}
      {/* labels */}
      <text x="346" y="75" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">INPUT</text>
      <text x="416" y="75" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">OUTPUT</text>
      <text x="346" y="325" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10.5" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">PRUNED</text>

      {/* retained connections (sparse subset) — offset +301 from left */}
      <path d="M342 134 L371 104" data-draw-accent />
      <path d="M342 134 L371 234" data-draw-accent />
      <path d="M342 199 L371 169" data-draw-accent />
      <path d="M371 104 L406 199" data-draw-accent />
      <path d="M371 169 L406 134" data-draw-accent />
      <path d="M371 169 L406 199" data-draw-accent />
      <path d="M371 234 L406 134" data-draw-accent />

      {/* input nodes */}
      <rect x="335" y="130" width="12" height="8" data-draw />
      <rect x="335" y="195" width="12" height="8" data-draw />
      {/* hidden nodes */}
      <rect x="370" y="100" width="12" height="8" data-draw />
      <rect x="370" y="165" width="12" height="8" data-draw />
      <rect x="370" y="230" width="12" height="8" data-draw />
      {/* output nodes */}
      <rect x="405" y="130" width="12" height="8" data-draw />
      <rect x="405" y="195" width="12" height="8" data-draw />

      {/* ============= ARROWS BETWEEN PANELS ============= */}
      {/* left → center */}
      <path d="M125 170 L160 170" data-draw />
      <path d="M157 167 L163 170 L157 173" fill="currentColor" stroke="none" data-draw />

      {/* center → right */}
      <path d="M275 170 L310 170" data-draw />
      <path d="M307 167 L313 170 L307 173" fill="currentColor" stroke="none" data-draw />

      {/* annotation arrows */}
      <text x="143" y="160" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="7.5" fontFamily="var(--font-mono), monospace" letterSpacing="1">NTK</text>
      <text x="143" y="172" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="7.5" fontFamily="var(--font-mono), monospace" letterSpacing="1">ANALYSIS</text>

      <text x="293" y="160" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="7.5" fontFamily="var(--font-mono), monospace" letterSpacing="1">PRUNE</text>
      <text x="293" y="172" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="7.5" fontFamily="var(--font-mono), monospace" letterSpacing="1">DECISION</text>
    </svg>
  )
}
