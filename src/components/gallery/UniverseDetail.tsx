import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'
import { getUniverse, formatUniverseId, rarityLabel } from '@/data/universes'
import { universeGradient } from '@/lib/art'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { getLenis } from '@/hooks/useLenis'
import './detail.css'

export function UniverseDetail() {
  const detailOpen = useAppStore((s) => s.detailOpen)
  const activeUniverseId = useAppStore((s) => s.activeUniverseId)
  const setDetailOpen = useAppStore((s) => s.setDetailOpen)
  const setActiveUniverseId = useAppStore((s) => s.setActiveUniverseId)
  const setCameraMode = useAppStore((s) => s.setCameraMode)
  const setCursorState = useAppStore((s) => s.setCursorState)
  const ownedIds = useAppStore((s) => s.ownedIds)
  const isHolder = useAppStore((s) => s.isHolder)
  const walletConnected = useAppStore((s) => s.walletConnected)
  const connectWallet = useAppStore((s) => s.connectWallet)

  const universe = activeUniverseId ? getUniverse(activeUniverseId) : null
  const owned = universe ? ownedIds.includes(universe.id) : false

  const close = () => {
    setDetailOpen(false)
    setActiveUniverseId(null)
    setCameraMode('gallery')
    setCursorState('default')
    getLenis()?.start()
  }

  useEffect(() => {
    if (!detailOpen) return
    getLenis()?.stop()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailOpen])

  return (
    <AnimatePresence>
      {detailOpen && universe && (
        <motion.div
          className="universe-detail"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <button className="detail-backdrop" onClick={close} aria-label="Close" />

          <motion.article
            className="detail-panel glass-panel"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              className="detail-close"
              onClick={close}
              onMouseEnter={() => setCursorState('hover', 'CLOSE')}
              onMouseLeave={() => setCursorState('default')}
            >
              Esc
            </button>

            <div className="detail-grid">
              <div
                className={`detail-art rarity-${universe.rarity}`}
                style={{ background: universeGradient(universe, 160) }}
              >
                <span className="detail-art-id mono-num">{formatUniverseId(universe.id)}</span>
                {owned && <span className="badge badge-holder detail-owned"><span className="badge-dot" /> Owned</span>}
                <div className="detail-art-glow" />
              </div>

              <div className="detail-body">
                <div className="detail-meta-row">
                  <span className="eyebrow">Universe {formatUniverseId(universe.id)}</span>
                  <span
                    className={`badge ${
                      universe.rarity === 'variant'
                        ? 'badge-gold'
                        : universe.rarity === 'secret'
                          ? 'badge-accent'
                          : ''
                    }`}
                  >
                    {rarityLabel(universe.rarity)}
                  </span>
                  <span className="badge">{universe.status}</span>
                </div>

                <h2 className="detail-title">{universe.title}</h2>

                <p className="detail-lore">{universe.lore}</p>

                <div className="detail-artist glass-panel">
                  <div>
                    <p className="eyebrow">Artist credit</p>
                    <p className="detail-artist-name">{universe.artist.name}</p>
                    <p className="detail-artist-handle">{universe.artist.handle}</p>
                  </div>
                  <div className="detail-split">
                    <span className="mono-num">{universe.artist.splitPct}%</span>
                    <span>artist split</span>
                  </div>
                </div>

                <div className="detail-stats">
                  <div>
                    <span className="stat-label">Supply</span>
                    <span className="stat-value mono-num">
                      {universe.supply.minted}
                      <em>/{universe.supply.total}</em>
                    </span>
                  </div>
                  <div>
                    <span className="stat-label">Traits</span>
                    <div className="trait-row">
                      {universe.traits.map((t) => (
                        <span key={t} className="badge">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="detail-actions">
                  {universe.status === 'upcoming' ? (
                    isHolder ? (
                      <MagneticButton variant="gold" size="lg">
                        Early Access — Holders
                      </MagneticButton>
                    ) : walletConnected ? (
                      <MagneticButton variant="outline" size="lg">
                        Holder Access Required
                      </MagneticButton>
                    ) : (
                      <MagneticButton variant="primary" size="lg" onClick={connectWallet}>
                        Connect for Early Access
                      </MagneticButton>
                    )
                  ) : owned ? (
                    <MagneticButton variant="outline" size="lg">
                      In Your Collection
                    </MagneticButton>
                  ) : (
                    <MagneticButton variant="primary" size="lg">
                      Claim Universe
                    </MagneticButton>
                  )}
                  <MagneticButton variant="ghost" size="lg" onClick={close}>
                    Back to Plane
                  </MagneticButton>
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
