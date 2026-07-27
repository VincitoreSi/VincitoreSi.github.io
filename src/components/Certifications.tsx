import { profile } from '@/data/profile'
import styles from './Certifications.module.css'

export default function Certifications() {
  return (
    <ul>
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
