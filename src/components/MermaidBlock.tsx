'use client'

import { useEffect, useRef, useState } from 'react'
// Static import is route-level code-split by Next.js — MermaidBlock only
// renders on /work/[slug] pages, so mermaid is never loaded on the home page.
import mermaid from 'mermaid'
import styles from './MermaidBlock.module.css'

export default function MermaidBlock({ diagram }: { diagram: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function render() {
      if (rendered) return

      // Do NOT call mermaid.initialize() — it triggers auto-run which scans
      // the DOM for .mermaid elements and renders errors into the page body.
      // render() works standalone without initialization in mermaid v11.
      const id = `m-${Math.random().toString(36).slice(2, 8)}`
      try {
        const { svg } = await mermaid.render(id, diagram)
        if (cancelled || !ref.current) return
        ref.current.innerHTML = svg

        // Recolor strokes to currentColor for dark/light theme support
        ref.current.querySelectorAll('[stroke]').forEach((el) => {
          const s = el.getAttribute('stroke')
          if (s && s !== 'none') el.setAttribute('stroke', 'currentColor')
        })
        // Clear fill colors so diagrams don't have opaque backgrounds
        ref.current.querySelectorAll('[fill]').forEach((el) => {
          const f = el.getAttribute('fill')
          if (f && f !== 'none' && f.startsWith('#')) {
            el.setAttribute('fill', 'transparent')
          }
        })
        setRendered(true)
      } catch {
        if (ref.current) ref.current.textContent = '[diagram]'
      }
    }

    render()
    return () => { cancelled = true }
  }, [diagram, rendered])

  return <div ref={ref} className={styles.diagram} data-reveal />
}
