import { profile } from '@/data/profile'
import styles from './Lede.module.css'

export default function Lede() {
  return (
    <div className={styles.lede}>
      {profile.lede.map((para, i) => (
        <p key={i} className={i === 0 ? `body-l ${styles.first}` : 'body'} data-reveal>
          {para}
        </p>
      ))}
    </div>
  )
}
