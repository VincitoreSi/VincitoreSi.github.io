import Link from 'next/link'
import type { ProjectMeta } from '@/data/types'
import Figure from './Figure'
import styles from './ProjectCard.module.css'

export default function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <li className={styles.item} data-reveal>
      <Link href={`/work/${project.slug}/`} className={styles.link}>
        <span className={`label-s ${styles.fig}`}>Fig. {project.fig}</span>
        {/*
          The card used to show the detail plate shrunk into a 118px box, where its
          labels were illegible and it was hidden from assistive tech anyway. The
          generated figure is legible at this size and gives the index real weight.
        */}
        <span className={styles.plate} aria-hidden="true">
          <Figure slug={project.slug} alt="" variant="card" />
        </span>
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
