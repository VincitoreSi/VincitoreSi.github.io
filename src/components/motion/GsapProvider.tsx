'use client'

import { useEffect } from 'react'

export default function GsapProvider() {
  useEffect(() => {
    let active = true

    async function init() {
      const [{ gsap }, { SplitText }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/SplitText'),
        import('gsap/ScrollTrigger'),
      ])

      if (!active) return

      gsap.registerPlugin(SplitText, ScrollTrigger)
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const splits: SplitText[] = []

        document.querySelectorAll<HTMLElement>('[data-split="line"]').forEach((el) => {
          const split = SplitText.create(el, { type: 'lines', mask: 'lines', autoSplit: true })
          splits.push(split)
          gsap.from(split.lines, {
            yPercent: 105, duration: 1.0, ease: 'expo.out', stagger: 0.13,
          })
        })

        document.querySelectorAll<HTMLElement>('[data-split="word"]').forEach((el) => {
          const split = SplitText.create(el, { type: 'words', mask: 'words', autoSplit: true })
          splits.push(split)
          gsap.from(split.words, {
            yPercent: 100, duration: 0.8, ease: 'expo.out', stagger: 0.04,
            scrollTrigger: { trigger: el, start: 'top 80%' },
          })
        })

        gsap.utils.toArray<HTMLElement>('[data-rule]').forEach((el) => {
          gsap.from(el, {
            scaleX: 0, transformOrigin: 'left center', duration: 1.0, ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 90%' },
          })
        })

        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
          gsap.from(el, {
            opacity: 0, y: 9, duration: 0.9, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          })
        })

        gsap.utils.toArray<HTMLElement>('[data-plate]').forEach((plate) => {
          const paths = plate.querySelectorAll<SVGGeometryElement>('[data-draw], [data-draw-accent]')
          paths.forEach((p) => {
            const len = typeof p.getTotalLength === 'function' ? p.getTotalLength() : 400
            gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
          })
          gsap.to(paths, {
            strokeDashoffset: 0,
            duration: 1.8,
            ease: 'power2.out',
            stagger: 0.15,
            scrollTrigger: { trigger: plate, start: 'top 75%' },
          })
        })

        gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
          const target = parseFloat(el.textContent ?? '0')
          if (Number.isNaN(target)) return
          const obj = { n: 0 }
          gsap.to(obj, {
            n: target, duration: 1.2, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 80%' },
            onUpdate: () => { el.textContent = String(Math.round(obj.n)) },
          })
        })

        return () => { splits.forEach((s) => s.revert()) }
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-reveal], [data-split="line"], [data-split="word"]', {
          opacity: 1, y: 0, clearProps: 'transform',
        })
        gsap.set('[data-rule]', { scaleX: 1 })
        gsap.set('[data-plate] [data-draw], [data-plate] [data-draw-accent]', {
          strokeDasharray: 'none', strokeDashoffset: 0,
        })
      })
    }

    init()
    return () => { active = false }
  }, [])

  return null
}
