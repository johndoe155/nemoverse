import { useEffect, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Gift, Mail, Sparkles, Stamp, Wallet, X } from 'lucide-react'
import { universes } from '../data'
import { BlurWords, Reveal, TickNumber } from '../fx'
import { useApp } from '../state'

export function Collect() {
  const { pulls, previewPull } = useApp()
  const setSize = universes.length
  const pct = Math.round((pulls.length / setSize) * 100)
  const complete = pulls.length >= setSize

  return (
    <section id="collect" className="collect section-pad">
      <div className="collect-layout">
        <div className="collect-copy">
          <Reveal>
            <p className="eyebrow gold"><span className="eyebrow-rule" />04 — PROOF OF PURCHASE</p>
            <h2><BlurWords text="Every purchase" /><br /><em><BlurWords text="pulls a story." base={220} /></em></h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="section-intro">
              After checkout, a webhook draws one numbered fragment from the live Multiverse and mints it to
              your wallet — or holds it for an email claim if you don't have one yet. Not a receipt graphic:
              a real piece of the canon, on Base, for less than a cent of gas.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="collect-actions">
              <button className="button button-gold" onClick={previewPull}><Sparkles size={14} /> Preview a pull</button>
              <div className="claim-modes technical">
                <span><Wallet size={12} /> MINT TO WALLET</span>
                <span><Mail size={12} /> OR CLAIM BY EMAIL</span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="collector-wrap">
          <div className="collector-card">
            <div className="collector-head technical">
              <span><Stamp size={12} /> COLLECTOR — STAMP CARD</span>
              <span>{String(pulls.length).padStart(2, '0')} / {String(setSize).padStart(2, '0')}</span>
            </div>
            <div className="stamp-grid">
              {universes.map((u, i) => {
                const filled = pulls.includes(u.id)
                return (
                  <div key={u.id} className={filled ? 'stamp filled' : 'stamp'} style={{ '--accent': u.accent, '--delay': `${i * 90}ms` } as CSSProperties}>
                    {filled ? <img src={u.art} alt={`Collected: Universe ${u.id}`} /> : <span className="stamp-void" aria-hidden="true" />}
                    <span className="technical">#{u.id}</span>
                    <small className="technical dim">{filled ? u.artist.toUpperCase() : 'UNPULLED'}</small>
                  </div>
                )
              })}
            </div>
            <div className="progress-label technical">
              <span>SET COMPLETION</span>
              <strong><TickNumber to={pct} suffix="%" /></strong>
            </div>
            <div className="progress gold"><i style={{ transform: `scaleX(${pct / 100})` }} /></div>

            <div className={`milestone ${complete ? 'reached' : ''}`}>
              <span className="milestone-glyph" aria-hidden="true">✦</span>
              <div>
                <span className="technical dim">{complete ? 'SET COMPLETE — REWARD UNLOCKED' : 'MILESTONE — GUARANTEED RARE'}</span>
                <p>{complete
                  ? 'Every universe collected. A room that isn\u2019t on the map is now open to you.'
                  : 'Your next milestone purchase guarantees a Rare-or-better pull. No luck required.'}</p>
              </div>
              <Gift size={16} className={complete ? 'gold-ico' : 'dim-ico'} />
            </div>
          </div>
        </Reveal>
      </div>

      <PullReveal />
    </section>
  )
}

/* Volumetric flip reveal — Vault.xyz pattern */
function PullReveal() {
  const { lastPull, clearLastPull } = useApp()
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    if (!lastPull) { setFlipped(false); return }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = setTimeout(() => setFlipped(true), reduced ? 60 : 950)
    return () => clearTimeout(t)
  }, [lastPull])

  return (
    <AnimatePresence>
      {lastPull && (
        <motion.div className="modal-backdrop dof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={clearLastPull}>
          <motion.div
            className="reveal-stage" role="dialog" aria-modal="true" aria-label="Collectible pull reveal"
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.94, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            onClick={e => e.stopPropagation()}
          >
            <button className="close-button" onClick={clearLastPull} aria-label="Close reveal"><X size={17} /></button>
            <span className="technical gold">PULL — RANDOMIZED FROM THE LIVE CATALOG</span>

            <div className={`flip-card ${flipped ? 'flipped' : ''}`} style={{ '--accent': lastPull.accent } as CSSProperties}>
              <div className="flip-inner">
                <div className="flip-back">
                  <span className="flip-sigil">N</span>
                  <small className="technical">THE MULTIVERSE</small>
                  <i className="flip-sheen" aria-hidden="true" />
                </div>
                <div className="flip-front">
                  <img src={lastPull.art} alt={`Pulled: Universe ${lastPull.id} — ${lastPull.title}`} />
                  <div className="flip-meta">
                    <span className="technical">#{lastPull.id} — {lastPull.rarity.toUpperCase()}</span>
                    <strong>{lastPull.title}</strong>
                    <small className="technical dim">{lastPull.artist} · EDITION {lastPull.minted + 1} / {lastPull.total}</small>
                  </div>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {flipped && (
                <motion.div className="reveal-caption" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                  <h3>Universe #{lastPull.id} — <em>{lastPull.title}</em></h3>
                  <p>Minted on Base · metadata pinned to IPFS · added to your stamp card.</p>
                  <button className="button button-gold" onClick={clearLastPull}>Keep collecting</button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
