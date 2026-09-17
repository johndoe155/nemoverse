import { useMemo, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronRight, Grid3X3, Landmark, Lock, X } from 'lucide-react'
import { universes, type Universe } from '../data'
import { BlurWords, Reveal, TickNumber, Tilt, useCountdown } from '../fx'
import { RoomCanvas } from '../scenes'
import { useApp } from '../state'

const rarityClass: Record<string, string> = { Common: 'r-common', Rare: 'r-rare', Secret: 'r-secret' }

export function Multiverse() {
  const { wallet, pulls, reducedMotion } = useApp()
  const [view, setView] = useState<'room' | 'grid'>('room')
  const [filter, setFilter] = useState<'All' | 'Common' | 'Rare' | 'Secret'>('All')
  const [sort, setSort] = useState<'release' | 'rarity'>('release')
  const [selected, setSelected] = useState<Universe | null>(null)
  const countdown = useCountdown('2026-09-20T18:00:00Z')

  const list = useMemo(() => {
    const f = filter === 'All' ? universes : universes.filter(u => u.rarity === filter)
    const order = { Secret: 0, Rare: 1, Common: 2 } as const
    return sort === 'release' ? [...f].sort((a, b) => a.num - b.num) : [...f].sort((a, b) => order[a.rarity] - order[b.rarity])
  }, [filter, sort])

  return (
    <section id="multiverse" className="multiverse section-pad">
      <div className="section-head">
        <Reveal>
          <p className="eyebrow"><span className="eyebrow-rule" />01 — THE ANCHOR</p>
          <h2><BlurWords text="The" /> <em><BlurWords text="Multiverse" base={120} /></em></h2>
        </Reveal>
        <Reveal delay={140} className="section-intro-wrap">
          <p className="section-intro">
            One canon. Infinite versions of NEMO. Every universe is an official, numbered commission —
            credited to its artist forever, released on a steady cadence, mintable as a limited run split 50 / 50 with its maker.
          </p>
        </Reveal>
      </div>

      <Reveal delay={100}>
        <div className="gallery-toolbar" role="toolbar" aria-label="Gallery controls">
          <div className="view-toggle" role="group" aria-label="View mode">
            <button className={view === 'room' ? 'active' : ''} onClick={() => setView('room')}><Landmark size={13} /> Spatial room</button>
            <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}><Grid3X3 size={13} /> Catalog grid</button>
          </div>
          <div className="filter-group" role="group" aria-label="Filter by rarity">
            {(['All', 'Common', 'Rare', 'Secret'] as const).map(f => (
              <button key={f} className={filter === f ? 'chip active' : 'chip'} onClick={() => { setFilter(f); setView('grid') }}>{f}</button>
            ))}
            <span className="toolbar-sep" aria-hidden="true" />
            <button className={sort === 'release' ? 'chip active' : 'chip'} onClick={() => setSort('release')}>By release</button>
            <button className={sort === 'rarity' ? 'chip active' : 'chip'} onClick={() => setSort('rarity')}>By rarity</button>
          </div>
        </div>
      </Reveal>

      <div className="gallery-stage">
        <AnimatePresence mode="wait">
          {view === 'room' ? (
            <motion.div
              key="room" className="room-wrap"
              initial={{ opacity: 0, scale: 1.035 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <RoomCanvas onPick={setSelected} reduced={reducedMotion} />
              <div className="room-hud">
                <span className="technical">ROOM 001 — THE CANON WING</span>
                <span className="technical">MOVE TO PAN · CLICK A WORK TO ENTER IT</span>
              </div>
              <div className="room-vignette" aria-hidden="true" />
            </motion.div>
          ) : (
            <motion.div
              key="grid" className="catalog-grid"
              initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {list.map((u, i) => {
                const locked = u.status === 'holders' && wallet !== 'verified'
                const owned = pulls.includes(u.id)
                return (
                  <Tilt
                    key={u.id} className="u-card" max={6}
                    onClick={() => setSelected(u)}
                    aria-label={`Open Universe ${u.id} — ${u.title}`}
                    style={{ '--accent': u.accent, '--delay': `${i * 70}ms` } as CSSProperties}
                  >
                    <div className="u-art">
                      <img src={u.art} alt={`Universe ${u.id} — ${u.title} by ${u.artist}`} loading="lazy" />
                      <span className={`badge ${rarityClass[u.rarity]}`}>{u.rarity}</span>
                      <span className="u-num technical">#{u.id}</span>
                      {owned && <span className="owned-mark technical">IN YOUR SET</span>}
                      {locked && <span className="locked-veil"><Lock size={15} /> <span className="technical">HOLDERS ONLY</span></span>}
                      {u.status === 'upcoming' && <span className="soon-veil"><span className="technical">DROPS IN</span><strong>{countdown}</strong></span>}
                    </div>
                    <div className="u-info">
                      <div>
                        <span className="technical dim">{u.artist} · {u.released} {u.year}</span>
                        <h3>{u.title}</h3>
                      </div>
                      <ArrowUpRight size={16} className="u-arrow" />
                    </div>
                    <div className="u-foot technical">
                      <span>{u.minted} / {u.total} MINTED</span>
                      <span>{u.price}</span>
                    </div>
                  </Tilt>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Reveal delay={80}>
        <div className="gallery-footer">
          <span className="technical">SHOWING {String(view === 'room' ? universes.length : list.length).padStart(2, '0')} / 05 UNIVERSES</span>
          <span className="cadence technical">RELEASE CADENCE — ONE UNIVERSE EVERY FEW WEEKS · NEXT <strong>{countdown}</strong></span>
        </div>
      </Reveal>

      <UniverseModal u={selected} close={() => setSelected(null)} />
    </section>
  )
}

function UniverseModal({ u, close }: { u: Universe | null; close: () => void }) {
  const { wallet, pulls, connectWallet } = useApp()
  const countdown = useCountdown('2026-09-20T18:00:00Z')
  return (
    <AnimatePresence>
      {u && (
        <motion.div className="modal-backdrop dof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
          <motion.div
            className="universe-modal" role="dialog" aria-modal="true" aria-label={`Universe ${u.id} — ${u.title}`}
            style={{ '--accent': u.accent } as CSSProperties}
            initial={{ y: 46, opacity: 0, rotateX: 6 }} animate={{ y: 0, opacity: 1, rotateX: 0 }} exit={{ y: 24, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 210, damping: 26 }}
            onClick={e => e.stopPropagation()}
          >
            <button className="close-button" onClick={close} aria-label="Close"><X size={17} /></button>
            <div className="modal-art">
              <img src={u.art} alt={`Universe ${u.id} — ${u.title}`} />
              <span className={`badge ${rarityClass[u.rarity]}`}>{u.rarity}</span>
              <div className="modal-art-meta technical">
                <span>UNIVERSE #{u.id}</span>
                <span>{u.minted} / {u.total}</span>
              </div>
            </div>
            <div className="modal-body">
              <span className="technical dim">CANON ENTRY — {u.released} {u.year}</span>
              <h2>{u.title}</h2>
              <p className="modal-lore">{u.lore}</p>
              <div className="artist-credit">
                <span className="artist-sigil" aria-hidden="true">{u.artist.split(' ').map(w => w[0]).join('')}</span>
                <div>
                  <strong>{u.artist}</strong>
                  <span className="technical dim">{u.handle} · CREDITED IN METADATA, PERMANENTLY</span>
                </div>
              </div>
              <div className="mint-progress">
                <div className="technical mp-row"><span>EDITION</span><span><TickNumber to={u.minted} /> / {u.total} MINTED</span></div>
                <div className="progress"><i style={{ transform: `scaleX(${u.minted / u.total})` }} /></div>
              </div>
              <div className="modal-meta">
                <div><span className="technical dim">PRICE</span><strong>{u.price}</strong></div>
                <div><span className="technical dim">SPLIT</span><strong>50 ARTIST / 50 STUDIO</strong></div>
                <div><span className="technical dim">CHAIN</span><strong>BASE · IPFS</strong></div>
              </div>
              {u.status === 'upcoming' ? (
                <div className="modal-cta-row">
                  <span className="soon-pill technical">HOLDER WINDOW OPENS IN {countdown}</span>
                </div>
              ) : pulls.includes(u.id) ? (
                <div className="modal-cta-row">
                  <span className="owned-pill technical">✦ IN YOUR COLLECTION — #{u.id}</span>
                </div>
              ) : u.status === 'holders' && wallet !== 'verified' ? (
                <button className="button button-blue" onClick={() => { close(); connectWallet(); document.querySelector('#access')?.scrollIntoView({ behavior: 'smooth' }) }}>
                  Verify holder status to claim <ChevronRight size={15} />
                </button>
              ) : (
                <button className="button button-primary" onClick={() => { close(); document.querySelector('#store')?.scrollIntoView({ behavior: 'smooth' }) }}>
                  Claim an edition <ArrowUpRight size={15} />
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
