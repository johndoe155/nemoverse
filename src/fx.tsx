import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

/** De-blur reveal — motion pattern 01. Adds `.in` when scrolled into view. */
export function Reveal({ children, as: Tag = 'div', delay = 0, className = '', y = 26 }: {
  children: ReactNode; as?: 'div' | 'section' | 'span' | 'p' | 'h1' | 'h2' | 'h3'; delay?: number; className?: string; y?: number
}) {
  const ref = useRef<HTMLElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('in'); io.disconnect() }
    }, { threshold: 0.16, rootMargin: '0px 0px -6% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref as never} className={`reveal ${className}`} style={{ '--rd': `${delay}ms`, '--ry': `${y}px` } as CSSProperties}>
      {children}
    </Tag>
  )
}

/** Splits a headline into words that de-blur in stagger. */
export function BlurWords({ text, step = 90, base = 0 }: { text: string; step?: number; base?: number }) {
  return <>{text.split(' ').map((w, i) => (
    <span className="bw" key={i} style={{ '--bwd': `${base + i * step}ms` } as CSSProperties}>{w}{' '}</span>
  ))}</>
}

/** Volumetric tilt — motion pattern 04. */
export function Tilt({ children, className = '', max = 7, glare = true, onClick, style, 'aria-label': ariaLabel }: {
  children: ReactNode; className?: string; max?: number; glare?: boolean; onClick?: () => void; style?: CSSProperties; 'aria-label'?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const raf = useRef(0)
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty('--tx', `${(-py * max).toFixed(2)}deg`)
      el.style.setProperty('--ty', `${(px * max).toFixed(2)}deg`)
      el.style.setProperty('--gx', `${(px + 0.5) * 100}%`)
      el.style.setProperty('--gy', `${(py + 0.5) * 100}%`)
    })
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--tx', '0deg')
    el.style.setProperty('--ty', '0deg')
  }
  const interactive = !!onClick
  return (
    <div
      ref={ref}
      className={`tilt ${className}`}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={ariaLabel}
      onKeyDown={interactive ? e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.() } } : undefined}
    >
      {children}
      {glare && <span className="tilt-glare" aria-hidden="true" />}
    </div>
  )
}

/** Mono counter that ticks up when visible — motion pattern 07. */
export function TickNumber({ to, suffix = '', pad = 0, duration = 1100 }: { to: number; suffix?: string; pad?: number; duration?: number }) {
  const [v, setV] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(to); return }
      const t0 = performance.now()
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / duration)
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [to, duration])
  return <span ref={ref}>{String(v).padStart(pad, '0')}{suffix}</span>
}

export function useCountdown(target: string) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])
  const diff = Math.max(0, new Date(target).getTime() - now)
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${p(d)} : ${p(h)} : ${p(m)} : ${p(s)}`
}
