import Link from 'next/link'
import { projects } from '@/data/projects'
import styles from './WorkTeaser.module.css'

export default function WorkTeaser() {
  return (
    <section className={styles.teaser} data-reveal>
      <hr className="rule" data-rule />
      <Link href="/work/" className={styles.link}>
        <span className={`label ${styles.kicker}`}>Selected Work</span>
        <span className={`display-m ${styles.line}`}>
          {projects.length} projects, each with its own page and figure
        </span>
        <span className={`label ${styles.go}`}>
          Open the index
          <svg viewBox="0 0 28 8" width="28" height="8" fill="none"
               stroke="currentColor" strokeWidth="1" aria-hidden="true">
            <path d="M0 4h26M22.5 0.5 26.5 4l-4 3.5" />
          </svg>
        </span>
      </Link>
    </section>
  )
}
