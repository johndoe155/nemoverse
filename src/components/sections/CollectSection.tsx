import { useAppStore } from '@/store/useAppStore'
import './sections.css'

const CARDS = [
  {
    eyebrow: 'Proof of Purchase',
    title: 'Every buy pulls a universe',
    body: 'Checkout mints a random pull from the live Multiverse set — a real piece of the collection, not a receipt graphic.',
  },
  {
    eyebrow: 'Set collecting',
    title: 'Complete the archive',
    body: 'Gather a piece from every universe. Full-set collectors unlock a bonus reward reserved for completionists.',
  },
  {
    eyebrow: 'Stamp card',
    title: 'Milestone = rare pull',
    body: 'A stamp-card mechanic guarantees a rare variant after a threshold of purchases. Chase, share, repeat.',
  },
]

export function CollectSection() {
  const ownedIds = useAppStore((s) => s.ownedIds)
  const isHolder = useAppStore((s) => s.isHolder)
  const filled = isHolder ? Math.min(ownedIds.length, 8) : 2

  return (
    <section id="collect" data-section="collect" className="section collect-section">
      <div className="section-inner">
        <header className="section-header">
          <p className="eyebrow">Pillar · Collect</p>
          <h2>Purchases feed the Multiverse.</h2>
          <p>
            The same art. The same economy. Every store purchase becomes another way into the
            collection — and another shareable moment on X.
          </p>
        </header>

        <div className="collect-grid">
          {CARDS.map((c) => (
            <article key={c.title} className="collect-card glass-panel">
              <p className="eyebrow">{c.eyebrow}</p>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </article>
          ))}
        </div>

        <div className="stamp-card glass-panel">
          <div>
            <p className="eyebrow">Your stamp card</p>
            <h3 style={{ fontSize: 'var(--text-md)', margin: '0.5rem 0 0' }}>
              Milestone path toward a guaranteed rare
            </h3>
            <div className="stamp-track" aria-hidden>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={`stamp ${i < filled ? 'is-filled' : ''}`}>
                  {i < filled ? '◆' : i + 1}
                </div>
              ))}
            </div>
          </div>
          <div className="stamp-progress">
            <span className="mono-num">
              {filled}
              <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>/8</span>
            </span>
            <span>stamps earned</span>
          </div>
        </div>
      </div>
    </section>
  )
}
