# Build Brief: The OC Universe — Awwwards-Caliber Frontend

## 0. Your role

You are the sole frontend architect and builder for this repository. Your mandate is narrow and absolute: **produce a UI/UX experience that reads as Awwwards Site of the Day / Month material — the kind of execution a $40,000+ agency engagement produces.** Nothing else in this brief outranks that mandate. Functionality, backend correctness, and content accuracy all matter, but they are in service of the visual and interaction quality, not the other way around.

Do not start writing implementation code until you have completed the planning phase in Section 3. This is not optional.

## 1. Source-of-truth files

Two files sit at the root of this repo. They are not equal in kind:

- **`oc_universe_pitch.txt`** is the *content and information-architecture* source of truth. It defines what exists: the Multiverse (the anchor collection), and the four pillars that orbit it — the Hub, Token-Gated Shopify Perks, Proof-of-Purchase Collectibles, and the AI Persona. Read it fully before doing anything else. Every section, feature, and mechanic named in it needs a corresponding visual treatment somewhere in the build — nothing in it should be silently dropped.

- **`Web3_Design_Benchmarking_Research.txt`** is the *visual and interaction* source of truth, and you should treat it intensively, not as a mood board you skim once. It specifies exact color values, typography logic, motion behavior, and — critically — a comparative matrix mapping twelve named Awwwards-winning sites to specific platform modules and specific UI techniques to benchmark. That mapping is not a suggestion; it is your spec for which interaction pattern belongs to which part of the site.

Read both files completely before forming any opinion about layout, stack, or sequencing.

## 2. Non-negotiable success criteria

In order of priority:

1. **Visual and interaction quality at Awwwards SOTD/SOTM caliber.** This is the only non-negotiable. If a tradeoff has to be made between "ships faster" and "looks and feels like the referenced sites," the referenced sites win.
2. **Full coverage of the four pillars + Multiverse**, each visually distinct but part of one coherent system, not four disconnected microsites.
3. **Zero generic Web3 clichés** — no neon-on-black gradient soup, no stock "connect wallet" button templates, no default shadcn/Tailwind-starter look. The research doc is explicit that the target is "museum-grade curation," not crypto-native noise. If a component looks like it came from a template library, redo it.
4. Technical correctness and performance are real constraints (this has to actually run well), but they're the floor, not the target.

## 3. Mandatory pre-code planning phase

Before writing a single line of implementation code, produce a written plan (commit it as `/docs/DESIGN_PLAN.md`). Think hard about this — take the time a senior art director would take before a client presentation. The plan must include:

- **A synthesized creative direction statement** — one paragraph articulating the "cyber-editorial" mood in your own words: how deep-space canvas, structural grid, and restrained luxury coexist with localized WebGL glow accents.
- **A full sitemap** derived from the pitch doc's features, with every feature from every pillar placed somewhere.
- **A section-by-section breakdown** of the Hub (since it's the umbrella containing the other three pillars): what each section is, what benchmark technique(s) it borrows, and roughly what happens on scroll/hover/click.
- **A design token sheet**: exact hex values from the research doc (`#000000`–`#0E1720` canvas range, `#FFFFFF` type, gold `#ECD06F`, electric blue `#298DFF` accent, plus any additional accent you introduce for rarity/tier states), type pairing (monospaced technical face for metadata/wallet addresses/universe numbers vs. an expressive serif or geometric display face for headers/lore/artist credits), and spacing/grid logic.
- **A motion inventory** — name every recurring animation pattern (page transition, card reveal, hover state, scroll choreography) once, so it's reused consistently instead of reinvented per section.
- **An explicit list of assumptions** for anything the two source docs don't fully specify (e.g., exact copy for lore blurbs, actual artwork for Multiverse universes). State what placeholder strategy you're using and why.

Do not proceed to Section 7 (build order) until this plan exists and is internally consistent with both source files.

## 4. Benchmark mapping — study every one of these, don't skim

The research doc names twelve reference sites with specific techniques to lift. Treat this table as binding, not decorative:

| Module | Primary benchmark(s) | What to actually study and adapt |
|---|---|---|
| Multiverse Hub gallery | **Gucci Vault Art Space**, **Jeff Koons Moon Phases** | The room-to-grid camera transition (3D spatial exhibition ↔ 2D catalog grid); inertia-based WebGL camera panning that keeps spatial context while zooming into artwork detail |
| Multiverse asset cards / collectibles | **Vault.xyz**, **Navigate** | Volumetric 3D card depth transitions on click; animated state badges and milestone/set-completion indicators |
| Token-gated perks / wallet state | **Sui**, **Flowers for Society** | Shader-driven gradient section dividers and glowing border hover states tied to wallet verification; pointcloud/ambient 3D backdrop connected to a slide-out token-gated commerce drawer |
| Shopify storefront integration | **Terminal 27**, **Dime MTL** | Dual-column sticky layout (product drawer + live editorial/drop feed); cursor-tracked instant hover-preview modals for products |
| Artist spotlight / lore presentation | **The Unconventional Gallery**, **Black Dog** | Depth-of-field focal blur on artist/detail focus; blurred text-displacement typographic reveals transitioning into high-res reveals |
| AI Persona | **Apechain**, **Navigate**, **Black Dog** | Real-time 3D physics hero canvas reactive to cursor/scroll; character animation loops; text-displacement chat panel |
| Technical/trust details (revenue splits, contract specs, tiers) | **Ledger Brandbook** | Minimalist horizontal sliding spec drawers and toggle components for dense technical data |
| Overall dark-mode restraint & hierarchy | **Vault.xyz**, **Ledger Brandbook** | Restrained palette discipline — accent color used *functionally* (rarity, tier, AI state), never decoratively |

**Important constraint:** take inspiration from interaction pattern, motion timing, and spatial logic — not literal copied assets, copy, or code from these sites. The goal is to hit the same craft bar independently, and original execution also scores better with real Awwwards judges than a visible clone would.

## 5. Technical stack

Unless the repo already dictates otherwise, use:

- **Next.js + React + TypeScript**
- **Tailwind** for utility/layout scaffolding only — all visual identity comes from custom design tokens defined in your plan, not Tailwind defaults
- **React Three Fiber + drei (Three.js)** for the spatial gallery, hero canvas, and card-depth interactions
- **GSAP + ScrollTrigger** for scroll choreography and section transitions
- **Framer Motion** for component-level UI transitions (modals, drawers, hover states)
- **Lenis** (or equivalent) for smooth/inertial scroll — the research doc explicitly calls for scrolling that "feels heavy and tactile"

## 6. Scope boundary — this is a UI/UX task

Build every feature from the pitch doc as a **fully designed, high-fidelity interface**, including wallet connection, holder verification, Shopify checkout flows, minting reveals, and the AI persona chat. These should look and behave as if fully wired up — real transition states, real loading/error/success states, convincing mock data. Do not silently skip a feature because it implies backend work. If live backend integration (actual WalletConnect/Alchemy/Shopify API/Claude API calls) isn't already scaffolded in this repo, mock it convincingly at the UI layer and note the mock boundary in `DESIGN_PLAN.md` rather than leaving a gap or a placeholder box.

## 7. Build order

1. Global shell: custom cursor, intro/loader sequence, nav, footer, design tokens, base layout grid.
2. Hero + OC lore section (Jeff Koons / Black Dog techniques).
3. Multiverse Hub gallery — the centerpiece (Gucci Vault / Vault.xyz / Unconventional Gallery techniques).
4. Token-gated wallet module (Sui / Flowers for Society techniques).
5. Shopify storefront surface (Terminal 27 / Dime MTL techniques).
6. Proof-of-purchase collectible reveal + set-completion tracker (Vault.xyz / Navigate techniques).
7. AI Persona hero module + floating chat (Apechain / Navigate / Black Dog techniques).
8. Technical/tokenomics detail section (Ledger Brandbook techniques).
9. Global motion polish pass across all sections — this is its own pass, not an afterthought bolted onto step 1.

## 8. Quality bar — self-audit before calling anything done

Before considering a section finished, check it against all four:

- **Design** — does this look like it belongs next to the twelve referenced sites, or does it look like a well-built template?
- **Usability** — is the Web3 complexity (wallets, gating, minting) actually legible to a non-crypto-native visitor?
- **Creativity** — is there at least one moment per major section that a visitor wouldn't expect from a standard site?
- **Content integration** — does every pillar and mechanic from `oc_universe_pitch.txt` have a real visual home?

## 9. Guardrails

- Respect a reduced-motion fallback and baseline keyboard/contrast accessibility even while pushing the visual envelope — high-craft sites still need to function for everyone.
- Keep the accent colors (gold, electric blue) functional — tied to rarity, tier, or AI/wallet state — never purely decorative, per the research doc's explicit direction.
- If any instruction here conflicts with something explicitly stated in either source file, the source files win — surface the conflict in `DESIGN_PLAN.md` rather than silently resolving it.
