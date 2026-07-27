export type Depth = 'full' | 'short'

/** Home-page index entry. Rendered by the identical card for all fifteen. */
export interface ProjectMeta {
  slug: string
  title: string
  /** One sentence — appears on the card. */
  tagline: string
  /** Display year or range, e.g. '2026' or '2022 — 23'. */
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
  /** Optional Mermaid diagram source rendered after the body paragraphs. */
  diagram?: string
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
