# The Nemoverse

A high-end cinematic Hub for **The Multiverse** — a numbered, monetized archive of canon OC reinterpretations, with holder recognition, collect mechanics, artist credits, and an AI persona surface.

## Stack

- Vite + React 19 + TypeScript
- React Three Fiber / Three.js (Multiverse plane, custom card shaders)
- GSAP + Lenis (scroll choreography)
- Framer Motion (overlays, loader)
- Zustand (app state)

## Develop

```bash
npm install --legacy-peer-deps
npm run dev
```

Open the printed local URL (bound to `0.0.0.0:5173`).

## Build

```bash
npm run build
npm run preview
```

## Content

Edit seed universes, OC lore, and products in `src/data/universes.ts`.  
Wallet ownership is mocked via `MOCK_OWNED_IDS` until Alchemy/Moralis + wagmi are wired.

## Architecture notes

- Fixed WebGL canvas under a pointer-selective DOM overlay
- `zustand` bridges hover/focus between R3F cards and React panels
- Mobile / reduced-motion: DOM gallery fallback (no WebGL)
- Integration seams ready for RainbowKit, Shopify Storefront, Claude persona proxy

## License

Private project · Prepared for nemo
