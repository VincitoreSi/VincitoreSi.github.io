/**
 * Visual-register probe. Generates the SAME subject in several distinct illustration
 * registers so they can be compared side by side, then assembles a contact sheet.
 *
 * The subject is deliberately one of the site's real projects (PageIndex — a
 * hierarchical index walked from root to answer), not a generic prompt, so the
 * comparison reflects what the site would actually ship.
 *
 *   GEMINI_API_KEY=... node scripts/probe-registers.mjs [--set]
 *
 * --set additionally runs a style-coherence test: several different project subjects
 * through the shortlisted registers, to see whether a fixed style preamble holds.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const KEY = process.env.GEMINI_API_KEY
if (!KEY) throw new Error('GEMINI_API_KEY is not set')

const MODEL = 'gemini-3-pro-image'
const OUT = '/private/tmp/claude-501/-Users-vincitoresi-personal-VincitoreSi-github-io/5261b26f-03af-4fe9-92f0-61bd882bb0eb/scratchpad/registers'

// The site's actual tokens. Every register is asked to hold these, so the contact
// sheet doubles as a palette-fidelity test.
const PALETTE = `Strictly limited palette: warm off-white paper #FBFAF6, near-black
warm ink #17140F, and a single print vermilion accent #B93815 used sparingly on no more
than a tenth of the image. No other hues. No blue, no purple, no teal, no green.`

const NO_TEXT = `Absolutely no text, no letters, no numerals, no labels, no captions,
no signature, no watermark, no border frame, no UI, no logos.`

/** One subject, many registers — the comparison this whole probe exists to make. */
const SUBJECT = `an abstract hierarchical branching index: a root node at the top
dividing into progressively finer branches, with exactly one continuous path from the
root down to a single leaf picked out in the vermilion accent while every other branch
stays in black ink`

const REGISTERS = {
  engraving: `A 19th-century copperplate engraving of ${SUBJECT}. Fine parallel burin
hatching and cross-hatching, crisp incised linework, the tonal language of a scientific
plate in a Victorian monograph. Flat, no perspective drama, no shading gradients — tone
built purely from line density. ${PALETTE} ${NO_TEXT}`,

  risograph: `A two-colour risograph print of ${SUBJECT}. Visible ink grain and paper
tooth, slight misregistration between the black layer and the vermilion layer, flat
spot colours with no blending, the coarse charm of duplicator printing. ${PALETTE}
${NO_TEXT}`,

  blueprint: `A technical draughtsman's drawing of ${SUBJECT}, drafted in ink on paper
with instruments. Precise uniform-weight construction lines, small tick marks and
node circles, the dry exactness of an engineering drawing. No isometric perspective —
flat elevation. ${PALETTE} ${NO_TEXT}`,

  inkwash: `A sumi-e ink wash painting of ${SUBJECT}. Loose confident brushwork, wet
bleed into the paper, dry-brush texture at the stroke ends, generous empty space, a
single vermilion seal-red accent stroke. Gestural rather than precise. ${PALETTE}
${NO_TEXT}`,

  axonometric: `An axonometric line drawing of ${SUBJECT}, rendered as a constructed
three-dimensional lattice seen from above at an angle. Uniform thin line weight, no
fill, no shadow, no vanishing point — true axonometric projection, in the manner of an
architectural diagram. ${PALETTE} ${NO_TEXT}`,

  photogravure: `A coarse halftone photogravure of ${SUBJECT}, as printed in a
mid-century technical journal. Visible dot screen at a 45-degree angle, tonal range
built entirely from dot size, slight plate wear and ink spread at the edges. ${PALETTE}
${NO_TEXT}`,
}

async function generate(name, prompt, aspectRatio = '4:3') {
  for (let attempt = 1; attempt <= 6; attempt++) {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio, imageSize: '2K' } },
        }),
      },
    )
    if (res.ok) {
      const json = await res.json()
      const candidate = json.candidates?.[0]
      const part = candidate?.content?.parts?.find((p) => p.inlineData)
      if (part) {
        const buf = Buffer.from(part.inlineData.data, 'base64')
        await writeFile(path.join(OUT, `${name}.jpg`), buf)
        console.log(`  ${name}: ok (${(buf.length / 1024).toFixed(0)} KB)`)
        return buf
      }
      console.log(`  ${name}: attempt ${attempt} — ${candidate?.finishReason ?? 'no image'}`)
    } else {
      console.log(`  ${name}: attempt ${attempt} — HTTP ${res.status}`)
    }
    await new Promise((r) => setTimeout(r, 1500 * attempt))
  }
  console.log(`  ${name}: FAILED`)
  return null
}

/** Reports how far the output strayed from the three permitted hues. */
async function paletteFidelity(buf) {
  const { data, info } = await sharp(buf).resize(160, 160, { fit: 'inside' }).raw().toBuffer({ resolveWithObject: true })
  const targets = [[0xfb, 0xfa, 0xf6], [0x17, 0x14, 0x0f], [0xb9, 0x38, 0x15]]
  let strayed = 0
  const px = info.width * info.height
  for (let i = 0; i < px; i++) {
    const r = data[i * info.channels]
    const g = data[i * info.channels + 1]
    const b = data[i * info.channels + 2]
    // Nearest permitted hue, allowing free movement along the black-to-white ramp.
    const grey = Math.abs(r - g) < 26 && Math.abs(g - b) < 26 && Math.abs(r - b) < 26
    const near = targets.some((t) => Math.hypot(r - t[0], g - t[1], b - t[2]) < 95)
    if (!grey && !near) strayed++
  }
  return ((strayed / px) * 100).toFixed(1)
}

async function contactSheet(names, file, cols = 3) {
  const CW = 520
  const CH = 390
  const tiles = []
  const report = []
  for (const [i, name] of names.entries()) {
    const src = path.join(OUT, `${name}.jpg`)
    let tile
    try {
      tile = await sharp(src).resize(CW, CH, { fit: 'cover' }).toBuffer()
      report.push(`${name}: ${await paletteFidelity(await sharp(src).toBuffer())}% off-palette`)
    } catch {
      tile = await sharp({ create: { width: CW, height: CH, channels: 3, background: '#555' } }).png().toBuffer()
      report.push(`${name}: MISSING`)
    }
    tiles.push({ input: tile, left: (i % cols) * (CW + 6), top: Math.floor(i / cols) * (CH + 6) })
  }
  const rows = Math.ceil(names.length / cols)
  await sharp({
    create: { width: cols * (CW + 6), height: rows * (CH + 6), channels: 3, background: '#B93815' },
  })
    .composite(tiles)
    .png()
    .toFile(file)
  console.log(`\n${file}`)
  for (const line of report) console.log(`  ${line}`)
}

await mkdir(OUT, { recursive: true })
const names = Object.keys(REGISTERS)
console.log(`Generating ${names.length} registers concurrently —`)
await Promise.all(names.map((n) => generate(n, REGISTERS[n])))
await contactSheet(names, path.join(OUT, 'sheet-registers.png'))
