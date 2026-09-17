import { scrollToId } from '@/hooks/useLenis'
import { useAppStore } from '@/store/useAppStore'
import './sections.css'

const LOOP = ['Discover', 'Belong', 'Buy', 'Collect', 'Amplify']

export function Footer() {
  const setCursorState = useAppStore((s) => s.setCursorState)

  return (
    <footer id="footer" data-section="footer" className="section footer-section">
      <div className="section-inner">
        <div className="footer-loop glass-panel" aria-label="Ecosystem loop">
          {LOOP.map((step, i) => (
            <span key={step} style={{ display: 'contents' }}>
              <span className="footer-loop-step">{step}</span>
              {i < LOOP.length - 1 && <span className="footer-loop-arrow">→</span>}
            </span>
          ))}
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <span className="logo-text">
              The <em style={{ fontStyle: 'normal', color: 'var(--accent-bright)' }}>Nemoverse</em>
            </span>
            <p>
              A connected Multiverse for your character, your collectors, and your store. One
              engine. Four orbits. Built to fund its own expansion.
            </p>
          </div>

          <div className="footer-col">
            <h4>Navigate</h4>
            <ul>
              {[
                ['multiverse', 'Multiverse'],
                ['belong', 'Belong'],
                ['collect', 'Collect'],
                ['artists', 'Artists'],
                ['voice', 'Voice'],
              ].map(([id, label]) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToId(id)}
                    onMouseEnter={() => setCursorState('hover')}
                    onMouseLeave={() => setCursorState('default')}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Ecosystem</h4>
            <ul>
              <li>
                <a href="#belong">Token-gated perks</a>
              </li>
              <li>
                <a href="#collect">Proof-of-purchase</a>
              </li>
              <li>
                <a href="#voice">AI persona</a>
              </li>
              <li>
                <a href="#store">Shopify seam</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 The Nemoverse · Dimensional Archive</span>
          <span>Crafted as a living Multiverse hub</span>
        </div>
      </div>
    </footer>
  )
}
