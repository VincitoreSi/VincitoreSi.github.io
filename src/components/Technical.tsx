import { profile } from '@/data/profile'
import styles from './Technical.module.css'

export default function Technical() {
  return (
    <div>
      {profile.skills.map((group) => (
        <div key={group.heading} className={styles.group} data-reveal>
          <h3 className={`label ${styles.head}`}>{group.heading}</h3>
          <p className={`body-s ${styles.list}`}>{group.items.join(' · ')}</p>
        </div>
      ))}
    </div>
  )
}
