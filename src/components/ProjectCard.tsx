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
        <span className={`label-s ${styles.fig}`}>Fig. {project.fig}</span>
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
