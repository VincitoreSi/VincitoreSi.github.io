/**
 * Parses every Mermaid diagram in src/data/projects and fails on any that will not
 * render.
 *
 * This exists because the failure is silent and ugly: MermaidBlock catches the parse
 * error and writes the literal string "[diagram]" into the page, so a broken diagram
 * reaches production looking like a deliberate placeholder rather than an error. The
 * repo has already had one "fix mermaid syntax error" commit; this makes that class of
 * bug fail the build instead.
 *
 *   node scripts/check-mermaid.mjs
 */
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { JSDOM } from 'jsdom'

const DIR = path.resolve(import.meta.dirname, '..', 'src', 'data', 'projects')

// Mermaid reaches for browser globals at import time, so a DOM has to exist first.
const dom = new JSDOM('<!doctype html><body></body>', { pretendToBeVisual: true })
globalThis.window = dom.window
globalThis.document = dom.window.document
// Node 21+ defines navigator as a getter-only global, so plain assignment throws.
Object.defineProperty(globalThis, 'navigator', {
  value: dom.window.navigator,
  configurable: true,
  writable: true,
})
if (!globalThis.SVGElement) globalThis.SVGElement = dom.window.SVGElement

const { default: mermaid } = await import('mermaid')

/**
 * Imports each project module and reads the diagrams off the real objects.
 *
 * The first version of this scraped `diagram: \`...\`` out of the source with a regex,
 * which silently skipped every file that builds its diagram as an array joined with
 * newlines — two files did, so four diagrams were invisible to the guard that exists to
 * catch invisible diagram failures. Importing the module is format-independent and can
 * only see what the site actually renders.
 */
async function loadDiagrams(file) {
  const mod = await import(path.join(DIR, file))
  const detail = mod.default
  if (!detail?.blocks) return []
  return detail.blocks.map((b) => b.diagram).filter((d) => typeof d === 'string' && d.trim())
}

const files = (await readdir(DIR)).filter((f) => f.endsWith('.ts')).sort()
let total = 0
let failed = 0

for (const file of files) {
  const diagrams = await loadDiagrams(file)
  for (const [i, diagram] of diagrams.entries()) {
    total++
    const label = `${file} #${i + 1}`
    try {
      await mermaid.parse(diagram)
      console.log(`ok    ${label}`)
    } catch (err) {
      failed++
      const first = String(err?.message ?? err).split('\n').slice(0, 3).join(' ')
      console.error(`FAIL  ${label}: ${first}`)
    }
    // A diagram nobody can read is a different failure from one that will not parse,
    // but it is still a defect, so surface it rather than silently passing.
    const nodes = (diagram.match(/-->|---|->>|-\.->/g) ?? []).length
    if (nodes > 18) console.error(`WARN  ${label}: ${nodes} edges — likely illegible in a text column`)
  }
}

console.log(`\n${total} diagram(s), ${failed} failing`)
process.exit(failed ? 1 : 0)
