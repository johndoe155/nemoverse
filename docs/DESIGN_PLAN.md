# The OC Universe — Design Plan

**Status:** Pre-build art direction and interaction plan  
**Source documents:** `oc_universe_pitch.txt`, `Web3DesignBenchmarkingResearch.txt`  
**Date:** 2026-09-17

## 1. Creative direction

**The OC Universe should feel like a midnight observatory crossed with a private editorial gallery:** a deep-space canvas gives the character room to feel mythic, while a precise structural grid makes every numbered universe, wallet state, and revenue split legible. The experience will not use crypto spectacle as decoration; the dark architectural shell, generous black space, and thin rules create quiet luxury, and color only appears when it carries meaning—gold for rarity and collector value, electric blue for access and active system states, and a restrained mint signal for successful claims. Localized WebGL light, soft particle fields, and depth-of-field transitions give the Multiverse physical presence without turning the site into a generic neon metaverse. Expressive display typography carries lore and artist voice; a monospaced technical layer makes the complex parts feel calm and inspectable. Every transition should feel like a gallery camera finding its subject rather than a dashboard changing screens.**

The visual north star is “museum-grade curation with cyber-editorial mechanics”: spatial enough to reward exploration, editorial enough to establish authorship, and transparent enough that a non-crypto-native visitor can understand what holding, buying, and collecting do.

## 2. Experience principles

1. **The Multiverse is the gravitational center.** The other three pillars orbit it in the information architecture and in the visual language, not as separate microsites.
2. **One system, four temperatures.** Gallery mode is contemplative; perks are precise and active; collectibles are tactile and celebratory; the AI Persona is alive and conversational. The grid, typography, and shell unify them.
3. **State before spectacle.** A wallet badge, rare pull, access tier, or AI presence can earn an accent. Decorative gradients cannot.
4. **Show the “why” beside the action.** Every wallet, mint, discount, and claim state pairs the action with a plain-language explanation.
5. **Spatial on entry, structured on demand.** Visitors can roam a gallery, then switch to a fast catalog or technical drawer when they have a specific job to do.
6. **Original references, not replicas.** The benchmark sites inform camera logic, timing, hierarchy, and interaction grammar; all artwork, copy, and visual compositions are original to this build.

## 3. Sitemap and content coverage

The single-page Hub is the primary route. Hash anchors and drawers preserve the feeling of one connected flagship while making every pillar directly addressable and keyboard navigable.

- **Intro / entry sequence**
  - Wordmark, loading progress, skip control, reduced-motion bypass.
  - One-sentence orientation: the OC is a canon of numbered alternate universes.
- **Global navigation**
  - The Multiverse, Access, Store, Collect, Persona, Specs, and Connect.
  - Current-section indicator and persistent wallet state.
- **Hero — “One OC. Infinite realities.”**
  - Character identity, next-universe cadence/countdown, primary “Enter the Multiverse” action, secondary “Meet the Persona” action.
  - Ambient physics field that responds to pointer and scroll, with a static poster fallback.
- **OC lore / origin**
  - Core identity and backstory presented as an editorial sequence.
  - Timeline-style reveal, artist/canon framing, and link into the first universe.
- **Multiverse Hub / gallery**
  - Interactive collection of official numbered universes (`#001`, `#002`, `#003`, …).
  - 3D spatial room mode and 2D catalog mode.
  - Filter/sort by artist, release date, rarity, and release status.
  - Lore blurb, artist credit, permanent metadata, limited-edition supply, mint progress, cadence/countdown, ownership marker, and transparent artist/OC split for every universe.
  - Rare variant and secret-universe indicators; reveal treatment for chase pulls.
  - Universe detail view with mint/claim CTA, holder early-access state, and shareable pull moment.
- **Live signal**
  - Latest X posts embed/feed: AI teasers, universe announcements, and collector pull highlights.
  - Fallback editorial feed if the social embed cannot load.
- **Access / token-gated perks**
  - Wallet connect (mocked provider surface), verification/loading/error/success states.
  - “Verified holder” badge; owned universes and current NFT trait/tier.
  - Early claim/whitelist timing, auto-applied percentage discount, holder-only SKUs, free shipping/freebie treatment, and rarity-based tier benefits.
  - Slide-out commerce drawer that carries the verified state from gallery to store.
- **Store / Shopify surface**
  - Featured Shopify products and limited Multiverse editions.
  - Dual-column sticky product drawer plus live/editorial drop feed.
  - Cursor-tracked instant product preview, variant/size selection, holder discount line, stock state, cart, checkout, and success handoff.
  - Token-gated SKU lock state with an explanation and connect action rather than a dead end.
- **Proof-of-purchase / Collect**
  - Explain that every purchase mints a random pull from the live Multiverse set.
  - Post-checkout webhook/mint status, wallet delivery or email claim path, chain/IPFS metadata disclosure.
  - Volumetric reveal card for the numbered limited-edition pull.
  - Set tracker across every universe, animated owned states, completion bonus unlock, and stamp-card purchase milestones.
  - Milestone purchase guarantee and rare-pull badge.
- **AI Persona / “Ask the OC”**
  - Character animation loop and in-world status (“listening,” “writing,” “offline/rate limited”).
  - Scheduled teaser posts for the next universe; in-character OC/alternate-self banter.
  - Public Hub chatbot that answers universe questions.
  - Private tweet-drafting tool (topic in, draft post/reply out, review before posting).
  - Optional Discord/Telegram extension callout.
  - Voice/behavior guardrails and rate-limit disclosure.
- **Trust / technical specs**
  - Revenue split, smart-contract/mint mechanics, supply and rarity logic, chain choice, wallet verification, Shopify webhook, and optional IPFS metadata.
  - Tier/permission toggles and horizontally sliding specification drawers.
- **Footer / return loop**
  - Navigation, X, Shopify, Discord/Telegram, contract/spec links, artist credits, accessibility controls, and “next signal” link back to the next universe/Persona teaser.

### Coverage matrix

| Pitch mechanic | Visual home | Primary interaction |
|---|---|---|
| Numbered canon universes and cadence | Hero countdown + Multiverse gallery | Scroll reveal, filter, detail camera move |
| Lore blurb and OC backstory | Lore sequence + universe detail | Focus/blur text reveal |
| Public/permanent artist credit | Universe cards, artist spotlight, footer credits | Artist filter and spotlight focus |
| Limited 50–200-piece editions | Detail panel + specs | Supply meter and mint/claim state |
| Artist/OC revenue split | Universe detail + Trust specs | Expandable split drawer |
| Alternate colorway / secret universe chase | Rarity filter + reveal modal | Rare state badge and flip/reveal |
| X posts and social amplification | Live signal rail | Open external post / fallback feed |
| Wallet connect and ownership check | Access panel + nav badge | Connect → verify → holder/error state |
| Trait/tier perks | Access matrix | Tier toggle / benefit drawer |
| Early access and discounts | Access + Store checkout | Unlock and auto-apply feedback |
| Exclusive SKUs, shipping, freebies | Store product cards/drawer | Gated lock → verified availability |
| Shopify product/drop integration | Store surface | Preview, cart, checkout |
| Random post-purchase pull | Collect handoff | Mint progress → reveal |
| Numbered collectible and set completion | Collect tracker | Flip card, progress/stamp updates |
| Milestone guaranteed rare pull | Collect stamp card | Next milestone / claim state |
| Wallet or email claim | Collect claim drawer | Select path, loading/success/error |
| IPFS / Polygon or Base / webhook model | Trust specs + mint status | Expand technical disclosure |
| Persona teasers and banter | Persona module + live signal | Play transcript / scroll reveal |
| Tweet drafting | Persona drawer | Topic → generating → editable draft |
| Public chatbot / universe questions | Floating chat panel | Prompt → response → guardrail state |
| Discord/Telegram option and guardrails | Persona footer callout | Open channel / expand policy |

## 4. Hub section-by-section choreography and benchmark translation

The Hub is one continuous visit, with sections acting as rooms in an orbit around the Multiverse. The table below is the build contract for each room.

| Section | What it contains | Benchmark technique adapted | Scroll / hover / click behavior |
|---|---|---|---|
| 00 — Intro gate | Wordmark, loading orbit, entry language | **Black Dog** page-turn sense of arrival | A short progress sequence resolves into the hero; skip is always available. Reduced motion swaps it for a fade. |
| 01 — Hero / signal | OC identity, next drop, atmospheric canvas | **Apechain** reactive 3D hero + **Jeff Koons Moon Phases** spatial drift | Cursor gently displaces a low-poly star/halo field; scroll folds the hero into lore. Countdown is readable without animation. |
| 02 — Origin / lore | Backstory, canon rules, “not fan art” framing | **Black Dog** text displacement + **Unconventional Gallery** focal blur | Lore starts soft and resolves line by line as it enters; hovering a key phrase brings a crisp annotation into focus. |
| 03 — Multiverse room | Spatial artworks, numbered walls, release context | **Gucci Vault Art Space** room-to-grid transition + **Jeff Koons** inertial camera | Drag/pan or pointer movement gives restrained camera inertia. Selecting an artwork pulls it forward while surrounding works defocus. “Catalog” morphs the camera to a 2D grid rather than navigating away. |
| 04 — Multiverse catalog | Filters, cards, artist credits, rarity, date, release cadence | **Vault.xyz** dark catalog + volumetric card depth | Filter chips update the grid without a page jump; cards lift in Z on hover. Click opens a deep card/modal with lore, split, supply, ownership, variants, and mint state. |
| 05 — Artist focus | Artist credit, spotlight lore, canon relationship | **Unconventional Gallery** depth-of-field focus | Clicking an artist dims the collection and brings their credit/works into a focused rail; Escape returns to the full collection. |
| 06 — Access / holder verification | Connect, verify, badge, owned universes, tier perks | **Sui** shader-like state divider + **Flowers for Society** ambient point field | The divider’s blue light is dormant until connect. Connect opens a real-looking provider sheet; verify moves through scanning to success/error. Success unlocks cards and perks with a visible “why.” |
| 07 — Store / drop feed | Featured products, editorial drop feed, product drawer | **Terminal 27** dual-column sticky editorial/store + **Dime MTL** instant preview | Product list remains available beside a sticky detail drawer. Hover previews follow the pointer on desktop; focus/tap opens a static preview on touch. Add-to-cart updates a compact status rail; holder pricing is explicit. |
| 08 — Collect / reveal | Purchase-to-pull explanation, mint handoff, reveal card | **Vault.xyz** volumetric depth + **Navigate** milestone badges | Checkout success transitions into minting progress, then a 3D card turn reveals universe, edition, rarity, and claim path. A set tracker increments and celebrates only on meaningful milestones. |
| 09 — Persona / signal chamber | Animated OC, teaser timeline, banter, chatbot, tweet drafting | **Apechain** reactive canvas + **Navigate** character loops + **Black Dog** reveal | Persona idles with a low-key loop. Scroll activates teaser cards; chat expands as a floating panel, with displaced “thinking” text before response. Drafts remain editable and explicitly require human review. |
| 10 — Trust / specs | Splits, chain, verification, webhook, metadata, guardrails | **Ledger Brandbook** horizontal spec drawers and toggles | One row at a time expands horizontally; dense data remains hidden until requested. Toggle between “collector,” “artist,” and “builder” views without losing position. |
| 11 — Return loop | Social links, artists, store, next signal | **Vault.xyz / Ledger Brandbook** restrained closure | Footer repeats only meaningful actions. “Next universe” returns to the signal rather than a decorative CTA. |

## 5. Design token sheet

### Color

| Token | Value | Use |
|---|---|---|
| `--ink-void` | `#000000` | Full-bleed canvas, intro, hero field |
| `--ink-deep` | `#070B10` | Primary page surface |
| `--ink-panel` | `#0E1720` | Cards, drawers, gallery rooms; upper end of required canvas range |
| `--ink-elevated` | `#14212C` | Hover/elevated surfaces only |
| `--line-dim` | `rgba(255,255,255,0.16)` | Structural rules and grid |
| `--line-bright` | `rgba(255,255,255,0.44)` | Focus/active outlines |
| `--type-primary` | `#FFFFFF` | Headlines and primary text |
| `--type-secondary` | `#B7C0C8` | Supporting copy |
| `--type-muted` | `#73808B` | Metadata and inactive labels, never essential text |
| `--accent-gold` | `#ECD06F` | Rare/secret universe, artist royalty highlight, milestone reward |
| `--accent-blue` | `#298DFF` | Wallet verification, holder access, active AI/system state |
| `--accent-mint` | `#9BE6C4` | Successful claim, delivered collectible, completed set; introduced functional status color |
| `--accent-violet` | `#B9A7FF` | Highest rarity/“mythic” state only; introduced tier accent |
| `--state-error` | `#FF6B6B` | Connection/mint/checkout errors with text labels |

The canvas never uses a general-purpose gradient wash. Glows are localized to a component’s active state, kept low-opacity, and disabled or flattened under reduced motion.

### Type

- **Display / lore:** a high-contrast editorial serif (planned implementation: `Cormorant Garamond`, self-hosted or loaded with a stable fallback stack) for hero statements, lore, and artist credits. Large display sizes are paired with short line lengths.
- **Technical / UI:** a monospaced technical face (planned implementation: `IBM Plex Mono`, self-hosted or stable fallback) for universe numbers, wallet addresses, metadata, tier labels, supply, contract details, and controls.
- **Reading / utility:** system sans fallback for longer explanatory copy and form controls where clarity wins.
- Use uppercase mono labels sparingly with generous tracking; never typeset full paragraphs in mono.

### Grid and spacing

- 12-column desktop grid with a max content width of `1440px`, `24px` outer margin at small desktop and `48px` at wide desktop.
- 4-column mobile grid with `20px` outer padding; tablet shifts to 8 columns.
- Base spacing unit: `4px`; primary rhythm follows `8 / 16 / 24 / 40 / 64 / 96 / 144px`.
- Structural rules align to the same columns as artwork/card edges. Hero and room sections may bleed full viewport, but text remains in the grid.
- Card radius is restrained: `0px` for editorial frames, `2px` for interactive panels, `999px` only for status pills/progress indicators.
- Minimum hit area `44px`; focus rings use a 2px blue/gold functional outline with an offset.
- Mobile replaces spatial room drag with a deliberate vertical stack and a “focus artwork” action; no essential content is hidden behind hover.

### Depth and composition

- Three depth layers: canvas (`z0`), structural frame (`z1`), focused artwork/active panel (`z2`).
- Shadows are soft and near-black; depth is communicated primarily by light falloff, blur, and translation, not glossy drop shadows.
- Artwork owns the largest contrast and color range. UI remains quiet around it.

## 6. Motion inventory

These patterns are named once and reused across the entire experience. Motion must be interruptible, purposeful, and respect `prefers-reduced-motion`.

1. **Entry dissolve:** wordmark/progress resolves into hero over 700–1100ms; skip/fallback is immediate.
2. **Section settle:** content enters with a 12–24px vertical settle and opacity, staggered by semantic group, not by every DOM node.
3. **Heavy scroll drift:** Lenis/equivalent inertial scroll with low-amplitude parallax on canvas and artwork; native scroll remains available as fallback.
4. **Spatial camera glide:** gallery camera interpolates to a target with eased inertia; preserve spatial context during room/grid changes.
5. **Room-to-grid morph:** spatial wall planes flatten into catalog cards over 800–1000ms, with focused artwork carrying continuity across the transition.
6. **Focus bloom:** selected artwork sharpens while the surrounding room receives a controlled blur/opacity reduction; never blur essential text.
7. **Metadata reveal:** lore/credits rise from a masked line or displacement state into readable type; no illegible prolonged distortion.
8. **Functional glow:** active wallet, rare, AI, or success states add a localized light/border pulse once on transition; no perpetual flashing.
9. **Depth-lift card:** hover/focus translates cards a few pixels in Z/Y and changes line contrast; touch uses a tap/focus state instead.
10. **Drawer slide:** store, wallet, chat, and specs drawers enter from their logical edge with a dimmed backdrop and focus trap; close via Escape, backdrop, or explicit control.
11. **Provider verification sequence:** connect → scanning → verified/error uses a calm progress loop and meaningful labels, not a spinner-only state.
12. **Volumetric reveal turn:** proof-of-purchase card turns once through a depth transition, then settles with number/rarity/supply; a button provides non-3D “Reveal” fallback.
13. **Progressive collector fill:** set/stamp progress fills on state change, with a single milestone accent burst for completion or guaranteed rare pull.
14. **Persona idle loop:** subtle character/particle breathing loop; pauses when offscreen and becomes static under reduced motion.
15. **Thinking / response reveal:** AI panel uses short displaced type and a cursor-like state, then resolves into readable text; content is never hidden behind animation.
16. **Status confirmation:** add-to-cart, claim, checkout, and copy actions use a small persistent confirmation rail, not a blocking toast alone.
17. **Page/route transition:** if future routes are added, preserve the same canvas and transition the active frame rather than flash a new blank page.

Default timing language: micro-interactions `160–240ms`, drawers `420–600ms`, gallery camera `800–1200ms`, section reveals `700–1000ms`. Reduced motion collapses transforms and blur to short opacity/color changes.

## 7. Assumptions and placeholder strategy

1. **Actual OC artwork is not present in the repository.** The build will use original abstract/placeholder universe plates and generated geometric/astral compositions with obvious but elegant “artwork study” labeling until supplied assets arrive. No placeholder will impersonate a credited real artist.
2. **Artist names, final lore, and canon backstory are unspecified.** Use a small set of clearly marked working entries (for example, “Artist 01 / working credit”) and concise lore that demonstrates hierarchy without claiming canon facts. These are data fixtures easy to replace.
3. **Universe count, drop cadence, and edition size are examples in the pitch.** Use a finite fixture set spanning `#001`–`#006`, a visible “next signal” cadence, and edition sizes in the stated 50–200 range. Label all of them as preview data until confirmed.
4. **Wallet, chain, and provider integrations are not scaffolded.** UI will simulate WalletConnect/RainbowKit-style connect, ownership verification, tier resolution, and disconnect states. No private key, transaction, or live ownership claim will be performed. Mock boundaries will be visible in the trust/spec copy.
5. **Shopify is not connected.** Products, discounts, SKUs, cart, checkout, and the post-checkout webhook are convincing local fixtures with deterministic loading/success/error states. The UI describes where Storefront/Admin API handoff would occur.
6. **AI provider is not connected.** Persona replies, teaser schedule, banter, and tweet drafts use curated fixture responses plus a simulated generation state. Guardrails, human review, rate limiting, and no-persistent-memory behavior are shown as product behavior, not claimed backend enforcement.
7. **Minting and metadata are not connected.** Proof-of-purchase uses a simulated Polygon/Base-style handoff, wallet/email claim choice, numbered pull, and optional IPFS disclosure. The interface never represents a mock mint as an on-chain transaction.
8. **X/Discord/Telegram embeds may be unavailable in preview.** Use a fallback “latest signal” editorial rail and external-link affordances; social content is sample content until feeds are supplied.
9. **Three.js, GSAP, Framer Motion, Lenis, and fonts may not yet be installed.** Build progressive enhancement boundaries: the core gallery/cards/drawers must work without WebGL or smooth-scroll packages, and dynamic imports must keep the first paint usable.
10. **No conflict was found between the pitch and research documents.** Where research names a technology but this repository has no backend, this plan treats it as a visual contract and labels the UI simulation rather than silently dropping the feature.
11. **Accessibility is part of the art direction.** Keyboard navigation, focus management, contrast, text alternatives for artwork, motion reduction, and mobile tap equivalents are required even where the benchmark patterns originated as mouse/WebGL experiences.
12. **Performance target.** WebGL is localized to hero/gallery/Persona canvases, pauses offscreen, uses low-cost geometry/textures, and has a poster/static fallback. Avoid shipping a large image or font payload solely for atmosphere.

## 8. Build sequence and implementation guardrails

The implementation will follow the brief’s order: global shell and tokens; hero/lore; Multiverse gallery; wallet/access; Shopify surface; proof-of-purchase; AI Persona; technical specs; then a dedicated global motion/accessibility/performance polish pass. Each slice must meet four review questions before the next: does it feel authored rather than templated, can a non-crypto visitor understand it, is there a memorable interaction, and does it cover the pitch mechanic assigned to it?

The first visual QA pass will be at narrow mobile and wide desktop widths, with keyboard-only navigation and reduced motion enabled. Any effect that competes with artwork, essential copy, or wallet/commerce comprehension is a defect, not an aesthetic flourish.
