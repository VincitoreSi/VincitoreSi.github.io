import type { ReactNode } from 'react'
import styles from './Plate.module.css'

export default function Plate({
  fig, caption, children,
}: { fig: number; caption: string; children: ReactNode }) {
  return (
    <figure className={styles.plate} data-plate>
      <div className={styles.frame}>{children}</div>
      <figcaption className={`body-s ${styles.caption}`}>
        <span className="label-s">Fig. {fig}</span> {caption}
      </figcaption>
    </figure>
  )
}
