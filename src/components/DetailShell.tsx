import Link from 'next/link'
import type { ReactNode } from 'react'
import type { ProjectDetail, ProjectMeta } from '@/data/types'
import { REPO_BASE } from '@/data/types'
import ThemeToggle from './ThemeToggle'
import Plate from './Plate'
import MermaidBlock from './MermaidBlock'
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
            {block.diagram ? <MermaidBlock diagram={block.diagram} /> : null}
          </div>
        </section>
      ))}

      <section className={styles.block} data-reveal>
        <h2 className={`label ${styles.blockHead}`}>Stack</h2>
        <div className={styles.blockBody}>
          <p className={`body-s ${styles.stack}`}>{detail.stackFull.join(' · ')}</p>
          {meta.repo ? (
            <p className={styles.repo}>
              <a className="label link" href={`${REPO_BASE}/${meta.repo}`}>
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
