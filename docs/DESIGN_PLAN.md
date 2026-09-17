# The OC Universe — Design Plan

## 1. Creative direction

The OC Universe is staged as a **cyber-editorial exhibition**: a deep-space obsidian canvas (#050608 → #0E1720) treated like the walls of a private museum after closing time. Structure comes from a thin white editorial grid, monospaced technical metadata, and vast negative space; warmth comes from *localized* light only — a WebGL particle field behind the hero, gold (#ECD06F) reserved for rarity and collectible moments, electric blue (#298DFF) reserved for wallet/AI state. Nothing glows decoratively: if a surface is lit, it is telling you something about access, rarity, or presence. Scroll feels heavy and tactile (Lenis inertia); typography speaks in two voices — a high-contrast serif (Playfair Display) for lore and artist credit, a monospaced face (DM Mono) for numbers, addresses, and system truth. The character at the center is **NEMO** — one canon, infinite selves — and every module is a different room of the same building, not a different building.

## 2. Sitemap (single-page Hub containing all pillars)

1. **Intro loader** — archive "signal acquisition" sequence.
2. **Hero** — WebGL particle deep-space canvas + origin portrait, blur-displacement headline (Black Dog).
3. **Origin / lore** — the OC's core identity & backstory; canon strip (counts, cadence, chain).
4. **The Multiverse** (anchor) — spatial 3D room (R3F, inertia camera pan, Gucci Vault / Moon Phases) ↔ 2D catalog grid toggle; filters by rarity; sort by release; per-universe detail overlay with depth-of-field backdrop (Unconventional Gallery): lore blurb, permanent artist credit, numbered edition, mint progress, rarity, price, revenue split, holder claim state. Drop cadence countdown to Universe #005.
5. **Holder access (Pillar 2)** — wallet connect flow (connect → sign → chain check → verified), glowing border verification state (Sui), tier card, owned-universe recognition, full perk list (early claim, auto discount, exclusive SKUs, free shipping, tiered rarity rewards).
6. **Store (Shopify surface)** — dual-column sticky layout: product ledger + live drop/persona/X feed (Terminal 27); cursor-tracked instant hover preview modals (Dime MTL); token-gated SKUs that unlock on verification; slide-out checkout drawer (Flowers for Society) with holder discount auto-applied and post-checkout mint webhook simulation.
7. **Proof-of-purchase collectibles (Pillar 3)** — volumetric 3D card-flip pull reveal (Vault.xyz), numbered edition, wallet-or-email claim, stamp-card set tracker with milestone badges (Navigate), completed-set reward, rare-pull guarantee milestone.
8. **AI Persona (Pillar 4)** — reactive hologram canvas with state loop (Apechain/Navigate), teaser archive feeding the drop calendar, public in-character chat with universe Q&A (text-displacement message reveals, Black Dog), private tweet-drafting tool (topic → 3 in-character drafts → human review), Discord/Telegram note, guardrail statement.
9. **The fine print** — Ledger-style horizontal spec drawers: revenue split, edition logic, minting chain/IPFS, holder verification tiers, persona guardrails.
10. **Footer** — nav, credit, X embed pointer.

Every feature named in `oc_universe_pitch.txt` maps to one of these rooms; none are dropped.

## 3. Hub section-by-section interaction map

| Section | Benchmark technique | Scroll / hover / click behavior |
| --- | --- | --- |
| Loader | Black Dog | Percentage counter, mono status lines, blur-to-sharp wordmark, panel sweep exit |
| Hero | Apechain + Black Dog | R3F particle field drifts with cursor; portrait parallax on scroll; headline words de-blur in stagger |
| Lore | Black Dog + Unconventional Gallery | Serif reveal on enter; strip of canon facts ticks in; portrait depth shift |
| Multiverse room | Gucci Vault + Moon Phases | Artwork planes in 3D space; camera lerps to pointer with inertia; click = zoom + detail overlay; toggle collapses room into grid |
| Catalog grid | Vault.xyz | Cards tilt volumetrically toward cursor; rarity badge glow; staggered entry |
| Detail overlay | Unconventional Gallery | Backdrop DOF blur; metadata column; mint progress bar fills on open |
| Wallet module | Sui | Border glow + gradient divider shift on each verification stage; tier card flips in |
| Store | Terminal 27 + Dime MTL + Flowers for Society | Sticky feed column; hover = cursor-tracked preview modal; click = slide-out checkout drawer; gated rows unlock visually on verify |
| Pull reveal | Vault.xyz + Navigate | 3D flip card, light sweep, numbered fragment; stamp fills; milestone badge animates |
| Persona | Apechain + Navigate + Black Dog | Hologram tilts to cursor, state ring (idle/listening/speaking); chat messages displace-in; draft tool types out results |
| Spec drawers | Ledger Brandbook | Horizontal rows expand with mono data cells; one open at a time |

## 4. Design tokens

- **Canvas**: `#050608` base, `#0A0F14` raised, `#0E1720` panel, `#10151C` overlay. Hairlines `rgba(255,255,255,.08)`.
- **Type color**: `#FFFFFF` primary, `rgba(255,255,255,.55)` secondary, `rgba(255,255,255,.32)` faint.
- **Functional accents**: gold `#ECD06F` = rarity/collectible/milestone; electric blue `#298DFF` = wallet/AI/verification; secret rose `#FF8FBD` and drift violet `#B9A7FF` = per-universe rarity accents only. Never decorative.
- **Type**: Playfair Display (serif display, lore/artist voice, italic for emphasis); Manrope (UI body); DM Mono (metadata, numbers, addresses, lore tags).
- **Grid**: 12-col desktop, 100rem max shell, 8px rhythm, section padding clamp(96px→160px). Radius 2px cards / 4px panels — editorial, not bubbly.

## 5. Motion inventory (defined once, reused everywhere)

1. **De-blur reveal** — words/blocks enter with `blur(14px)→0` + 24px rise, 90ms stagger (hero, lore, section heads, chat).
2. **Inertial scroll** — Lenis, `lerp .09`, synced to GSAP ScrollTrigger.
3. **Spatial drift** — R3F camera/group lerp toward pointer at .04–.06 (hero field, room, persona bust).
4. **Volumetric card** — perspective tilt ±7° toward cursor + accent glow at 40% (grid cards, product previews, pull card).
5. **Drawer slide** — Framer Motion spring (stiffness 260, damping 30) from right; backdrop DOF blur 12px (checkout, chat, detail).
6. **State glow** — border/box-shadow color ramp keyed to wallet/AI state (idle→blue pulse→solid verified).
7. **Progress fill** — scaleX from 0 on enter, mono counter ticks (mint bars, set completion).
8. **Marquee ticker** — constant slow translate, pauses under reduced motion.
9. **Flip reveal** — rotateY 180° with light sweep, gold burst ≤600ms (collectible pull).
10. **Reduced motion** — `prefers-reduced-motion` kills Lenis, drift, marquee, flip (crossfade instead); reveals become opacity-only.

## 6. Assumptions & placeholder strategy

- **Character**: the pitch never names the OC. Assumed identity "NEMO" (repo is *nemoverse*): silver-haired figure, gold teardrop mark. All seven artworks are **original AI-generated pieces** made for this repo (hero portrait, 5 universes, persona hologram) — consistent character, per-universe artist "voice". Artist names/handles are fictional.
- **Copy**: lore blurbs, teasers, feed items, and persona voice are original placeholder canon consistent with the pitch's mechanics.
- **Timeline**: "today" is treated as Sept 17 2026; Universe #005 drop = Sept 20 2026 18:00 UTC for a live countdown.

## 7. Mock boundary (Section 6 of the brief)

No live integrations exist in this repo, so every integration is mocked **at the UI layer with full state coverage**:

- **Wallet / chain** (WalletConnect/Alchemy): staged connect → sign → chain-check → verified flow with timed transitions, fixed address `0x7F4A…91C2`, Tier 02, owned = #001/#003. No real signatures.
- **Shopify**: products, gating, auto-discount, checkout drawer with processing/success states. No real cart or payment.
- **Minting webhook** (Base/IPFS): checkout success triggers a simulated webhook log + collectible pull added to the set tracker. No real mint.
- **Claude persona**: keyword-routed in-character responses with typing latency; tweet drafter returns deterministic in-voice drafts. No API calls.
- **X embed**: represented as a live-feed column with in-voice posts rather than a real widget (no network).

All mock seams are contained in `src/data.ts` + `src/state.tsx` so real services can replace them without touching presentation.

## 8. Quality gates

Design (belongs beside the 12 references), usability (Web3 legible to non-crypto visitors — every state labeled in plain language), creativity (≥1 unexpected moment per section), coverage (every pitch mechanic visible). Verified via `pnpm check`, `pnpm build`, manual responsive + keyboard + reduced-motion passes.
