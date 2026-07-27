import { profile } from '@/data/profile'
import styles from './Experience.module.css'

export default function Experience() {
  const e = profile.experience
  return (
    <div>
      <div className={styles.head}>
        <div>
          <p className="display-m">{e.company}</p>
          <p className={`body-s ${styles.title}`}>{e.title}</p>
        </div>
        <p className={`label ${styles.dates}`}>{e.start} — {e.end}</p>
      </div>
      {e.groups.map((g) => (
        <div key={g.heading} className={styles.group} data-reveal>
          <h3 className={`label ${styles.groupHead}`}>{g.heading}</h3>
          <ul className={styles.items}>
            {g.items.map((item, i) => (
              <li key={i} className={`body ${styles.item}`}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
