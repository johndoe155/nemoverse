import { FEATURED_PRODUCTS } from '@/data/universes'
import { useAppStore } from '@/store/useAppStore'
import './sections.css'

export function StoreSection() {
  const setCursorState = useAppStore((s) => s.setCursorState)
  const isHolder = useAppStore((s) => s.isHolder)

  return (
    <section id="store" data-section="store" className="section store-section">
      <div className="section-inner">
        <header className="section-header">
          <p className="eyebrow">Commerce · Shopify seam</p>
          <h2>From the archive to the rack.</h2>
          <p>
            Featured products pull from the same identity system. Holder SKUs unlock automatically
            when your wallet verifies — seamless, not gimmicky.
          </p>
        </header>

        <div className="store-grid">
          {FEATURED_PRODUCTS.map((p) => {
            const gated = p.tag === 'Gated'
            const locked = gated && !isHolder
            return (
              <button
                key={p.id}
                className="product-card"
                onMouseEnter={() => setCursorState('hover', locked ? 'GATED' : 'VIEW')}
                onMouseLeave={() => setCursorState('default')}
              >
                <div
                  className="product-art"
                  style={{
                    background: `
                      radial-gradient(circle at 30% 20%, hsla(${p.hue}, 60%, 60%, 0.35), transparent 50%),
                      linear-gradient(145deg, hsl(${p.hue} 30% 12%), hsl(${(p.hue + 40) % 360} 25% 8%))
                    `,
                    filter: locked ? 'grayscale(0.4) brightness(0.7)' : undefined,
                  }}
                >
                  <span className={`badge product-tag ${gated ? 'badge-holder' : ''}`}>
                    {p.tag}
                  </span>
                </div>
                <div className="product-meta">
                  <h3>{p.name}</h3>
                  <p className="product-price mono-num">
                    {locked ? 'Holders only' : `$${p.price}`}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
