import { useMemo } from 'react'
import { universes, formatUniverseId } from '@/data/universes'
import { universeGradient } from '@/lib/art'
import { useAppStore } from '@/store/useAppStore'
import './sections.css'

export function ArtistsSection() {
  const setCursorState = useAppStore((s) => s.setCursorState)

  const artists = useMemo(() => {
    const map = new Map<
      string,
      {
        name: string
        handle: string
        bio: string
        splitPct: number
        universeIds: string[]
        hue: number
        sat: number
        light: number
        secondaryHue: number
      }
    >()
    for (const u of universes) {
      const key = u.artist.handle
      const existing = map.get(key)
      if (existing) {
        existing.universeIds.push(u.id)
      } else {
        map.set(key, {
          ...u.artist,
          universeIds: [u.id],
          hue: u.hue,
          sat: u.sat,
          light: u.light,
          secondaryHue: u.secondaryHue,
        })
      }
    }
    return Array.from(map.values())
  }, [])

  return (
    <section id="artists" data-section="artists" className="section artists-section">
      <div className="section-inner">
        <header className="section-header">
          <p className="eyebrow">Credits · Permanent</p>
          <h2>Artists, on the record.</h2>
          <p>
            Every universe carries a public, permanent credit — on the Hub and in the metadata.
            Fair splits. Named forever.
          </p>
        </header>

        <div className="artists-rail">
          {artists.map((a) => (
            <article
              key={a.handle}
              className="artist-card glass-panel"
              onMouseEnter={() => setCursorState('hover')}
              onMouseLeave={() => setCursorState('default')}
            >
              <div className="artist-top">
                <div
                  className="artist-avatar"
                  style={{
                    background: universeGradient({
                      id: 'x',
                      title: '',
                      artist: a,
                      lore: '',
                      rarity: 'standard',
                      status: 'live',
                      supply: { minted: 0, total: 0 },
                      dropAt: '',
                      traits: [],
                      hue: a.hue,
                      sat: a.sat,
                      light: a.light,
                      secondaryHue: a.secondaryHue,
                    }),
                  }}
                />
                <div>
                  <h3>{a.name}</h3>
                  <p className="handle">{a.handle}</p>
                </div>
              </div>
              <p className="bio">{a.bio}</p>
              <div className="artist-universes">
                {a.universeIds.map((id) => (
                  <span key={id} className="badge badge-accent mono-num">
                    {formatUniverseId(id)}
                  </span>
                ))}
                <span className="badge">{a.splitPct}% split</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
