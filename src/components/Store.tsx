import { useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Lock, Sparkles, X } from 'lucide-react'
import { feed, products, type Product } from '../data'
import { BlurWords, Reveal } from '../fx'
import { Drawer } from './Shell'
import { useApp } from '../state'

export function Store() {
  const { wallet, openCheckout } = useApp()
  const [preview, setPreview] = useState<Product | null>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const colRef = useRef<HTMLDivElement>(null)

  const track = (e: React.MouseEvent) => {
    const r = colRef.current?.getBoundingClientRect()
    if (!r) return
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
  }

  return (
    <section id="store" className="store section-pad">
      <div className="section-head">
        <Reveal>
          <p className="eyebrow"><span className="eyebrow-rule" />03 — THE STORE</p>
          <h2><BlurWords text="Objects from" /><br /><em><BlurWords text="the signal." base={200} /></em></h2>
        </Reveal>
        <Reveal delay={140} className="section-intro-wrap">
          <p className="section-intro">
            Prints, lore objects, and holder-only editions — every checkout mints a fragment
            of the Multiverse back to you. The feed on the right is live; the persona keeps it that way.
          </p>
        </Reveal>
      </div>

      <div className="store-layout">
        <div className="product-column" ref={colRef} onMouseMove={track} onMouseLeave={() => setPreview(null)}>
          {products.map((p, i) => {
            const locked = p.gated && wallet !== 'verified'
            return (
              <Reveal key={p.id} delay={i * 60}>
                <div
                  className={`product-row ${locked ? 'locked' : ''}`}
                  onMouseEnter={() => setPreview(p)}
                  style={{ '--accent': p.accent } as CSSProperties}
                >
                  <span className="p-index technical">{String(i + 1).padStart(2, '0')}</span>
                  <div className="p-thumb"><img src={p.art} alt="" loading="lazy" /></div>
                  <div className="p-details">
                    <span className="technical dim">{p.kind}</span>
                    <h3>{p.name}</h3>
                  </div>
                  <div className="p-price">
                    {wallet === 'verified' ? (
                      <><s className="technical dim">{p.price}</s><strong>{p.holderPrice}</strong><span className="technical holder-tag">HOLDER −15%</span></>
                    ) : (
                      <strong>{p.price}</strong>
                    )}
                  </div>
                  {locked ? (
                    <button className="p-action locked-action" onClick={() => document.querySelector('#access')?.scrollIntoView({ behavior: 'smooth' })}>
                      <Lock size={13} /> Verify to unlock
                    </button>
                  ) : (
                    <button className="p-action" onClick={() => openCheckout(p)}>
                      Purchase <ArrowUpRight size={13} />
                    </button>
                  )}
                </div>
              </Reveal>
            )
          })}

          {/* Dime MTL — cursor-tracked instant preview modal */}
          <AnimatePresence>
            {preview && (
              <motion.div
                className="hover-preview" aria-hidden="true"
                style={{ left: Math.min(pos.x + 26, (colRef.current?.clientWidth ?? 600) - 250), top: pos.y - 140 }}
                initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.16 }}
              >
                <img src={preview.art} alt="" />
                <div>
                  <span className="technical" style={{ color: preview.accent }}>{preview.gated ? 'TOKEN-GATED' : 'OPEN EDITION'}</span>
                  <p>{preview.note}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Terminal 27 — sticky live drop feed */}
        <aside className="drop-feed" aria-label="Live drop feed">
          <div className="feed-head">
            <span className="technical">LIVE DROP FEED</span>
            <span className="live-dot technical"><i /> UPDATING</span>
          </div>
          {feed.map((f, i) => (
            <Reveal key={i} delay={i * 80}>
              <article className={`feed-item src-${f.source.split(' ')[0].toLowerCase()}`}>
                <span className="technical dim">{f.time} · {f.source}</span>
                <p>{f.text}</p>
                {f.link && <a className="text-link small" href={f.link}>Follow the thread <ArrowUpRight size={12} /></a>}
              </article>
            </Reveal>
          ))}
          <div className="feed-foot technical">EMBEDDED FROM X · @NEMO — THE PERSONA POSTS, YOU APPROVE</div>
        </aside>
      </div>

      <CheckoutDrawer />
    </section>
  )
}

function CheckoutDrawer() {
  const { cart, checkout, closeCheckout, confirmCheckout, webhookLog, wallet, address } = useApp()
  const price = cart ? (wallet === 'verified' ? cart.holderPrice : cart.price) : ''
  return (
    <Drawer open={checkout !== 'closed'} onClose={checkout === 'processing' ? () => {} : closeCheckout} label="Checkout">
      {cart && (
        <div className="checkout">
          <div className="drawer-head">
            <span className="technical">CHECKOUT — SHOPIFY STOREFRONT</span>
            {checkout !== 'processing' && <button className="close-button static" onClick={closeCheckout} aria-label="Close checkout"><X size={16} /></button>}
          </div>

          <div className="checkout-item">
            <img src={cart.art} alt="" />
            <div>
              <span className="technical dim">{cart.kind}</span>
              <strong>{cart.name}</strong>
              <p>{cart.note}</p>
            </div>
          </div>

          <div className="checkout-lines technical">
            <div><span>ITEM</span><span>{cart.price}</span></div>
            {wallet === 'verified' && <div className="line-perk"><span>HOLDER DISCOUNT — AUTO-APPLIED</span><span>−15%</span></div>}
            {wallet === 'verified' && <div className="line-perk"><span>SHIPPING — HOLDER PERK</span><span>FREE</span></div>}
            <div className="line-total"><span>TOTAL</span><span>{price}</span></div>
          </div>

          <div className="checkout-pull-note">
            <Sparkles size={14} />
            <p>This order mints <strong>one random pull</strong> from the live Multiverse to {wallet === 'verified' ? address : 'your email, claimable to any wallet later'}.</p>
          </div>

          {checkout === 'open' && (
            <button className="button button-primary full" onClick={confirmCheckout}>
              Confirm purchase <ArrowUpRight size={15} />
            </button>
          )}

          {(checkout === 'processing' || checkout === 'success') && (
            <div className="webhook-log" aria-live="polite">
              <span className="technical dim">ORDER → MINT PIPELINE</span>
              {webhookLog.map((l, i) => (
                <motion.div key={i} className="log-line technical" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
                  <i aria-hidden="true">▸</i>{l}
                </motion.div>
              ))}
              {checkout === 'processing' && <div className="log-line technical pulse"><i aria-hidden="true">▸</i>…</div>}
            </div>
          )}

          {checkout === 'success' && (
            <motion.div className="checkout-done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <span className="done-ring"><Check size={17} /></span>
              <div>
                <strong>Order confirmed.</strong>
                <span className="technical dim">YOUR PULL IS REVEALING — DON'T LOOK AWAY</span>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </Drawer>
  )
}
