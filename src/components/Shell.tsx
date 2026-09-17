import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Circle, Menu, Wallet, X } from 'lucide-react'
import { useApp } from '../state'

/* Custom cursor — dot + trailing ring, grows over interactive targets */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    document.documentElement.classList.add('has-cursor')
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf = 0
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`
      const t = e.target as HTMLElement
      const hot = !!t.closest('a, button, [role="button"], input, textarea, .tilt')
      ring.current?.classList.toggle('hot', hot)
    }
    const loop = () => {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`
      raf = requestAnimationFrame(loop)
    }
    addEventListener('mousemove', move)
    raf = requestAnimationFrame(loop)
    return () => { removeEventListener('mousemove', move); cancelAnimationFrame(raf); document.documentElement.classList.remove('has-cursor') }
  }, [])
  return <>
    <div ref={ring} className="cursor-ring" aria-hidden="true" />
    <div ref={dot} className="cursor-dot" aria-hidden="true" />
  </>
}

/* Intro loader — signal acquisition sequence */
export function Loader({ done }: { done: () => void }) {
  const [pct, setPct] = useState(0)
  const [gone, setGone] = useState(false)
  const lines = ['LOCATING SIGNAL', 'OPENING ARCHIVE', 'RESOLVING 05 UNIVERSES', 'SIGNAL ACQUIRED']
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setPct(100); const t = setTimeout(() => { setGone(true); done() }, 300); return () => clearTimeout(t) }
    let v = 0
    const id = setInterval(() => {
      v = Math.min(100, v + Math.random() * 9 + 3)
      setPct(Math.floor(v))
      if (v >= 100) {
        clearInterval(id)
        setTimeout(() => { setGone(true); setTimeout(done, 650) }, 420)
      }
    }, 90)
    return () => clearInterval(id)
  }, [done])
  return (
    <div className={gone ? 'loader leave' : 'loader'} aria-hidden={gone}>
      <div className="loader-inner">
        <div className="loader-mark">NEMO<span>/</span>VERSE</div>
        <div className="loader-line"><i style={{ transform: `scaleX(${pct / 100})` }} /></div>
        <div className="loader-meta">
          <span className="technical">{lines[Math.min(lines.length - 1, Math.floor(pct / 26))]}</span>
          <span className="technical">{String(pct).padStart(3, '0')}%</span>
        </div>
      </div>
      <div className="loader-panels" aria-hidden="true"><i /><i /><i /></div>
    </div>
  )
}

export function TopBar() {
  const { wallet, address, connectWallet } = useApp()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(scrollY > 40)
    addEventListener('scroll', fn, { passive: true })
    return () => removeEventListener('scroll', fn)
  }, [])
  const label = wallet === 'verified' ? address
    : wallet === 'connecting' ? 'Connecting…'
    : wallet === 'signing' ? 'Sign in wallet…'
    : wallet === 'checking' ? 'Reading chain…'
    : 'Connect wallet'
  const links = [
    ['#multiverse', 'Multiverse', '01'], ['#access', 'Holder access', '02'], ['#store', 'Store', '03'],
    ['#collect', 'Collect', '04'], ['#persona', 'Persona', '05'],
  ]
  return (
    <header className={scrolled ? 'topbar scrolled' : 'topbar'}>
      <a className="brand" href="#top" aria-label="Nemoverse home">
        <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
        <span className="brand-word">NEMO<em>/</em>VERSE</span>
      </a>
      <nav className={open ? 'nav-links open' : 'nav-links'} aria-label="Primary">
        {links.map(([href, label2, n]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}><span className="technical">{n}</span>{label2}</a>
        ))}
      </nav>
      <div className="top-actions">
        <span className="network-status technical"><Circle size={6} fill="currentColor" strokeWidth={0} /> BASE / LIVE</span>
        <button
          className={`wallet-chip ${wallet}`}
          onClick={connectWallet}
          disabled={wallet !== 'idle' && wallet !== 'verified'}
        >
          <Wallet size={13} /> {label}
        </button>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <strong>NEMO / VERSE</strong>
          <p>A living canon of alternate selves — commissioned, numbered, and made to be found.</p>
        </div>
        <div className="footer-cols">
          <div>
            <span className="technical">ARCHIVE</span>
            <a href="#multiverse">The Multiverse</a>
            <a href="#origin">Origin lore</a>
            <a href="#specs">The fine print</a>
          </div>
          <div>
            <span className="technical">ACCESS</span>
            <a href="#access">Holder verification</a>
            <a href="#store">Store</a>
            <a href="#collect">Proof of purchase</a>
          </div>
          <div>
            <span className="technical">SIGNAL</span>
            <a href="#persona">AI persona</a>
            <a href="#store">Live feed</a>
            <a href="#persona">X — @NEMO</a>
          </div>
        </div>
      </div>
      <div className="footer-end">
        <span className="technical">© 2026 NEMOVERSE — ALL UNIVERSES CANON</span>
        <span className="technical">BASE · IPFS · CLAUDE — ARTISTS CREDITED FOREVER</span>
      </div>
    </footer>
  )
}

/* Slide-out drawer shell (motion pattern 05) */
export function Drawer({ open, onClose, children, label, wide }: {
  open: boolean; onClose: () => void; children: React.ReactNode; label: string; wide?: boolean
}) {
  useEffect(() => {
    if (!open) return
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    addEventListener('keydown', fn)
    return () => removeEventListener('keydown', fn)
  }, [open, onClose])
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside
            className={wide ? 'drawer wide' : 'drawer'}
            role="dialog" aria-modal="true" aria-label={label}
            initial={{ x: '104%' }} animate={{ x: 0 }} exit={{ x: '104%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          >
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
