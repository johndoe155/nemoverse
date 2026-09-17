import { useAppStore } from '@/store/useAppStore'
import { getUniverse, formatUniverseId } from '@/data/universes'
import { universeGradient } from '@/lib/art'
import { MagneticButton } from '@/components/ui/MagneticButton'
import './sections.css'

const PERKS = [
  {
    num: '01',
    title: 'First access',
    body: 'Whitelist or early-claim on every new Multiverse universe before public release.',
  },
  {
    num: '02',
    title: 'Holder discounts',
    body: 'Percentage off Multiverse pieces and exclusive SKUs — auto-applied at checkout.',
  },
  {
    num: '03',
    title: 'Tiered rewards',
    body: 'Rarer traits unlock bigger perks and earlier windows. Status you can feel.',
  },
]

export function BelongSection() {
  const walletConnected = useAppStore((s) => s.walletConnected)
  const isHolder = useAppStore((s) => s.isHolder)
  const ownedIds = useAppStore((s) => s.ownedIds)
  const connectWallet = useAppStore((s) => s.connectWallet)
  const setCursorState = useAppStore((s) => s.setCursorState)

  return (
    <section id="belong" data-section="belong" className="section belong-section">
      <div className="section-inner">
        <header className="section-header">
          <p className="eyebrow">Pillar · Belong</p>
          <h2>Holders are recognized.</h2>
          <p>
            Connect your wallet. If you hold the OC NFT, the Hub lights up — verified badge,
            owned universes, and first access to every drop that follows.
          </p>
        </header>

        <div className="belong-grid">
          <div className="belong-card glass-panel">
            <div className="belong-status">
              {walletConnected && isHolder ? (
                <span className="badge badge-holder">
                  <span className="badge-dot" /> Verified Holder
                </span>
              ) : walletConnected ? (
                <span className="badge">Connected</span>
              ) : (
                <span className="badge">Guest</span>
              )}
              <h3>
                {isHolder
                  ? 'Your Multiverse is partially unlocked.'
                  : 'Prove ownership. Unlock the plane.'}
              </h3>
            </div>

            {!walletConnected && (
              <MagneticButton size="lg" onClick={connectWallet}>
                Connect Wallet
              </MagneticButton>
            )}

            <div className="belong-perks">
              {PERKS.map((p) => (
                <div key={p.num} className="belong-perk">
                  <span className="belong-perk-num mono-num">{p.num}</span>
                  <div>
                    <h4>{p.title}</h4>
                    <p>{p.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {isHolder && ownedIds.length > 0 && (
              <div className="owned-shelf">
                <h4>Universes in this wallet</h4>
                <div className="owned-row">
                  {ownedIds.map((id) => {
                    const u = getUniverse(id)
                    if (!u) return null
                    return (
                      <div
                        key={id}
                        className="owned-chip"
                        style={{ background: universeGradient(u) }}
                        title={u.title}
                        onMouseEnter={() => setCursorState('hover', formatUniverseId(id))}
                        onMouseLeave={() => setCursorState('default')}
                      >
                        <span className="mono-num">{formatUniverseId(id)}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="belong-visual">
            <div className="belong-ring">
              <div className="belong-ring-core" />
            </div>
            <div className="belong-visual-copy">
              <p className="eyebrow">Sigil active</p>
              <p>
                {isHolder
                  ? 'Holder ambient engaged. Owned cards carry a plasma rim on the Multiverse plane.'
                  : 'Connect to project your holder sigil across the archive.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
