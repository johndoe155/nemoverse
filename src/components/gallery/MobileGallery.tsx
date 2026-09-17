import { universes, formatUniverseId, rarityLabel } from '@/data/universes'
import { universeGradient } from '@/lib/art'
import { useAppStore } from '@/store/useAppStore'
import './gallery.css'

export function MobileGallery() {
  const filterRarity = useAppStore((s) => s.filterRarity)
  const ownedIds = useAppStore((s) => s.ownedIds)
  const setActiveUniverseId = useAppStore((s) => s.setActiveUniverseId)
  const setDetailOpen = useAppStore((s) => s.setDetailOpen)
  const setCameraMode = useAppStore((s) => s.setCameraMode)
  const setCursorState = useAppStore((s) => s.setCursorState)

  const filtered =
    filterRarity === 'all'
      ? universes
      : universes.filter((u) => u.rarity === filterRarity)

  return (
    <div className="mobile-gallery">
      {filtered.map((u) => {
        const owned = ownedIds.includes(u.id)
        return (
          <button
            key={u.id}
            className={`m-card rarity-${u.rarity} ${owned ? 'is-owned' : ''} status-${u.status}`}
            onClick={() => {
              setActiveUniverseId(u.id)
              setDetailOpen(true)
              setCameraMode('focus')
            }}
            onMouseEnter={() => setCursorState('hover', formatUniverseId(u.id))}
            onMouseLeave={() => setCursorState('default')}
          >
            <div className="m-card-art" style={{ background: universeGradient(u) }}>
              <span className="m-card-id mono-num">{formatUniverseId(u.id)}</span>
              {owned && <span className="m-card-sigil" />}
              {u.rarity === 'secret' && u.status !== 'live' && (
                <span className="m-card-veil">Classified</span>
              )}
            </div>
            <div className="m-card-meta">
              <div className="m-card-top">
                <h3>{u.title}</h3>
                <span className={`badge ${u.rarity === 'variant' ? 'badge-gold' : u.rarity === 'secret' ? 'badge-accent' : ''}`}>
                  {rarityLabel(u.rarity)}
                </span>
              </div>
              <p className="m-card-artist">{u.artist.name}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
