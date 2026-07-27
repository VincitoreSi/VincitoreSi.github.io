# vincitoresi.github.io

Tushar Kumar's portfolio — a statically exported Next.js site, published to GitHub Pages at
**[vincitoresi.github.io](https://vincitoresi.github.io)**.

Fifteen projects, each with its own page, its own generated figure, and — for the eight with
public repositories — a series of architecture diagrams written against the actual source.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
```

Node 22 (matching CI). No API keys are needed to build or run: every generated asset is
committed under `public/`.

```bash
npm run verify   # build + audit + diagram check — run this before pushing
```

---

## How it is put together

```
src/
  app/                    routes; `output: 'export'` static export
    page.tsx              home — experience, education, technical, certifications
    work/page.tsx         the project index
    work/[slug]/page.tsx  one page per project, prerendered from src/data
  components/
    Figure.tsx            the generated figure, painted through alpha masks
    MermaidBlock.tsx      client-side diagram rendering
    DetailShell.tsx       the project page layout
    motion/               GSAP reveals, split-line titles, count-ups
  data/
    projects.ts           the index: slug, fig number, tagline, stack, year
    projects/<slug>.ts    the long-form content and diagrams for one project
    figures.ts            generated — each figure's aspect ratio
scripts/                  asset generation and the build-time guards
public/figures/           30 files: an ink mask and an accent mask per project
public/og/                17 social cards
```

Content lives entirely in `src/data`. Adding a project means one entry in `projects.ts` and one
file in `projects/`; nothing under `components/` needs to change.

---

## The figures

Each project's drawing ships as **two alpha masks** rather than as a picture — one carrying the
ink linework, one carrying the vermilion accent. Both have flat white RGB with the actual image
in the alpha channel. `Figure.tsx` paints them by tinting a background through the mask:

```css
.ink    { background: var(--ink);    mask-image: var(--fig-ink); }
.accent { background: var(--accent); mask-image: var(--fig-accent); }
```

Three things follow from this, and they are the reason it is done this way:

- **Colour comes from the stylesheet, not the file.** The artwork cannot drift off-palette,
  because it has no palette of its own.
- **One asset serves both themes.** Dark mode redefines `--ink` and `--accent`; the same two
  files invert correctly with no second render and no `prefers-color-scheme` branch in the markup.
- **The paper is the page.** Everywhere the mask is transparent, the background shows through, so
  the drawings sit on the page rather than on a rectangle of near-white.

Each mask is cropped to its own content, so `figures.ts` records the real aspect ratio and
`Figure.tsx` reserves the correct height before the mask loads — these cost nothing on CLS.

The figures ink themselves in on scroll with a CSS `view()` timeline, which runs off the main
thread. Where scroll-driven animation is unsupported, or under `prefers-reduced-motion`, they are
simply present — a drawing that never appears is a worse failure than one that appears without
ceremony.

---

## Asset generation

These regenerate committed assets and are not part of the build. Only the first needs a key:

```bash
GEMINI_API_KEY=... node scripts/gen-figures.mjs   # the 15 project figures
node scripts/gen-og.mjs                           # the 17 social cards
```

`gen-figures.mjs` renders each subject with `gemini-3-pro-image`, splits the render into ink and
accent channels, crops to the union of both, and writes the manifest. Two notes for anyone
re-running it:

- Renders occasionally come back with no image at all — an `IMAGE_RECITATION` finish reason, which
  is non-deterministic. Each subject gets up to six attempts before the script gives up.
- Prompts describe the **phenomenon, never the actor**. "Four agents around a hub" reliably
  produces clockwork and robots; "four sources converging on a junction" produces the abstract
  drawing that was wanted. This is the single highest-leverage rule in the prompt file.

`gen-og.mjs` composites the cards with `next/og` using the real Fraunces, Newsreader and JetBrains
Mono binaries, so the cards match the site's typography rather than approximating it. Cards bake
in each project's tagline — **regenerate after editing any tagline in `projects.ts`**.

`probe-registers.mjs` and `probe-coherence.mjs` are the research scripts used to choose the
illustration register empirically. They are kept for provenance and are not needed to build.

---

## Build-time guards

`npm run verify` runs the build, then two checks that exist because both failures are silent.

**`scripts/check-mermaid.mjs`** parses all 39 diagrams with the same mermaid version the site
ships. When a diagram fails to parse, `MermaidBlock` catches the error and writes the literal
string `[diagram]` into the page — so a broken diagram reaches production looking like a
deliberate placeholder rather than an error. The checker imports each project module and reads
the diagrams off the real objects; an earlier version scraped the source with a regex and missed
every file that builds its diagram by joining an array, which is four files and the exact class
of blind spot the guard exists to prevent.

**`scripts/audit.mjs`** checks WCAG contrast for both themes, the shape of the project index and
every detail file, and the design spec's §6 rules against the generic-portfolio look.

---

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes to Pages.
There is no other deploy path.

---

## A note on the project write-ups

Every factual claim on the eight repo-backed project pages was checked against the actual source
of that repository, and the claims that did not survive were corrected or removed. Where a page
describes code that is not the author's own, it says so.

If you find something on the site that does not match a repo, it is a bug — please open an issue.
