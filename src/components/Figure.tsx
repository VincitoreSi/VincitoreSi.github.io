import type { CSSProperties } from 'react'
import { FIGURE_ASPECT } from '@/data/figures'
import styles from './Figure.module.css'

/**
 * The generated draughtsman figure for a project.
 *
 * The artwork ships as two alpha masks rather than as a picture: one carrying the ink
 * linework, one carrying the vermilion accent. Each is painted by tinting a flat
 * background through the mask, so the colour comes from --ink and --accent at render
 * time and the paper is simply the page showing through. One asset therefore serves
 * both themes correctly, and the artwork can never drift off-palette.
 */
export default function Figure({
  slug, alt, variant = 'band',
}: { slug: string; alt: string; variant?: 'band' | 'card' }) {
  const style = {
    '--fig-ink': `url(/figures/${slug}-ink.webp)`,
    '--fig-accent': `url(/figures/${slug}-accent.webp)`,
    // Each mask is cropped to its own content, so the box has to take the figure's real
    // ratio. Setting it here reserves the correct height before the mask loads, which is
    // what keeps these off the CLS budget.
    '--fig-aspect': String(FIGURE_ASPECT[slug] ?? 16 / 9),
  } as CSSProperties

  return (
    <div
      className={`${styles.figure} ${variant === 'card' ? styles.card : styles.band}`}
      style={style}
      role="img"
      aria-label={alt}
      data-figure
    >
      <span className={`${styles.layer} ${styles.ink}`} />
      <span className={`${styles.layer} ${styles.accent}`} />
    </div>
  )
}
