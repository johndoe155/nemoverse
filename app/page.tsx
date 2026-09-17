'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';

type IconName =
  | 'arrow'
  | 'arrowUp'
  | 'arrowDown'
  | 'chevron'
  | 'close'
  | 'grid'
  | 'menu'
  | 'moon'
  | 'plus'
  | 'spark'
  | 'wallet'
  | 'check'
  | 'copy'
  | 'cart'
  | 'send'
  | 'lock'
  | 'external'
  | 'globe'
  | 'scan'
  | 'play';

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.45,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  switch (name) {
    case 'arrow':
      return <svg {...common}><path d="M4 12h15" /><path d="m13 6 6 6-6 6" /></svg>;
    case 'arrowUp':
      return <svg {...common}><path d="M12 19V5" /><path d="m6 11 6-6 6 6" /></svg>;
    case 'arrowDown':
      return <svg {...common}><path d="M12 5v14" /><path d="m18 13-6 6-6-6" /></svg>;
    case 'chevron':
      return <svg {...common}><path d="m6 9 6 6 6-6" /></svg>;
    case 'close':
      return <svg {...common}><path d="M6 6 18 18" /><path d="M18 6 6 18" /></svg>;
    case 'grid':
      return <svg {...common}><rect x="4" y="4" width="6" height="6" /><rect x="14" y="4" width="6" height="6" /><rect x="4" y="14" width="6" height="6" /><rect x="14" y="14" width="6" height="6" /></svg>;
    case 'menu':
      return <svg {...common}><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></svg>;
    case 'moon':
      return <svg {...common}><path d="M20.5 15.2A8.4 8.4 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z" /></svg>;
    case 'plus':
      return <svg {...common}><path d="M12 5v14" /><path d="M5 12h14" /></svg>;
    case 'spark':
      return <svg {...common}><path d="m12 3 1.7 6.3L20 11l-6.3 1.7L12 19l-1.7-6.3L4 11l6.3-1.7L12 3Z" /><path d="m19 17 .6 2.4L22 20l-2.4.6L19 23l-.6-2.4L16 20l2.4-.6L19 17Z" /></svg>;
    case 'wallet':
      return <svg {...common}><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H19a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 16.5v-9Z" /><path d="M4 8h15" /><path d="M16 13h4" /><circle cx="16" cy="13" r=".5" fill="currentColor" /></svg>;
    case 'check':
      return <svg {...common}><path d="m5 12 4.2 4.2L19 6.5" /></svg>;
    case 'copy':
      return <svg {...common}><rect x="8" y="8" width="11" height="11" rx="1" /><path d="M16 8V6a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h2" /></svg>;
    case 'cart':
      return <svg {...common}><path d="M4 5h2l1.4 9.1a2 2 0 0 0 2 1.7h6.9a2 2 0 0 0 1.9-1.4L20 8H7" /><circle cx="10" cy="19" r="1" /><circle cx="17" cy="19" r="1" /></svg>;
    case 'send':
      return <svg {...common}><path d="m21 3-7.3 18-3.8-7L3 10.2 21 3Z" /><path d="m10 14 5-5" /></svg>;
    case 'lock':
      return <svg {...common}><rect x="5" y="10" width="14" height="10" rx="1.5" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>;
    case 'external':
      return <svg {...common}><path d="M14 5h5v5" /><path d="m19 5-8 8" /><path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" /></svg>;
    case 'globe':
      return <svg {...common}><circle cx="12" cy="12" r="8.5" /><path d="M3.8 12h16.4M12 3.5c2.2 2.3 3.2 5.1 3.2 8.5s-1 6.2-3.2 8.5c-2.2-2.3-3.2-5.1-3.2-8.5s1-6.2 3.2-8.5Z" /></svg>;
    case 'scan':
      return <svg {...common}><path d="M7 4H5a1 1 0 0 0-1 1v2M17 4h2a1 1 0 0 1 1 1v2M7 20H5a1 1 0 0 1-1-1v-2M17 20h2a1 1 0 0 0 1-1v-2" /><path d="M8 12h8" /></svg>;
    case 'play':
      return <svg {...common}><path d="m9 6 9 6-9 6V6Z" fill="currentColor" stroke="none" /></svg>;
    default:
      return null;
  }
}

type Universe = {
  id: number;
  code: string;
  title: string;
  artist: string;
  role: string;
  edition: number;
  minted: number;
  rarity: 'Common' | 'Rare' | 'Secret';
  release: string;
  status: 'Live' | 'Holder first' | 'Coming soon';
  palette: string;
  lore: string;
  tag: string;
  owned?: boolean;
};

const universes: Universe[] = [
  {
    id: 1,
    code: '001',
    title: 'The First Signal',
    artist: 'Mara Ilyan',
    role: 'Origin world',
    edition: 120,
    minted: 94,
    rarity: 'Common',
    release: 'JUL 26',
    status: 'Live',
    palette: 'blue',
    lore: 'Before the map had edges, the OC learned to leave a light on in the dark.',
    tag: 'CANON / ORIGIN',
    owned: true,
  },
  {
    id: 2,
    code: '002',
    title: 'Quiet Weather',
    artist: 'Jon Bell',
    role: 'Tidal reality',
    edition: 88,
    minted: 88,
    rarity: 'Rare',
    release: 'AUG 26',
    status: 'Live',
    palette: 'amber',
    lore: 'A soft climate follows the OC here: rain falls upward, and every memory leaves a tide mark.',
    tag: 'CANON / RARE',
    owned: true,
  },
  {
    id: 3,
    code: '003',
    title: 'Afterimage',
    artist: 'Nika Osei',
    role: 'Glass timeline',
    edition: 160,
    minted: 42,
    rarity: 'Common',
    release: 'SEP 26',
    status: 'Holder first',
    palette: 'violet',
    lore: 'The OC arrives one second after every event, carrying the outline of what could have been.',
    tag: 'CANON / GLASS',
    owned: true,
  },
  {
    id: 4,
    code: '004',
    title: 'Nocturne / 4AM',
    artist: 'Sora Kim',
    role: 'Night index',
    edition: 64,
    minted: 27,
    rarity: 'Rare',
    release: 'OCT 26',
    status: 'Coming soon',
    palette: 'rose',
    lore: 'At the quietest hour, every alternate self sends the same message: keep going.',
    tag: 'CANON / NIGHT',
  },
  {
    id: 5,
    code: '005',
    title: 'The Open Sea',
    artist: 'Ari Vale',
    role: 'Unmapped coast',
    edition: 200,
    minted: 18,
    rarity: 'Common',
    release: 'NOV 26',
    status: 'Coming soon',
    palette: 'sea',
    lore: 'No coordinates survive this world. The only landmark is a figure facing the horizon.',
    tag: 'CANON / TIDE',
  },
  {
    id: 6,
    code: '006',
    title: 'The Unnamed',
    artist: 'OC / unknown',
    role: 'Signal loss',
    edition: 50,
    minted: 7,
    rarity: 'Secret',
    release: 'CLASSIFIED',
    status: 'Holder first',
    palette: 'secret',
    lore: 'Some universes are not announced. They are discovered when the collection goes quiet.',
    tag: 'CLASSIFIED / 006',
  },
];

type Product = {
  id: number;
  name: string;
  type: string;
  price: string;
  note: string;
  visual: string;
  gated?: boolean;
};

const products: Product[] = [
  { id: 1, name: 'Signal / Heavy Tee', type: 'Edition 01 — physical', price: '$68', note: 'Organic cotton · 120 units', visual: 'tee' },
  { id: 2, name: 'Quiet Weather / 002', type: 'Universe print — archival', price: '$140', note: 'Signed edition · 88 units', visual: 'print', gated: true },
  { id: 3, name: 'OC Field Notes', type: 'Notebook — softcover', price: '$28', note: '96 pages · open edition', visual: 'book' },
];

const feedItems = [
  { date: '09.18', label: 'SIGNAL', title: 'Universe #006 is not where you think.', accent: 'gold' },
  { date: '09.12', label: 'DROP', title: 'Quiet Weather — 88 pieces, all accounted for.', accent: 'blue' },
  { date: '09.04', label: 'FIELD NOTE', title: 'A conversation with Nika Osei / Afterimage.', accent: 'muted' },
];

const specItems = [
  { key: '01', title: 'Revenue split', detail: 'Every limited universe edition routes a transparent 50 / 50 split between the commissioned artist and the OC universe. Preview state — contract address pending.' },
  { key: '02', title: 'Verification & access', detail: 'A connected wallet is checked against the OC collection and its trait tier. Holder-first drops, discounts, exclusive SKUs, free shipping, and bundled gifts are permissioned from that result.' },
  { key: '03', title: 'Collectible mint', detail: 'A completed store order triggers a proof-of-purchase pull from the live Multiverse catalog. The intended low-fee route is Polygon or Base, with metadata optionally pinned to IPFS.' },
  { key: '04', title: 'Persona guardrails', detail: 'The OC can draft, tease, and answer questions in character, but every public post remains human-reviewed. Rate limiting, no persistent memory, and clear topic boundaries protect the voice.' },
  { key: '05', title: 'Commerce handoff', detail: 'Shopify Storefront/Admin APIs will own inventory and checkout. The current interface is a deterministic preview of loading, gated, checkout, webhook, and claim states.' },
];

const formatAddress = (value: string) => `${value.slice(0, 6)}…${value.slice(-4)}`;

type Filter = 'all' | 'rare' | 'new' | 'owned';
type WalletStatus = 'idle' | 'connecting' | 'verified' | 'error';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'room' | 'grid'>('room');
  const [filter, setFilter] = useState<Filter>('all');
  const [selectedUniverse, setSelectedUniverse] = useState<Universe | null>(null);
  const [walletOpen, setWalletOpen] = useState(false);
  const [walletStatus, setWalletStatus] = useState<WalletStatus>('idle');
  const [cartCount, setCartCount] = useState(0);
  const [activeProduct, setActiveProduct] = useState(1);
  const [revealed, setRevealed] = useState(false);
  const [openSpec, setOpenSpec] = useState('01');
  const [personaOpen, setPersonaOpen] = useState(false);
  const [draftOpen, setDraftOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { author: 'OC', text: 'You found the room between worlds. Ask me about a universe.' },
  ]);
  const [draftTopic, setDraftTopic] = useState('');
  const [draftText, setDraftText] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 1250);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;
    const ring = document.querySelector<HTMLElement>('.cursor-ring');
    const dot = document.querySelector<HTMLElement>('.cursor-dot');
    const move = (event: MouseEvent) => {
      const x = `${event.clientX}px`;
      const y = `${event.clientY}px`;
      if (dot) {
        dot.style.left = x;
        dot.style.top = y;
      }
      if (ring) {
        ring.animate({ left: x, top: y }, { duration: 420, fill: 'forwards', easing: 'cubic-bezier(.16, 1, .3, 1)' });
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const filteredUniverses = useMemo(() => universes.filter((universe) => {
    if (filter === 'rare') return universe.rarity !== 'Common';
    if (filter === 'new') return universe.status === 'Coming soon';
    if (filter === 'owned') return universe.owned;
    return true;
  }), [filter]);

  const goTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleConnect = () => {
    if (walletStatus === 'connecting') return;
    setWalletStatus('connecting');
    window.setTimeout(() => {
      setWalletStatus('verified');
      setWalletOpen(false);
    }, 1050);
  };

  const handleChatSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = chatInput.trim();
    if (!trimmed) return;
    setMessages((current) => [
      ...current,
      { author: 'YOU', text: trimmed },
      { author: 'OC', text: trimmed.toLowerCase().includes('002') ? 'Quiet Weather remembers you. The rain falls upward there, and every pull leaves a tide mark.' : 'Every answer is a door, not a destination. Start with the universe you cannot stop thinking about.' },
    ]);
    setChatInput('');
  };

  const generateDraft = () => {
    const topic = draftTopic.trim() || 'the next signal';
    setDraftText(`I heard ${topic} moving through the walls of Universe #006.\n\nIf you know, you know. If you do not — keep looking.`);
  };

  const startCollectible = () => {
    setRevealed(false);
    window.setTimeout(() => setRevealed(true), 650);
  };

  return (
    <div className="site-root">
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      {!loaded && (
        <div className="loader" role="status" aria-label="Entering The OC Universe">
          <div className="loader-inner">
            <div className="loader-mark"><span>OC</span><i /></div>
            <div className="loader-meta"><span>THE OC UNIVERSE</span><span>EST. / NOW</span></div>
            <div className="loader-line"><span /></div>
            <p>ALIGNING THE SIGNAL <b>00{loaded ? '1' : '0'}</b></p>
          </div>
        </div>
      )}

      <header className="site-header">
        <button className="brand" onClick={() => goTo('top')} aria-label="Back to the beginning">
          <span className="brand-mark">OC</span>
          <span className="brand-name">THE<br />UNIVERSE</span>
        </button>
        <nav className={`main-nav ${mobileMenuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          <button onClick={() => goTo('multiverse')}>Multiverse <span>01</span></button>
          <button onClick={() => goTo('access')}>Access <span>02</span></button>
          <button onClick={() => goTo('store')}>Store <span>03</span></button>
          <button onClick={() => goTo('collect')}>Collect <span>04</span></button>
          <button onClick={() => goTo('persona')}>Persona <span>05</span></button>
        </nav>
        <div className="header-actions">
          <button className={`wallet-trigger ${walletStatus === 'verified' ? 'is-verified' : ''}`} onClick={() => setWalletOpen(true)}>
            <span className="status-dot" />
            {walletStatus === 'verified' ? '0x7A…91F2' : 'Connect'}
            <Icon name="wallet" size={15} />
          </button>
          <button className="mobile-menu-button" onClick={() => setMobileMenuOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={mobileMenuOpen}>
            <Icon name={mobileMenuOpen ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </header>

      <main>
        <section className="hero section-shell" id="top">
          <div className="hero-backdrop" aria-hidden="true">
            <div className="hero-grid" />
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="hero-star star-one" />
            <div className="hero-star star-two" />
            <div className="hero-star star-three" />
          </div>
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-mark" /> <span>THE OC / MULTIVERSE INDEX</span><span className="eyebrow-count">[ 001 — 006 ]</span></div>
            <h1><span>One OC.</span><em>Infinite</em><span>realities.</span></h1>
            <p className="hero-lede">A living canon of alternate worlds, commissioned in collaboration with artists and kept in orbit by the people who collect them.</p>
            <div className="hero-actions">
              <button className="button button-light" onClick={() => goTo('multiverse')}>Enter the Multiverse <Icon name="arrow" size={16} /></button>
              <button className="text-link" onClick={() => goTo('lore')}>Read the origin <Icon name="arrow" size={15} /></button>
            </div>
            <div className="hero-footnote"><span className="live-pulse" /> <span>LIVE SIGNAL</span><span className="footnote-separator" /> <span>UNIVERSE #006 / HOLDER FIRST</span></div>
          </div>
          <div className="hero-visual" aria-label="Abstract portal illustration">
            <div className="visual-coordinate coordinate-top">40° 43&apos; 42.1&quot; N</div>
            <div className="portal-wrap">
              <div className="portal-shadow" />
              <div className="portal">
                <div className="portal-ring ring-outer" />
                <div className="portal-ring ring-middle" />
                <div className="portal-core"><span>OC</span><small>∞</small></div>
                <div className="portal-slice slice-a" /><div className="portal-slice slice-b" /><div className="portal-slice slice-c" />
              </div>
              <div className="visual-orbit orbit-left" /><div className="visual-orbit orbit-right" />
            </div>
            <div className="visual-coordinate coordinate-bottom">THE SIGNAL IS OPEN / 03:17:08</div>
            <div className="hero-index">INDEX<br /><strong>00</strong><span>01</span></div>
          </div>
          <div className="hero-side-note"><span>SCROLL TO<br />CROSS OVER</span><Icon name="arrowDown" size={18} /></div>
        </section>

        <section className="lore-section section-pad" id="lore">
          <div className="section-intro-row">
            <div className="section-number">00 / <span>ORIGIN</span></div>
            <div className="section-rule" />
            <div className="section-side-label">THE CHARACTER / THE CANON</div>
          </div>
          <div className="lore-layout">
            <div className="lore-title-block reveal-copy">
              <p className="eyebrow">A STORY WITH MORE THAN ONE ENDING</p>
              <h2>The character<br />is the <i>constant.</i></h2>
            </div>
            <div className="lore-copy-block">
              <p className="large-copy">The OC lives in pieces — a profile, a collection, a store, a voice. Here, those pieces become a world that can be entered.</p>
              <p>Every commissioned artist is given a coordinate in the canon. Their interpretation is not fan art or a one-off post. It is an official, numbered universe: credited permanently, released on a rhythm, and held in common by the people who find it.</p>
              <button className="text-link" onClick={() => goTo('specs')}>How the canon works <Icon name="arrow" size={15} /></button>
            </div>
          </div>
          <div className="lore-timeline" aria-label="The OC Universe timeline">
            <div className="timeline-line"><span /></div>
            <div className="timeline-step is-active"><b>01</b><span>THE OC</span><small>THE CONSTANT</small></div>
            <div className="timeline-step"><b>02</b><span>THE ARTIST</span><small>A NEW LENS</small></div>
            <div className="timeline-step"><b>03</b><span>THE UNIVERSE</span><small>CANON / NUMBERED</small></div>
            <div className="timeline-step"><b>04</b><span>THE COLLECTOR</span><small>KEEP THE SIGNAL</small></div>
          </div>
        </section>

        <section className="multiverse-section section-pad" id="multiverse">
          <div className="section-intro-row">
            <div className="section-number">01 / <span>THE MULTIVERSE</span></div>
            <div className="section-rule" />
            <div className="section-side-label">A GROWING CANON / 06 WORLDS</div>
          </div>
          <div className="gallery-heading">
            <div>
              <p className="eyebrow gold-label"><span className="eyebrow-mark" />THE ANCHOR COLLECTION</p>
              <h2>Find your<br /><i>coordinate.</i></h2>
            </div>
            <div className="gallery-heading-copy">
              <p>Six official realities are on the map. The room will keep getting larger.</p>
              <div className="gallery-stats"><span><b>06</b> UNIVERSES</span><span><b>04</b> ARTISTS</span><span><b>04</b> ACTIVE STATES</span></div>
            </div>
          </div>
          <div className="gallery-toolbar">
            <div className="filter-group" role="group" aria-label="Filter universes">
              {([['all', 'All worlds'], ['rare', 'Rare / secret'], ['new', 'Coming next'], ['owned', 'In my orbit']] as [Filter, string][]).map(([value, label]) => (
                <button key={value} className={filter === value ? 'is-active' : ''} onClick={() => setFilter(value)}>{label}</button>
              ))}
            </div>
            <div className="view-group">
              <span>VIEW</span>
              <button className={viewMode === 'room' ? 'is-active' : ''} onClick={() => setViewMode('room')} aria-label="Spatial room view"><Icon name="moon" size={15} /> Room</button>
              <button className={viewMode === 'grid' ? 'is-active' : ''} onClick={() => setViewMode('grid')} aria-label="Catalog grid view"><Icon name="grid" size={15} /> Grid</button>
            </div>
          </div>
          <div className={`gallery-stage ${viewMode === 'room' ? 'room-mode' : 'grid-mode'}`}>
            <div className="room-coordinates" aria-hidden="true"><span>SPATIAL INDEX / 001</span><span>DRAG TO EXPLORE</span></div>
            <div className="gallery-grid">
              {filteredUniverses.map((universe, index) => (
                <button
                  className={`universe-card card-position-${index + 1} ${universe.rarity.toLowerCase()} ${universe.owned ? 'is-owned' : ''}`}
                  key={universe.id}
                  onClick={() => setSelectedUniverse(universe)}
                >
                  <div className={`card-art art-${universe.palette}`}>
                    <div className="art-noise" />
                    <div className="art-halo" />
                    <div className="art-orbit art-orbit-one" /><div className="art-orbit art-orbit-two" />
                    <div className="art-subject"><span>{universe.code}</span></div>
                    <div className="art-corner">OC / {universe.rarity.toUpperCase()}</div>
                  </div>
                  <div className="card-body">
                    <div className="card-header"><span>{universe.tag}</span>{universe.owned && <span className="owned-mark"><Icon name="check" size={12} /> IN ORBIT</span>}</div>
                    <h3>{universe.title}</h3>
                    <div className="card-subline"><span>{universe.artist}</span><span>{universe.code}</span></div>
                    <div className="card-footer"><span>{universe.edition - universe.minted} remaining</span><span className="card-open"><Icon name="arrow" size={14} /></span></div>
                  </div>
                  <span className="card-hover-label">OPEN UNIVERSE <Icon name="arrow" size={13} /></span>
                </button>
              ))}
            </div>
            {filteredUniverses.length === 0 && <div className="empty-state">No coordinates match this view. <button onClick={() => setFilter('all')}>Return to all worlds.</button></div>}
            <div className="gallery-stage-footer"><span>DRAG / SCROLL TO MOVE THROUGH THE ROOM</span><span>{String(filteredUniverses.length).padStart(2, '0')} COORDINATES FOUND <i /></span></div>
          </div>
          <div className="gallery-note"><span className="note-index">A—</span><p>Each universe is a limited edition, permanently credited to its artist and released at a measured cadence. Some coordinates only appear when you are looking closely.</p><button className="text-link" onClick={() => goTo('collect')}>Understand collecting <Icon name="arrow" size={15} /></button></div>
        </section>

        <section className="access-section section-pad" id="access">
          <div className="access-glow" aria-hidden="true" />
          <div className="section-intro-row light-row">
            <div className="section-number">02 / <span>ACCESS</span></div>
            <div className="section-rule" />
            <div className="section-side-label">OWNERSHIP / VERIFIED STATE</div>
          </div>
          <div className="access-layout">
            <div className="access-copy">
              <p className="eyebrow blue-label"><span className="eyebrow-mark" />FOR THE ONES ALREADY HOLDING</p>
              <h2>Your wallet<br />has a <i>point of view.</i></h2>
              <p className="large-copy">Connect the OC you already own. The door remembers what you hold — and opens first access, quieter prices, and pieces made for your tier.</p>
              <div className="perk-list">
                <div><span className="perk-number">01</span><span><b>First signal</b><small>Claim new universes before the public.</small></span></div>
                <div><span className="perk-number">02</span><span><b>Holder pricing</b><small>Discounts are applied when you check out.</small></span></div>
                <div><span className="perk-number">03</span><span><b>Rare treatment</b><small>Traits unlock larger perks and earlier windows.</small></span></div>
              </div>
            </div>
            <div className={`holder-card ${walletStatus === 'verified' ? 'is-verified' : ''}`}>
              <div className="holder-card-top"><span className="mono-label">ACCESS PROTOCOL / 02</span><span className="protocol-mark"><i /><i /><i /></span></div>
              {walletStatus === 'verified' ? (
                <div className="verified-content">
                  <div className="verified-heading"><span className="check-badge"><Icon name="check" size={20} /></span><div><span className="mono-label blue-text">VERIFIED HOLDER</span><h3>Gold tier / <em>active</em></h3></div></div>
                  <div className="verified-address"><span>CONNECTED WALLET</span><b>0x7A91…91F2</b><button aria-label="Copy wallet address"><Icon name="copy" size={14} /></button></div>
                  <div className="owned-universes"><div className="owned-head"><span>YOUR UNIVERSES</span><span>03 / 06</span></div><div className="owned-pips"><span className="filled" /><span className="filled" /><span className="filled" /><span /><span /><span /></div><div className="owned-caption"><span>#001 / #002 / #003</span><span>+ 15% drop access</span></div></div>
                  <button className="button button-blue full-button" onClick={() => goTo('store')}>Browse holder drops <Icon name="arrow" size={15} /></button>
                  <button className="disconnect-button" onClick={() => setWalletStatus('idle')}>Disconnect wallet</button>
                </div>
              ) : (
                <div className="connect-content">
                  <div className="wallet-constellation"><div className="constellation-core"><Icon name="wallet" size={25} /></div><span className="constellation-line line-a" /><span className="constellation-line line-b" /><span className="constellation-dot dot-a" /><span className="constellation-dot dot-b" /><span className="constellation-dot dot-c" /></div>
                  <span className="mono-label">NO WALLET DETECTED</span>
                  <h3>Find your<br /><em>access level.</em></h3>
                  <p>We will check your OC collection and return your holder tier. No transaction required.</p>
                  <button className="button button-blue full-button" onClick={() => setWalletOpen(true)}><Icon name="wallet" size={16} /> Connect wallet <Icon name="arrow" size={15} /></button>
                  <div className="supported-wallets"><span>SUPPORTED</span><b>WalletConnect</b><i /> <b>RainbowKit</b></div>
                </div>
              )}
              {walletStatus === 'connecting' && <div className="scan-overlay"><div className="scan-icon"><Icon name="scan" size={32} /></div><span className="mono-label blue-text">READING YOUR SIGNAL</span><p>Checking ownership and trait tier…</p><div className="scan-progress"><span /></div></div>}
            </div>
          </div>
        </section>

        <section className="store-section section-pad" id="store">
          <div className="section-intro-row">
            <div className="section-number">03 / <span>THE STORE</span></div>
            <div className="section-rule" />
            <div className="section-side-label">PHYSICAL / DIGITAL / IN ORBIT</div>
          </div>
          <div className="store-layout">
            <div className="store-column">
              <div className="store-heading"><p className="eyebrow"><span className="eyebrow-mark" />SHOP THE SIGNAL</p><h2>Something to<br /><i>take with you.</i></h2></div>
              <div className="product-drawer">
                <div className="product-drawer-head"><span className="mono-label">FEATURED / 03</span><button className="text-link small-link" onClick={() => setCartCount((value) => value + 1)}><Icon name="cart" size={15} /> Bag {cartCount > 0 && <b>{String(cartCount).padStart(2, '0')}</b>}</button></div>
                {products.map((product) => (
                  <article className={`product-row ${activeProduct === product.id ? 'is-active' : ''}`} key={product.id} onMouseEnter={() => setActiveProduct(product.id)} onFocus={() => setActiveProduct(product.id)}>
                    <div className={`product-visual product-${product.visual}`} aria-hidden="true"><span>{product.visual === 'tee' ? 'OC' : product.visual === 'print' ? '002' : 'FIELD'}</span></div>
                    <div className="product-info"><span className="mono-label">{product.type}</span><h3>{product.name}</h3><p>{product.note}</p>{product.gated && <span className="gated-label"><Icon name="lock" size={12} /> HOLDER FIRST</span>}</div>
                    <div className="product-action"><b>{product.price}</b><button aria-label={`Add ${product.name} to bag`} onClick={() => setCartCount((value) => value + 1)}><Icon name="plus" size={17} /></button></div>
                  </article>
                ))}
              </div>
            </div>
            <aside className="drop-feed">
              <div className="feed-head"><span className="mono-label">LIVE DROP FEED</span><span className="feed-live"><i /> LIVE</span></div>
              <div className="feed-preview" aria-label="Product preview"><div className={`preview-art preview-${activeProduct}`}><span>{activeProduct === 2 ? '002' : activeProduct === 3 ? 'OC / FN' : 'OC'}</span></div><div className="preview-caption"><span>HOVER PREVIEW / INSTANT</span><b>{products[activeProduct - 1]?.name}</b></div></div>
              <div className="feed-list">{feedItems.map((item) => <button className="feed-item" key={item.date} onClick={() => goTo('multiverse')}><span className={`feed-accent ${item.accent}`} /><div><span className="mono-label">{item.date} / {item.label}</span><p>{item.title}</p></div><Icon name="arrow" size={15} /></button>)}</div>
              <button className="text-link feed-link" onClick={() => goTo('persona')}>Follow the signal on X <Icon name="external" size={14} /></button>
            </aside>
          </div>
          <div className="commerce-note"><Icon name="spark" size={18} /><span>Every order pulls a numbered piece from the Multiverse. Your receipt becomes a coordinate.</span><button onClick={() => goTo('collect')}>See how it works <Icon name="arrow" size={14} /></button></div>
        </section>

        <section className="collect-section section-pad" id="collect">
          <div className="collect-bg-number" aria-hidden="true">PULL</div>
          <div className="section-intro-row light-row">
            <div className="section-number">04 / <span>COLLECT</span></div>
            <div className="section-rule" />
            <div className="section-side-label">PROOF OF PURCHASE / RANDOM PULL</div>
          </div>
          <div className="collect-layout">
            <div className="collect-copy"><p className="eyebrow gold-label"><span className="eyebrow-mark" />THE RECEIPT IS A DOOR</p><h2>Every order<br />leaves a <i>trace.</i></h2><p className="large-copy">When something leaves the store, something else arrives in your orbit: a numbered pull from the current Multiverse set.</p><p>Collect one from every universe and the map completes itself. A milestone purchase guarantees a rare coordinate — no duplicate, no dead end.</p><div className="chain-note"><span className="chain-icon"><Icon name="globe" size={16} /></span><span><b>LOW-FEE MINT / PREVIEW</b><small>Designed for Polygon or Base · IPFS-ready metadata</small></span></div></div>
            <div className="pull-column">
              <div className={`pull-card ${revealed ? 'is-revealed' : ''}`}>
                <div className="pull-face pull-front"><div className="pull-mark"><span>OC</span><i>∞</i></div><span className="mono-label">PROOF OF PURCHASE</span><b>YOUR NEXT<br /><em>COORDINATE</em></b><div className="pull-scan-lines" /><span className="pull-serial">ORDER / 000481 — RANDOMIZED</span></div>
                <div className="pull-face pull-back"><div className="revealed-art art-secret"><div className="art-noise" /><div className="art-halo" /><div className="art-orbit art-orbit-one" /><div className="art-orbit art-orbit-two" /><div className="art-subject"><span>006</span></div></div><div className="reveal-meta"><span className="mono-label gold-text">RARE / SECRET</span><h3>The Unnamed</h3><p>Universe #006 · Pull 07 / 50</p><span className="reveal-chain"><Icon name="check" size={12} /> METADATA PREPARED</span></div></div>
              </div>
              <div className="pull-controls"><button className="button button-light" onClick={startCollectible}>{revealed ? 'Pull another coordinate' : 'Reveal your pull'} <Icon name="spark" size={15} /></button><span>SIMULATED REVEAL / PREVIEW MODE</span></div>
            </div>
            <div className="set-progress">
              <div className="set-head"><div><span className="mono-label">YOUR SET</span><h3>Keep the signal.</h3></div><strong>03 <small>/ 06</small></strong></div>
              <div className="set-line"><span /></div>
              <div className="set-list">{universes.map((universe, index) => <div className={`set-item ${index < 3 ? 'is-owned' : ''} ${universe.rarity === 'Secret' ? 'is-secret' : ''}`} key={universe.id}><span className="set-number">{universe.code}</span><span className="set-mini-art"><i /></span><span className="set-title">{universe.title}</span><span className="set-state">{index < 3 ? <Icon name="check" size={13} /> : universe.rarity === 'Secret' ? <Icon name="lock" size={12} /> : '—'}</span></div>)}</div>
              <div className="stamp-card"><div className="stamp-top"><span className="mono-label">MILESTONE CARD</span><span>04 / 05 ORDERS</span></div><div className="stamps"><i className="is-filled" /><i className="is-filled" /><i className="is-filled" /><i className="is-filled" /><i /></div><p>One more order guarantees a <em>rare pull.</em></p></div>
            </div>
          </div>
        </section>

        <section className="persona-section section-pad" id="persona">
          <div className="section-intro-row">
            <div className="section-number">05 / <span>THE PERSONA</span></div>
            <div className="section-rule" />
            <div className="section-side-label">ALWAYS ONLINE / NEVER THE SAME</div>
          </div>
          <div className="persona-layout">
            <div className="persona-stage">
              <div className="persona-stage-lines" aria-hidden="true"><span /><span /><span /><span /></div>
              <div className="persona-figure"><div className="figure-aura" /><div className="figure-eye eye-left" /><div className="figure-eye eye-right" /><div className="figure-mask" /><div className="figure-mark">OC</div><div className="figure-thread thread-one" /><div className="figure-thread thread-two" /></div>
              <div className="persona-stage-top"><span className="mono-label">CHARACTER LOOP / 24 FPS</span><span className="persona-status"><i /> LISTENING</span></div>
              <div className="persona-stage-bottom"><span>THE OC / VARIANT 00—∞</span><span>ASK A QUESTION <Icon name="arrow" size={14} /></span></div>
            </div>
            <div className="persona-copy"><p className="eyebrow blue-label"><span className="eyebrow-mark" />THE VOICE IN THE SIGNAL</p><h2>It knows<br />the way <i>through.</i></h2><p className="large-copy">The Persona keeps the character present when you are away: teasing the next universe, talking to alternate selves, and answering questions about the worlds already found.</p><div className="persona-actions"><button className="button button-dark" onClick={() => setPersonaOpen(true)}>Talk to the OC <Icon name="arrow" size={15} /></button><button className="text-link" onClick={() => setDraftOpen(true)}>Draft a post <Icon name="arrow" size={15} /></button></div><div className="persona-schedule"><div className="schedule-head"><span className="mono-label">UP NEXT / SIGNALS</span><span className="mono-label">SCHEDULED</span></div><div className="schedule-item"><span className="schedule-dot blue" /><div><b>“The unnamed is not empty.”</b><small>Universe #006 / teaser</small></div><span>09.18</span></div><div className="schedule-item"><span className="schedule-dot gold" /><div><b>OC × Afterimage</b><small>In-character banter</small></div><span>09.22</span></div></div></div>
          </div>
          <div className="persona-tools">
            <div className="tool-card"><span className="tool-index">A /</span><div><span className="mono-label">PUBLIC CHAT</span><h3>Ask about a universe.</h3><p>Answers in character, sourced from the canon.</p></div><button onClick={() => setPersonaOpen(true)} aria-label="Open public chat"><Icon name="arrow" size={17} /></button></div>
            <div className="tool-card"><span className="tool-index">B /</span><div><span className="mono-label">PRIVATE DRAFTS</span><h3>Give it a topic.</h3><p>Get a draft. Review it. You stay in control.</p></div><button onClick={() => setDraftOpen(true)} aria-label="Open draft tool"><Icon name="arrow" size={17} /></button></div>
            <div className="tool-card muted-tool"><span className="tool-index">C /</span><div><span className="mono-label">COMMUNITY EXTENSION</span><h3>Discord / Telegram</h3><p>Deeper interaction is coming to the orbit.</p></div><button aria-label="Discord and Telegram coming soon"><Icon name="arrow" size={17} /></button></div>
          </div>
        </section>

        <section className="trust-section section-pad" id="specs">
          <div className="section-intro-row light-row">
            <div className="section-number">06 / <span>THE FINE PRINT</span></div>
            <div className="section-rule" />
            <div className="section-side-label">OPEN PROTOCOL / NOTHING HIDDEN</div>
          </div>
          <div className="trust-layout"><div className="trust-heading"><p className="eyebrow"><span className="eyebrow-mark" />A CLEARER KIND OF MAGIC</p><h2>Look closer.<br /><i>It holds up.</i></h2><p>Beautiful things can still tell you how they work. Open a layer, inspect the handoff, and know what is live, what is planned, and what stays yours.</p></div><div className="spec-list">{specItems.map((item) => <div className={`spec-item ${openSpec === item.key ? 'is-open' : ''}`} key={item.key}><button onClick={() => setOpenSpec(openSpec === item.key ? '' : item.key)} aria-expanded={openSpec === item.key}><span className="spec-key">{item.key}</span><strong>{item.title}</strong><span className="spec-toggle"><Icon name={openSpec === item.key ? 'close' : 'plus'} size={15} /></span></button>{openSpec === item.key && <div className="spec-detail"><p>{item.detail}</p><span className="mono-label">PREVIEW DISCLOSURE / OC UNIVERSE</span></div>}</div>)}</div></div>
          <div className="trust-bottom"><span><Icon name="lock" size={15} /> NO TRANSACTION REQUIRED TO EXPLORE</span><span><Icon name="globe" size={15} /> DESIGNED FOR A LOW-FEE CHAIN</span><span><Icon name="check" size={15} /> HUMAN REVIEWED PERSONA</span></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top"><div className="footer-wordmark"><span>OC</span><p>THE<br />UNIVERSE</p></div><div className="footer-quote">The map gets larger<br />every time you <i>look.</i></div><button className="back-top" onClick={() => goTo('top')}>Back to top <Icon name="arrowUp" size={15} /></button></div>
        <div className="footer-grid"><div><span className="mono-label">EXPLORE</span><button onClick={() => goTo('multiverse')}>The Multiverse</button><button onClick={() => goTo('access')}>Holder access</button><button onClick={() => goTo('store')}>Shop the signal</button></div><div><span className="mono-label">STAY CLOSE</span><button onClick={() => goTo('persona')}>Ask the OC</button><a href="https://x.com" target="_blank" rel="noreferrer">X / @theoc <Icon name="external" size={13} /></a><button>Join the next signal</button></div><div><span className="mono-label">CREDITS</span><p>Concept / nemo</p><p>Interface / OC Studio</p><p>Artists / permanently credited</p></div><div className="footer-end"><span className="mono-label">THE OC UNIVERSE / 2026</span><span className="footer-status"><i /> ALL SYSTEMS NOMINAL</span></div></div>
        <div className="footer-legal"><span>Built for the ones still looking.</span><span>Privacy / Terms / Contract specs</span><span>↓ 0x7A91…91F2</span></div>
      </footer>

      <button className={`floating-chat ${personaOpen ? 'is-open' : ''}`} onClick={() => setPersonaOpen((value) => !value)} aria-label="Talk to the OC"><span className="floating-orbit" /><Icon name={personaOpen ? 'close' : 'spark'} size={18} /><span>ASK THE OC</span></button>

      {personaOpen && <aside className="chat-panel" role="dialog" aria-modal="false" aria-label="Ask the OC chat"><div className="panel-top"><div><span className="persona-status"><i /> LIVE PERSONA</span><h3>Ask the OC</h3></div><button onClick={() => setPersonaOpen(false)} aria-label="Close chat"><Icon name="close" size={18} /></button></div><div className="chat-history">{messages.map((message, index) => <div className={`chat-message ${message.author === 'OC' ? 'from-oc' : 'from-you'}`} key={`${message.author}-${index}`}><span className="mono-label">{message.author}</span><p>{message.text}</p></div>)}</div><form className="chat-form" onSubmit={handleChatSubmit}><input value={chatInput} onChange={(event) => setChatInput(event.target.value)} placeholder="Ask about #001, #002…" aria-label="Your message" /><button type="submit" aria-label="Send message"><Icon name="send" size={16} /></button></form><div className="panel-foot"><Icon name="lock" size={12} /> NO PERSISTENT MEMORY / PREVIEW MODE</div></aside>}

      {draftOpen && <aside className="draft-panel" role="dialog" aria-modal="true" aria-label="Private tweet drafting tool"><div className="panel-top"><div><span className="persona-status"><i /> PRIVATE DRAFTS</span><h3>Give it a topic.</h3></div><button onClick={() => setDraftOpen(false)} aria-label="Close drafting tool"><Icon name="close" size={18} /></button></div><div className="draft-body"><p>Set a direction and the OC will return a draft in its voice. You review everything before it leaves this room.</p><label className="draft-label"><span className="mono-label">TOPIC / MOOD / DROP</span><input value={draftTopic} onChange={(event) => setDraftTopic(event.target.value)} placeholder="e.g. a quiet hint about #006" /></label><button className="button button-blue draft-generate" onClick={generateDraft}><Icon name="spark" size={15} /> Generate draft <Icon name="arrow" size={14} /></button><div className="draft-output"><div className="draft-output-head"><span className="mono-label">DRAFT / HUMAN REVIEW</span>{draftText && <span className="draft-ready"><Icon name="check" size={12} /> READY TO EDIT</span>}</div><textarea value={draftText} onChange={(event) => setDraftText(event.target.value)} placeholder="Your draft will arrive here…" aria-label="Editable draft output" /></div></div><div className="panel-foot"><Icon name="lock" size={12} /> PRIVATE PREVIEW / NOTHING POSTS AUTOMATICALLY</div></aside>}

      {selectedUniverse && <div className="modal-backdrop" role="presentation" onClick={() => setSelectedUniverse(null)}><article className="universe-modal" role="dialog" aria-modal="true" aria-label={`${selectedUniverse.title} universe details`} onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedUniverse(null)} aria-label="Close universe details"><Icon name="close" size={19} /></button><div className={`modal-art card-art art-${selectedUniverse.palette}`}><div className="art-noise" /><div className="art-halo" /><div className="art-orbit art-orbit-one" /><div className="art-orbit art-orbit-two" /><div className="art-subject"><span>{selectedUniverse.code}</span></div><div className="art-corner">OC / {selectedUniverse.rarity.toUpperCase()}</div></div><div className="modal-content"><div className="modal-kicker"><span className="mono-label">UNIVERSE / {selectedUniverse.code}</span><span className={`rarity-label ${selectedUniverse.rarity.toLowerCase()}`}>{selectedUniverse.rarity}</span></div><h2>{selectedUniverse.title}</h2><p className="modal-lore">{selectedUniverse.lore}</p><div className="modal-credit"><span className="mono-label">CANON ENTRY BY</span><b>{selectedUniverse.artist}</b><small>{selectedUniverse.role}</small></div><div className="modal-spec-grid"><div><span className="mono-label">EDITION</span><b>{selectedUniverse.edition}</b></div><div><span className="mono-label">MINTED</span><b>{selectedUniverse.minted} <small>/ {selectedUniverse.edition}</small></b></div><div><span className="mono-label">RELEASE</span><b>{selectedUniverse.release}</b></div></div><div className="modal-bar"><span style={{ width: `${Math.round((selectedUniverse.minted / selectedUniverse.edition) * 100)}%` }} /></div><div className="modal-actions"><button className="button button-light" onClick={() => { setSelectedUniverse(null); setRevealed(false); goTo('collect'); }}>Collect a piece <Icon name="arrow" size={15} /></button><button className="text-link" onClick={() => setSelectedUniverse(null)}>Keep exploring <Icon name="arrow" size={14} /></button></div><div className="modal-note"><Icon name={walletStatus === 'verified' ? 'check' : 'lock'} size={14} /> {walletStatus === 'verified' ? 'Gold tier access is active for this coordinate.' : selectedUniverse.status === 'Holder first' ? 'Holder-first coordinate — connect to unlock early access.' : 'No wallet needed to inspect the canon.'}</div></div></article></div>}

      {walletOpen && <div className="drawer-backdrop" onClick={() => setWalletOpen(false)}><aside className="wallet-drawer" role="dialog" aria-modal="true" aria-label="Connect wallet" onClick={(event) => event.stopPropagation()}><div className="drawer-head"><div><span className="mono-label">ACCESS / CONNECT</span><h2>Find your<br /><i>place in orbit.</i></h2></div><button onClick={() => setWalletOpen(false)} aria-label="Close wallet drawer"><Icon name="close" size={19} /></button></div><p>Connect a wallet to check for the OC collection, reveal your holder tier, and unlock early access. This preview never requests a transaction.</p><div className="provider-list"><button onClick={handleConnect} disabled={walletStatus === 'connecting'}><span className="provider-icon rainbow" />RainbowKit <span>{walletStatus === 'connecting' ? 'Reading…' : 'Connect'} <Icon name="arrow" size={14} /></span></button><button onClick={handleConnect} disabled={walletStatus === 'connecting'}><span className="provider-icon walletconnect" />WalletConnect <span>Connect <Icon name="arrow" size={14} /></span></button></div><div className="drawer-state"><span className="state-orbit"><i /><i /><i /></span><div><span className="mono-label">WHAT WE CHECK</span><p>Ownership · traits · holder tier · early windows</p></div></div><div className="drawer-foot"><Icon name="lock" size={13} /> NO TRANSACTION / PREVIEW VERIFICATION / YOU CAN DISCONNECT ANYTIME</div></aside></div>}
    </div>
  );
}
