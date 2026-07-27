import Link from 'next/link'
import type { Metadata } from 'next'
import { projects } from '@/data/projects'
import ProjectIndex from '@/components/ProjectIndex'
import ThemeToggle from '@/components/ThemeToggle'
import Colophon from '@/components/Colophon'
import styles from './work.module.css'

const title = 'Selected Work — Tushar Kumar'
const description = 'Fifteen projects in retrieval, multi-agent systems, machine learning, and systems engineering.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: '/work/',
    type: 'website',
    images: [
      {
        url: '/og/work.jpg',
        width: 1200,
        height: 630,
        alt: 'Selected Work — Tushar Kumar: an index of fifteen projects in retrieval, multi-agent systems, machine learning, and systems engineering.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og/work.jpg'],
  },
}

export default function WorkIndex() {
  return (
    <main className="shell">
      <header className={styles.top}>
        <Link href="/" className={`label link ${styles.back}`}>← Index</Link>
        <ThemeToggle />
      </header>
      <hr className="rule" data-rule />

      <div className={styles.head}>
        <h1 className={`display-xl ${styles.title}`} data-split="line">Selected Work</h1>
        <p className={`label ${styles.count}`}>{projects.length} entries</p>
      </div>
      <p className={`body-l ${styles.lede}`} data-reveal>
        Each project has its own page and its own figure — a drawing of how the thing
        actually works, rather than a screenshot of what it looks like.
      </p>
      <hr className="rule" data-rule />

      <ProjectIndex />
      <Colophon />
    </main>
  )
}
