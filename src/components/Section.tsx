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
      <div>{children}</div>
    </section>
  )
}
