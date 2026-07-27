/**
 * Generates one atmospheric figure per project in the draughtsman register, and ships
 * each as a pair of themeable alpha masks rather than as a picture.
 *
 * Why masks. A full-colour render bakes its own paper and its own red into the pixels,
 * which fights the tokens in light theme and is simply wrong in dark theme. Splitting
 * the render into an ink channel and an accent channel and tinting those from
 * --ink/--accent means the paper comes from the page: palette drift becomes structurally
 * impossible and dark theme is free from the same asset.
 *
 * Why these prompts. The coherence probe established that literalism tracks the SUBJECT,
 * not the register: "four agents around a hub" returned clockwork and robot icons in
 * three registers out of four, while "four sources converging on a junction" stayed
 * abstract in all of them. Every prompt below therefore names a phenomenon and a
 * geometry, and never an actor. No agents, workers, classifiers, or bots appear.
 *
 *   GEMINI_API_KEY=... node scripts/gen-figures.mjs [slug ...]
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const KEY = process.env.GEMINI_API_KEY
if (!KEY) throw new Error('GEMINI_API_KEY is not set')

const MODEL = 'gemini-3-pro-image'
const ROOT = path.resolve(import.meta.dirname, '..')
const CACHE = path.join(ROOT, 'scripts', '.imagery-cache', 'figures')
const OUT = path.join(ROOT, 'public', 'figures')

/** Fixed across all fifteen. Only the composition clause changes. */
const STYLE = `A technical draughtsman's ink drawing made with instruments on warm paper.
Precise uniform-weight construction lines, small circular node markers at every junction,
fine tick marks, occasional faint dashed leader lines. Flat elevation: no perspective, no
shading, no gradient, no depth. The drawing sits in generous empty paper.`

const PALETTE = `Strictly limited palette: warm off-white paper #FBFAF6, near-black warm
ink #17140F, and a single print vermilion accent #B93815 on no more than a tenth of the
image. No other hues whatsoever.`

const NO_TEXT = `Absolutely no text, letters, numerals, labels, captions, signature,
watermark, or border frame.`

const COMPOSITIONS = {
  pageindex: `One rectangular block centred at the top. A line descends to a long
horizontal distribution bar; three blocks hang below it; from the centre block a second
bar branches into five smaller blocks. One continuous route runs from the top block
through the centre down to a single terminal block below and right of centre — that route
and its terminal block alone in vermilion.`,

  'the-cutting-room': `Four separate rectangular blocks placed at the four corners of the
frame, each joined by a single line to one central circular junction, and none of them
joined to each other. The lines meet the junction at right angles. One of the four links
is drawn in vermilion.`,

  echolearn: `A long continuous horizontal band of fine parallel wave lines running the
full width. Midway it is cut cleanly by a sharp vertical break, below which a short
detour loop descends, passes through three small inline stages, and rejoins the band.
The break and the detour loop alone in vermilion.`,

  'adaptive-reels': `A single small block at the left opening through a widening fan into
a sequenced row of eight evenly spaced rectangular frames at the right. Below the fan, a
short stack of vertical bars of differing heights indicates depth. The final frame and
the tallest bar in vermilion.`,

  'ntk-pruning': `A dense regular lattice of nodes joined by many fine lines. Roughly a
third of the lines are drawn as faint dashes instead of solid, scattered evenly through
the lattice. To the right, a narrow vertical column of horizontal tick marks of
descending length. The remaining solid lines through the lattice centre in vermilion.`,

  'table-structure-recognition': `A tall page rectangle occupying the centre. Within it,
one region is picked out by a finer inner rectangle, subdivided by a regular grid of
horizontal and vertical rules into rows and columns. Small corner registration marks sit
at each corner of the inner region. The inner region's outline in vermilion.`,

  'facial-emotion-recognition': `A square frame at the left containing a simple oval
outline with corner registration ticks. A line leads right into a narrowing funnel, which
opens into seven short horizontal bars of differing lengths stacked vertically. The
longest bar in vermilion.`,

  'electronic-nose': `A row of eight small identical circular elements across the top,
each dropping a fine line that converges into a single bundle at the centre. Below the
bundle the line splits into exactly two diverging paths, each terminating in a small
rectangular block. The right-hand path and its block in vermilion.`,

  'hardware-patch-generation': `A regular orthogonal lattice of fine lines filling the
frame, in the manner of a printed circuit routing diagram. One irregular closed region
within the lattice is redrawn at a heavier weight with slightly different routing inside
it, and small corner ticks mark its boundary. That region alone in vermilion.`,

  'dbms-normalization': `Four stages left to right. At the left one wide rectangular
block. It divides into two blocks, which divide into three, which divide into five, each
stage joined to the next by fine lines, each stage's blocks smaller than the last. The
final stage's blocks in vermilion.`,

  'toxic-comment-classification': `A single small block at the left from which four
parallel horizontal lines run right, each passing through its own small inline stage and
terminating in a horizontal bar of a different length. The bars are aligned at their left
edges for comparison. The longest bar in vermilion.`,

  'sketch-colorization': `A single irregular closed outline shape occupying the centre,
drawn in one continuous contour line. Its interior is subdivided by finer lines into
roughly nine distinct regions of irregular shape, each carrying a small circular marker
at its centre. Three of the region markers in vermilion.`,

  'cnn-optimization': `A regular grid of small circular nodes filling the frame, forming a
search field. One continuous stepped path descends through the grid from the upper left to
a single node at the lower centre, turning at right angles. Small tick marks along the
path indicate steps. The path and its terminal node in vermilion.`,

  'covid-dashboard': `Three streams of fine parallel lines entering from the left edge,
converging into a single horizontal rule, which then feeds a panel of four small framed
rectangles arranged two by two at the right. Inside each rectangle sits a simple line
trace of differing shape. One trace in vermilion.`,

  'process-scheduling-visualizer': `A horizontal time axis running the full width with
regular tick marks below it. Above the axis, four rows of short rectangular bars are
arranged so the bars interleave and never overlap in the same column, in the manner of a
schedule chart. One row's bars in vermilion.`,
}

async function generate(slug) {
  const cached = path.join(CACHE, `${slug}.jpg`)
  if (existsSync(cached)) {
    console.log(`  ${slug}: cached`)
    return readFile(cached)
  }
  const prompt = `${STYLE}\n\nComposition: ${COMPOSITIONS[slug]}\n\n${PALETTE} ${NO_TEXT}`
  for (let i = 1; i <= 6; i++) {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: '16:9', imageSize: '2K' } },
        }),
      },
    )
    if (res.ok) {
      const j = await res.json()
      const part = j.candidates?.[0]?.content?.parts?.find((p) => p.inlineData)
      if (part) {
        const buf = Buffer.from(part.inlineData.data, 'base64')
        await writeFile(cached, buf)
        console.log(`  ${slug}: generated on attempt ${i}`)
        return buf
      }
    }
    await new Promise((r) => setTimeout(r, 1500 * i))
  }
  throw new Error(`${slug}: generation failed after 6 attempts`)
}

/**
 * Splits a render into ink and accent masks. The mask travels in the ALPHA channel with
 * flat white RGB, so plain `mask-image` works without `mask-mode: luminance` — Safari
 * defaults to alpha masking and would otherwise need a separate code path.
 */
async function split(buf, slug) {
  const { data, info } = await sharp(buf).resize(1280).raw().toBuffer({ resolveWithObject: true })
  const n = info.width * info.height
  const ink = Buffer.alloc(n * 4)
  const acc = Buffer.alloc(n * 4)
  for (let i = 0; i < n; i++) {
    const r = data[i * info.channels]
    const g = data[i * info.channels + 1]
    const b = data[i * info.channels + 2]
    const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
    // Vermilion separates from ink by red sitting well clear of the other two channels.
    const red = (r - Math.max(g, b)) / 255
    const isAccent = red > 0.18 && lum > 0.15
    // Steep ramp with a high black point, not a proportional one. Two failures sit either
    // side of this: map linearly and the fine antialiased lines top out near 40% alpha so
    // the drawing paints grey instead of ink; drop the black point and the render's own
    // paper texture survives as a visible grey haze across the whole figure. Clipping
    // everything within 14% of paper white to nothing, then ramping hard, gives clean
    // paper and solid line.
    const darkness = Math.max(0, Math.min(1, (1 - lum - 0.14) / 0.30))
    for (const [target, on, value] of [
      [ink, !isAccent, darkness],
      [acc, isAccent, Math.min(1, red * 4.2)],
    ]) {
      target[i * 4] = 255
      target[i * 4 + 1] = 255
      target[i * 4 + 2] = 255
      target[i * 4 + 3] = on ? Math.round(value * 255) : 0
    }
  }
  // Crop both channels to the union of their inked area. The renders centre their subject
  // in a 16:9 frame with wide empty margins, and a wide-thin composition letterboxed into
  // a fixed 16:9 box left the drawing floating in a few hundred pixels of dead space.
  // Cropping to content lets the page box hug the art. Both channels must take the SAME
  // rectangle or the accent slips out of register with the ink.
  const A = 3
  let minX = info.width, minY = info.height, maxX = -1, maxY = -1
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 4 + A
      if (ink[i] > 8 || acc[i] > 8) {
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    }
  }
  if (maxX < 0) throw new Error(`${slug}: split produced an empty figure`)
  const pad = Math.round(info.width * 0.012)
  const left = Math.max(0, minX - pad)
  const top = Math.max(0, minY - pad)
  const right = Math.min(info.width - 1, maxX + pad)
  const bottom = Math.min(info.height - 1, maxY + pad)
  const box = { left, top, width: right - left + 1, height: bottom - top + 1 }

  const write = async (raw, suffix) => {
    const out = path.join(OUT, `${slug}-${suffix}.webp`)
    const b = await sharp(raw, { raw: { width: info.width, height: info.height, channels: 4 } })
      .extract(box)
      .webp({ quality: 78, alphaQuality: 82, effort: 6 })
      .toBuffer()
    await writeFile(out, b)
    return b.length / 1024
  }
  const kbInk = await write(ink, 'ink')
  const kbAcc = await write(acc, 'accent')
  console.log(`  ${slug}: ink ${kbInk.toFixed(0)} KB · accent ${kbAcc.toFixed(0)} KB · ${box.width}x${box.height}`)
  return { kb: kbInk + kbAcc, aspect: Number((box.width / box.height).toFixed(4)) }
}

const slugs = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(COMPOSITIONS)
await mkdir(CACHE, { recursive: true })
await mkdir(OUT, { recursive: true })

console.log(`Generating ${slugs.length} figures —`)
const renders = await Promise.all(slugs.map((s) => generate(s).then((b) => [s, b])))
console.log('Splitting into themeable masks —')
let total = 0
const aspects = {}
for (const [slug, buf] of renders) {
  const { kb, aspect } = await split(buf, slug)
  total += kb
  aspects[slug] = aspect
}

// Each figure is cropped to its own content, so its aspect ratio is only known here.
// Emitting it lets the layout reserve exactly the right box before the mask loads, which
// is what keeps the figures from causing layout shift.
if (slugs.length === Object.keys(COMPOSITIONS).length) {
  const body = Object.entries(aspects)
    .map(([slug, a]) => `  '${slug}': ${a},`)
    .join('\n')
  await writeFile(
    path.join(ROOT, 'src', 'data', 'figures.ts'),
    `// Generated by scripts/gen-figures.mjs — do not edit by hand.\n` +
      `// Width / height of each figure after cropping to its inked content.\n` +
      `export const FIGURE_ASPECT: Record<string, number> = {\n${body}\n}\n`,
  )
  console.log('  wrote src/data/figures.ts')
}
console.log(`\ntotal shipped ${(total / 1024).toFixed(2)} MB across ${slugs.length} figures`)
