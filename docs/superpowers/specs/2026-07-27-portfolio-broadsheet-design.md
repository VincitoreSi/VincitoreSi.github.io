# Portfolio Site — "Broadsheet" Design Spec

**Date:** 2026-07-27
**Subject:** Tushar Kumar — AI Engineer
**Status:** awaiting review

---

## 1. Goal

A personal portfolio site that positions Tushar as an AI engineer who ships retrieval
and multi-agent systems, hosted free on GitHub Pages. A hiring manager skimming for
twenty seconds must come away knowing: AI engineer, Samsung R&D, IIT Jodhpur, builds
retrieval systems. Everything else serves that.

The site must not look machine-generated. This is a stated requirement, not a
preference, and section 6 makes it checkable rather than aspirational.

## 2. Direction: Broadsheet

The organizing metaphor is a **technical monograph** — a well-set academic book or a
Swiss annual report. Authority comes from typography and grid discipline, not from
effects. One idea governs every decision: *this is a document, not an app.*

Consequences of committing to that:

- No cards with borders and shadows floating on a background. Content sits directly
  on the page, separated by hairline rules and whitespace.
- No hero section in the marketing sense. The page opens the way a monograph opens:
  title, then immediately the substance.
- Sections are **numbered** (01, 02, 03) like chapters.
- Each project carries a **plate** — an inked SVG figure of its actual architecture,
  captioned `FIG. n`, in the manner of a technical book's illustrations.
- Motion is restrained but present: type sets itself, rules draw, plates ink in.
  Nothing bounces, nothing floats, nothing glows.

The plate is the heart of this direction. A generic portfolio shows a screenshot; this
one shows a *drawing of how the thing works*. It is also the most expensive part of
the build (section 8).

## 3. Design tokens

### Typography

Three faces, each with one job. All served via `next/font/google`, which downloads and
self-hosts at build time — no runtime request to Google, no FOUT.

| Role | Face | Usage |
|---|---|---|
| Display | **Fraunces** (variable) | Name, section titles, project titles. `opsz`, `SOFT`, `WONK` axes. |
| Body | **Newsreader** (variable) | All prose. Optical-size axis set per size. |
| Label | **JetBrains Mono** | Metadata, figure captions, section numbers, stack lists, dates. |

Fraunces earns its place over the obvious picks: its `WONK` axis gives the display
type a slight, deliberate irregularity that no default pairing has. If the wonk reads
as too much at large sizes, it is a one-token swap to Newsreader at display weight.

Type scale, ratio 1.32, base 16px:

```
display-xl   72px / 0.92  tracking -0.035em   (name, home only)
display-l    44px / 0.98  tracking -0.028em   (project titles)
display-m    30px / 1.08  tracking -0.02em    (section titles)
body-l       18px / 1.62                      (lede paragraphs)
body         16px / 1.68                      (prose)
body-s       14px / 1.6                       (figure captions, notes)
label        11px / 1     tracking 0.14em     uppercase (mono)
label-s      9.5px / 1    tracking 0.14em     uppercase (mono)
```

Measure is capped at **68 characters** for prose. This is a document; line length is
load-bearing.

### Color

Both themes are designed, not inverted. Light is warm paper; dark is warm ink-on-black
rather than the usual cool slate.

| Token | Light | Dark |
|---|---|---|
| `--paper` | `#FBFAF6` | `#12110E` |
| `--paper-2` | `#F4F2EA` | `#1A1815` |
| `--ink` | `#17140F` | `#F2EDE3` |
| `--muted` | `#6B6459` | `#8C8578` |
| `--accent` | `#B93815` | `#F97316` |
| `--rule` | `#D8D2C6` | `#2E2B25` |

Accent is a print vermilion, used sparingly: section numbers, one italic phrase in the
title, the terminal node of a plate, link underlines on hover. Never a fill on a large
area, never a gradient.

Every ink/paper pair gets measured with a contrast checker during build step 3 and the
numbers recorded. Any pair under 4.5:1 for body text is adjusted, not shipped with an
exception.

### Grid and space

12-column grid, 1180px max, 28px gutters. Spacing scale is a 4px base:
`4 8 12 20 32 52 84 136` — Fibonacci-ish, so vertical rhythm reads as intentional.

Hairline rules are exactly 1px at `--rule`, never 2px, never doubled.

## 4. Motion

**Engine: GSAP 3 only** — `gsap`, `SplitText`, `ScrollTrigger`, `@gsap/react`. Free for
commercial use since Webflow acquired GreenSock; the SplitText rewrite ships
screen-reader accessibility and reveal masking natively, which removes the usual
objection to per-character animation. One library, not two — Motion was considered and
declined to keep the JS budget down.

| Element | Trigger | Technique | Values |
|---|---|---|---|
| Name (home) | load | SplitText by line, mask reveal | y 105%→0, dur 1.0, `expo.out`, stagger 0.13 |
| Section titles | scroll, 80% viewport | SplitText by word, mask reveal | y 100%→0, dur 0.8, `expo.out`, stagger 0.04 |
| Hairline rules | scroll, 90% viewport | scaleX transform-origin left | 0→1, dur 1.0, `expo.out` |
| Plates (SVG) | scroll, 75% viewport | stroke-dashoffset draw | dur 1.6–2.4, `power2.out`, stagger 0.15 per path |
| Prose blocks | scroll, 85% viewport | fade + rise | opacity 0→1, y 9→0, dur 0.9, `power2.out` |
| Metric numbers | scroll, 80% viewport | count up | dur 1.2, `power2.out` |
| Links | hover | underline wipe | scaleX, dur 0.35, `power2.out` |

Total motion budget: **nothing animates longer than 2.4s**, and no element is
unreadable for more than 1.0s after its trigger. The page is a document first.

**Reduced motion is a real fallback, not a stub.** Under
`prefers-reduced-motion: reduce`, a single `gsap.matchMedia()` branch sets every
animated element to its *final* state on mount — text visible, rules at scaleX(1),
plate paths at dashoffset 0, numbers at final value. This is verified by toggling the
OS setting, not by reading the CSS. The common failure — elements stranded at
`opacity: 0` forever — is the specific thing being tested for.

## 5. Structure

### Home — one long page

| # | Section | Content |
|---|---|---|
| — | Masthead | Name, role, location, links. No nav bar; the page is the nav. |
| — | Lede | Two columns of prose: Samsung R&D and the RAG work; IIT Jodhpur and the metrics. |
| 01 | Selected Work | Project index. Uniform card, described below. |
| 02 | Experience | Samsung R&D, four subsections (GenAI & RAG, AI Learning Platforms, Diagnostics, Tizen C/C++). |
| 03 | Education | IIT Jodhpur, B.Tech AI & Data Science, coursework. |
| 04 | Technical | Skills as a set-in-mono index, grouped, not as badge pills. |
| 05 | Certifications | Six entries, right-aligned dates, as a bibliography. |
| — | Colophon | Contact, resume PDF, repo link, and a genuine colophon note (typefaces used). |

The colophon is not decoration. A monograph names its typefaces; doing so signals the
design is deliberate, and it is the cheapest possible proof that a human made choices.

### Project card — identical for all fifteen

```
FIG. n │ [plate: 118px inked SVG]  TITLE                    2026
       │                           One-sentence description.
       │                           RUST · SQLITE · CLI          →
```

Same geometry, same type sizes, same plate frame for every project. The only variable
is the drawing inside the plate and the words.

### Project detail pages — customized per project

Shared shell: masthead, back-link, colophon, theme toggle, meta tags. Customized
within it. Route: `/work/[slug]`, static via `generateStaticParams`, `trailingSlash: true`.

Two depths, chosen by how much real material exists. Both use the same shell, so the
site stays coherent; the difference is how many blocks the page fills.

**Full plate** — large architecture figure, Problem, Approach, Key decisions,
Result with metrics, Stack, Repo:

1. PageIndex — vectorless RAG in Rust · **public repo, linked**
2. The Cutting Room — multi-agent GenAI video pipeline · **public repo, linked**
3. EchoLearn — real-time educational podcast platform · *see §5.1, no repo*
4. Adaptive Reels — event-driven lesson-video pipeline · *see §5.1, no repo*
5. NTK-Aware Pruning — IIT Jodhpur research

**Short plate** — figure, one substantive paragraph, Stack, Repo:

6. Table Structure Recognition · IIT Jodhpur research
7. Facial Emotion Recognition
8. Electronic Nose · gas-sensor ML on Raspberry Pi
9. Resource-Aware Hardware Patch Generation · `resource-aware-patch-generation`
10. DBMS Table Normalization · `AutoNormalizationForTables`
11. Toxic Comment Classification
12. Handmade Sketch Colorization · `HandMade-Sketch-Colorization`
13. CNN Design via Optimization Techniques · `optimization-for-cnn`
14. Covid-19 Statistics Dashboard · Plotly Dash
15. Process-Scheduling Visualizer · OS course project

Short pages are honest, not padded. Any of them can be promoted to full plate later by
supplying three or four sentences — the shell does not change.

Repo links on 9, 10, 12, and 13 are confirmed from `projects.txt`. The rest are verified
against `github.com/VincitoreSi` during build step 6; anything not found ships without a
link rather than with a 404.

Each plate is drawn to that project's actual architecture. PageIndex gets a tree with a
traversal path highlighted. The Cutting Room gets four agent nodes over an HTTP hub.
EchoLearn gets a duplex stream with a barge-in interrupt. Electronic Nose gets a sensor
array feeding a classifier. The drawing is the customization.

### 5.1 Confidentiality boundary — EchoLearn and Adaptive Reels

Both are Samsung internal systems. They keep full detail pages, but the published
material is deliberately bounded:

**Published:** the general engineering pattern and the outcomes already stated on the
résumé. For EchoLearn, a duplex audio stream with a barge-in interrupt against a sub-200ms
budget, and the retrieval pattern in generic terms (semantic chunking → hybrid sparse and
dense retrieval → cross-encoder rerank → tenant-isolated namespaces). For Adaptive Reels,
an event-driven expansion pipeline with schema-constrained model output and queue-depth
autoscaling. Metrics as on the résumé: 100+ hours of content, 5,000+ students.

**Not published:** anything traceable to Samsung's implementation — internal service or
component names, table schemas, queue and topic names, infrastructure topology, cost
figures, model configuration, or any content lifted from the LLD documents in
`../TusharKumar`. The plates for these two are drawn as *patterns*, not as Samsung
system diagrams.

The framing on these pages is "how I approach this class of problem," not "here is our
production architecture." Every retrieval and streaming technique named is public
engineering vocabulary, published widely, and specific to no employer.

## 6. Anti-slop checklist

Checkable rules, verified by reading the built CSS before shipping:

1. No gradient anywhere. `grep -c "gradient"` in the CSS returns 0.
2. No `box-shadow` on a content container. Shadows only on the theme toggle.
3. No `border-radius` above 3px, and none at all on content blocks.
4. No glassmorphism: zero `backdrop-filter`.
5. No purple, indigo, or violet in the palette. No cyan-to-magenta anything.
6. No Inter, no Geist, no system-UI sans for display type.
7. No emoji anywhere in the UI or copy.
8. No hero copy of the form "Hi, I'm X" or "I build beautiful, performant…".
9. No skill badge pills. Skills are set as a typographic index.
10. No animated gradient blobs, orbs, aurora, mesh, or particle field.
11. No centered single-column hero with a CTA button pair.
12. No bento grid.
13. No dark-navy-with-neon-accent theme. Dark mode is warm black.
14. No stock illustration or 3D render. Every graphic is a hand-authored SVG plate.
15. No "Let's build something together" closing section.
16. Nothing describes itself as passionate, cutting-edge, innovative, or seamless.

## 7. Technical

```
Next.js (App Router), output: 'export', trailingSlash: true
TypeScript
Hand-written CSS Modules + CSS custom properties for tokens.
  No Tailwind — "shadcn sameness" is itself a slop tell, and both themes
  need per-token design anyway.
GSAP 3 + SplitText + ScrollTrigger + @gsap/react
next/font/google (self-hosted at build)
images: { unoptimized: true }
```

**Repo:** `VincitoreSi.github.io` — a GitHub *user* repo, served at the root path.
This avoids the entire `basePath`/`assetPrefix` class of broken-on-deploy bugs. Site
lives in a new sibling directory `/Users/vincitoresi/personal/VincitoreSi.github.io`;
profile data is transcribed from the LaTeX sources in `../TusharKumar` and does not
depend on them at build time.

**Deploy:** GitHub Actions — build, `touch out/.nojekyll` (required, or GitHub Pages
discards the `_next` directory), upload artifact, deploy to Pages.

**Theme:** a tiny blocking inline script in `<head>` reads `localStorage` then
`prefers-color-scheme` and stamps `data-theme` on `<html>` before first paint. This
must be blocking and inline — any other approach flashes the wrong theme.

**Resume PDF:** `TusharKumarAI.pdf` copied to `public/tushar-kumar-resume.pdf`.

**JS budget:** ≤ 95 KB gzipped total, GSAP included.

## 8. Build order

Each milestone independently verifiable.

1. **Scaffold + deploy an ugly page.** Next static export, Actions workflow, live on
   `vincitoresi.github.io`. → verify: live URL loads, `_next` assets 200, no 404.
   *Deploy first, so deployment is never the thing that breaks at the end.*
2. **Tokens + both themes + type scale.** → verify: contrast ratios measured and
   recorded for every pair; no flash of wrong theme on hard reload in either mode.
3. **Home page, static, no motion.** All content, real prose. → verify: readable and
   correctly structured with JS disabled; passes the section 6 grep checks.
4. **Plates for the five full-plate projects.** → verify: renders in both themes via
   `currentColor`; no raster assets.
5. **GSAP motion layer.** → verify: reduced-motion toggled at OS level leaves every
   element in its final visible state; nothing stranded hidden.
6. **All fifteen detail pages.** → verify: every route resolves in the export; no
   orphan links; back-link works from a cold load.
7. **Remaining ten plates.**
8. **Audit.** → verify: Lighthouse mobile perf ≥90, a11y 100, CLS <0.1; SplitText
   headings read as sentences in VoiceOver and copy as sentences.

The expensive item is the fifteen plates — realistically the majority of the effort.
They are sequenced last per depth so that a coherent site exists at step 6 regardless.

## 9. Resolved decisions

1. **Repo links.** PageIndex and The Cutting Room are public and linked — these are the
   two headline projects. EchoLearn and Adaptive Reels are Samsung internal: no link, and
   bounded content per §5.1. Tizen module names (SignagePlayer, OfficeViewer, Event
   Manager, Remote Manager) are published as-is; they are shipped commercial components
   already named on the résumé, and naming them makes the work verifiable.
2. **Three extra projects** from `projects.txt` are included as short plates, bringing the
   total to fifteen: Covid-19 Statistics Dashboard (Plotly Dash), Process-Scheduling
   Visualizer, and `optimization-for-cnn`. Rationale: the instruction was a detail page for
   every project. Note that the résumé omits all three — if that omission was deliberate
   curation rather than space, cutting them is deleting three files and three array entries.
3. **No photograph.** The site stays entirely typographic. A frontispiece portrait is a
   real commitment — it has to be a good photo, well treated, or it drags the whole page
   down. Addable later without disturbing the layout.
4. **CGPA omitted.** A portfolio is not an application form. It stays on the résumé PDF,
   which is one click away for anyone who wants it.

## 10. Exit criteria

The build is done when all six checks in the success criteria pass and the §6 checklist
greps clean. Specifically: static export builds with zero errors, the live URL serves
every one of the fifteen project routes, both themes measure ≥4.5:1 on every text pair
with no first-paint flash, `prefers-reduced-motion` leaves nothing stranded invisible,
SplitText headings read and copy as whole sentences, and Lighthouse mobile reports
perf ≥90 / a11y 100 / CLS <0.1.
