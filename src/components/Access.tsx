import { Fragment } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BadgeCheck, Fingerprint, Link2, ScanLine, Wallet } from 'lucide-react'
import { universes } from '../data'
import { BlurWords, Reveal } from '../fx'
import { useApp } from '../state'

const stages = [
  { key: 'connecting', icon: Link2, label: 'Connecting wallet', sub: 'WalletConnect session opening…' },
  { key: 'signing', icon: Fingerprint, label: 'Awaiting signature', sub: 'Sign the message — it costs nothing.' },
  { key: 'checking', icon: ScanLine, label: 'Reading the chain', sub: 'Alchemy ownership check · NEMO Originals' },
  { key: 'verified', icon: BadgeCheck, label: 'Holder verified', sub: 'Tier 02 · perks unlocked storewide' },
] as const

const perks = [
  ['01', 'Early claim', 'A 48-hour window on every new universe before the public.'],
  ['02', 'Auto discount', '15% applied at checkout — no codes, the chain is the code.'],
  ['03', 'Exclusive SKUs', 'Holder-only objects that never reach the open store.'],
  ['04', 'Free shipping', 'On every physical piece, everywhere, always.'],
  ['05', 'Tiered rarity', 'Rarer traits deepen the discount and widen the window.'],
] as const

export function Access() {
  const { wallet, address, connectWallet, disconnect, pulls } = useApp()
  const stageIndex = stages.findIndex(s => s.key === wallet)
  const owned = universes.filter(u => pulls.includes(u.id))

  return (
    <section id="access" className={`access section-pad ${wallet === 'verified' ? 'is-verified' : ''}`}>
      <div className="access-divider" aria-hidden="true" />
      <div className="section-head">
        <Reveal>
          <p className="eyebrow blue"><span className="eyebrow-rule" />02 — HOLDER ACCESS</p>
          <h2><BlurWords text="Hold the original." /><br /><em><BlurWords text="Unlock every next room." base={260} /></em></h2>
        </Reveal>
        <Reveal delay={140} className="section-intro-wrap">
          <p className="section-intro">
            If you hold the NEMO original collection — or the right trait inside it — the store already knows you.
            Verification is one signature: no gas, no custody, nothing moves.
          </p>
        </Reveal>
      </div>

      <div className="access-layout">
        <Reveal className="verify-column">
          <div className={`verify-panel state-${wallet}`}>
            <div className="panel-head technical">
              <span>WALLET / VERIFICATION</span>
              <span className={`status-lamp ${wallet}`}><i />{wallet === 'verified' ? 'VERIFIED' : wallet === 'idle' ? 'STANDBY' : 'WORKING'}</span>
            </div>

            {wallet === 'idle' && (
              <div className="verify-empty">
                <div className="verify-orb" aria-hidden="true"><Wallet size={20} /></div>
                <p>Connect to reveal your tier, your owned universes, and your personal drop window.</p>
                <button className="button button-blue" onClick={connectWallet}><Wallet size={14} /> Verify holder status</button>
                <span className="technical dim">RAINBOWKIT · WALLETCONNECT · READ-ONLY</span>
              </div>
            )}

            {wallet !== 'idle' && wallet !== 'verified' && (
              <div className="verify-steps" aria-live="polite">
                {stages.slice(0, 3).map((s, i) => {
                  const Icon = s.icon
                  const state = i < stageIndex ? 'done' : i === stageIndex ? 'active' : 'wait'
                  return (
                    <Fragment key={s.key}>
                      <div className={`v-step ${state}`}>
                        <span className="v-icon"><Icon size={15} /></span>
                        <div><strong>{s.label}</strong><span className="technical dim">{s.sub}</span></div>
                        <span className="v-dot" aria-hidden="true" />
                      </div>
                      {i < 2 && <span className={`v-line ${i < stageIndex ? 'done' : ''}`} aria-hidden="true" />}
                    </Fragment>
                  )
                })}
              </div>
            )}

            <AnimatePresence>
              {wallet === 'verified' && (
                <motion.div className="verify-result" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <div className="holder-id">
                    <span className="holder-glyph" aria-hidden="true"><BadgeCheck size={17} /></span>
                    <div>
                      <strong>{address}</strong>
                      <span className="technical dim">VERIFIED HOLDER · SINCE GENESIS</span>
                    </div>
                    <span className="tier-tag technical">TIER 02</span>
                  </div>
                  <div className="holder-stats">
                    <div><strong>{String(owned.length).padStart(2, '0')}</strong><span className="technical dim">UNIVERSES OWNED</span></div>
                    <div><strong>15%</strong><span className="technical dim">AUTO DISCOUNT</span></div>
                    <div><strong>48H</strong><span className="technical dim">EARLY WINDOW</span></div>
                  </div>
                  <div className="holder-owned">
                    {owned.map(u => (
                      <span key={u.id} className="mini-art" style={{ borderColor: u.accent }}>
                        <img src={u.art} alt={`Owned: Universe ${u.id}`} />
                        <i className="technical">#{u.id}</i>
                      </span>
                    ))}
                    <span className="owned-note">
                      Universe #005 unlocks for you <strong>48 hours early</strong>.
                      <button className="text-link small" onClick={disconnect}>Disconnect</button>
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        <div className="perk-column">
          {perks.map(([n, t, d], i) => (
            <Reveal key={n} delay={i * 70}>
              <div className={`perk-row ${wallet === 'verified' ? 'lit' : ''}`}>
                <span className="perk-n technical">{n}</span>
                <div><strong>{t}</strong><p>{d}</p></div>
                <span className="perk-state technical">{wallet === 'verified' ? 'ACTIVE' : 'LOCKED'}</span>
              </div>
            </Reveal>
          ))}
          <Reveal delay={380}>
            <p className="perk-footnote technical">PERKS RESOLVE ON-CHAIN AT CHECKOUT · SHOPIFY ADMIN API · NO CODES TO LOSE</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
