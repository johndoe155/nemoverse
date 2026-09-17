import { useEffect, useRef } from 'react'
import { ArrowDownRight, ChevronRight } from 'lucide-react'
import { BlurWords, Reveal, useCountdown } from '../fx'
import { HeroCanvas } from '../scenes'
import { useApp } from '../state'

export function Hero({ ready }: { ready: boolean }) {
  const { reducedMotion } = useApp()
  const portrait = useRef<HTMLDivElement>(null)
  const countdown = useCountdown('2026-09-20T18:00:00Z')

  useEffect(() => {
    if (reducedMotion) return
    const fn = () => {
      const el = portrait.current
      if (!el) return
      const y = Math.min(scrollY, innerHeight)
      el.style.transform = `translateY(${y * 0.12}px) scale(${1 + y * 0.00008})`
    }
    addEventListener('scroll', fn, { passive: true })
    return () => removeEventListener('scroll', fn)
  }, [reducedMotion])

  return (
    <section id="top" className={`hero ${ready ? 'ready' : ''}`}>
      <div className="hero-webgl" aria-hidden="true"><HeroCanvas reduced={reducedMotion} /></div>

      <div className="hero-portrait" ref={portrait} aria-hidden="true">
        <img src="/art/hero-nemo.jpg" alt="" />
        <div className="portrait-fade" />
      </div>

      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-rule" />A LIVING CANON — EST. 2026</p>
        <h1>
          <span className="h1-line"><BlurWords text="One character." base={200} step={130} /></span>
          <span className="h1-line serif"><em><BlurWords text="Infinite selves." base={620} step={130} /></em></span>
        </h1>
        <p className="hero-deck">
          The Multiverse is NEMO's official archive of alternate realities — each one commissioned
          from a different artist, numbered into canon, and made to be found.
        </p>
        <div className="hero-ctas">
          <a className="button button-primary" href="#multiverse">Enter the Multiverse <ArrowDownRight size={15} /></a>
          <a className="text-link" href="#origin">Read the origin <ChevronRight size={14} /></a>
        </div>
      </div>

      <div className="hero-caption technical" aria-hidden="true">
        <span className="dim">SIGNAL RECEIVED</span>
        <strong>ORIGIN — THE FIRST LISTENER</strong>
        <span className="dim">OIL & LIGHT · THE ARCHIVE, ROOM 000</span>
      </div>

      <div className="hero-foot technical">
        <span>SCROLL<i className="scroll-line" aria-hidden="true" /></span>
        <span className="dim">05 UNIVERSES · 05 ARTISTS · ONE CANON</span>
        <span>NEXT UNIVERSE <strong className="gold">{countdown}</strong></span>
      </div>
    </section>
  )
}

export function Origin() {
  return (
    <section id="origin" className="origin section-pad">
      <div className="origin-grid">
        <Reveal className="origin-title">
          <p className="eyebrow"><span className="eyebrow-rule" />00 — ORIGIN</p>
          <h2>
            <BlurWords text="There is no" />
            <br /><em><BlurWords text="original." base={240} /></em>
          </h2>
        </Reveal>
        <Reveal delay={160} className="origin-copy">
          <p className="lead">
            NEMO began as a profile picture — a silver-haired figure with a gold teardrop, listening
            to a frequency nobody else could hear. Every artist who draws them opens a different door in the same face.
          </p>
          <p>
            The Multiverse gives those doors a permanent address. Each commissioned reinterpretation becomes an
            official numbered universe with its own lore, its own artist credit written into the metadata, and its
            own limited edition — released on a cadence, collected as a set, and split fairly with the hands that made it.
          </p>
          <a className="text-link" href="#multiverse">Follow the signal <ArrowDownRight size={14} /></a>
        </Reveal>
      </div>
      <Reveal delay={120}>
        <div className="canon-strip technical">
          <span>CANON — <strong>05 UNIVERSES</strong></span>
          <span>ARTISTS — <strong>05 VOICES</strong></span>
          <span>CADENCE — <strong>EVERY FEW WEEKS</strong></span>
          <span>SPLIT — <strong>50 / 50 WITH ARTISTS</strong></span>
          <span>CHAIN — <strong>BASE · IPFS</strong></span>
        </div>
      </Reveal>
    </section>
  )
}
