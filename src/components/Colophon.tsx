import { profile } from '@/data/profile'
import styles from './Colophon.module.css'

export default function Colophon() {
  return (
    <footer className={styles.colophon}>
      <hr className="rule" data-rule />
      <div className={styles.grid}>
        <div>
          <h3 className={`label ${styles.head}`}>Contact</h3>
          <ul className={styles.links}>
            <li><a className="body-s link" href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li><a className="body-s link" href={profile.github}>github.com/VincitoreSi</a></li>
            <li><a className="body-s link" href={profile.linkedin}>LinkedIn</a></li>
            <li><a className="body-s link" href={profile.resume}>Résumé (PDF)</a></li>
          </ul>
        </div>
        <div>
          <h3 className={`label ${styles.head}`}>Colophon</h3>
          <p className={`body-s ${styles.note}`}>{profile.colophon.note}</p>
        </div>
      </div>
      <p className={`label-s ${styles.sig}`}>{profile.name} · {profile.location}</p>
    </footer>
  )
}
