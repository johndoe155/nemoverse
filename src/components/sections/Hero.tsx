import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useAppStore } from '@/store/useAppStore'
import { OC_LORE } from '@/data/universes'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { scrollToId } from '@/hooks/useLenis'
import './sections.css'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const isLoaded = useAppStore((s) => s.isLoaded)
  const reducedMotion = useAppStore((s) => s.reducedMotion)

  useEffect(() => {
    if (!isLoaded || !root.current || reducedMotion) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-eyebrow', { y: 24, opacity: 0, duration: 0.8 })
        .from('.hero-title span', { y: '110%', duration: 1.1, stagger: 0.08 }, '-=0.5')
        .from('.hero-lede', { y: 28, opacity: 0, duration: 0.9 }, '-=0.55')
        .from('.hero-actions', { y: 20, opacity: 0, duration: 0.7 }, '-=0.5')
        .from('.hero-stats li', { y: 16, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.4')
        .from('.hero-scroll', { opacity: 0, duration: 0.6 }, '-=0.2')
    }, root)
    return () => ctx.revert()
  }, [isLoaded, reducedMotion])

  return (
    <section
      ref={root}
      id="hero"
      data-section="hero"
      className="section hero-section"
    >
      <div className="section-inner hero-inner">
        <p className="eyebrow hero-eyebrow">Dimensional Archive · Est. 2026</p>

        <h1 className="hero-title">
          <span className="line"><span>One character.</span></span>
          <span className="line"><span>Infinite</span></span>
          <span className="line accent"><span>realities.</span></span>
        </h1>

        <p className="hero-lede">{OC_LORE.summary}</p>

        <div className="hero-actions">
          <MagneticButton size="lg" onClick={() => scrollToId('multiverse')}>
            Explore Universes
          </MagneticButton>
          <MagneticButton size="lg" variant="ghost" onClick={() => scrollToId('belong')}>
            Holder Access
          </MagneticButton>
        </div>

        <ul className="hero-stats">
          <li>
            <span className="mono-num">012</span>
            <span>Canon universes</span>
          </li>
          <li>
            <span className="mono-num">∞</span>
            <span>Artist timelines</span>
          </li>
          <li>
            <span className="mono-num">4</span>
            <span>Orbiting systems</span>
          </li>
        </ul>

        <button className="hero-scroll" onClick={() => scrollToId('multiverse')}>
          <span className="hero-scroll-line" />
          <span>Scroll to enter</span>
        </button>
      </div>

      <div className="hero-orb hero-orb-a" aria-hidden />
      <div className="hero-orb hero-orb-b" aria-hidden />
    </section>
  )
}
