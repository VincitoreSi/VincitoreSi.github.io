/**
 * Composites the Open Graph cards into public/og/.
 *
 * The typography is set here rather than drawn by the image model on purpose. Nano
 * Banana cannot reproduce Fraunces, and slightly-wrong letterforms are the fastest
 * way to make a card read as machine-made — which is the one thing the design spec
 * rules out. So the model supplies the paper and nothing else, and every glyph comes
 * from the same three faces the site itself is set in.
 *
 *   node scripts/gen-og.mjs        (run gen-imagery.mjs first — it makes the substrate)
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { ImageResponse } from 'next/og.js'
import sharp from 'sharp'

const ROOT = path.resolve(import.meta.dirname, '..')
const CACHE = path.join(ROOT, 'scripts', '.imagery-cache')
const OUT = path.join(ROOT, 'public', 'og')

// 1.91:1, the ratio Facebook, LinkedIn, X, Slack and Discord all render without
// re-cropping. Everything that matters stays inside a centred 1080x565 safe area,
// and nothing important goes in the bottom 80px where clients overlay their own UI.
const W = 1200
const H = 630
const PAD_X = 72
const PAD_TOP = 56
const PAD_BOTTOM = 84

const INK = '#17140F'
const MUTED = '#6B6459'
const ACCENT = '#B93815'
const RULE = '#D8D2C6'
const PAPER = '#FBFAF6'

const FONT_URLS = {
  fraunces:
    'https://fonts.gstatic.com/s/fraunces/v38/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIcaRyjDg.ttf',
  mono: 'https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8-qxjPQ.ttf',
  // Roman, not the italic instance — Google's css2 response lists both and the italic
  // sorts first, which silently set every card's prose in italic.
  newsreader:
    'https://fonts.gstatic.com/s/newsreader/v26/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438weI_ADA.ttf',
}

async function font(name) {
  const file = path.join(CACHE, `${name}.ttf`)
  if (existsSync(file)) return readFile(file)
  const res = await fetch(FONT_URLS[name])
  if (!res.ok) throw new Error(`font ${name}: HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(file, buf)
  return buf
}

/** Trims to a word boundary so a long tagline never overruns its two lines. */
function clamp(text, max) {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

const label = (extra = {}) => ({
  fontFamily: 'JetBrains Mono',
  fontSize: 19,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: MUTED,
  ...extra,
})

const hairline = { display: 'flex', height: 1, background: RULE }

/** A row of children needs an explicit flex direction — Satori has no default. */
const row = (extra = {}) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  ...extra,
})

function frame(substrate, children) {
  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: W,
        height: H,
        backgroundColor: PAPER,
        backgroundImage: `url(${substrate})`,
        backgroundSize: `${W}px ${H}px`,
        color: INK,
        padding: `${PAD_TOP}px ${PAD_X}px ${PAD_BOTTOM}px`,
      },
      children,
    },
  }
}

const div = (style, children) => ({ type: 'div', props: { style, children } })
const span = (style, text) => ({ type: 'span', props: { style, children: text } })

function projectCard(substrate, p) {
  return frame(substrate, [
    div(row(), [
      span(label(), 'Tushar Kumar · AI Engineer'),
      span(label({ color: ACCENT }), `Fig. ${String(p.fig).padStart(2, '0')}`),
    ]),
    div({ ...hairline, marginTop: 18 }),
    div({ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', paddingTop: 8 }, [
      span(
        {
          fontFamily: 'Fraunces',
          fontSize: p.title.length > 26 ? 62 : 76,
          lineHeight: 1.02,
          letterSpacing: '-0.028em',
          marginBottom: 22,
        },
        p.title,
      ),
      span(
        { fontFamily: 'Newsreader', fontSize: 29, lineHeight: 1.45, color: MUTED, maxWidth: 940 },
        clamp(p.tagline, 145),
      ),
    ]),
    div({ ...hairline, marginBottom: 18 }),
    div(row(), [
      span(label({ color: INK }), p.stack.slice(0, 4).join(' · ')),
      span(label(), p.year),
    ]),
  ])
}

function indexCard(substrate, { eyebrow, title, blurb, left, right, titleSize = 96 }) {
  return frame(substrate, [
    div(row(), [
      span(label(), eyebrow),
      span(label({ color: ACCENT }), 'vincitoresi.github.io'),
    ]),
    div({ ...hairline, marginTop: 18 }),
    div({ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', paddingTop: 8 }, [
      span(
        {
          fontFamily: 'Fraunces',
          fontSize: titleSize,
          lineHeight: 0.96,
          letterSpacing: '-0.035em',
          marginBottom: 26,
        },
        title,
      ),
      span(
        { fontFamily: 'Newsreader', fontSize: 30, lineHeight: 1.45, color: MUTED, maxWidth: 900 },
        blurb,
      ),
    ]),
    div({ ...hairline, marginBottom: 18 }),
    div(row(), [span(label({ color: INK }), left), span(label(), right)]),
  ])
}

async function render(node, fonts, width = W, height = H) {
  const res = new ImageResponse(node, { width, height, fonts })
  return Buffer.from(await res.arrayBuffer())
}

/**
 * ImageResponse only emits PNG, and PNG is a poor fit for a paper-grained card —
 * seventeen of them came to 5.7 MB. JPEG at q88 is a tenth of that with no visible
 * difference at preview size, and every platform that renders og:image accepts it.
 */
async function card(node, fonts) {
  return sharp(await render(node, fonts)).jpeg({ quality: 74, chromaSubsampling: '4:4:4' }).toBuffer()
}

async function main() {
  const substratePath = path.join(CACHE, 'substrate-1200x630.jpg')
  if (!existsSync(substratePath)) throw new Error('missing substrate — run scripts/gen-imagery.mjs first')
  const substrate = `data:image/jpeg;base64,${(await readFile(substratePath)).toString('base64')}`

  const [fraunces, mono, newsreader] = await Promise.all([font('fraunces'), font('mono'), font('newsreader')])
  const fonts = [
    { name: 'Fraunces', data: fraunces, weight: 600, style: 'normal' },
    { name: 'JetBrains Mono', data: mono, weight: 500, style: 'normal' },
    { name: 'Newsreader', data: newsreader, weight: 400, style: 'normal' },
  ]

  // Imported straight from the site's own data module via Node's type stripping, so
  // the cards can never drift out of sync with the pages they represent.
  const { projects } = await import('../src/data/projects.ts')
  await mkdir(OUT, { recursive: true })

  await writeFile(
    path.join(OUT, 'home.jpg'),
    await card(
      indexCard(substrate, {
        eyebrow: 'Portfolio · Noida, India',
        title: 'Tushar Kumar',
        blurb:
          'AI engineer at Samsung R&D building retrieval and multi-agent systems. B.Tech in AI & Data Science, IIT Jodhpur.',
        left: 'Retrieval · Multi-Agent · Systems',
        right: 'Est. 2024',
      }),
      fonts,
    ),
  )
  console.log('  home.jpg')

  await writeFile(
    path.join(OUT, 'work.jpg'),
    await card(
      indexCard(substrate, {
        eyebrow: 'Tushar Kumar · AI Engineer',
        title: 'Selected Work',
        blurb:
          'Fifteen projects in retrieval, multi-agent systems, machine learning, and systems engineering — each with a drawing of how it actually works.',
        left: `${projects.length} entries`,
        right: '2022 — 2026',
        titleSize: 88,
      }),
      fonts,
    ),
  )
  console.log('  work.jpg')

  for (const p of projects) {
    await writeFile(path.join(OUT, `${p.slug}.jpg`), await card(projectCard(substrate, p), fonts))
    console.log(`  ${p.slug}.jpg`)
  }

  // apple-touch-icon: the same mark as src/app/icon.svg, rasterised at 180px because
  // iOS home-screen bookmarks will not take an SVG.
  const icon = {
    type: 'div',
    props: {
      style: { display: 'flex', width: 180, height: 180, backgroundColor: PAPER },
      children: {
        type: 'svg',
        props: {
          width: 180,
          height: 180,
          viewBox: '0 0 32 32',
          children: [
            { type: 'path', props: { d: 'M5 8h22M16 8v18', stroke: INK, strokeWidth: 2.6, fill: 'none' } },
            { type: 'path', props: { d: 'M5 26h9', stroke: ACCENT, strokeWidth: 2.6, fill: 'none' } },
          ],
        },
      },
    },
  }
  await writeFile(path.join(ROOT, 'public', 'apple-touch-icon.png'), await render(icon, fonts, 180, 180))
  console.log('  apple-touch-icon.png')
}

await main()
