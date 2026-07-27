import { profile } from '@/data/profile'
import styles from './Education.module.css'

export default function Education() {
  const ed = profile.education
  return (
    <div data-reveal>
      <div className={styles.head}>
        <div>
          <p className="display-m">{ed.school}</p>
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
