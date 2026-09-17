import { useAppStore } from '@/store/useAppStore'
import type { FilterRarity } from '@/store/useAppStore'
import { MobileGallery } from '@/components/gallery/MobileGallery'
import { universes, formatUniverseId, rarityLabel } from '@/data/universes'
import { universeGradient } from '@/lib/art'
import '../gallery/gallery.css'
import './sections.css'

const FILTERS: { id: FilterRarity; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'standard', label: 'Canon' },
  { id: 'variant', label: 'Variant' },
  { id: 'secret', label: 'Secret' },
]

export function MultiverseSection() {
  const filterRarity = useAppStore((s) => s.filterRarity)
  const setFilterRarity = useAppStore((s) => s.setFilterRarity)
  const isMobile = useAppStore((s) => s.isMobile)
  const reducedMotion = useAppStore((s) => s.reducedMotion)
  const setActiveUniverseId = useAppStore((s) => s.setActiveUniverseId)
  const setDetailOpen = useAppStore((s) => s.setDetailOpen)
  const setCameraMode = useAppStore((s) => s.setCameraMode)
  const setCursorState = useAppStore((s) => s.setCursorState)
  const setHoveredUniverseId = useAppStore((s) => s.setHoveredUniverseId)
  const ownedIds = useAppStore((s) => s.ownedIds)
  const hoveredUniverseId = useAppStore((s) => s.hoveredUniverseId)

  const showDomRail = isMobile || reducedMotion

  return (
    <section
      id="multiverse"
      data-section="multiverse"
      className="section multiverse-section"
    >
      <div className="section-inner">
        <header className="section-header">
          <p className="eyebrow">The Anchor Feature</p>
          <h2>The Multiverse</h2>
          <p>
            One canon collection. Infinite versions of the OC. Each entry is a numbered universe —
            commissioned, credited, mintable — not a one-off post lost in the feed.
          </p>
        </header>

        <div className="filter-row" role="tablist" aria-label="Filter by rarity">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filterRarity === f.id}
              className={`filter-chip ${filterRarity === f.id ? 'is-active' : ''}`}
              onClick={() => setFilterRarity(f.id)}
              onMouseEnter={() => setCursorState('hover')}
              onMouseLeave={() => setCursorState('default')}
            >
              {f.label}
            </button>
          ))}
        </div>

        {showDomRail ? (
          <MobileGallery />
        ) : (
          <>
            <div className="gallery-stage" aria-hidden>
              {/* WebGL cards render in fixed canvas; this reserves spatial reading room */}
              <div className="gallery-stage-frame">
                <p className="gallery-stage-label">
                  {hoveredUniverseId
                    ? `Focused · ${formatUniverseId(hoveredUniverseId)}`
                    : 'Interactive plane · hover to lift · click to open'}
                </p>
              </div>
            </div>

            <div className="gallery-hint">
              <p>
                Pointer physics on every card. Owned universes carry a <strong>holder sigil</strong>.
                Secrets stay veiled until revealed.
              </p>
              <p>
                <kbd>Click</kbd> open portal · <kbd>Esc</kbd> return
              </p>
            </div>

            <div className="desktop-index" aria-label="Universe index">
              {universes
                .filter((u) => filterRarity === 'all' || u.rarity === filterRarity)
                .map((u) => (
                  <button
                    key={u.id}
                    className={`index-row ${ownedIds.includes(u.id) ? 'is-owned' : ''} ${hoveredUniverseId === u.id ? 'is-hot' : ''}`}
                    onMouseEnter={() => {
                      setHoveredUniverseId(u.id)
                      setCursorState('hover', formatUniverseId(u.id))
                    }}
                    onMouseLeave={() => {
                      setHoveredUniverseId(null)
                      setCursorState('default')
                    }}
                    onClick={() => {
                      setActiveUniverseId(u.id)
                      setDetailOpen(true)
                      setCameraMode('focus')
                    }}
                  >
                    <span
                      className="index-swatch"
                      style={{ background: universeGradient(u) }}
                      aria-hidden
                    />
                    <span className="index-id mono-num">{formatUniverseId(u.id)}</span>
                    <span className="index-title">{u.title}</span>
                    <span className="index-artist">{u.artist.name}</span>
                    <span className={`badge ${u.rarity === 'variant' ? 'badge-gold' : u.rarity === 'secret' ? 'badge-accent' : ''}`}>
                      {rarityLabel(u.rarity)}
                    </span>
                  </button>
                ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
