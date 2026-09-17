export type Rarity = 'standard' | 'variant' | 'secret'
export type UniverseStatus = 'live' | 'upcoming' | 'archived'

export interface Artist {
  name: string
  handle: string
  splitPct: number
  bio: string
}

export interface Universe {
  id: string
  title: string
  artist: Artist
  lore: string
  rarity: Rarity
  status: UniverseStatus
  supply: { minted: number; total: number }
  dropAt: string
  traits: string[]
  /** HSL base for procedural art */
  hue: number
  sat: number
  light: number
  secondaryHue: number
}

export const OC_LORE = {
  name: 'Nemo',
  epithet: 'The Anchor Between Worlds',
  summary:
    'Born at the seam where timelines fray, Nemo is not one self but a constant — the same soul refracted through infinite canon realities. Each commissioned universe is not fan fiction. It is official. Numbered. Permanent.',
  manifesto:
    'One character. Infinite realities. The Multiverse is the engine — a living archive of artist-canon entries that funds its own expansion, rewards holders, and keeps the character alive across every timeline.',
}

export const universes: Universe[] = [
  {
    id: '001',
    title: 'Void Orchard',
    artist: {
      name: 'Kael Mori',
      handle: '@kaelmori',
      splitPct: 50,
      bio: 'Digital surrealist working between Kyoto and the astral plane.',
    },
    lore: 'In a timeline where gravity inverted at dusk, Nemo tends an orchard of black glass fruit that only ripens under dead stars. Each harvest rewrites a forgotten memory.',
    rarity: 'standard',
    status: 'live',
    supply: { minted: 142, total: 200 },
    dropAt: '2026-03-12T18:00:00Z',
    traits: ['Nocturne', 'Glass', 'Memory'],
    hue: 265,
    sat: 55,
    light: 28,
    secondaryHue: 190,
  },
  {
    id: '002',
    title: 'Chrome Pilgrim',
    artist: {
      name: 'Rin Voss',
      handle: '@rinvoss',
      splitPct: 55,
      bio: 'Industrial futurist. Surfaces that remember touch.',
    },
    lore: 'A pilgrimage route etched in liquid metal. Nemo walks barefoot across a city that polishes itself overnight — every reflection is a different self, none of them lying.',
    rarity: 'standard',
    status: 'live',
    supply: { minted: 188, total: 200 },
    dropAt: '2026-03-28T18:00:00Z',
    traits: ['Chrome', 'Urban', 'Reflection'],
    hue: 210,
    sat: 20,
    light: 42,
    secondaryHue: 280,
  },
  {
    id: '003',
    title: 'Ash Protocol',
    artist: {
      name: 'Sable Quill',
      handle: '@sablequill',
      splitPct: 50,
      bio: 'Narrative illustrator of collapsed empires and quiet gods.',
    },
    lore: 'After the last library burned, Nemo became the protocol that stored stories in ash. Speak a name into the soot and the page reforms — once.',
    rarity: 'variant',
    status: 'live',
    supply: { minted: 67, total: 100 },
    dropAt: '2026-04-14T18:00:00Z',
    traits: ['Ash', 'Archive', 'Ritual'],
    hue: 18,
    sat: 45,
    light: 22,
    secondaryHue: 35,
  },
  {
    id: '004',
    title: 'Tide of Static',
    artist: {
      name: 'Nova Park',
      handle: '@novapark',
      splitPct: 50,
      bio: 'Signal-based painter. Works exclusively in interference patterns.',
    },
    lore: 'An ocean that broadcasts. Nemo dives through frequencies instead of water, surfacing in timelines where the only language left is white noise and longing.',
    rarity: 'standard',
    status: 'live',
    supply: { minted: 91, total: 150 },
    dropAt: '2026-05-02T18:00:00Z',
    traits: ['Signal', 'Ocean', 'Drift'],
    hue: 195,
    sat: 60,
    light: 30,
    secondaryHue: 310,
  },
  {
    id: '005',
    title: 'Gilded Fracture',
    artist: {
      name: 'Iori Han',
      handle: '@iorihan',
      splitPct: 60,
      bio: 'Kintsugi maximalist. Breaks things on purpose.',
    },
    lore: 'Where the Multiverse cracked, Nemo sealed the seam with molten gold. The scar became a throne. Only those who have broken something sacred may sit.',
    rarity: 'variant',
    status: 'live',
    supply: { minted: 44, total: 75 },
    dropAt: '2026-05-20T18:00:00Z',
    traits: ['Gold', 'Fracture', 'Throne'],
    hue: 42,
    sat: 70,
    light: 38,
    secondaryHue: 15,
  },
  {
    id: '006',
    title: 'Neon Monastery',
    artist: {
      name: 'Jex Arden',
      handle: '@jexarden',
      splitPct: 50,
      bio: 'Cyber-devotional artist. Prays in hex.',
    },
    lore: 'Monks chant in LED. Nemo is the silent hour between cycles — the only being allowed to extinguish the neon without ending the prayer.',
    rarity: 'standard',
    status: 'live',
    supply: { minted: 120, total: 180 },
    dropAt: '2026-06-07T18:00:00Z',
    traits: ['Neon', 'Sacred', 'Night'],
    hue: 300,
    sat: 65,
    light: 26,
    secondaryHue: 170,
  },
  {
    id: '007',
    title: 'Paper Crown',
    artist: {
      name: 'Lumen Ori',
      handle: '@lumenori',
      splitPct: 50,
      bio: 'Collage oracle. Cuts timelines with scissors.',
    },
    lore: 'A child-king made of folded letters. In this reality Nemo rules a kingdom of unanswered mail — every unsent word is a province.',
    rarity: 'standard',
    status: 'live',
    supply: { minted: 156, total: 200 },
    dropAt: '2026-06-25T18:00:00Z',
    traits: ['Paper', 'Crown', 'Epistolary'],
    hue: 35,
    sat: 30,
    light: 55,
    secondaryHue: 250,
  },
  {
    id: '008',
    title: 'Null Garden',
    artist: {
      name: 'Echo Vellum',
      handle: '@echovellum',
      splitPct: 55,
      bio: 'Negative-space sculptor. What is missing is the subject.',
    },
    lore: 'A garden that grows only absences. Nemo plants holes in the world and harvests the silence that fills them. Collectors hear different songs.',
    rarity: 'secret',
    status: 'live',
    supply: { minted: 12, total: 25 },
    dropAt: '2026-07-10T18:00:00Z',
    traits: ['Null', 'Secret', 'Silence'],
    hue: 250,
    sat: 15,
    light: 12,
    secondaryHue: 280,
  },
  {
    id: '009',
    title: 'Solar Archive',
    artist: {
      name: 'Tess Calder',
      handle: '@tesscalder',
      splitPct: 50,
      bio: 'Light archivist. Photographs things that have not happened yet.',
    },
    lore: 'At the center of a dying sun, a vault of unspent days. Nemo is the librarian — lending tomorrows to those who return yesterdays intact.',
    rarity: 'standard',
    status: 'live',
    supply: { minted: 73, total: 150 },
    dropAt: '2026-07-28T18:00:00Z',
    traits: ['Solar', 'Archive', 'Time'],
    hue: 28,
    sat: 80,
    light: 45,
    secondaryHue: 5,
  },
  {
    id: '010',
    title: 'Mirror Host',
    artist: {
      name: 'Vesper Nyx',
      handle: '@vespernyx',
      splitPct: 50,
      bio: 'Identity glitch artist. Never the same portrait twice.',
    },
    lore: 'Every mirror in this world is occupied. Nemo hosts the reflections of those who cannot face themselves — rent is paid in true names.',
    rarity: 'variant',
    status: 'live',
    supply: { minted: 38, total: 80 },
    dropAt: '2026-08-15T18:00:00Z',
    traits: ['Mirror', 'Host', 'Identity'],
    hue: 220,
    sat: 25,
    light: 48,
    secondaryHue: 320,
  },
  {
    id: '011',
    title: 'Bloom Protocol',
    artist: {
      name: 'Aya Solis',
      handle: '@ayasolis',
      splitPct: 50,
      bio: 'Botanical systems designer. Code that photosynthesizes.',
    },
    lore: 'Upcoming drop. Flora that executes. Nemo writes a garden as a smart contract — flowers bloom only when a promise is kept on-chain.',
    rarity: 'standard',
    status: 'upcoming',
    supply: { minted: 0, total: 175 },
    dropAt: '2026-09-30T18:00:00Z',
    traits: ['Bloom', 'Code', 'Promise'],
    hue: 145,
    sat: 50,
    light: 32,
    secondaryHue: 90,
  },
  {
    id: '012',
    title: 'Eclipse Index',
    artist: {
      name: 'Morrow Ink',
      handle: '@morrowink',
      splitPct: 60,
      bio: 'Celestial cartographer of endings.',
    },
    lore: 'The final numbered entry of this cycle. When two suns cancel, Nemo catalogues what remains in the dark — an index of everything that almost was.',
    rarity: 'secret',
    status: 'upcoming',
    supply: { minted: 0, total: 33 },
    dropAt: '2026-10-20T18:00:00Z',
    traits: ['Eclipse', 'Index', 'Secret'],
    hue: 275,
    sat: 40,
    light: 10,
    secondaryHue: 40,
  },
]

/** Mock: which universe IDs a "verified holder" owns */
export const MOCK_OWNED_IDS = ['001', '003', '005', '008']

export const FEATURED_PRODUCTS = [
  {
    id: 'p1',
    name: 'Multiverse Archive Tee',
    price: 48,
    tag: 'Merch',
    hue: 265,
  },
  {
    id: 'p2',
    name: 'Holder Sigil Hoodie',
    price: 96,
    tag: 'Gated',
    hue: 210,
  },
  {
    id: 'p3',
    name: 'Universe Print — #001',
    price: 120,
    tag: 'Print',
    hue: 42,
  },
  {
    id: 'p4',
    name: 'Stamp Card Companion',
    price: 32,
    tag: 'Collect',
    hue: 300,
  },
]

export function getUniverse(id: string) {
  return universes.find((u) => u.id === id)
}

export function formatUniverseId(id: string) {
  return `#${id.padStart(3, '0')}`
}

export function rarityLabel(r: Rarity) {
  switch (r) {
    case 'secret':
      return 'Secret'
    case 'variant':
      return 'Variant'
    default:
      return 'Canon'
  }
}
