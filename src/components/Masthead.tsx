import Link from 'next/link'
import { profile } from '@/data/profile'
import ThemeToggle from './ThemeToggle'
import styles from './Masthead.module.css'

export default function Masthead() {
  return (
    <header className={styles.masthead}>
      <div className={styles.top}>
        <span className="label">Portfolio · MMXXVI</span>
        <ThemeToggle />
      </div>
      <hr className="rule" data-rule />
      <h1 className={`display-xl ${styles.name}`} data-split="line">
        {profile.name}
      </h1>
      <div className={styles.meta}>
        <p className="label">{profile.role}</p>
        <p className="label">{profile.location}</p>
        <nav className={styles.links}>
          <Link className={`label link ${styles.work}`} href="/work/">Selected Work</Link>
          <a className="label link" href={profile.github}>GitHub</a>
          <a className="label link" href={profile.linkedin}>LinkedIn</a>
          <a className="label link" href={`mailto:${profile.email}`}>Email</a>
          <a className="label link" href={profile.resume}>Résumé (PDF)</a>
        </nav>
      </div>
      <hr className="rule" data-rule />
    </header>
  )
}
