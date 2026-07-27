'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './MermaidBlock.module.css'

export default function MermaidBlock({ diagram }: { diagram: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function render() {
      if (rendered) return
      const [{ default: mermaid }] = await Promise.all([
        import('mermaid'),
      ])
      if (cancelled || !ref.current) return

      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        themeVariables: {
          background: 'transparent',
          primaryColor: 'transparent',
          primaryBorderColor: '#17140F',
          primaryTextColor: '#17140F',
          lineColor: '#17140F',
          secondaryColor: 'transparent',
          tertiaryColor: 'transparent',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '12px',
        },
      })

      const id = `mermaid-${Math.random().toString(36).slice(2, 8)}`
      try {
        const { svg } = await mermaid.render(id, diagram)
        ref.current.innerHTML = svg
        // Recolor stroke attributes to use currentColor for theme support
        ref.current.querySelectorAll('[stroke]').forEach((el) => {
          const s = el.getAttribute('stroke')
          if (s && s !== 'none') el.setAttribute('stroke', 'currentColor')
        })
        ref.current.querySelectorAll('[fill]').forEach((el) => {
          const f = el.getAttribute('fill')
          if (f && f !== 'none' && f.startsWith('#')) {
            el.setAttribute('fill', 'transparent')
          }
        })
        setRendered(true)
      } catch {
        ref.current.textContent = '[diagram]'
      }
    }

    render()
    return () => { cancelled = true }
  }, [diagram, rendered])

  return <div ref={ref} className={styles.diagram} data-reveal />
}
