/**
 * Generates the two raster assets the site is allowed to carry:
 *   1. paper grain tiles (light + dark), applied at ~4% behind the page
 *   2. the OG-card paper substrate
 *
 * Everything here is texture. No lettering, no illustration, no figure —
 * the plates stay hand-authored SVG (spec §6.14). The model is used for
 * paper stock, which is the one thing a hand-drawn vector cannot be.
 *
 *   GEMINI_API_KEY=... node scripts/gen-imagery.mjs
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const KEY = process.env.GEMINI_API_KEY
if (!KEY) throw new Error('GEMINI_API_KEY is not set')

const MODEL = 'gemini-3-pro-image'
const ROOT = path.resolve(import.meta.dirname, '..')
const CACHE = path.join(ROOT, 'scripts', '.imagery-cache')
const PUBLIC = path.join(ROOT, 'public')

/** Ink and paper, straight from globals.css so the grain never fights the tokens. */
const INK_LIGHT = { r: 0x17, g: 0x14, b: 0x0f }
const INK_DARK = { r: 0xf2, g: 0xed, b: 0xe3 }
const PAPER_LIGHT = '#FBFAF6'

/** Must match the two --grain-opacity values in globals.css. */
const OPACITY_LIGHT = 0.32
const OPACITY_DARK = 0.34

/**
 * Plain texture prompts land close enough to stock-photo paper scans that the model
 * sometimes returns IMAGE_RECITATION with no image at all. Retrying with a reworded
 * variant clears it, so each asset carries a few phrasings rather than one.
 */
async function generate(name, prompts, aspectRatio, imageSize) {
  const cached = path.join(CACHE, `${name}.jpg`)
  if (existsSync(cached)) {
    console.log(`  ${name}: cached`)
    return readFile(cached)
  }
  const variants = Array.isArray(prompts) ? prompts : [prompts]
  // Recitation blocking is non-deterministic — the same prompt that fails now often
  // succeeds on a later call — so cycle the variants a few times rather than giving
  // up after one pass.
  const PASSES = 3
  const attempts = Array.from({ length: PASSES * variants.length }, (_, n) => variants[n % variants.length])
  let last = 'no attempts'
  for (const [i, prompt] of attempts.entries()) {
    if (i > 0) await new Promise((r) => setTimeout(r, 1500))
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseModalities: ['IMAGE'],
            imageConfig: { aspectRatio, imageSize },
          },
        }),
      },
    )
    if (!res.ok) {
      last = `HTTP ${res.status} ${(await res.text()).slice(0, 200)}`
      continue
    }
    const json = await res.json()
    const candidate = json.candidates?.[0]
    const part = candidate?.content?.parts?.find((p) => p.inlineData)
    if (!part) {
      last = `finishReason ${candidate?.finishReason ?? 'unknown'}`
      console.log(`  ${name}: attempt ${i + 1} rejected (${last}), retrying`)
      continue
    }
    const buf = Buffer.from(part.inlineData.data, 'base64')
    await writeFile(cached, buf)
    console.log(`  ${name}: generated on attempt ${i + 1} (${(buf.length / 1024).toFixed(0)} KB)`)
    return buf
  }
  throw new Error(`${name}: all ${attempts.length} attempts failed — last: ${last}`)
}

/**
 * Signed deviation from the field's own mean, in [-1, 1], as a seamlessly wrapping
 * `size` x `size` field.
 *
 * Mirroring one crop into four quadrants also tiles seamlessly and is far simpler, but
 * the fleck field carries large distinct specks and the mirror symmetry reads instantly
 * as a kaleidoscope. This instead crops `size + FEATHER` and cross-fades the overhang
 * back over the near edges, so opposite edges converge without any symmetry.
 */
const FEATHER = 96

async function deviation(buf, size) {
  // Crop at native resolution rather than downscaling the whole 2K frame. Downscaling
  // folds the grain down to ~1px where it aliases; a native crop keeps its true scale.
  // No normalise() either - it stretches contrast until paper reads as canvas.
  const span = size + FEATHER
  const meta = await sharp(buf).metadata()
  if (meta.width < span || meta.height < span) {
    throw new Error(`deviation: source ${meta.width}x${meta.height} smaller than ${span}`)
  }
  const { data, info } = await sharp(buf)
    .extract({
      left: Math.floor((meta.width - span) / 2),
      top: Math.floor((meta.height - span) / 2),
      width: span,
      height: span,
    })
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true })

  // sharp does not guarantee a 1-channel buffer just because the image is grayscale.
  // Reading an interleaved RGB buffer as single-channel walks three subpixels per
  // pixel and manufactures a period-3 vertical stripe - the "weave" that looked for
  // all the world like a bad generation.
  const stride = info.channels
  const at = (x, y) => data[(y * span + x) * stride]

  const out = new Float32Array(size * size)
  for (let y = 0; y < size; y++) {
    const u = y < FEATHER ? 0.5 * (1 - y / FEATHER) : 0
    for (let x = 0; x < size; x++) {
      const t = x < FEATHER ? 0.5 * (1 - x / FEATHER) : 0
      // The overhang samples only exist inside the feather band — x + size stays in
      // range only while x < FEATHER. Sampling them unconditionally reads past the end
      // of the row and yields undefined, and `undefined * 0` is NaN, not 0.
      const top = t > 0 ? at(x, y) * (1 - t) + at(x + size, y) * t : at(x, y)
      const bot = u > 0
        ? (t > 0 ? at(x, y + size) * (1 - t) + at(x + size, y + size) * t : at(x, y + size))
        : 0
      out[y * size + x] = u > 0 ? top * (1 - u) + bot * u : top
    }
  }

  // Deviation, not absolute luminance: luminance would bake the source sheet's own
  // base tone into the alpha and lay a flat wash of colour over the whole page.
  let mean = 0
  for (let i = 0; i < out.length; i++) mean += out[i]
  mean /= out.length
  for (let i = 0; i < out.length; i++) out[i] = (out[i] - mean) / 255
  return out
}

/**
 * Blends the two fields into one RGBA tile: flat ink colour, with all structure
 * carried in the alpha channel. A single-colour-plus-alpha tile composites correctly
 * over any background without `mix-blend-mode`, which varies across browsers and
 * would need a stacking-context fix to work under a themed page.
 */
async function grainTile(fields, size, colour, invert, gain) {
  const rgba = Buffer.alloc(size * size * 4)
  for (let i = 0; i < size * size; i++) {
    let dev = 0
    for (const { data, weight } of fields) dev += data[i] * weight
    // Light theme keeps specks darker than the mean; dark theme keeps lighter ones.
    const signed = invert ? dev : -dev
    const a = Math.max(0, Math.min(1, signed * gain))
    rgba[i * 4] = colour.r
    rgba[i * 4 + 1] = colour.g
    rgba[i * 4 + 2] = colour.b
    // Quantise alpha to 16 levels. Full 8-bit noise is near-incompressible and the
    // tile lands over 130 KB; at the opacity this ships at, the discarded levels are
    // far below one step of visible tone.
    rgba[i * 4 + 3] = Math.round((a * 255) / 16) * 16
  }
  return sharp(rgba, { raw: { width: size, height: size, channels: 4 } })
    .webp({ quality: 80, alphaQuality: 72, effort: 6 })
    .toBuffer()
}

/*
 * Prompting note. Asking for "paper texture" reliably returns a woven canvas or
 * watercolour stock — a strongly directional grid that aliases into vertical moiré
 * the moment it is tiled and scaled. Both prompts below therefore describe an
 * abstract isotropic field and name every regular structure as something to avoid.
 * The two fields do different jobs: `fleck` supplies the sparse inclusions that read
 * as paper, `tooth` supplies fine surface noise underneath them.
 */
const PROMPTS = {
  fleck: [
    `A flat abstract field of fine irregular granular speckle, like the surface of smooth
warm grey lime plaster photographed head on. Random non-repeating grain of mixed sizes, fully
isotropic, absolutely no lines, no stripes, no grid, no weave, no pattern, no direction. Even
flat lighting throughout, no shadow, no vignette, no gradient. Abstract texture only, nothing
depicted, no text, no border.`,
    `An even field of sparse dark mineral flecks scattered at random across a smooth flat mid
grey surface, irregular sizes, no clustering into shapes, no lines, no grid, no repetition.
Uniform lighting corner to corner. Purely abstract, nothing depicted, no lettering, no frame.`,
  ],

  tooth: [
    `A seamless abstract monochrome noise field resembling photographic film grain
on a blank negative. Completely isotropic random speckle with no directional structure
whatsoever: no lines, no stripes, no scanlines, no grid, no weave, no crosshatch, no repeating
pattern, no visible motif. Uniform mid-grey average brightness across the entire frame, flat
even exposure with no vignette and no gradient. Pure abstract grain, nothing depicted.`,
    `Fine random monochrome static, evenly distributed, isotropic, no lines and no pattern of
any kind, uniform mid grey overall, flat exposure. Abstract grain only, nothing depicted.`,
  ],

  substrate: [
    `A flat overhead scan of a blank warm off-white letterpress page from a technical
monograph, uncoated cream stock with visible paper fibre. A single very faint rectangular
platemark impression is debossed into the sheet, subtle, catching almost no light. Even diffuse
lighting, no shadow, no vignette, no gradient. Absolutely no text, no lettering, no writing,
no printed ink, no illustration, no figure, no border rule. Blank paper only.`,
    `A wide blank field of warm ivory uncoated printmaking paper, deckle-free, showing fine
cotton fibre and a barely perceptible debossed rectangular impression left by a printing plate.
Flat even light across the entire frame, no shadow, no vignette. Completely blank: no text,
no ink, no image, no rules, no marks.`,
    `Warm cream paper surface filling the frame, uncoated and fibrous, very slightly uneven
where a plate has pressed into it. Uniform diffuse lighting. Abstract blank material only —
no letters, no drawing, no border, no object.`,
  ],
}

/** Scales a tile's alpha channel uniformly, i.e. renders it at a given opacity. */
async function fade(tile, opacity) {
  return sharp(tile)
    .composite([{
      input: Buffer.from([255, 255, 255, Math.round(opacity * 255)]),
      raw: { width: 1, height: 1, channels: 4 },
      tile: true,
      blend: 'dest-in',
    }])
    .png()
    .toBuffer()
}

async function main() {
  await mkdir(CACHE, { recursive: true })
  await mkdir(path.join(PUBLIC, 'texture'), { recursive: true })
  await mkdir(path.join(PUBLIC, 'og'), { recursive: true })

  console.log('Nano Banana Pro —')
  const fleck = await generate('fleck', PROMPTS.fleck, '1:1', '2K')
  const tooth = await generate('tooth', PROMPTS.tooth, '1:1', '2K')
  const substrate = await generate('substrate', PROMPTS.substrate, '16:9', '2K')

  console.log('Deriving grain tiles —')
  const SIZE = 512
  // One stock, two impressions. The fields are shared between themes deliberately:
  // the paper is the same material either way, and only the polarity and the ink
  // change. Dark needs a lower gain — light specks on near-black read much hotter
  // than dark specks on cream at the same alpha.
  const fields = [
    { data: await deviation(fleck, SIZE), weight: 0.68 },
    { data: await deviation(tooth, SIZE), weight: 0.32 },
  ]
  const lightTile = await grainTile(fields, SIZE, INK_LIGHT, false, 3.4)
  const darkTile = await grainTile(fields, SIZE, INK_DARK, true, 2.4)
  await writeFile(path.join(PUBLIC, 'texture', 'grain-light.webp'), lightTile)
  await writeFile(path.join(PUBLIC, 'texture', 'grain-dark.webp'), darkTile)
  console.log(`  grain-light.webp ${(lightTile.length / 1024).toFixed(1)} KB`)
  console.log(`  grain-dark.webp  ${(darkTile.length / 1024).toFixed(1)} KB`)

  // The OG substrate is consumed by gen-og.mjs as a data URI, so it is kept out of
  // public/ — it never ships as its own request.
  //
  // Two things went wrong using the generated sheet directly. Its debossed platemark
  // survived at card size as two faint vertical lines, reading as stray rules against
  // a layout built from real ones; and its own tone pulled the card grey, away from
  // the site's warm cream. So the card is based on the --paper token exactly, with the
  // grain laid over at low strength for tooth. At card scale the grain has to be much
  // lighter than on the page — the same 0.5 that reads as paper behind body text reads
  // as dirt behind 76px display type.
  const flat = await sharp({
    create: { width: 1200, height: 630, channels: 3, background: PAPER_LIGHT },
  })
    .composite([{ input: await fade(lightTile, 0.12), tile: true, blend: 'over' }])
    .jpeg({ quality: 92 })
    .toBuffer()
  await writeFile(path.join(CACHE, 'substrate-1200x630.jpg'), flat)
  console.log(`  substrate-1200x630.jpg ${(flat.length / 1024).toFixed(0)} KB`)

  await assertIsotropic('grain-light.webp', lightTile)
  await assertIsotropic('grain-dark.webp', darkTile)
  await proof(lightTile, darkTile)
}

/**
 * Paper grain has no grain direction. If the tile's column means vary much more than
 * its row means (or vice versa) it carries a stripe, which tiles into visible moiré.
 * Cheap to measure, and it caught a real indexing bug that eyeballing did not.
 */
async function assertIsotropic(name, tile) {
  const { data, info } = await sharp(tile).raw().toBuffer({ resolveWithObject: true })
  const { width: w, height: h, channels: c } = info
  const col = new Float64Array(w)
  const row = new Float64Array(h)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const a = data[(y * w + x) * c + 3]
      col[x] += a / h
      row[y] += a / w
    }
  }
  const sd = (arr) => {
    const m = arr.reduce((s, v) => s + v, 0) / arr.length
    return Math.sqrt(arr.reduce((s, v) => s + (v - m) ** 2, 0) / arr.length)
  }
  const ratio = sd(col) / (sd(row) || 1e-6)
  const skew = Math.max(ratio, 1 / ratio)

  // Seam check: the step across the wrap boundary should be no worse than a typical
  // step between neighbouring columns. If it is, the tile shows a grid of hairlines.
  const meanAbsStep = (a, b) => {
    let s = 0
    for (let y = 0; y < h; y++) s += Math.abs(data[(y * w + a) * c + 3] - data[(y * w + b) * c + 3])
    return s / h
  }
  let interior = 0
  for (let x = 1; x < w - 1; x++) interior += meanAbsStep(x, x - 1)
  interior /= w - 2
  const seam = meanAbsStep(0, w - 1) / (interior || 1e-6)

  console.log(`  ${name} isotropy ${skew.toFixed(2)}, seam ${seam.toFixed(2)} (1.00 is perfect)`)
  if (skew > 1.6) throw new Error(`${name}: directional structure, skew ${skew.toFixed(2)} — will tile into moire`)
  if (seam > 1.8) throw new Error(`${name}: visible tile seam, ${seam.toFixed(2)}x the interior step`)
}

/**
 * Writes a side-by-side proof at the exact opacity the tiles ship at. Judging a
 * grain tile at full strength is how the first two attempts shipped a visible weave
 * — the only strength worth looking at is the one on the page.
 */
async function proof(lightTile, darkTile) {
  const W = 560
  const panel = async (bg, tile, opacity) => {
    const faded = await fade(tile, opacity)
    const tiles = []
    for (let y = 0; y < W; y += 512) for (let x = 0; x < W; x += 512) tiles.push({ input: faded, left: x, top: y })
    return sharp({ create: { width: W, height: W, channels: 3, background: bg } })
      .composite(tiles).png().toBuffer()
  }
  const l = await panel('#FBFAF6', lightTile, OPACITY_LIGHT)
  const d = await panel('#12110E', darkTile, OPACITY_DARK)
  await sharp({ create: { width: W * 2 + 8, height: W, channels: 3, background: '#B93815' } })
    .composite([{ input: l, left: 0, top: 0 }, { input: d, left: W + 8, top: 0 }])
    .png()
    .toFile(path.join(CACHE, 'proof.png'))
  console.log(`  proof.png written — inspect at shipping opacity`)
}

await main()
