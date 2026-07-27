export default function FacialEmotionPlate() {
  return (
    <svg viewBox="0 0 640 360" fill="none" stroke="currentColor" strokeWidth="1.1"
         role="img" aria-label="Webcam feed with a face detection bounding box on the left, a ResNet-34 CNN architecture in the middle, and seven emotion labels with a confidence bar for the top prediction on the right.">
      {/* webcam frame */}
      <rect x="26" y="50" width="140" height="140" rx="3" data-draw />
      <circle cx="166" cy="66" r="4" fill="#ef4444" stroke="none" />
      <text x="34" y="208" fill="currentColor" stroke="none"
            fontSize="9" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">WEBCAM FEED</text>

      {/* face bounding box */}
      <rect x="60" y="76" width="72" height="90" rx="2" strokeDasharray="3 3" data-draw />

      {/* face icon inside box */}
      <circle cx="96" cy="104" r="10" data-draw />
      <path d="M82 130c0 8 28 8 28 0" data-draw />
      <circle cx="92" cy="102" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="100" cy="102" r="1.5" fill="currentColor" stroke="none" />

      {/* arrow from webcam to CNN */}
      <path d="M166 120h48" data-draw />
      <path d="M206 116l6 4-6 4" data-draw />

      {/* ResNet-34 CNN block — data-draw-accent */}
      <rect x="214" y="40" width="150" height="160" rx="3" data-draw-accent />
      <text x="289" y="64" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="12" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">ResNet-34</text>

      {/* input layer */}
      <rect x="234" y="78" width="110" height="20" rx="2" data-draw />
      <text x="289" y="92" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="8" fontFamily="var(--font-mono), monospace" letterSpacing="1">CONV 7×7</text>

      {/* residual block row 1 */}
      <rect x="234" y="108" width="110" height="14" rx="2" data-draw />
      <rect x="234" y="126" width="110" height="14" rx="2" data-draw />
      <rect x="234" y="144" width="110" height="14" rx="2" data-draw />

      {/* skip connection */}
      <path d="M230 115h-8v28h-4" strokeDasharray="2 2" data-draw />
      <path d="M244 108l-4-4 8-4" data-draw />

      {/* classifier head */}
      <rect x="234" y="168" width="110" height="20" rx="2" data-draw />
      <text x="289" y="182" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="8" fontFamily="var(--font-mono), monospace" letterSpacing="1">FC 7</text>

      {/* arrow from CNN to emotion labels */}
      <path d="M364 120h48" data-draw />
      <path d="M404 116l6 4-6 4" data-draw />

      {/* emotion labels */}
      <rect x="412" y="30" width="140" height="26" rx="2" data-draw />
      <text x="420" y="47" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">Anger</text>
      <rect x="476" y="36" width="68" height="14" rx="2" data-draw />
      <rect x="478" y="38" width="20" height="10" rx="1" fill="currentColor" stroke="none" opacity="0.3" />

      <rect x="412" y="62" width="140" height="26" rx="2" data-draw />
      <text x="420" y="79" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">Disgust</text>
      <rect x="476" y="68" width="68" height="14" rx="2" data-draw />
      <rect x="478" y="70" width="8" height="10" rx="1" fill="currentColor" stroke="none" opacity="0.15" />

      <rect x="412" y="94" width="140" height="26" rx="2" data-draw />
      <text x="420" y="111" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">Fear</text>
      <rect x="476" y="100" width="68" height="14" rx="2" data-draw />
      <rect x="478" y="102" width="12" height="10" rx="1" fill="currentColor" stroke="none" opacity="0.15" />

      <rect x="412" y="126" width="140" height="26" rx="2" data-draw />
      <text x="420" y="143" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">Happy</text>
      <rect x="476" y="132" width="68" height="14" rx="2" data-draw-accent />
      {/* top prediction: full confidence bar */}
      <rect x="478" y="134" width="64" height="10" rx="1" fill="currentColor" stroke="none" opacity="0.8" />

      <rect x="412" y="158" width="140" height="26" rx="2" data-draw />
      <text x="420" y="175" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">Sad</text>
      <rect x="476" y="164" width="68" height="14" rx="2" data-draw />
      <rect x="478" y="166" width="10" height="10" rx="1" fill="currentColor" stroke="none" opacity="0.12" />

      <rect x="412" y="190" width="140" height="26" rx="2" data-draw />
      <text x="420" y="207" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">Surprise</text>
      <rect x="476" y="196" width="68" height="14" rx="2" data-draw />
      <rect x="478" y="198" width="6" height="10" rx="1" fill="currentColor" stroke="none" opacity="0.08" />

      <rect x="412" y="222" width="140" height="26" rx="2" data-draw />
      <text x="420" y="239" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">Neutral</text>
      <rect x="476" y="228" width="68" height="14" rx="2" data-draw />
      <rect x="478" y="230" width="14" height="10" rx="1" fill="currentColor" stroke="none" opacity="0.2" />

      {/* annotation at bottom */}
      <path d="M26 280h400" strokeDasharray="3 4" data-draw />
      <text x="26" y="302" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">FER-2013 · 35,887 GRAYSCALE IMAGES</text>
      <text x="26" y="320" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">IMAGE SIZE 48×48</text>
    </svg>
  )
}
