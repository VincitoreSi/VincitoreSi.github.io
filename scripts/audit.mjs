import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

let failures = 0
const fail = (m) => { console.error(`FAIL  ${m}`); failures++ }
const pass = (m) => console.log(`ok    ${m}`)

// ---- contrast ----
const chan = (v) => {
  const c = v / 255
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}
const lum = (hex) => {
  const n = parseInt(hex.slice(1), 16)
  return 0.2126 * chan((n >> 16) & 255) + 0.7152 * chan((n >> 8) & 255) + 0.0722 * chan(n & 255)
}
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

const THEMES = {
  light: { paper: '#FBFAF6', ink: '#17140F', muted: '#6B6459', accent: '#B93815' },
  dark: { paper: '#12110E', ink: '#F2EDE3', muted: '#8C8578', accent: '#F97316' },
}

for (const [name, t] of Object.entries(THEMES)) {
  for (const key of ['ink', 'muted', 'accent']) {
    const r = ratio(t[key], t.paper)
    const msg = `contrast ${name}/${key} on paper = ${r.toFixed(2)}:1`
    r >= 4.5 ? pass(msg) : fail(`${msg} (needs >= 4.5)`)
  }
}

// ---- project index ----
const projectsSrc = readFileSync('src/data/projects.ts', 'utf8')
const slugs = [...projectsSrc.matchAll(/slug: '([a-z0-9-]+)'/g)].map((m) => m[1])
const figs = [...projectsSrc.matchAll(/fig: (\d+)/g)].map((m) => Number(m[1]))

slugs.length === 15 ? pass('15 projects in index') : fail(`${slugs.length} projects, expected 15`)
new Set(slugs).size === slugs.length ? pass('slugs unique') : fail('duplicate slug')
figs.join(',') === Array.from({ length: 15 }, (_, i) => i + 1).join(',')
  ? pass('fig numbers are 1..15 in order')
  : fail(`fig numbers out of order: ${figs.join(',')}`)

// ---- per-project detail files ----
const detailDir = 'src/data/projects'
if (existsSync(detailDir)) {
  const files = readdirSync(detailDir).filter((f) => f.endsWith('.ts'))
  for (const slug of slugs) {
    existsSync(join(detailDir, `${slug}.ts`))
      ? pass(`detail: ${slug}`)
      : fail(`missing detail file: ${detailDir}/${slug}.ts`)
  }
  for (const f of files) {
    const s = f.replace(/\.ts$/, '')
    if (!slugs.includes(s)) fail(`orphan detail file: ${f}`)
  }
}

console.log(failures ? `\n${failures} failure(s)` : '\nall checks passed')
process.exit(failures ? 1 : 0)
