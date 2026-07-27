/**
 * Style-coherence probe. The register probe answers "does one image look good"; this
 * answers the question that actually decides the redesign: can fifteen images be made
 * to look like one artist drew them?
 *
 * Each shortlisted register gets a fixed style preamble, and only the subject clause
 * changes between calls. If the style holds, the set is shippable; if it drifts, the
 * register is unusable at fifteen-project scale no matter how good a single frame is.
 *
 *   GEMINI_API_KEY=... node scripts/probe-coherence.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const KEY = process.env.GEMINI_API_KEY
if (!KEY) throw new Error('GEMINI_API_KEY is not set')

const MODEL = 'gemini-3-pro-image'
const OUT = '/private/tmp/claude-501/-Users-vincitoresi-personal-VincitoreSi-github-io/5261b26f-03af-4fe9-92f0-61bd882bb0eb/scratchpad/registers'

const PALETTE = `Strictly limited palette: warm off-white paper #FBFAF6, near-black warm
ink #17140F, and a single print vermilion accent #B93815 used sparingly on at most a
tenth of the image. No other hues.`

const NO_TEXT = `Absolutely no text, letters, numerals, labels, captions, signature,
watermark, or border frame.`

/** Fixed per register. Only the subject clause varies between calls. */
const STYLES = {
  engraving: `A 19th-century copperplate engraving, fine parallel burin hatching and
cross-hatching, crisp incised linework, tone built purely from line density, flat with
no perspective drama, in the manner of a scientific plate in a Victorian monograph.`,

  blueprint: `A technical draughtsman's ink drawing made with instruments: precise
uniform-weight construction lines, small circular node markers and tick marks, flat
elevation with no perspective, the dry exactness of an engineering drawing.`,

  axonometric: `An axonometric line drawing seen from above at an angle, uniform thin
line weight, no fill, no shadow, no vanishing point, true axonometric projection in the
manner of an architectural diagram.`,

  photogravure: `A coarse halftone photogravure as printed in a mid-century technical
journal: a visible 45-degree dot screen, tone built entirely from dot size, slight
plate wear and ink spread at the edges.`,
}

/** Three real projects with structurally different architectures. */
const SUBJECTS = {
  agents: `four autonomous agents arranged around a central coordinating hub, each
connected to the hub but never to each other, with one agent's link picked out in the
vermilion accent`,

  duplex: `a continuous horizontal stream of sound flowing left to right that is cut
across midway by a sharp vertical interruption, after which the stream resumes,
the interruption marked in the vermilion accent`,

  sensors: `an array of eight small sensing elements in a row, their outputs converging
through a funnel into a single classifying node, the converging bundle in black ink and
the final decision picked out in the vermilion accent`,
}

async function generate(file, prompt) {
  for (let attempt = 1; attempt <= 6; attempt++) {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: '4:3', imageSize: '2K' } },
        }),
      },
    )
    if (res.ok) {
      const json = await res.json()
      const part = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData)
      if (part) {
        await writeFile(file, Buffer.from(part.inlineData.data, 'base64'))
        return true
      }
    }
    await new Promise((r) => setTimeout(r, 1500 * attempt))
  }
  console.log(`  FAILED ${path.basename(file)}`)
  return false
}

await mkdir(OUT, { recursive: true })

const jobs = []
for (const [reg, style] of Object.entries(STYLES)) {
  for (const [subj, clause] of Object.entries(SUBJECTS)) {
    jobs.push({
      reg,
      subj,
      file: path.join(OUT, `coh-${reg}-${subj}.jpg`),
      prompt: `${style}\n\nSubject: ${clause}.\n\n${PALETTE} ${NO_TEXT}`,
    })
  }
}

console.log(`Generating ${jobs.length} coherence samples —`)
await Promise.all(jobs.map((j) => generate(j.file, j.prompt).then((ok) => console.log(`  ${ok ? 'ok  ' : 'fail'} ${j.reg}/${j.subj}`))))

// One row per register, one column per subject: style drift shows up as a row that
// fails to look like itself.
const CW = 440
const CH = 330
const regs = Object.keys(STYLES)
const subjs = Object.keys(SUBJECTS)
const tiles = []
for (const [r, reg] of regs.entries()) {
  for (const [c, subj] of subjs.entries()) {
    let tile
    try {
      tile = await sharp(path.join(OUT, `coh-${reg}-${subj}.jpg`)).resize(CW, CH, { fit: 'cover' }).toBuffer()
    } catch {
      tile = await sharp({ create: { width: CW, height: CH, channels: 3, background: '#555' } }).png().toBuffer()
    }
    tiles.push({ input: tile, left: c * (CW + 6), top: r * (CH + 6) })
  }
}
await sharp({
  create: { width: subjs.length * (CW + 6), height: regs.length * (CH + 6), channels: 3, background: '#B93815' },
})
  .composite(tiles)
  .png()
  .toFile(path.join(OUT, 'sheet-coherence.png'))
console.log(`\nrows top to bottom: ${regs.join(', ')}`)
console.log(`cols left to right: ${subjs.join(', ')}`)
