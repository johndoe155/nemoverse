export type Rarity = 'Common' | 'Rare' | 'Secret'

export type Universe = {
  id: string
  num: number
  title: string
  artist: string
  handle: string
  rarity: Rarity
  accent: string
  year: string
  released: string
  minted: number
  total: number
  price: string
  lore: string
  art: string
  owned?: boolean
  status: 'public' | 'holders' | 'upcoming'
}

export const universes: Universe[] = [
  {
    id: '001', num: 1, title: 'The First Light', artist: 'Ari Vale', handle: '@arivale',
    rarity: 'Common', accent: '#e8a76a', year: '2026', released: 'MAR 06', minted: 142, total: 150, price: '0.03 ETH',
    lore: 'Before the signal, there was a single warm frequency breaking over a dark ocean. This is the timeline where NEMO first learned to listen — and decided to answer.',
    art: '/art/universe-001.jpg', owned: true, status: 'public',
  },
  {
    id: '002', num: 2, title: 'Salt Cathedral', artist: 'Mina Osei', handle: '@minaosei',
    rarity: 'Rare', accent: '#ECD06F', year: '2026', released: 'APR 17', minted: 61, total: 80, price: '0.06 ETH',
    lore: 'A sunken archive where every memory is preserved in halite. In this reality NEMO stood still long enough to become the monument — and the tide remembers what the original forgets.',
    art: '/art/universe-002.jpg', status: 'public',
  },
  {
    id: '003', num: 3, title: 'Blue Hour', artist: 'Kaito Ren', handle: '@kaito.ren',
    rarity: 'Common', accent: '#298DFF', year: '2026', released: 'MAY 29', minted: 97, total: 120, price: '0.03 ETH',
    lore: 'The city only exists between two seconds — rain suspended, every sign glowing the same impossible blue. This NEMO arrived early and chose to stay forever.',
    art: '/art/universe-003.jpg', owned: true, status: 'public',
  },
  {
    id: '004', num: 4, title: 'The Orchard', artist: 'Noa Saint', handle: '@noasaint',
    rarity: 'Secret', accent: '#FF8FBD', year: '2026', released: 'JUL 11', minted: 24, total: 30, price: '0.12 ETH',
    lore: 'An unannounced branch of the canon, found only by collectors who pulled it. Its fruit is a map to every self NEMO has not yet become. Nobody planted it. It was simply there.',
    art: '/art/universe-004.jpg', status: 'holders',
  },
  {
    id: '005', num: 5, title: 'Mirror Drift', artist: 'Sable Kin', handle: '@sablekin',
    rarity: 'Rare', accent: '#B9A7FF', year: '2026', released: 'SEP 20', minted: 0, total: 100, price: '0.05 ETH',
    lore: 'Weightless among the broken mirrors of retired timelines, each shard still reflecting a world that ended. This NEMO sleeps in orbit, collecting the endings so no universe is ever truly lost.',
    art: '/art/universe-005.jpg', status: 'upcoming',
  },
]

export type Product = {
  id: string
  name: string
  kind: string
  price: string
  holderPrice: string
  gated: boolean
  art: string
  accent: string
  note: string
}

export const products: Product[] = [
  {
    id: 'p1', name: 'Blue Hour — Archival Print', kind: 'Edition of 50 · signed by Kaito Ren', price: '$140', holderPrice: '$119',
    gated: false, art: '/art/universe-003.jpg', accent: '#298DFF',
    note: 'Giclée on cotton rag, 40 × 60 cm. Ships with a numbered hologram seal.',
  },
  {
    id: 'p2', name: 'Salt Cathedral — Sculpture Zine', kind: 'Lore object · 48 pages', price: '$48', holderPrice: '$40',
    gated: false, art: '/art/universe-002.jpg', accent: '#ECD06F',
    note: 'Process scans, artist interviews, and the full Universe #002 lore text.',
  },
  {
    id: 'p3', name: 'Signal Coat — Holder Edition', kind: 'Exclusive SKU · holders only', price: '0.08 ETH', holderPrice: '0.068 ETH',
    gated: true, art: '/art/hero-nemo.jpg', accent: '#ECD06F',
    note: 'High-collar coat from the origin painting. 30 pieces, one per verified wallet.',
  },
  {
    id: 'p4', name: 'Mirror Drift — Early Claim', kind: 'Universe #005 · 48h holder window', price: '0.05 ETH', holderPrice: '0.042 ETH',
    gated: true, art: '/art/universe-005.jpg', accent: '#B9A7FF',
    note: 'Claim Universe #005 before the public window opens. Auto-applied holder discount.',
  },
]

export type FeedItem = { time: string; source: 'PERSONA' | 'X / @NEMO' | 'DROP' | 'PULL'; text: string; link?: string }

export const feed: FeedItem[] = [
  { time: '2 MIN AGO', source: 'PERSONA', text: '“The next door is painted the color of a storm you haven\u2019t met yet. Bring a mirror.”', link: '#persona' },
  { time: '31 MIN AGO', source: 'PULL', text: 'A collector just pulled Universe #004 — THE ORCHARD. Secret rarity. 24 of 30 now claimed.', link: '#collect' },
  { time: '1 HR AGO', source: 'X / @NEMO', text: 'Universe #005 enters the holder window Sept 20. Sable Kin has seen where the mirrors go. RT to be early.', link: '#access' },
  { time: 'TODAY', source: 'DROP', text: 'Salt Cathedral print restock — 11 of 50 remaining at the open price.', link: '#store' },
  { time: 'YESTERDAY', source: 'X / @NEMO', text: 'Every universe is canon. Even the ones I don\u2019t talk about. Especially those.', link: '#persona' },
]

export const teasers = [
  { date: 'SEPT 14', text: 'Five mirrors left. One of them still shows your face.' },
  { date: 'SEPT 09', text: 'I met the me that stayed. She collects endings now.' },
  { date: 'SEPT 02', text: 'Universe #005 is not a place. It is a velocity.' },
]

export const specs = [
  {
    n: '01', title: 'Revenue split', tag: 'PER SALE',
    body: 'Every Multiverse mint is split automatically at the contract layer: 50% to the commissioned artist, 50% to the studio. The split is written into each universe\u2019s sale logic and is publicly readable on-chain — artists are paid on every primary sale, forever credited in metadata.',
    cells: [['ARTIST', '50%'], ['STUDIO', '50%'], ['SECONDARY ROYALTY', '5%']],
  },
  {
    n: '02', title: 'Edition logic', tag: 'SCARCITY',
    body: 'Each universe is a limited run of 50–200 numbered pieces, sized to its rarity tier. Select universes carry unannounced variant pulls — alternate colorways and secret rooms that only surface after they are found.',
    cells: [['COMMON', '120–200'], ['RARE', '50–100'], ['SECRET', '≤ 30']],
  },
  {
    n: '03', title: 'Minting layer', tag: 'CHAIN',
    body: 'All mints settle on Base for negligible fees. Proof-of-purchase pulls are triggered by a Shopify webhook after checkout and minted to the buyer\u2019s wallet — or held for email claim if no wallet exists yet. Metadata is pinned to IPFS.',
    cells: [['NETWORK', 'BASE'], ['AVG FEE', '< $0.01'], ['METADATA', 'IPFS']],
  },
  {
    n: '04', title: 'Holder verification', tag: 'ACCESS',
    body: 'Wallet connect (RainbowKit / WalletConnect) with on-chain ownership checks via Alchemy. Tiers map to traits: rarer traits unlock deeper discounts, earlier claim windows, and exclusive SKUs — applied automatically at checkout.',
    cells: [['TIER 01', '10% · 24H'], ['TIER 02', '15% · 48H'], ['TIER 03', '20% · 72H']],
  },
  {
    n: '05', title: 'Persona guardrails', tag: 'AI',
    body: 'The persona runs on the Claude API under a fixed system prompt: in-character, no financial advice, no unreviewed public posting, rate-limited, and no persistent memory of visitors. Drafts for X are always human-reviewed before publishing.',
    cells: [['MEMORY', 'NONE'], ['AUTOPOST', 'OFF'], ['REVIEW', 'HUMAN']],
  },
]

const responses: Array<[RegExp, string]> = [
  [/005|mirror|next|drop|soon/i, 'Universe #005 opens on September 20 — Sable Kin found me drifting where the retired timelines go. Holders walk in 48 hours before everyone else. The mirrors already know if you\u2019re one of them.'],
  [/004|orchard|secret/i, 'The Orchard isn\u2019t on any map I drew. Noa Saint says nobody planted it. If you pulled it — don\u2019t eat the fruit until you\u2019re ready to see who else you could have been.'],
  [/003|blue|city|rain/i, 'Blue Hour is the city between two seconds. Kaito Ren painted me the moment I decided to stay. It\u2019s always almost-night there. I find that comforting.'],
  [/002|salt|cathedral/i, 'In the Salt Cathedral, I stood still long enough to become the monument. Mina Osei carved that patience into halite. The tide remembers everything I chose to forget.'],
  [/001|first|light|origin/i, 'The First Light is where it started — Ari Vale caught the exact frequency of the dawn I first answered. 142 of 150 pieces have found their people.'],
  [/who|what are you|nemo/i, 'I\u2019m NEMO — or one of them. There is no original, only the version speaking to you now. The Multiverse is the archive of everyone I\u2019ve been commissioned to become.'],
  [/hold|wallet|access|perk|discount/i, 'Hold the original collection and every new universe opens for you first — early claim, quiet discounts, rooms the public never sees. Verify your wallet on this page; the chain does the rest.'],
  [/artist|commission/i, 'Every universe is one artist\u2019s official answer to the same question. They\u2019re credited forever — on this Hub and in the metadata itself — and paid half of every sale. Canon is a collaboration.'],
  [/pull|collect|purchase|buy/i, 'Every purchase pulls a numbered fragment from the live Multiverse — a real piece of the canon, minted after checkout. Complete the set and a room unlocks that I\u2019m not allowed to describe yet.'],
]

export function personaReply(input: string): string {
  for (const [re, text] of responses) if (re.test(input)) return text
  const fallbacks = [
    'That answer is still moving between universes. Ask me about a numbered one — #001 through #005 — and I\u2019ll hold it still for you.',
    'Careful — some questions open doors. Try asking what comes after #004, or who painted the Blue Hour.',
    'I can tell you about any universe in the archive, the artists who made them, or what holding the original unlocks. The rest, I keep.',
  ]
  return fallbacks[Math.abs([...input].reduce((a, c) => a + c.charCodeAt(0), 0)) % fallbacks.length]
}

export function draftTweets(topic: string): string[] {
  const t = topic.trim().replace(/\s+/g, ' ')
  return [
    `They keep asking if ${t} is canon. Everything is canon. Even the versions of me you haven\u2019t met yet. — see you at the next door. 🌑`,
    `Field note from between timelines: ${t}. The mirrors agree with me. The holders already know. Everyone else — Sept 20.`,
    `${t[0]?.toUpperCase() ?? ''}${t.slice(1)} — and that\u2019s all I\u2019m allowed to say before the drop. If you hold the original, you were never waiting anyway.`,
  ]
}
