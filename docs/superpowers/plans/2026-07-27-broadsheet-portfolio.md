# Broadsheet Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a typographic, document-styled portfolio for Tushar Kumar to `https://vincitoresi.github.io`, positioning him as an AI engineer, with a customized detail page and hand-drawn SVG architecture plate for each of fifteen projects.

**Architecture:** Next.js App Router with `output: 'export'` producing a fully static site, deployed by GitHub Actions to Pages. Content lives in typed TypeScript data modules (`src/data/`), not MDX — there is one author and one page, so a content pipeline would be unearned abstraction. Presentation is hand-written CSS Modules over CSS custom properties; no utility framework. Motion is a thin GSAP layer applied to already-complete static markup, so the site is correct with JavaScript disabled and animation is strictly additive.

**Tech Stack:** Next.js (App Router, static export) · TypeScript · CSS Modules + CSS custom properties · GSAP 3 (`gsap`, `SplitText`, `ScrollTrigger`, `@gsap/react`) · `next/font/google` · GitHub Actions → GitHub Pages

**Spec:** `docs/superpowers/specs/2026-07-27-portfolio-broadsheet-design.md`. Read it before starting any task. This plan implements it and does not restate its reasoning.

---

## Global Constraints

Every task's requirements implicitly include this section.

- **Repo:** `VincitoreSi.github.io`, a GitHub *user* repo served at the root path. No `basePath`, no `assetPrefix`. Never add them.
- **Next config, exactly:** `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`.
- **`out/.nojekyll` must exist in every deploy.** Without it GitHub Pages discards `_next/` and the site loads unstyled with no JS.
- **No Tailwind, no CSS-in-JS, no component library.** CSS Modules and custom properties only.
- **JS budget: ≤ 95 KB gzipped total, GSAP included.** Measured in Task 8.
- **Animation engine is GSAP only.** Do not add Motion, Framer Motion, AOS, Lenis, or any second animation library.
- **Color tokens, verbatim** — light / dark: `--paper` `#FBFAF6`/`#12110E` · `--paper-2` `#F4F2EA`/`#1A1815` · `--ink` `#17140F`/`#F2EDE3` · `--muted` `#6B6459`/`#8C8578` · `--accent` `#B93815`/`#F97316` · `--rule` `#D8D2C6`/`#2E2B25`. Do not invent additional colors.
- **Typefaces:** Fraunces (display), Newsreader (body), JetBrains Mono (labels). Via `next/font/google` only — no `<link>` to fonts.googleapis.com.
- **Hairlines are exactly 1px** at `--rule`. Never 2px, never doubled.
- **Prose measure capped at 68 characters** (`max-width: 68ch`).
- **Every SVG stroke uses `stroke="currentColor"`** so plates work in both themes without duplication.
- **Anti-slop checklist (spec §6) is binding on every task, not just the audit.** No gradients, no `box-shadow` on content, no `border-radius` > 3px, no `backdrop-filter`, no purple/indigo/violet, no Inter/Geist/system-ui display type, no emoji, no badge pills, no blobs or particles, no bento grid, no centered CTA hero, no "Hi, I'm", no "Let's build something together", and nothing described as passionate, cutting-edge, innovative, or seamless.
- **Confidentiality (spec §5.1) is binding on `echolearn` and `adaptive-reels`.** Publish the general engineering pattern and résumé-stated outcomes only. Never publish internal Samsung service names, schemas, queue or topic names, infrastructure topology, cost figures, model configuration, or anything drawn from the LLD PDFs in `../TusharKumar`. Their plates depict *patterns*, not Samsung systems. Framing is "how I approach this class of problem."
- **Content is transcribed from `../TusharKumar/main-airag.tex` and `../TusharKumar/particulars.tex`.** Where the two disagree, `main-airag.tex` wins — it is the AI-positioned variant. Do not invent achievements, metrics, or technologies. If a source has two bullets, the page gets two bullets' worth of content.
- **Commit after every task.** Conventional commit messages.

### Confirmed repository links

Verified against `gh repo list VincitoreSi` on 2026-07-27. Use these exact names. The five projects with `null` have no public repo and must render **no link at all** rather than a guessed 404.

| slug | repo |
|---|---|
| `pageindex` | `pageindex` (lowercase — not `PageIndex`) |
| `the-cutting-room` | `TheCuttingRoom` |
| `echolearn` | `null` (Samsung internal, §5.1) |
| `adaptive-reels` | `null` (Samsung internal, §5.1) |
| `ntk-pruning` | `null` |
| `table-structure-recognition` | `null` |
| `facial-emotion-recognition` | `FacialEmotionRecognition` |
| `electronic-nose` | `ElectronicNoseSystem` |
| `hardware-patch-generation` | `resource-aware-patch-generation` |
| `dbms-normalization` | `AutoNormalizationForTables` |
| `toxic-comment-classification` | `null` |
| `sketch-colorization` | `HandMade-Sketch-Colorization` |
| `cnn-optimization` | `optimization-for-cnn` |
| `covid-dashboard` | `null` |
| `process-scheduling-visualizer` | `null` |

`Torch-Pruning`, `CascadeTabNet`, and `convex_adversarial` exist on the account but are **forks of upstream projects** used during research. Do not link them as Tushar's own work.

### Verified contrast ratios

Computed from the spec §3 tokens; recorded here so Task 2 verifies rather than discovers. All exceed WCAG AA 4.5:1.

| Pair | Light | Dark |
|---|---|---|
| ink on paper | 17.58:1 | 16.18:1 |
| muted on paper | 5.60:1 | 5.16:1 |
| accent on paper | 5.52:1 | 6.73:1 |

---

## File Structure

```
VincitoreSi.github.io/
├── .github/workflows/deploy.yml     Build + deploy to Pages
├── next.config.ts                   Static export config
├── package.json  tsconfig.json  .gitignore
├── scripts/audit.mjs                Data validation + anti-slop greps + contrast
├── public/
│   ├── .nojekyll                    Committed as well as touched in CI
│   └── tushar-kumar-resume.pdf      Copied from ../TusharKumar/TusharKumarAI.pdf
└── src/
    ├── app/
    │   ├── layout.tsx               Fonts, blocking theme script, metadata
    │   ├── globals.css              Reset, tokens, both themes, type scale
    │   ├── page.tsx                 Home — composes the section components
    │   ├── not-found.tsx
    │   └── work/[slug]/page.tsx     Detail route, generateStaticParams
    ├── data/
    │   ├── types.ts                 ProjectMeta, ProjectDetail, DetailBlock, Metric
    │   ├── profile.ts               Contact, lede, experience, education, skills, certs
    │   ├── projects.ts              The 15-entry ProjectMeta[] index
    │   └── projects/<slug>.ts       15 files — one ProjectDetail each
    ├── components/
    │   ├── Masthead.tsx             + .module.css  (name, role, contact)
    │   ├── Lede.tsx                 Two-column opening prose
    │   ├── Section.tsx              Numbered section shell: 01 / title / rule
    │   ├── ProjectCard.tsx          IDENTICAL geometry for all 15
    │   ├── ProjectIndex.tsx         Section 01 — maps ProjectCard
    │   ├── Experience.tsx           Section 02
    │   ├── Education.tsx            Section 03
    │   ├── Technical.tsx            Section 04 — typographic index, not pills
    │   ├── Certifications.tsx       Section 05 — bibliography style
    │   ├── Colophon.tsx             Contact, resume, repo, typeface note
    │   ├── ThemeToggle.tsx          Sun/moon inked SVG, persists to localStorage
    │   ├── Plate.tsx                Frame + FIG. n + caption wrapper
    │   ├── DetailShell.tsx          Shared chrome for /work/[slug]
    │   ├── plates/
    │   │   ├── registry.ts          slug → plate component (written in Task 7)
    │   │   └── <Slug>Plate.tsx      15 files — one inked SVG each
    │   └── motion/
    │       ├── GsapProvider.tsx     Plugin registration + reduced-motion branch
    │       ├── SplitReveal.tsx      Line/word mask reveal
    │       ├── DrawRule.tsx         Hairline scaleX
    │       ├── Reveal.tsx           Fade + rise
    │       └── CountUp.tsx          Metric numbers
    └── lib/theme-script.ts          The blocking inline script, as a string
```

**Decomposition rationale:** each of the fifteen parallel workers in Task 7 owns exactly two files nobody else touches — `src/data/projects/<slug>.ts` and `src/components/plates/<Slug>Plate.tsx`. There is no shared file in the fan-out, so no git worktrees and no merge step are needed. `plates/registry.ts` is the one shared file, and it is written once by the coordinator after the fan-out completes.

---

### Task 1: Repo, scaffold, and a deployed ugly page

Deployment goes first so it is never the thing that breaks at the end. Success here is a live URL, not a good-looking one.

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `.gitignore`, `public/.nojekyll`, `.github/workflows/deploy.yml`, `src/app/layout.tsx`, `src/app/page.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: a building Next static-export project, and a live Pages URL.

- [ ] **Step 1: Initialize the package and install dependencies**

```bash
cd /Users/vincitoresi/personal/VincitoreSi.github.io
npm init -y
npm pkg set name=vincitoresi.github.io private=true
npm pkg set scripts.dev="next dev" scripts.build="next build" scripts.audit="node scripts/audit.mjs"
npm install next@latest react@latest react-dom@latest
npm install -D typescript @types/react @types/react-dom @types/node
npm install gsap @gsap/react
```

- [ ] **Step 2: Write the config files**

`next.config.ts`:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig
```

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler",
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "incremental": true,
    "skipLibCheck": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

`.gitignore`:

```
node_modules/
.next/
out/
next-env.d.ts
*.tsbuildinfo
.DS_Store
```

- [ ] **Step 3: Write a minimal layout and page**

Deliberately plain. Task 2 replaces the styling; this only proves the pipeline.

`src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Tushar Kumar — AI Engineer',
  description: 'AI engineer building retrieval and multi-agent systems.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

`src/app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main>
      <h1>Tushar Kumar</h1>
      <p>AI Engineer. Deployment pipeline verification page.</p>
    </main>
  )
}
```

- [ ] **Step 4: Verify the export builds and emits .nojekyll**

```bash
touch public/.nojekyll
npm run build
test -f out/index.html && test -f out/.nojekyll && echo "EXPORT OK"
```

Expected: `EXPORT OK`, and `out/_next/` exists.

- [ ] **Step 5: Write the deploy workflow**

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - run: touch out/.nojekyll
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 6: Create the GitHub repo, push, and enable Pages**

```bash
git add -A
git commit -m "feat: scaffold Next static export with Pages deploy"
gh repo create VincitoreSi.github.io --public --source=. --remote=origin --push
gh api -X POST repos/VincitoreSi/VincitoreSi.github.io/pages \
  -f 'build_type=workflow' 2>/dev/null || \
  gh api -X PUT repos/VincitoreSi/VincitoreSi.github.io/pages -f 'build_type=workflow'
```

- [ ] **Step 7: Verify the live deployment**

```bash
gh run watch --exit-status
curl -sS -o /dev/null -w '%{http_code}\n' https://vincitoresi.github.io/
curl -sS https://vincitoresi.github.io/ | grep -o 'Tushar Kumar'
```

Expected: run succeeds, `200`, and `Tushar Kumar` found. If the first `curl` returns 404, Pages is still propagating — wait and retry before debugging.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "chore: confirm live Pages deployment" --allow-empty
git push
```

---

### Task 2: Design tokens, both themes, type scale, and a no-flash theme toggle

**Files:**
- Create: `src/app/globals.css`, `src/lib/theme-script.ts`, `src/components/ThemeToggle.tsx`, `src/components/ThemeToggle.module.css`, `scripts/audit.mjs`
- Modify: `src/app/layout.tsx` (fonts, theme script, globals import)

**Interfaces:**
- Produces: `THEME_SCRIPT: string` from `@/lib/theme-script`; `<ThemeToggle />` component; CSS custom properties `--paper --paper-2 --ink --muted --accent --rule`, type-scale classes `.display-xl .display-l .display-m .body-l .body .body-s .label .label-s`, spacing vars `--s1`…`--s8`, and font vars `--font-display --font-body --font-mono`.

- [ ] **Step 1: Write the blocking theme script**

`src/lib/theme-script.ts`. Minified deliberately — it is inlined into `<head>` and blocks first paint, which is the point.

```ts
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","light")}})()`
```

- [ ] **Step 2: Write globals.css**

```css
/* ---- reset ---- */
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }
html { -webkit-text-size-adjust: 100%; }
body { -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
img, svg { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }
button { font: inherit; color: inherit; background: none; border: none; padding: 0; cursor: pointer; }
ul, ol { list-style: none; padding: 0; }

/* ---- tokens ---- */
:root {
  --paper: #FBFAF6;
  --paper-2: #F4F2EA;
  --ink: #17140F;
  --muted: #6B6459;
  --accent: #B93815;
  --rule: #D8D2C6;

  --s1: 4px;  --s2: 8px;   --s3: 12px;  --s4: 20px;
  --s5: 32px; --s6: 52px;  --s7: 84px;  --s8: 136px;

  --measure: 68ch;
  --page: 1180px;
  --gutter: 28px;
}

:root[data-theme='dark'] {
  --paper: #12110E;
  --paper-2: #1A1815;
  --ink: #F2EDE3;
  --muted: #8C8578;
  --accent: #F97316;
  --rule: #2E2B25;
}

body {
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-body), Georgia, serif;
  font-size: 16px;
  line-height: 1.68;
}

/* ---- type scale (spec §3) ---- */
.display-xl { font-family: var(--font-display), Georgia, serif; font-size: clamp(40px, 9vw, 72px); line-height: 0.92; letter-spacing: -0.035em; font-weight: 600; }
.display-l  { font-family: var(--font-display), Georgia, serif; font-size: clamp(30px, 5vw, 44px); line-height: 0.98; letter-spacing: -0.028em; font-weight: 600; }
.display-m  { font-family: var(--font-display), Georgia, serif; font-size: clamp(24px, 3.4vw, 30px); line-height: 1.08; letter-spacing: -0.02em; font-weight: 600; }
.body-l     { font-size: 18px; line-height: 1.62; max-width: var(--measure); }
.body       { font-size: 16px; line-height: 1.68; max-width: var(--measure); }
.body-s     { font-size: 14px; line-height: 1.6; }
.label      { font-family: var(--font-mono), monospace; font-size: 11px; line-height: 1; letter-spacing: 0.14em; text-transform: uppercase; }
.label-s    { font-family: var(--font-mono), monospace; font-size: 9.5px; line-height: 1; letter-spacing: 0.14em; text-transform: uppercase; }

.rule { height: 1px; background: var(--rule); border: 0; }
.accent { color: var(--accent); }
.muted { color: var(--muted); }

.shell { max-width: var(--page); margin: 0 auto; padding: 0 var(--gutter); }

/* ---- link underline wipe (spec §4) ---- */
.link { position: relative; display: inline-block; }
.link::after {
  content: ''; position: absolute; left: 0; bottom: -2px; width: 100%; height: 1px;
  background: currentColor; transform: scaleX(0); transform-origin: left;
  transition: transform 0.35s cubic-bezier(0.33, 1, 0.68, 1);
}
.link:hover::after, .link:focus-visible::after { transform: scaleX(1); }

:focus-visible { outline: 1px solid var(--accent); outline-offset: 3px; }

@media (prefers-reduced-motion: reduce) {
  .link::after { transition: none; }
}
```

- [ ] **Step 3: Wire fonts, theme script, and globals into the layout**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Fraunces, Newsreader, JetBrains_Mono } from 'next/font/google'
import { THEME_SCRIPT } from '@/lib/theme-script'
import './globals.css'

const display = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--font-display',
})

const body = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
  variable: '--font-body',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://vincitoresi.github.io'),
  title: 'Tushar Kumar — AI Engineer',
  description:
    'AI engineer at Samsung R&D building retrieval and multi-agent systems. B.Tech AI & Data Science, IIT Jodhpur.',
  openGraph: {
    title: 'Tushar Kumar — AI Engineer',
    description: 'AI engineer building retrieval and multi-agent systems.',
    url: 'https://vincitoresi.github.io',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 4: Write the theme toggle**

`src/components/ThemeToggle.tsx`. Inked sun/moon, `currentColor`, no emoji.

```tsx
'use client'

import { useEffect, useState } from 'react'
import styles from './ThemeToggle.module.css'

type Theme = 'light' | 'dark'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme')
    setTheme(current === 'dark' ? 'dark' : 'light')
  }, [])

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* private mode — the in-memory switch still works */
    }
    setTheme(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={styles.toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none"
           stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
        {theme === 'dark' ? (
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4.25" />
            <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
          </>
        )}
      </svg>
      <span className="label-s">{theme === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  )
}
```

`src/components/ThemeToggle.module.css`. The toggle is the one element permitted a shadow (spec §6 rule 2).

```css
.toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--s2);
  padding: var(--s2) var(--s3);
  border: 1px solid var(--rule);
  border-radius: 2px;
  color: var(--muted);
  transition: color 0.25s, border-color 0.25s;
}

.toggle:hover { color: var(--ink); border-color: var(--ink); }

@media (prefers-reduced-motion: reduce) {
  .toggle { transition: none; }
}
```

- [ ] **Step 5: Write the audit script with the contrast check**

`scripts/audit.mjs`. Extended in Tasks 3 and 8; contrast lands now because Task 2 owns color.

```js
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
  return 0.2126 * chan((n >> 16) & 255) + 0.7152 * chan((n >> 8) & 255) + 0.0722 * (n & 255 ? chan(n & 255) : chan(0))
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

console.log(failures ? `\n${failures} failure(s)` : '\nall checks passed')
process.exit(failures ? 1 : 0)
```

- [ ] **Step 6: Verify the contrast check and the build**

```bash
npm run audit
npm run build
```

Expected: six `ok contrast …` lines matching the table in Global Constraints, `all checks passed`, and a clean build.

- [ ] **Step 7: Verify no flash of the wrong theme**

Manual, and the actual point of the blocking script. In a browser, set the OS to dark, hard-reload `http://localhost:3000` ten times, and confirm no white flash. Then toggle to light in the UI, hard-reload, and confirm it stays light.

```bash
npm run dev
```

Expected: no flash in either direction. If there is one, the script is not inline-blocking in `<head>` — fix that rather than adding a transition to hide it.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: design tokens, dual themes, type scale, no-flash theme toggle"
```

---

### Task 3: Data layer — types, profile, project index, and data validation

This task defines the contracts the fifteen parallel workers in Task 7 write against. Get the types right here or the fan-out diverges.

**Files:**
- Create: `src/data/types.ts`, `src/data/profile.ts`, `src/data/projects.ts`
- Modify: `scripts/audit.mjs` (add data validation)
- Source: `../TusharKumar/main-airag.tex`, `../TusharKumar/particulars.tex`, `../TusharKumar/projects.txt`

**Interfaces:**
- Consumes: nothing in code.
- Produces: `ProjectMeta`, `ProjectDetail`, `DetailBlock`, `Metric` types; `profile` object; `projects: ProjectMeta[]` (exactly 15, ordered).

- [ ] **Step 1: Write the types**

`src/data/types.ts`:

```ts
export type Depth = 'full' | 'short'

/** Home-page index entry. Rendered by the identical card for all fifteen. */
export interface ProjectMeta {
  slug: string
  title: string
  /** One sentence, no trailing period stripped — appears on the card. */
  tagline: string
  /** Display year or range, e.g. '2026' or '2022 — 2023'. */
  year: string
  /** Rendered uppercase in mono, dot-separated. Max 4 on the card. */
  stack: string[]
  depth: Depth
  /** GitHub repo name, or null when none exists. Never guess. */
  repo: string | null
  /** FIG. number, 1-based, matching index order. */
  fig: number
}

export interface Metric {
  value: string
  label: string
}

export interface DetailBlock {
  heading: string
  /** One string per paragraph. */
  body: string[]
}

/** Detail-page content. One file per project under src/data/projects/. */
export interface ProjectDetail {
  slug: string
  /** One or two sentences under the title. */
  summary: string
  /**
   * Full depth: Problem, Approach, Key decisions, Result.
   * Short depth: a single 'Overview' block.
   */
  blocks: DetailBlock[]
  metrics: Metric[]
  /** Sentence describing what the plate depicts, rendered as the FIG. caption. */
  plateCaption: string
  stackFull: string[]
  /** True for Samsung internal work — renders the §5.1 scope note. */
  confidential?: boolean
}

export const REPO_BASE = 'https://github.com/VincitoreSi'
```

- [ ] **Step 2: Write the profile data**

`src/data/profile.ts`. Every string transcribed from `main-airag.tex`; do not paraphrase metrics. Note CGPA is intentionally absent (spec §9.4) and there is no photograph (§9.3).

```ts
export const profile = {
  name: 'Tushar Kumar',
  role: 'AI Engineer',
  location: 'Noida, India',
  email: 'tusharparthsarathi@gmail.com',
  phone: '+91 9917677832',
  github: 'https://github.com/VincitoreSi',
  linkedin: 'https://linkedin.com/in/tusharkumarparthsarathi',
  resume: '/tushar-kumar-resume.pdf',

  /** Two-column lede. Column one positions, column two evidences. */
  lede: [
    'I build retrieval and multi-agent systems. At Samsung R&D India I work on a three-person team that shipped a RAG chatbot answering spec, feature, and test-case questions for Tizen modules, replacing scattered documents with a single reference point. The retrieval path is mine: semantic chunking, hybrid keyword and dense search, cross-encoder reranking over isolated per-corpus namespaces.',
    'The same year I wrote the streaming layer for an interactive learning platform that produced over 100 hours of lecture content for more than 5,000 students, holding barge-in response under 200 milliseconds. Underneath all of it is C and C++: profiling work that cut memory use by 25 percent across 10,000-plus deployed devices, and a diagnostics rewrite that cut issue-resolution time by 30 to 40 percent.',
  ],

  experience: {
    company: 'Samsung R&D Institute India, Delhi',
    title: 'Software Engineer I',
    start: 'Jul 2024',
    end: 'Present',
    location: 'Noida, UP, India',
    groups: [
      {
        heading: 'GenAI & RAG Systems',
        items: [
          'Built a RAG chatbot with a team of 3 that answers spec, feature, and test-case questions for Tizen modules such as SignagePlayer, replacing scattered documents with one reference point.',
          'Extended it to generate test cases automatically for module features and to walk engineers through first-line troubleshooting.',
          'Implemented the retrieval path: semantic chunking, hybrid keyword and dense vector search, and cross-encoder reranking over isolated per-corpus namespaces.',
        ],
      },
      {
        heading: 'AI Learning Platforms',
        items: [
          'Developed an interactive educational podcast platform that produced 100+ hours of lecture content for 5,000+ students, letting students interrupt playback mid-sentence to ask questions.',
          'Wrote the streaming layer on full-duplex WebSockets so heavy render work never stalls audio, holding barge-in response under 200 ms.',
          'Shipped an adaptive short-form video pipeline that expands a topic and grade level into a sequenced lesson set, with schema-constrained LLM output feeding the database directly.',
          "Prototyped Code2Documentation, which won Samsung's Good Idea Award (1 of 50 globally).",
        ],
      },
      {
        heading: 'Smart Diagnostics & Logging',
        items: [
          'Wrote a diagnostics service that collects log, CPU, and memory telemetry from 10,000+ Samsung devices.',
          'Cut issue-resolution time by 30–40%; scaled log collection to 2 GB+ per session.',
          "Integrated the logging pipeline into Samsung's internal portal, now used by 500+ engineers in 20+ countries.",
        ],
      },
      {
        heading: 'Tizen Signage Core Modules (C/C++)',
        items: [
          'Maintain Tizen modules (SignagePlayer, OfficeViewer, Event Manager, Remote Manager) across 100+ deployments.',
          'Reduced memory usage by 25% via profiling and C/C++ optimization; resolved 50+ production crashes.',
          'Added subtitle support to SignagePlayer for multilingual accessibility in international deployments.',
        ],
      },
    ],
  },

  education: {
    school: 'Indian Institute of Technology (IIT) Jodhpur',
    degree: 'B.Tech. Artificial Intelligence & Data Science',
    start: 'Jul 2020',
    end: 'May 2024',
    coursework: [
      'Data Structures & Algorithms', 'Operating Systems', 'Computer Networking',
      'Database Management Systems', 'Computer Architecture', 'Machine Learning',
      'Deep Learning', 'Pattern Recognition & ML', 'Computer Vision',
      'Natural Language Processing', 'System Design',
    ],
  },

  skills: [
    {
      heading: 'LLM & RAG',
      items: ['Retrieval-Augmented Generation', 'Agentic RAG', 'Multi-Agent Systems', 'Prompt Engineering', 'Large Language Models', 'LangChain', 'LangGraph', 'Model Context Protocol', 'FAISS', 'Vector Databases', 'Semantic Chunking', 'Hybrid Search (BM25 + Dense)', 'Cross-Encoder Reranking', 'Knowledge Graphs', 'Gemini API'],
    },
    {
      heading: 'Machine Learning',
      items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'OpenCV', 'NLTK', 'Deep Learning', 'Computer Vision', 'NLP', 'Transfer Learning', 'Model Compression', 'PCA / LDA / t-SNE'],
    },
    {
      heading: 'Languages',
      items: ['Python', 'C / C++', 'Rust', 'Go', 'Java', 'JavaScript / TypeScript', 'SQL'],
    },
    {
      heading: 'Backend & Architecture',
      items: ['FastAPI', 'Django', 'Flask', 'REST APIs', 'WebSockets', 'Async & Streaming Pipelines', 'Event-Driven Architecture', 'Microservices', 'System Design (HLD/LLD)', 'SQLite'],
    },
    {
      heading: 'DevOps & Tools',
      items: ['Docker', 'AWS', 'GitHub Actions', 'CI/CD', 'Git', 'Linux', 'Neovim', 'LaTeX'],
    },
    {
      heading: 'Web & IoT',
      items: ['React', 'Next.js', 'Node.js', 'Raspberry Pi', 'ThingSpeak'],
    },
  ],

  certifications: [
    { title: 'LangChain & LangGraph — Agentic AI Engineering', issuer: 'Udemy', date: 'May 2026' },
    { title: 'Prompt Engineering for Everyone Bootcamp', issuer: 'Udemy', date: 'May 2026' },
    { title: 'The Complete MCP (Model Context Protocol) Masterclass', issuer: 'Udemy', date: 'May 2026' },
    { title: "Rust: The Complete Developer's Guide", issuer: 'Udemy', date: 'Feb 2026' },
    { title: 'Fundamentals of Operating Systems', issuer: 'Udemy', date: 'Jun 2025' },
    { title: 'Mathematics for Machine Learning', issuer: 'Coursera', date: '2022 — 23' },
  ],

  colophon: {
    note: 'Set in Fraunces, Newsreader, and JetBrains Mono. Built with Next.js, animated with GSAP, drawn by hand in SVG. No template.',
  },
} as const
```

- [ ] **Step 3: Write the project index**

`src/data/projects.ts`. Order is the home-page order: the two public flagships first, then the Samsung platform work, then research, then coursework. `fig` matches position.

```ts
import type { ProjectMeta } from './types'

export const projects: ProjectMeta[] = [
  { slug: 'pageindex', fig: 1, depth: 'full', repo: 'pageindex', year: '2026',
    title: 'PageIndex',
    tagline: 'A retrieval engine that replaces the vector database with hierarchical table-of-contents generation and LLM-guided traversal.',
    stack: ['Rust', 'SQLite', 'async-openai', 'serde'] },

  { slug: 'the-cutting-room', fig: 2, depth: 'full', repo: 'TheCuttingRoom', year: '2026',
    title: 'The Cutting Room',
    tagline: 'A multi-agent GenAI video pipeline: four agents coordinating over HTTP with no shared filesystem.',
    stack: ['FastAPI', 'React 19', 'Gemini', 'Docker'] },

  { slug: 'echolearn', fig: 3, depth: 'full', repo: null, year: '2026',
    title: 'EchoLearn',
    tagline: 'A real-time educational podcast platform where students interrupt the audio mid-sentence to ask a question.',
    stack: ['System Design', 'RAG', 'WebSockets', 'FastAPI'] },

  { slug: 'adaptive-reels', fig: 4, depth: 'full', repo: null, year: '2026',
    title: 'Adaptive Educational Reels',
    tagline: 'An event-driven pipeline that expands a topic and grade level into a sequenced set of short-form video lessons.',
    stack: ['System Design', 'Kubernetes', 'Pub/Sub', 'PostgreSQL'] },

  { slug: 'ntk-pruning', fig: 5, depth: 'full', repo: null, year: '2023',
    title: 'NTK-Aware Pruning',
    tagline: 'A pruning method that removes connections while preserving the training dynamics of the dense network.',
    stack: ['PyTorch', 'NTK Theory'] },

  { slug: 'table-structure-recognition', fig: 6, depth: 'short', repo: null, year: '2023 — 24',
    title: 'Table Structure Recognition',
    tagline: 'CNN models for table detection and structural parsing in document understanding.',
    stack: ['PyTorch', 'CNN', 'OpenCV'] },

  { slug: 'facial-emotion-recognition', fig: 7, depth: 'short', repo: 'FacialEmotionRecognition', year: '2025',
    title: 'Facial Emotion Recognition',
    tagline: 'A ResNet-34 fine-tuned on FER-2013 for seven-class expression recognition on a live webcam feed.',
    stack: ['PyTorch', 'ResNet-34', 'OpenCV'] },

  { slug: 'electronic-nose', fig: 8, depth: 'short', repo: 'ElectronicNoseSystem', year: '2023 — 24',
    title: 'Electronic Nose',
    tagline: 'Gas classification and concentration prediction from 10,000+ sensor readings, running entirely on a Raspberry Pi.',
    stack: ['Python', 'PyTorch', 'Raspberry Pi'] },

  { slug: 'hardware-patch-generation', fig: 9, depth: 'short', repo: 'resource-aware-patch-generation', year: '2022',
    title: 'Resource-Aware Hardware Patch Generation',
    tagline: 'A resource-aware patch-generation algorithm for functional ECO, solving 10,000+ cases at roughly 90% efficiency.',
    stack: ['C++', 'Verilog'] },

  { slug: 'dbms-normalization', fig: 10, depth: 'short', repo: 'AutoNormalizationForTables', year: '2022',
    title: 'Automated Table Normalization',
    tagline: 'Normalizes database tables from 1NF through BCNF with step-by-step visualization of each decomposition.',
    stack: ['Python', 'C++', 'SQL'] },

  { slug: 'toxic-comment-classification', fig: 11, depth: 'short', repo: null, year: '2022',
    title: 'Toxic Comment Classification',
    tagline: 'NLP models compared on accuracy for detecting toxic content in social-media text.',
    stack: ['PyTorch', 'NLP', 'Streamlit'] },

  { slug: 'sketch-colorization', fig: 12, depth: 'short', repo: 'HandMade-Sketch-Colorization', year: '2022',
    title: 'Handmade Sketch Colorization',
    tagline: 'Colorizes hand-drawn sketches using classical segmentation, with no deep learning at any stage.',
    stack: ['Python', 'OpenCV', 'Streamlit'] },

  { slug: 'cnn-optimization', fig: 13, depth: 'short', repo: 'optimization-for-cnn', year: '2023',
    title: 'CNN Design via Optimization',
    tagline: 'Treats convolutional architecture selection as an optimization problem rather than a manual search.',
    stack: ['Python', 'PyTorch'] },

  { slug: 'covid-dashboard', fig: 14, depth: 'short', repo: null, year: '2023',
    title: 'Covid-19 Statistics Portal',
    tagline: 'An interactive dashboard visualizing the state of Covid-19 across India.',
    stack: ['Plotly Dash', 'Python', 'Flask'] },

  { slug: 'process-scheduling-visualizer', fig: 15, depth: 'short', repo: null, year: '2022',
    title: 'Process-Scheduling Visualizer',
    tagline: 'Animates classical CPU scheduling algorithms step by step against a shared workload.',
    stack: ['JavaScript', 'HTML/CSS'] },
]
```

- [ ] **Step 4: Add data validation to the audit script**

Append to `scripts/audit.mjs`, before the summary lines:

```js
// ---- project index ----
const projectsSrc = readFileSync('src/data/projects.ts', 'utf8')
const slugs = [...projectsSrc.matchAll(/slug: '([a-z0-9-]+)'/g)].map((m) => m[1])
const figs = [...projectsSrc.matchAll(/fig: (\d+)/g)].map((m) => Number(m[1]))

slugs.length === 15 ? pass('15 projects in index') : fail(`${slugs.length} projects, expected 15`)
new Set(slugs).size === slugs.length ? pass('slugs unique') : fail('duplicate slug')
figs.join(',') === Array.from({ length: 15 }, (_, i) => i + 1).join(',')
  ? pass('fig numbers are 1..15 in order')
  : fail(`fig numbers out of order: ${figs.join(',')}`)

// ---- per-project detail files (populated in Task 7) ----
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
```

- [ ] **Step 5: Verify validation catches a real error**

Prove the check works before trusting it to police fifteen parallel workers.

```bash
npm run audit                      # expect: 15 projects, slugs unique, figs in order
sed -i '' "s/fig: 7,/fig: 70,/" src/data/projects.ts
npm run audit; echo "exit=$?"      # expect: FAIL fig numbers out of order, exit=1
sed -i '' "s/fig: 70,/fig: 7,/" src/data/projects.ts
npm run audit; echo "exit=$?"      # expect: all checks passed, exit=0
npx tsc --noEmit
```

Expected: the middle run fails and exits 1; the last run passes and `tsc` is clean. The `detail:` checks will report missing files until Task 7 — that is expected and the reason they are guarded by `existsSync`.

- [ ] **Step 6: Copy the résumé PDF**

```bash
cp ../TusharKumar/TusharKumarAI.pdf public/tushar-kumar-resume.pdf
ls -la public/tushar-kumar-resume.pdf
```

Expected: file present and non-zero. If `TusharKumarAI.pdf` does not exist, list `../TusharKumar/*.pdf` and use the AI-variant build; do not ship a stale résumé.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: typed data layer for profile and fifteen-project index"
```

---

### Task 4: Home page, static, all content, no motion

The page must be complete and correct as pure HTML before any GSAP is introduced. If it is not readable with JS disabled, the motion layer in Task 6 is hiding a broken document.

**Files:**
- Create: `src/components/Masthead.tsx` `.module.css`, `Lede.tsx` `.module.css`, `Section.tsx` `.module.css`, `ProjectCard.tsx` `.module.css`, `ProjectIndex.tsx`, `Experience.tsx` `.module.css`, `Education.tsx` `.module.css`, `Technical.tsx` `.module.css`, `Certifications.tsx` `.module.css`, `Colophon.tsx` `.module.css`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `profile` and `projects` from Task 3; `ThemeToggle` from Task 2; type-scale classes from `globals.css`.
- Produces: `<Section number="01" title="Selected Work">`, `<ProjectCard project={meta} plate={ReactNode} />`.

- [ ] **Step 1: Write the Section shell**

`src/components/Section.tsx`. Every numbered section uses this — one place governs section rhythm.

```tsx
import type { ReactNode } from 'react'
import styles from './Section.module.css'

export default function Section({
  number, title, children,
}: { number: string; title: string; children: ReactNode }) {
  return (
    <section className={styles.section} id={`section-${number}`}>
      <div className={styles.head}>
        <span className={`label ${styles.number}`}>{number}</span>
        <h2 className={`display-m ${styles.title}`} data-split="word">{title}</h2>
      </div>
      <hr className={`rule ${styles.rule}`} data-rule />
      <div className={styles.body}>{children}</div>
    </section>
  )
}
```

`src/components/Section.module.css`:

```css
.section { padding: var(--s7) 0 0; }
.head { display: flex; align-items: baseline; gap: var(--s4); }
.number { color: var(--accent); }
.title { flex: 1; }
.rule { margin: var(--s3) 0 var(--s5); }
.body { }
```

- [ ] **Step 2: Write the Masthead**

`src/components/Masthead.tsx`. No nav bar (spec §5). `data-split="line"` marks the name for Task 6.

```tsx
import { profile } from '@/data/profile'
import ThemeToggle from './ThemeToggle'
import styles from './Masthead.module.css'

export default function Masthead() {
  return (
    <header className={styles.masthead}>
      <div className={styles.top}>
        <span className="label">Portfolio · MMXXVI</span>
        <ThemeToggle />
      </div>
      <hr className="rule" data-rule />
      <h1 className={`display-xl ${styles.name}`} data-split="line">
        {profile.name}
      </h1>
      <div className={styles.meta}>
        <p className="label">{profile.role}</p>
        <p className="label">{profile.location}</p>
        <nav className={styles.links}>
          <a className={`label link`} href={profile.github}>GitHub</a>
          <a className={`label link`} href={profile.linkedin}>LinkedIn</a>
          <a className={`label link`} href={`mailto:${profile.email}`}>Email</a>
          <a className={`label link`} href={profile.resume}>Résumé (PDF)</a>
        </nav>
      </div>
      <hr className="rule" data-rule />
    </header>
  )
}
```

`src/components/Masthead.module.css`:

```css
.masthead { padding: var(--s4) 0 0; }
.top { display: flex; align-items: center; justify-content: space-between; padding-bottom: var(--s3); color: var(--muted); }
.name { margin: var(--s6) 0 var(--s5); }
.meta { display: flex; flex-wrap: wrap; align-items: baseline; gap: var(--s3) var(--s6); padding-bottom: var(--s4); color: var(--muted); }
.links { display: flex; flex-wrap: wrap; gap: var(--s4); margin-left: auto; }
.links a { color: var(--ink); }

@media (max-width: 720px) {
  .links { margin-left: 0; }
}
```

- [ ] **Step 3: Write the Lede**

`src/components/Lede.tsx`:

```tsx
import { profile } from '@/data/profile'
import styles from './Lede.module.css'

export default function Lede() {
  return (
    <div className={styles.lede}>
      {profile.lede.map((para, i) => (
        <p key={i} className={i === 0 ? `body-l ${styles.first}` : 'body'} data-reveal>
          {para}
        </p>
      ))}
    </div>
  )
}
```

`src/components/Lede.module.css`:

```css
.lede { display: grid; grid-template-columns: 1fr 1fr; gap: var(--s6); padding: var(--s6) 0 var(--s5); }
.first::first-letter { font-family: var(--font-display), Georgia, serif; font-size: 3.1em; line-height: 0.82; float: left; padding: 0.06em 0.09em 0 0; color: var(--accent); }

@media (max-width: 860px) {
  .lede { grid-template-columns: 1fr; gap: var(--s4); }
}
```

The accented drop cap is a monograph convention and does real positioning work; it is the only decorative flourish on the page.

- [ ] **Step 4: Write the ProjectCard — identical geometry for all fifteen**

`src/components/ProjectCard.tsx`. This is the component the user specifically required be the same for every project. The only variables are the plate drawing and the words.

```tsx
import Link from 'next/link'
import type { ReactNode } from 'react'
import type { ProjectMeta } from '@/data/types'
import styles from './ProjectCard.module.css'

export default function ProjectCard({
  project, plate,
}: { project: ProjectMeta; plate: ReactNode }) {
  return (
    <li className={styles.item} data-reveal>
      <Link href={`/work/${project.slug}/`} className={styles.link}>
        <span className={`label-s ${styles.fig}`}>FIG. {project.fig}</span>
        <span className={styles.plate} aria-hidden="true">{plate}</span>
        <span className={styles.text}>
          <span className={styles.titleRow}>
            <span className={`display-l ${styles.title}`}>{project.title}</span>
            <span className={`label ${styles.year}`}>{project.year}</span>
          </span>
          <span className={`body ${styles.tagline}`}>{project.tagline}</span>
          <span className={styles.footRow}>
            <span className={`label-s ${styles.stack}`}>
              {project.stack.slice(0, 4).join(' · ')}
            </span>
            <span className={styles.arrow} aria-hidden="true">
              <svg viewBox="0 0 28 8" width="28" height="8" fill="none"
                   stroke="currentColor" strokeWidth="1">
                <path d="M0 4h26M22.5 0.5 26.5 4l-4 3.5" />
              </svg>
            </span>
          </span>
        </span>
      </Link>
      <hr className="rule" data-rule />
    </li>
  )
}
```

`src/components/ProjectCard.module.css`:

```css
.item { display: block; }
.link {
  display: grid;
  grid-template-columns: 58px 118px 1fr;
  gap: var(--s4);
  align-items: start;
  padding: var(--s5) 0;
}
.fig { color: var(--muted); padding-top: 6px; }
.plate {
  display: block; width: 118px; height: 118px;
  border: 1px solid var(--rule); padding: var(--s2);
  color: var(--ink);
}
.plate svg { width: 100%; height: 100%; }
.text { display: block; }
.titleRow { display: flex; align-items: baseline; justify-content: space-between; gap: var(--s4); }
.title { display: block; }
.year { color: var(--muted); flex-shrink: 0; }
.tagline { display: block; margin: var(--s3) 0 var(--s4); color: var(--muted); }
.footRow { display: flex; align-items: center; justify-content: space-between; gap: var(--s4); }
.stack { color: var(--ink); }
.arrow { color: var(--muted); transition: transform 0.3s cubic-bezier(0.33, 1, 0.68, 1), color 0.3s; }

.link:hover .arrow { transform: translateX(6px); color: var(--accent); }
.link:hover .title { color: var(--accent); }

@media (max-width: 720px) {
  .link { grid-template-columns: 48px 1fr; }
  .plate { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .arrow { transition: none; }
}
```

- [ ] **Step 5: Write ProjectIndex, Experience, Education, Technical, Certifications, Colophon**

`src/components/ProjectIndex.tsx`. Plates arrive in Task 7; until then pass `null` and the frame renders empty.

```tsx
import { projects } from '@/data/projects'
import { plateFor } from './plates/registry'
import ProjectCard from './ProjectCard'
import styles from './ProjectCard.module.css'

export default function ProjectIndex() {
  return (
    <ul className={styles.list}>
      {projects.map((p) => (
        <ProjectCard key={p.slug} project={p} plate={plateFor(p.slug, 'card')} />
      ))}
    </ul>
  )
}
```

Create a stub `src/components/plates/registry.ts` now so the build passes; Task 7 fills it:

```ts
import type { ReactNode } from 'react'

export type PlateSize = 'card' | 'detail'

/** Populated in Task 7 once all fifteen plate components exist. */
export function plateFor(_slug: string, _size: PlateSize): ReactNode {
  return null
}
```

`src/components/Experience.tsx`:

```tsx
import { profile } from '@/data/profile'
import styles from './Experience.module.css'

export default function Experience() {
  const e = profile.experience
  return (
    <div>
      <div className={styles.head}>
        <div>
          <p className={`display-m ${styles.company}`}>{e.company}</p>
          <p className={`body-s ${styles.title}`}>{e.title}</p>
        </div>
        <p className={`label ${styles.dates}`}>{e.start} — {e.end}</p>
      </div>
      {e.groups.map((g) => (
        <div key={g.heading} className={styles.group} data-reveal>
          <h3 className={`label ${styles.groupHead}`}>{g.heading}</h3>
          <ul className={styles.items}>
            {g.items.map((item, i) => (
              <li key={i} className={`body ${styles.item}`}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
```

`src/components/Experience.module.css`:

```css
.head { display: flex; align-items: baseline; justify-content: space-between; gap: var(--s4); padding-bottom: var(--s5); }
.company { }
.title { color: var(--muted); margin-top: var(--s2); }
.dates { color: var(--muted); flex-shrink: 0; }
.group { display: grid; grid-template-columns: 220px 1fr; gap: var(--s5); padding: var(--s4) 0; border-top: 1px solid var(--rule); }
.groupHead { color: var(--accent); padding-top: 5px; }
.items { display: grid; gap: var(--s3); }
.item { position: relative; padding-left: var(--s4); }
.item::before { content: '—'; position: absolute; left: 0; color: var(--muted); }

@media (max-width: 860px) {
  .group { grid-template-columns: 1fr; gap: var(--s3); }
}
```

`src/components/Education.tsx`:

```tsx
import { profile } from '@/data/profile'
import styles from './Education.module.css'

export default function Education() {
  const ed = profile.education
  return (
    <div data-reveal>
      <div className={styles.head}>
        <div>
          <p className={`display-m`}>{ed.school}</p>
          <p className={`body-s ${styles.degree}`}>{ed.degree}</p>
        </div>
        <p className={`label ${styles.dates}`}>{ed.start} — {ed.end}</p>
      </div>
      <h3 className={`label ${styles.courseHead}`}>Coursework</h3>
      <ul className={styles.courses}>
        {ed.coursework.map((c) => (
          <li key={c} className="body-s">{c}</li>
        ))}
      </ul>
    </div>
  )
}
```

`src/components/Education.module.css`:

```css
.head { display: flex; align-items: baseline; justify-content: space-between; gap: var(--s4); }
.degree { color: var(--muted); margin-top: var(--s2); }
.dates { color: var(--muted); flex-shrink: 0; }
.courseHead { color: var(--accent); margin: var(--s5) 0 var(--s3); }
.courses { columns: 3; column-gap: var(--s6); color: var(--muted); }
.courses li { break-inside: avoid; padding: 2px 0; }

@media (max-width: 860px) { .courses { columns: 2; } }
@media (max-width: 520px) { .courses { columns: 1; } }
```

`src/components/Technical.tsx`. Typographic index, explicitly not badge pills (spec §6 rule 9).

```tsx
import { profile } from '@/data/profile'
import styles from './Technical.module.css'

export default function Technical() {
  return (
    <div className={styles.grid}>
      {profile.skills.map((group) => (
        <div key={group.heading} className={styles.group} data-reveal>
          <h3 className={`label ${styles.head}`}>{group.heading}</h3>
          <p className={`body-s ${styles.list}`}>{group.items.join(' · ')}</p>
        </div>
      ))}
    </div>
  )
}
```

`src/components/Technical.module.css`:

```css
.grid { display: grid; gap: 0; }
.group { display: grid; grid-template-columns: 220px 1fr; gap: var(--s5); padding: var(--s4) 0; border-top: 1px solid var(--rule); }
.head { color: var(--accent); padding-top: 4px; }
.list { color: var(--muted); max-width: none; }

@media (max-width: 860px) {
  .group { grid-template-columns: 1fr; gap: var(--s2); }
}
```

`src/components/Certifications.tsx`. Bibliography style with right-aligned dates.

```tsx
import { profile } from '@/data/profile'
import styles from './Certifications.module.css'

export default function Certifications() {
  return (
    <ul className={styles.list}>
      {profile.certifications.map((c) => (
        <li key={c.title} className={styles.row} data-reveal>
          <span className={`body ${styles.title}`}>{c.title}</span>
          <span className={styles.dots} aria-hidden="true" />
          <span className={`label ${styles.date}`}>{c.issuer}, {c.date}</span>
        </li>
      ))}
    </ul>
  )
}
```

`src/components/Certifications.module.css`:

```css
.list { display: grid; }
.row { display: grid; grid-template-columns: auto 1fr auto; align-items: baseline; gap: var(--s3); padding: var(--s3) 0; border-bottom: 1px solid var(--rule); }
.title { max-width: none; }
.dots { border-bottom: 1px dotted var(--rule); transform: translateY(-4px); }
.date { color: var(--muted); }

@media (max-width: 620px) {
  .row { grid-template-columns: 1fr; gap: var(--s1); }
  .dots { display: none; }
}
```

`src/components/Colophon.tsx`:

```tsx
import { profile } from '@/data/profile'
import styles from './Colophon.module.css'

export default function Colophon() {
  return (
    <footer className={styles.colophon}>
      <hr className="rule" data-rule />
      <div className={styles.grid}>
        <div>
          <h3 className={`label ${styles.head}`}>Contact</h3>
          <ul className={styles.links}>
            <li><a className={`body-s link`} href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li><a className={`body-s link`} href={profile.github}>github.com/VincitoreSi</a></li>
            <li><a className={`body-s link`} href={profile.linkedin}>LinkedIn</a></li>
            <li><a className={`body-s link`} href={profile.resume}>Résumé (PDF)</a></li>
          </ul>
        </div>
        <div>
          <h3 className={`label ${styles.head}`}>Colophon</h3>
          <p className={`body-s ${styles.note}`}>{profile.colophon.note}</p>
        </div>
      </div>
      <p className={`label-s ${styles.sig}`}>{profile.name} · {profile.location}</p>
    </footer>
  )
}
```

`src/components/Colophon.module.css`:

```css
.colophon { margin-top: var(--s7); padding-bottom: var(--s6); }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--s6); padding: var(--s5) 0; }
.head { color: var(--accent); margin-bottom: var(--s3); }
.links { display: grid; gap: var(--s2); }
.note { color: var(--muted); }
.sig { color: var(--muted); padding-top: var(--s4); border-top: 1px solid var(--rule); }

@media (max-width: 720px) { .grid { grid-template-columns: 1fr; gap: var(--s4); } }
```

- [ ] **Step 6: Compose the home page**

`src/app/page.tsx`:

```tsx
import Masthead from '@/components/Masthead'
import Lede from '@/components/Lede'
import Section from '@/components/Section'
import ProjectIndex from '@/components/ProjectIndex'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Technical from '@/components/Technical'
import Certifications from '@/components/Certifications'
import Colophon from '@/components/Colophon'

export default function Home() {
  return (
    <main className="shell">
      <Masthead />
      <Lede />
      <Section number="01" title="Selected Work"><ProjectIndex /></Section>
      <Section number="02" title="Experience"><Experience /></Section>
      <Section number="03" title="Education"><Education /></Section>
      <Section number="04" title="Technical"><Technical /></Section>
      <Section number="05" title="Certifications"><Certifications /></Section>
      <Colophon />
    </main>
  )
}
```

- [ ] **Step 7: Verify the static page is complete and slop-free**

```bash
npm run build
grep -c 'gradient\|backdrop-filter' out/_next/static/css/*.css || echo "0 gradients/backdrop — ok"
grep -o 'Selected Work' out/index.html
grep -c 'FIG\.' out/index.html      # expect 15
npx tsc --noEmit
```

Expected: build clean, zero gradients, `Selected Work` present, 15 `FIG.` occurrences, `tsc` clean.

- [ ] **Step 8: Verify readability with JavaScript disabled**

Serve the export and load it with JS off in the browser.

```bash
npx serve out -l 4173
```

Expected: every section readable, all fifteen cards visible with real text, both themes reachable via OS setting. Nothing invisible. The theme toggle button will not respond — that is correct and acceptable.

- [ ] **Step 9: Commit and push**

```bash
git add -A
git commit -m "feat: static home page with all content and uniform project cards"
git push
```

---

### Task 5: Vertical slice — Plate primitive, DetailShell, and the PageIndex exemplar

Build one complete detail page end to end before parallelizing. The fifteen workers in Task 7 copy a proven pattern instead of inventing fifteen interpretations of it.

**Files:**
- Create: `src/components/Plate.tsx` `.module.css`, `src/components/DetailShell.tsx` `.module.css`, `src/app/work/[slug]/page.tsx`, `src/app/not-found.tsx`, `src/data/projects/pageindex.ts`, `src/components/plates/PageIndexPlate.tsx`
- Modify: `src/components/plates/registry.ts`

**Interfaces:**
- Consumes: `ProjectMeta`, `ProjectDetail`, `projects`, `REPO_BASE`.
- Produces: `<Plate fig={n} caption={s} size="card"|"detail">{svg}</Plate>`; `<DetailShell meta detail plate />`; `plateFor(slug, size)`; the plate component contract every Task 7 worker implements.

- [ ] **Step 1: Write the Plate wrapper**

`src/components/Plate.tsx`:

```tsx
import type { ReactNode } from 'react'
import styles from './Plate.module.css'

export default function Plate({
  fig, caption, children,
}: { fig: number; caption: string; children: ReactNode }) {
  return (
    <figure className={styles.plate} data-plate>
      <div className={styles.frame}>{children}</div>
      <figcaption className={`body-s ${styles.caption}`}>
        <span className="label-s">Fig. {fig}</span> {caption}
      </figcaption>
    </figure>
  )
}
```

`src/components/Plate.module.css`:

```css
.plate { margin: var(--s6) 0; }
.frame { border: 1px solid var(--rule); padding: var(--s5); color: var(--ink); }
.frame svg { width: 100%; height: auto; }
.caption { color: var(--muted); padding-top: var(--s3); max-width: var(--measure); }
.caption span { color: var(--accent); margin-right: var(--s2); }
```

- [ ] **Step 2: Write the PageIndex plate — the reference implementation**

`src/components/plates/PageIndexPlate.tsx`. Every Task 7 plate follows this contract exactly: a single `<svg>`, `viewBox="0 0 640 360"`, `fill="none"`, `stroke="currentColor"`, `data-draw` on each drawable path, `data-draw-accent` on the one or two paths that should ink in `--accent`.

```tsx
export default function PageIndexPlate() {
  return (
    <svg viewBox="0 0 640 360" fill="none" stroke="currentColor" strokeWidth="1.1"
         role="img" aria-label="A document tree with one traversal path highlighted from root to leaf.">
      {/* root */}
      <rect x="264" y="26" width="112" height="34" data-draw />
      <text x="320" y="48" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="11" fontFamily="var(--font-mono), monospace" letterSpacing="1.4">DOC ToC</text>

      {/* level 1 */}
      <path d="M320 60v28M320 88H120M320 88h200M120 88v26M520 88v26M320 88v26" data-draw />
      <rect x="64" y="114" width="112" height="30" data-draw />
      <rect x="264" y="114" width="112" height="30" data-draw />
      <rect x="464" y="114" width="112" height="30" data-draw />

      {/* level 2 */}
      <path d="M120 144v24M120 168H72M120 168h96M72 168v22M168 168v22" data-draw />
      <path d="M320 144v24M320 168h-48M320 168h96M272 168v22M416 168v22" data-draw-accent />
      <path d="M520 144v24M520 168h-40M520 168h80M480 168v22M600 168v22" data-draw />

      <rect x="36" y="190" width="72" height="26" data-draw />
      <rect x="132" y="190" width="72" height="26" data-draw />
      <rect x="236" y="190" width="72" height="26" data-draw />
      <rect x="380" y="190" width="72" height="26" data-draw-accent />
      <rect x="444" y="190" width="72" height="26" data-draw />
      <rect x="564" y="190" width="72" height="26" data-draw />

      {/* traversal descent to the selected leaf */}
      <path d="M416 216v40" data-draw-accent />
      <rect x="356" y="256" width="120" height="38" data-draw-accent />
      <text x="416" y="280" textAnchor="middle" fill="currentColor" stroke="none"
            fontSize="10.5" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">ANSWER SPAN</text>

      {/* annotation: no embeddings anywhere */}
      <path d="M40 300h180" strokeDasharray="3 4" data-draw />
      <text x="40" y="322" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">NO EMBEDDINGS</text>
      <text x="40" y="338" fill="currentColor" stroke="none"
            fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="1.2">LLM-GUIDED DESCENT</text>
    </svg>
  )
}
```

- [ ] **Step 3: Write the PageIndex detail content**

`src/data/projects/pageindex.ts`. Transcribed from `../TusharKumar/particulars.tex` lines 126–134. No invented claims.

```ts
import type { ProjectDetail } from '../types'

const detail: ProjectDetail = {
  slug: 'pageindex',
  summary:
    'A retrieval engine written in Rust that answers questions over a document corpus without computing a single embedding. Instead of a vector index it builds a hierarchical table of contents and lets the model walk it.',
  plateCaption:
    'Hierarchical table of contents with an LLM-guided descent, from root to the answer span. No embedding is computed at any stage.',
  blocks: [
    {
      heading: 'Problem',
      body: [
        'The default answer to retrieval is a vector database: embed every chunk, embed the query, take the nearest neighbours. It works, and it brings an embedding model, a vector store, a dimensionality choice, and a re-indexing job along with it. For a corpus that already has structure — chapters, sections, headings — that machinery discards the very thing that makes the document navigable.',
      ],
    },
    {
      heading: 'Approach',
      body: [
        'PageIndex generates a hierarchical table of contents for the corpus and treats retrieval as traversal. The model is given the current level of the tree and asked which branch to descend, repeatedly, until it reaches a span small enough to answer from. Selection is a reasoning step over structure rather than a distance computation in a latent space.',
        'The index is stored in SQLite, so state is a single file with no service to run. Ingestion handles markdown, plain text, PDF, and ZIP archives, walking directories recursively, and the whole thing ships as one Rust binary.',
      ],
    },
    {
      heading: 'Key decisions',
      body: [
        'A multi-provider abstraction sits behind the traversal step, so OpenAI, Grok, Gemini, Claude, or a custom endpoint are interchangeable. Traversal is the only place a model is called, which keeps that seam narrow and makes provider comparison a configuration change.',
        'Queries execute asynchronously against the SQLite-backed index, which is what holds lookups under 200 milliseconds despite the model being in the retrieval path.',
      ],
    },
    {
      heading: 'Result',
      body: [
        'A single-binary CLI that does retrieval with no embeddings, no vector store, and no re-indexing step, with sub-200ms lookups against a SQLite index.',
      ],
    },
  ],
  metrics: [
    { value: '200', label: 'ms lookup ceiling' },
    { value: '5', label: 'interchangeable LLM providers' },
    { value: '0', label: 'embeddings computed' },
  ],
  stackFull: ['Rust', 'SQLite', 'async-openai', 'serde', 'Tokio'],
}

export default detail
```

- [ ] **Step 4: Write the DetailShell**

`src/components/DetailShell.tsx`. Shared chrome; the content inside is what varies per project.

```tsx
import Link from 'next/link'
import type { ReactNode } from 'react'
import type { ProjectDetail, ProjectMeta } from '@/data/types'
import { REPO_BASE } from '@/data/types'
import ThemeToggle from './ThemeToggle'
import Plate from './Plate'
import Colophon from './Colophon'
import styles from './DetailShell.module.css'

export default function DetailShell({
  meta, detail, plate,
}: { meta: ProjectMeta; detail: ProjectDetail; plate: ReactNode }) {
  return (
    <main className="shell">
      <header className={styles.top}>
        <Link href="/" className={`label link ${styles.back}`}>← Index</Link>
        <ThemeToggle />
      </header>
      <hr className="rule" data-rule />

      <div className={styles.head}>
        <span className={`label ${styles.fig}`}>Fig. {meta.fig}</span>
        <h1 className={`display-l ${styles.title}`} data-split="line">{meta.title}</h1>
        <span className={`label ${styles.year}`}>{meta.year}</span>
      </div>

      <p className={`body-l ${styles.summary}`} data-reveal>{detail.summary}</p>

      {plate ? <Plate fig={meta.fig} caption={detail.plateCaption}>{plate}</Plate> : null}

      {detail.confidential ? (
        <p className={`body-s ${styles.note}`} data-reveal>
          This was built inside Samsung. What follows is the engineering pattern and the
          outcomes stated on my résumé — the approach, not the internal implementation.
        </p>
      ) : null}

      {detail.metrics.length > 0 ? (
        <ul className={styles.metrics} data-reveal>
          {detail.metrics.map((m) => (
            <li key={m.label} className={styles.metric}>
              <span className={`display-m ${styles.metricValue}`} data-count>{m.value}</span>
              <span className={`label-s ${styles.metricLabel}`}>{m.label}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {detail.blocks.map((block) => (
        <section key={block.heading} className={styles.block} data-reveal>
          <h2 className={`label ${styles.blockHead}`}>{block.heading}</h2>
          <div className={styles.blockBody}>
            {block.body.map((para, i) => (
              <p key={i} className="body">{para}</p>
            ))}
          </div>
        </section>
      ))}

      <section className={styles.block} data-reveal>
        <h2 className={`label ${styles.blockHead}`}>Stack</h2>
        <div className={styles.blockBody}>
          <p className={`body-s ${styles.stack}`}>{detail.stackFull.join(' · ')}</p>
          {meta.repo ? (
            <p className={styles.repo}>
              <a className={`label link`} href={`${REPO_BASE}/${meta.repo}`}>
                Source — github.com/VincitoreSi/{meta.repo}
              </a>
            </p>
          ) : null}
        </div>
      </section>

      <Colophon />
    </main>
  )
}
```

`src/components/DetailShell.module.css`:

```css
.top { display: flex; align-items: center; justify-content: space-between; padding: var(--s4) 0 var(--s3); }
.back { color: var(--muted); }
.head { display: grid; grid-template-columns: 58px 1fr auto; align-items: baseline; gap: var(--s4); padding: var(--s6) 0 var(--s4); }
.fig { color: var(--accent); }
.year { color: var(--muted); }
.summary { color: var(--muted); padding-bottom: var(--s4); }
.note { color: var(--muted); border-left: 1px solid var(--accent); padding-left: var(--s4); margin: var(--s5) 0; max-width: var(--measure); }
.metrics { display: flex; flex-wrap: wrap; gap: var(--s6); padding: var(--s5) 0; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
.metric { display: grid; gap: var(--s2); }
.metricValue { color: var(--accent); }
.metricLabel { color: var(--muted); }
.block { display: grid; grid-template-columns: 220px 1fr; gap: var(--s5); padding: var(--s5) 0; border-bottom: 1px solid var(--rule); }
.blockHead { color: var(--accent); padding-top: 5px; }
.blockBody { display: grid; gap: var(--s4); }
.stack { color: var(--muted); max-width: none; }
.repo { margin-top: var(--s2); }

@media (max-width: 860px) {
  .head { grid-template-columns: 1fr auto; }
  .block { grid-template-columns: 1fr; gap: var(--s3); }
}
```

- [ ] **Step 5: Write the detail route and not-found**

`src/app/work/[slug]/page.tsx`:

```tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { projects } from '@/data/projects'
import type { ProjectDetail } from '@/data/types'
import DetailShell from '@/components/DetailShell'
import { plateFor } from '@/components/plates/registry'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export const dynamicParams = false

async function loadDetail(slug: string): Promise<ProjectDetail | null> {
  try {
    const mod = await import(`@/data/projects/${slug}`)
    return mod.default as ProjectDetail
  } catch {
    return null
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const meta = projects.find((p) => p.slug === slug)
  if (!meta) return {}
  return {
    title: `${meta.title} — Tushar Kumar`,
    description: meta.tagline,
  }
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const meta = projects.find((p) => p.slug === slug)
  if (!meta) notFound()

  const detail = await loadDetail(slug)
  if (!detail) notFound()

  return <DetailShell meta={meta} detail={detail} plate={plateFor(slug, 'detail')} />
}
```

`src/app/not-found.tsx`:

```tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="shell">
      <p className="label accent" style={{ paddingTop: 'var(--s7)' }}>404</p>
      <h1 className="display-l" style={{ margin: 'var(--s4) 0' }}>No such page</h1>
      <p className="body muted">That route is not part of this document.</p>
      <p style={{ marginTop: 'var(--s5)' }}>
        <Link className="label link" href="/">← Index</Link>
      </p>
    </main>
  )
}
```

- [ ] **Step 6: Wire the registry for the one plate that exists**

Replace `src/components/plates/registry.ts`:

```tsx
import type { ReactNode } from 'react'
import PageIndexPlate from './PageIndexPlate'

export type PlateSize = 'card' | 'detail'

const PLATES: Record<string, () => ReactNode> = {
  pageindex: PageIndexPlate,
}

export function plateFor(slug: string, _size: PlateSize): ReactNode {
  const Component = PLATES[slug]
  return Component ? <Component /> : null
}
```

Rename the file to `registry.tsx` since it now contains JSX, and update the two import sites (`ProjectIndex.tsx`, `work/[slug]/page.tsx`) — the extensionless `@/components/plates/registry` specifier resolves either way, so no import text changes.

- [ ] **Step 7: Verify the exemplar route renders and exports**

```bash
npm run build
test -f out/work/pageindex/index.html && echo "ROUTE OK"
grep -o 'NO EMBEDDINGS' out/work/pageindex/index.html
grep -c 'out/work' /dev/null; ls out/work | head -20
npx tsc --noEmit
```

Expected: `ROUTE OK`, the plate text found in the exported HTML (proving inline SVG, not a raster), and `ls out/work` listing all fifteen slug directories. Fourteen render without a plate for now, which is correct at this stage.

- [ ] **Step 8: Verify the back-link works from a cold load**

```bash
npx serve out -l 4173
```

Load `http://localhost:4173/work/pageindex/` directly — not by clicking through from home — and click `← Index`. Expected: home page loads, no 404, correct theme retained.

- [ ] **Step 9: Commit and push**

```bash
git add -A
git commit -m "feat: plate primitive, detail shell, and PageIndex exemplar page"
git push
```

---

### Task 6: GSAP motion layer with a real reduced-motion fallback

Applied to markup that is already complete and readable. Every animation targets a `data-` attribute placed in Tasks 4 and 5, so no component markup changes here.

**Files:**
- Create: `src/components/motion/GsapProvider.tsx`
- Modify: `src/app/layout.tsx` (mount the provider)

**Interfaces:**
- Consumes: `data-split="line"`, `data-split="word"`, `data-rule`, `data-reveal`, `data-plate`, `data-count` — already present in the markup.
- Produces: `<GsapProvider />`, mounted once in the layout.

- [ ] **Step 1: Write the provider**

`src/components/motion/GsapProvider.tsx`. One `matchMedia` with two branches, per spec §4. The reduced branch sets final state; it does not merely skip the animation.

```tsx
'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(SplitText, ScrollTrigger)

export default function GsapProvider() {
  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const splits: SplitText[] = []

      document.querySelectorAll<HTMLElement>('[data-split="line"]').forEach((el) => {
        const split = SplitText.create(el, { type: 'lines', mask: 'lines', autoSplit: true })
        splits.push(split)
        gsap.from(split.lines, {
          yPercent: 105, duration: 1.0, ease: 'expo.out', stagger: 0.13,
        })
      })

      document.querySelectorAll<HTMLElement>('[data-split="word"]').forEach((el) => {
        const split = SplitText.create(el, { type: 'words', mask: 'words', autoSplit: true })
        splits.push(split)
        gsap.from(split.words, {
          yPercent: 100, duration: 0.8, ease: 'expo.out', stagger: 0.04,
          scrollTrigger: { trigger: el, start: 'top 80%' },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-rule]').forEach((el) => {
        gsap.from(el, {
          scaleX: 0, transformOrigin: 'left center', duration: 1.0, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 9, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-plate]').forEach((plate) => {
        const paths = plate.querySelectorAll<SVGGeometryElement>('[data-draw], [data-draw-accent]')
        paths.forEach((p) => {
          const len = p.getTotalLength ? p.getTotalLength() : 400
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
        })
        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: { trigger: plate, start: 'top 75%' },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const target = parseFloat(el.textContent ?? '0')
        if (Number.isNaN(target)) return
        const obj = { n: 0 }
        gsap.to(obj, {
          n: target, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
          onUpdate: () => { el.textContent = String(Math.round(obj.n)) },
        })
      })

      return () => { splits.forEach((s) => s.revert()) }
    })

    mm.add('(prefers-reduced-motion: reduce)', () => {
      // Final state, explicitly. The failure being prevented is elements
      // stranded at opacity 0 forever.
      gsap.set('[data-reveal], [data-split="line"], [data-split="word"]', { opacity: 1, y: 0, clearProps: 'transform' })
      gsap.set('[data-rule]', { scaleX: 1 })
      gsap.set('[data-plate] [data-draw], [data-plate] [data-draw-accent]', {
        strokeDasharray: 'none', strokeDashoffset: 0,
      })
    })

    return () => mm.revert()
  }, [])

  return null
}
```

- [ ] **Step 2: Style the accent-inked plate paths**

Append to `src/app/globals.css`:

```css
[data-draw-accent] { stroke: var(--accent); }
```

- [ ] **Step 3: Mount the provider**

In `src/app/layout.tsx`, import and render inside `<body>` after `{children}`:

```tsx
import GsapProvider from '@/components/motion/GsapProvider'
```

```tsx
      <body>
        {children}
        <GsapProvider />
      </body>
```

- [ ] **Step 4: Verify the build and the JS budget**

```bash
npm run build
find out/_next/static -name '*.js' -exec gzip -c {} \; | wc -c
```

Expected: clean build; total gzipped JS under 97280 bytes (95 KB). If over, drop `CountUp` before dropping `SplitText` — the metric count-up is the least load-bearing animation on the page.

- [ ] **Step 5: Verify reduced motion leaves nothing stranded**

The specific check the spec calls for, done by toggling the OS setting rather than reading the CSS.

```bash
npx serve out -l 4173
```

On macOS enable System Settings → Accessibility → Display → Reduce motion. Reload `http://localhost:4173/` and `http://localhost:4173/work/pageindex/`.

Expected: all text visible immediately, rules at full width, the plate fully inked, metric numbers at final value, nothing faded or clipped. Then disable the setting, reload, and confirm the animations run.

- [ ] **Step 6: Verify SplitText accessibility**

With animations on, select the name heading and the "Selected Work" title, copy, and paste into a text editor.

Expected: they paste as whole sentences, not as one character or word per line. Then run VoiceOver over both headings and confirm they read as sentences.

- [ ] **Step 7: Commit and push**

```bash
git add -A
git commit -m "feat: GSAP motion layer with reduced-motion final-state fallback"
git push
```

---

### Task 7: Parallel fan-out — fourteen detail pages and fourteen plates

Dispatch fourteen workers concurrently. Each owns exactly two files that nobody else touches, so there is no shared state, no conflict, and no need for git worktrees.

**Files:**
- Create, per worker: `src/data/projects/<slug>.ts` and `src/components/plates/<Name>Plate.tsx`
- Modify, by the coordinator after all workers finish: `src/components/plates/registry.tsx`

**Interfaces:**
- Consumes: the `ProjectDetail` type from Task 3; the `pageindex.ts` and `PageIndexPlate.tsx` exemplars from Task 5.
- Produces: fifteen `ProjectDetail` default exports and fifteen plate components, all registered.

- [ ] **Step 1: Dispatch the fourteen workers**

One worker per slug, all fourteen concurrently. Every worker receives this brief with `<slug>`, `<Name>`, `<depth>`, and `<source>` substituted:

> Write exactly two new files for the project `<slug>` in the repo at
> `/Users/vincitoresi/personal/VincitoreSi.github.io`. Create no other files and modify
> none.
>
> **1. `src/data/projects/<slug>.ts`** — a `ProjectDetail` default export. Read
> `src/data/types.ts` for the interface and `src/data/projects/pageindex.ts` as the
> reference for depth, voice, and structure.
>
> **2. `src/components/plates/<Name>Plate.tsx`** — a default-exported React component
> returning one inline `<svg viewBox="0 0 640 360" fill="none" stroke="currentColor"
> strokeWidth="1.1">`. Read `src/components/plates/PageIndexPlate.tsx` and follow its
> contract exactly: `data-draw` on every drawable path, `data-draw-accent` on the one or
> two paths carrying the accent, a `role="img"` with a real `aria-label` describing the
> figure, and mono `<text>` labels via `fontFamily="var(--font-mono), monospace"`.
>
> **Content source:** `<source>`. Transcribe from it. Do not invent metrics,
> technologies, dates, or outcomes. If the source gives you two bullets, write two
> bullets' worth — a short page is correct and a padded one is not.
>
> **Depth `<depth>`:** `full` means four blocks — Problem, Approach, Key decisions,
> Result. `short` means a single block headed `Overview`, two to four sentences.
>
> **The plate must depict this project's actual architecture**, not a generic box
> diagram. It is the customization that makes the page worth having. Draw the real data
> flow: what enters, what transforms it, what leaves.
>
> **Hard constraints.** No gradients, no filters, no `box-shadow`, no `border-radius`
> above 3px, no emoji, no raster images, no colors other than `currentColor` and the
> accent via `data-draw-accent`. Never write the words passionate, cutting-edge,
> innovative, or seamless. Set `repo` nowhere — it lives in `projects.ts` already.
>
> Verify before returning: `npx tsc --noEmit` is clean.

Worker assignments:

| slug | component | depth | source |
|---|---|---|---|
| `the-cutting-room` | `TheCuttingRoomPlate` | full | `../TusharKumar/particulars.tex` lines 115–124 |
| `echolearn` | `EchoLearnPlate` | full | `../TusharKumar/particulars.tex` lines 94–103 **plus the §5.1 brief below** |
| `adaptive-reels` | `AdaptiveReelsPlate` | full | `../TusharKumar/particulars.tex` lines 105–113 **plus the §5.1 brief below** |
| `ntk-pruning` | `NtkPruningPlate` | full | `particulars.tex` 136–144, `projects.txt` 7–14 |
| `table-structure-recognition` | `TableStructurePlate` | short | `particulars.tex` 173–181, `projects.txt` 1–6 |
| `facial-emotion-recognition` | `FacialEmotionPlate` | short | `particulars.tex` 163–171 |
| `electronic-nose` | `ElectronicNosePlate` | short | `main-airag.tex` 137–145 |
| `hardware-patch-generation` | `HardwarePatchPlate` | short | `particulars.tex` 76–83, `projects.txt` 41–52 |
| `dbms-normalization` | `DbmsNormalizationPlate` | short | `particulars.tex` 84–91, `projects.txt` 29–40 |
| `toxic-comment-classification` | `ToxicCommentPlate` | short | `particulars.tex` 183–190 |
| `sketch-colorization` | `SketchColorizationPlate` | short | `particulars.tex` 145–152, `projects.txt` 53–61 |
| `cnn-optimization` | `CnnOptimizationPlate` | short | `projects.txt` 15–17 |
| `covid-dashboard` | `CovidDashboardPlate` | short | `projects.txt` 18–28 |
| `process-scheduling-visualizer` | `ProcessSchedulingPlate` | short | `projects.txt` 62–67 |

**Additional brief for `echolearn` and `adaptive-reels` only.** Append verbatim to those two workers:

> This is Samsung internal work. Set `confidential: true` in the `ProjectDetail`.
>
> **Publish:** the general engineering pattern and the outcomes already on the résumé.
> For EchoLearn, a duplex audio stream with a barge-in interrupt against a sub-200ms
> budget, and the retrieval pattern in generic terms — semantic chunking, hybrid sparse
> and dense retrieval, cross-encoder reranking, tenant-isolated namespaces. For Adaptive
> Reels, an event-driven expansion pipeline with schema-constrained model output and
> queue-depth autoscaling. Metrics only as stated on the résumé: 100+ hours of content,
> 5,000+ students.
>
> **Never publish:** internal Samsung service or component names, table schemas, queue
> or topic names, infrastructure topology, cost figures, or model configuration. Do not
> read or draw from any PDF in `../TusharKumar` — the LLD documents there are out of
> bounds for this page.
>
> **Frame it as "how I approach this class of problem," not "here is our production
> architecture."** Draw the plate as a *pattern*, with generic node labels such as
> `INGEST`, `RETRIEVE`, `RERANK`, `STREAM` — never a Samsung system diagram.

- [ ] **Step 2: Write the full registry**

Once all fourteen workers have returned, replace `src/components/plates/registry.tsx`:

```tsx
import type { ReactNode } from 'react'
import PageIndexPlate from './PageIndexPlate'
import TheCuttingRoomPlate from './TheCuttingRoomPlate'
import EchoLearnPlate from './EchoLearnPlate'
import AdaptiveReelsPlate from './AdaptiveReelsPlate'
import NtkPruningPlate from './NtkPruningPlate'
import TableStructurePlate from './TableStructurePlate'
import FacialEmotionPlate from './FacialEmotionPlate'
import ElectronicNosePlate from './ElectronicNosePlate'
import HardwarePatchPlate from './HardwarePatchPlate'
import DbmsNormalizationPlate from './DbmsNormalizationPlate'
import ToxicCommentPlate from './ToxicCommentPlate'
import SketchColorizationPlate from './SketchColorizationPlate'
import CnnOptimizationPlate from './CnnOptimizationPlate'
import CovidDashboardPlate from './CovidDashboardPlate'
import ProcessSchedulingPlate from './ProcessSchedulingPlate'

export type PlateSize = 'card' | 'detail'

const PLATES: Record<string, () => ReactNode> = {
  'pageindex': PageIndexPlate,
  'the-cutting-room': TheCuttingRoomPlate,
  'echolearn': EchoLearnPlate,
  'adaptive-reels': AdaptiveReelsPlate,
  'ntk-pruning': NtkPruningPlate,
  'table-structure-recognition': TableStructurePlate,
  'facial-emotion-recognition': FacialEmotionPlate,
  'electronic-nose': ElectronicNosePlate,
  'hardware-patch-generation': HardwarePatchPlate,
  'dbms-normalization': DbmsNormalizationPlate,
  'toxic-comment-classification': ToxicCommentPlate,
  'sketch-colorization': SketchColorizationPlate,
  'cnn-optimization': CnnOptimizationPlate,
  'covid-dashboard': CovidDashboardPlate,
  'process-scheduling-visualizer': ProcessSchedulingPlate,
}

export function plateFor(slug: string, _size: PlateSize): ReactNode {
  const Component = PLATES[slug]
  return Component ? <Component /> : null
}
```

- [ ] **Step 3: Verify every file landed and every route exports**

```bash
npm run audit                        # all 15 detail: lines pass, no orphans
ls src/components/plates/*Plate.tsx | wc -l    # expect 15
npx tsc --noEmit
npm run build
ls out/work | wc -l                  # expect 15
for d in out/work/*/; do test -f "$d/index.html" || echo "MISSING $d"; done
```

Expected: audit clean, 15 plates, `tsc` clean, 15 route directories each with `index.html`, no `MISSING` lines.

- [ ] **Step 4: Verify the confidentiality boundary held**

The one check no automated grep fully covers, so it is explicit and manual.

```bash
grep -rniE 'samsung' src/data/projects/echolearn.ts src/data/projects/adaptive-reels.ts
grep -rn 'confidential: true' src/data/projects/ | wc -l   # expect 2
```

Then read both files end to end. Expected: `confidential: true` on exactly those two; no internal service names, schemas, queue or topic names, topology, cost figures, or model configuration anywhere; framing is the approach rather than a production architecture. Rewrite anything that reads as a Samsung system description.

- [ ] **Step 5: Verify every plate is genuinely distinct**

Load all fifteen detail pages and look at them.

```bash
npm run build && npx serve out -l 4173
```

Expected: no two plates are the same drawing with different labels. A plate that is a generic three-box flow has failed its purpose — send that slug back with a note about what its actual architecture is.

- [ ] **Step 6: Commit and push**

```bash
git add -A
git commit -m "feat: fifteen customized project detail pages with inked SVG plates"
git push
```

---

### Task 8: Audit — anti-slop greps, accessibility, performance, and the live site

**Files:**
- Modify: `scripts/audit.mjs` (add CSS and copy checks)

**Interfaces:**
- Consumes: the built `out/` directory.
- Produces: a passing `npm run audit` and the spec §10 exit criteria met.

- [ ] **Step 1: Add the anti-slop checks to the audit script**

Append to `scripts/audit.mjs`, before the summary lines. Each rule maps to a numbered item in spec §6.

```js
// ---- anti-slop, spec §6 ----
if (existsSync('out')) {
  const cssDir = 'out/_next/static/css'
  const css = existsSync(cssDir)
    ? readdirSync(cssDir).filter((f) => f.endsWith('.css'))
        .map((f) => readFileSync(join(cssDir, f), 'utf8')).join('\n')
    : ''

  const forbidden = [
    [/gradient/i, 'gradient (rule 1)'],
    [/backdrop-filter/i, 'backdrop-filter (rule 4)'],
    [/#(6|7|8|9)[0-9a-f]{2}(f|e)[0-9a-f]|purple|indigo|violet/i, 'purple family (rule 5)'],
    [/font-family:[^;}]*\b(Inter|Geist)\b/i, 'Inter or Geist (rule 6)'],
  ]
  for (const [re, label] of forbidden) {
    re.test(css) ? fail(`CSS contains ${label}`) : pass(`no ${label}`)
  }

  const radii = [...css.matchAll(/border-radius:\s*([\d.]+)px/g)].map((m) => Number(m[1]))
  const worst = radii.length ? Math.max(...radii) : 0
  worst <= 3 ? pass(`max border-radius ${worst}px (rule 3)`) : fail(`border-radius ${worst}px exceeds 3px (rule 3)`)

  const shadows = (css.match(/box-shadow/g) ?? []).length
  shadows <= 1 ? pass(`box-shadow count ${shadows} (rule 2)`) : fail(`${shadows} box-shadows, only the theme toggle is permitted (rule 2)`)

  // copy checks across every exported page
  const html = readdirSync('out', { recursive: true })
    .filter((f) => String(f).endsWith('.html'))
    .map((f) => readFileSync(join('out', String(f)), 'utf8')).join('\n')

  const banned = [
    [/passionate|cutting-edge|innovative|seamless/i, 'banned adjective (rule 16)'],
    [/Hi,? I'?m /i, '"Hi, I\'m" hero copy (rule 8)'],
    [/Let'?s build something together/i, '"Let\'s build something together" (rule 15)'],
    [/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u, 'emoji (rule 7)'],
  ]
  for (const [re, label] of banned) {
    re.test(html) ? fail(`HTML contains ${label}`) : pass(`no ${label}`)
  }

  const figCount = (html.match(/Fig\. \d+/g) ?? []).length
  figCount >= 15 ? pass(`${figCount} figure captions`) : fail(`only ${figCount} figure captions, expected >= 15`)
}
```

- [ ] **Step 2: Run the full audit**

```bash
npm run build
npm run audit; echo "exit=$?"
```

Expected: every line `ok`, `all checks passed`, `exit=0`. Fix any failure in the source rather than by loosening the check.

- [ ] **Step 3: Measure the JS budget**

```bash
find out/_next/static -name '*.js' -exec gzip -c {} \; | wc -c
```

Expected: under 97280 bytes. Record the actual number in the commit message.

- [ ] **Step 4: Run Lighthouse on mobile**

```bash
npx serve out -l 4173 &
npx lighthouse http://localhost:4173/ --preset=desktop --quiet --chrome-flags="--headless" --output=json --output-path=/tmp/lh-desktop.json
npx lighthouse http://localhost:4173/ --quiet --chrome-flags="--headless" --output=json --output-path=/tmp/lh-mobile.json
node -e "for (const f of ['/tmp/lh-mobile.json','/tmp/lh-desktop.json']) { const r = require(f).categories; console.log(f, 'perf', r.performance.score*100, 'a11y', r.accessibility.score*100) }"
```

Expected: mobile performance ≥ 90, accessibility 100, CLS < 0.1. If accessibility is short of 100, fix the reported audit; do not accept 96.

- [ ] **Step 5: Verify both themes on the live site**

```bash
git push
gh run watch --exit-status
curl -sS -o /dev/null -w '%{http_code}\n' https://vincitoresi.github.io/
for s in pageindex the-cutting-room echolearn adaptive-reels ntk-pruning \
         table-structure-recognition facial-emotion-recognition electronic-nose \
         hardware-patch-generation dbms-normalization toxic-comment-classification \
         sketch-colorization cnn-optimization covid-dashboard process-scheduling-visualizer; do
  printf '%-32s %s\n' "$s" "$(curl -sS -o /dev/null -w '%{http_code}' https://vincitoresi.github.io/work/$s/)"
done
curl -sS -o /dev/null -w 'resume %{http_code}\n' https://vincitoresi.github.io/tushar-kumar-resume.pdf
```

Expected: `200` for the home page, all fifteen routes, and the résumé PDF.

- [ ] **Step 6: Final read-through in the browser**

Load the live site on a phone-width viewport in both themes. Read it as a hiring manager would, for twenty seconds.

Expected: within twenty seconds it is clear this person is an AI engineer at Samsung R&D, from IIT Jodhpur, who builds retrieval systems. If that does not land, the lede needs rewriting, not the design.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: audit checks for anti-slop rules, contrast, and copy"
git push
```

---

## Self-Review

**Spec coverage.** §1 → Task 8 Step 6. §2 → Tasks 4, 5. §3 typography → Task 2 Steps 2–3; color → Task 2 Step 2 with ratios verified in Step 6; grid and space → Task 2 Step 2. §4 → Task 6, with the reduced-motion requirement as its own verification step. §5 home structure → Task 4 Step 6; project card → Task 4 Step 4; detail pages → Tasks 5, 7. §5.1 → Task 7 Steps 1 and 4, plus a Global Constraint. §6 → automated in Task 8 Step 1, binding on every task via Global Constraints. §7 → Tasks 1, 2. §8 → the eight tasks, in order. §9 resolved decisions → encoded in `projects.ts` and `profile.ts` in Task 3. §10 → Task 8.

**Two deliberate departures from spec §8**, both improvements rather than omissions:

1. Spec step 4 builds five plates as a batch and step 7 the remaining ten. This plan builds *one* plate and one detail page as a complete vertical slice (Task 5), then fans out all fourteen remaining at once (Task 7). Fifteen parallel workers copying a proven reference produce more consistent output than two sequential batches, and the exemplar is the thing that makes the fan-out brief short enough to be followed.
2. Spec step 6 builds detail pages before step 7's plates. Here each worker writes its page *and* its plate together, because the plate is that page's customization — splitting them would mean two passes over the same source material.

**Type consistency.** `ProjectMeta`, `ProjectDetail`, `DetailBlock`, `Metric`, `Depth`, `REPO_BASE` are defined once in Task 3 Step 1 and used unchanged in Tasks 4, 5, and 7. `plateFor(slug, size)` has the same signature in its Task 4 stub, its Task 5 single-entry version, and its Task 7 full version. `THEME_SCRIPT` is defined in Task 2 Step 1 and consumed in Step 3. Motion selectors `data-split` / `data-rule` / `data-reveal` / `data-plate` / `data-count` / `data-draw` / `data-draw-accent` are placed in Tasks 4 and 5 and consumed in Task 6 — no selector is animated that is not written into the markup first.

**No placeholders.** Every code step contains the actual code. The only intentionally provisional artifact is the `plateFor` stub in Task 4 Step 5, which exists so Task 4 builds before plates are written and is replaced in Task 5 Step 6 and again in Task 7 Step 2.

**Testing approach.** There is no unit-test suite. This is a static, single-author document site with no business logic; the meaningful verification is that it builds, exports every route, passes the greppable design rules, holds its contrast and JS budgets, and stays readable with JS off and reduced motion on. `scripts/audit.mjs` carries the checks that would otherwise be untested assertions, and Task 3 Step 5 proves the script actually fails on a real error before fifteen parallel workers depend on it.
