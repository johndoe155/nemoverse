import { useEffect, useState } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { scrollToId } from '@/hooks/useLenis'
import { MagneticButton } from '@/components/ui/MagneticButton'
import './nav.css'

const LINKS = [
  { id: 'multiverse', label: 'Multiverse' },
  { id: 'belong', label: 'Belong' },
  { id: 'collect', label: 'Collect' },
  { id: 'artists', label: 'Artists' },
  { id: 'voice', label: 'Voice' },
]

export function SiteNav() {
  const isLoaded = useAppStore((s) => s.isLoaded)
  const activeSection = useAppStore((s) => s.activeSection)
  const walletConnected = useAppStore((s) => s.walletConnected)
  const walletAddress = useAppStore((s) => s.walletAddress)
  const isHolder = useAppStore((s) => s.isHolder)
  const connectWallet = useAppStore((s) => s.connectWallet)
  const disconnectWallet = useAppStore((s) => s.disconnectWallet)
  const setCursorState = useAppStore((s) => s.setCursorState)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!isLoaded) return null

  return (
    <header className={`site-nav ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-open' : ''}`}>
      <div className="nav-inner">
        <button
          className="nav-logo"
          onClick={() => scrollToId('hero', 0)}
          onMouseEnter={() => setCursorState('hover', 'HOME')}
          onMouseLeave={() => setCursorState('default')}
          aria-label="The Nemoverse home"
        >
          <span className="logo-mark" aria-hidden />
          <span className="logo-text">
            The <em>Nemoverse</em>
          </span>
        </button>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <button
              key={l.id}
              className={`nav-link ${activeSection === l.id ? 'is-active' : ''}`}
              onClick={() => {
                scrollToId(l.id)
                setMenuOpen(false)
              }}
              onMouseEnter={() => setCursorState('hover')}
              onMouseLeave={() => setCursorState('default')}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          {walletConnected ? (
            <button
              className="wallet-pill"
              onClick={disconnectWallet}
              onMouseEnter={() => setCursorState('hover', 'DISCONNECT')}
              onMouseLeave={() => setCursorState('default')}
            >
              {isHolder && <span className="badge badge-holder"><span className="badge-dot" /> Holder</span>}
              <span className="mono-num wallet-addr">{walletAddress}</span>
            </button>
          ) : (
            <MagneticButton size="sm" variant="outline" onClick={connectWallet}>
              Connect Wallet
            </MagneticButton>
          )}

          <button
            className="nav-burger"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`nav-mobile ${menuOpen ? 'is-open' : ''}`}>
        {LINKS.map((l) => (
          <button
            key={l.id}
            className="nav-mobile-link"
            onClick={() => {
              scrollToId(l.id)
              setMenuOpen(false)
            }}
          >
            {l.label}
          </button>
        ))}
      </div>
    </header>
  )
}
