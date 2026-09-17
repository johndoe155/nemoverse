# OC Universe — Design Plan

## Creative direction

OC Universe is a cyber-editorial digital exhibition: deep-space obsidian, structural grids, monospaced metadata, and an expressive serif voice create a quiet luxury frame around the Multiverse. Localized electric-blue and gold light are functional signals for access, rarity, and AI state—not decoration. Motion is tactile and spatial: camera-like gallery drift, depth-of-field lore reveals, volumetric card transitions, and drawers that expose Web3 complexity progressively.

## Sitemap

- Hub: hero, OC lore, Multiverse overview, gallery, upcoming drop, holder verification, featured store, X feed, artist spotlight, proof-of-purchase, AI Persona, trust/spec drawers, footer.
- Multiverse: spatial gallery, grid filters, universe detail, lore, artist credit, edition/rarity, mint/claim state, revenue split and metadata.
- Token-gated commerce: wallet connection, holder/tier state, early access, discounts, exclusive SKUs, shipping/freebie benefits, checkout drawer.
- Collectibles: randomized pull, numbered edition, reveal, wallet/email claim, set completion, stamp-card milestone, completed-set reward.
- AI Persona: teaser archive, alternate-self banter, public universe Q&A, private tweet drafting/review, guardrails, optional community-channel presentation.

## Hub interaction map

| Section | Benchmark technique | Behavior |
| --- | --- | --- |
| Hero/lore | Black Dog + Unconventional Gallery | Blur-to-sharp typography, editorial reveal, lore focus state |
| Multiverse | Gucci Vault + Jeff Koons Moon Phases | Room-to-grid view switch, spatial drift, sortable canon catalog |
| Cards/collectibles | Vault.xyz + Navigate | Depth, rarity badges, set completion and reveal states |
| Wallet/commerce | Sui + Flowers for Society + Dime MTL | Glowing verified state, ambient canvas, slide-out gated shop, cursor previews |
| Artist spotlight | Unconventional Gallery + Black Dog | Depth-of-field focus and text displacement |
| AI Persona | Apechain + Navigate + Black Dog | Reactive hero canvas, character loop, displaced chat panel |
| Trust/specs | Ledger Brandbook | Horizontal disclosure rows for splits, chain, editions, guardrails |

## Tokens

- Canvas: `#000000` → `#0E1720`; elevated panel: `#10151C`.
- Type: `#FFFFFF`; subdued type: `rgba(255,255,255,.58)`.
- Functional accents: gold `#ECD06F`, electric blue `#298DFF`, secret rarity violet `#C98BFF`.
- Display: Playfair Display italic for lore and artist voice. Body: Manrope. Technical: DM Mono.
- 12-column desktop grid, 8px rhythm, thin low-opacity white rules, shallow editorial radii.

## Motion inventory

Entry reveal, heavy inertial scroll, gallery spatial drift, card depth/parallax, blur-to-sharp lore focus, drawer/modal transitions, wallet state glow, reveal flip, progress fill, and low-amplitude AI particle/canvas motion. All non-essential motion is disabled or simplified under `prefers-reduced-motion`.

## Assumptions and mock boundary

Artwork, artist identities, contracts, X posts, Shopify products, wallet verification, chain checks, minting webhooks, and Claude responses are represented by coherent mock data because no runtime integrations exist in the clean repository. The interface exposes realistic loading, locked, verified, error, reveal, and review states without initiating real transactions, purchases, wallet signatures, or public posts. Polygon/Base remain configurable mock network labels.

## Build and verification

The implementation is a client-only Vite/React experience using custom CSS tokens and original CSS-generated artwork. Verification includes responsive layout, keyboard-accessible drawers and buttons, reduced-motion behavior, coverage of every pitch feature, and `npm run check` / `npm run build`.
