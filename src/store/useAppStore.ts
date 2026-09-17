import { create } from 'zustand'
import { MOCK_OWNED_IDS } from '@/data/universes'

export type FilterRarity = 'all' | 'standard' | 'variant' | 'secret'
export type CameraMode = 'hero' | 'gallery' | 'focus' | 'idle'
export type CursorState = 'default' | 'hover' | 'lock' | 'drag' | 'hidden'

interface AppState {
  // Boot
  isLoaded: boolean
  loadProgress: number
  setLoaded: (v: boolean) => void
  setLoadProgress: (n: number) => void

  // Scroll / scene
  scrollProgress: number
  setScrollProgress: (n: number) => void
  activeSection: string
  setActiveSection: (s: string) => void
  cameraMode: CameraMode
  setCameraMode: (m: CameraMode) => void

  // Multiverse
  activeUniverseId: string | null
  hoveredUniverseId: string | null
  filterRarity: FilterRarity
  setActiveUniverseId: (id: string | null) => void
  setHoveredUniverseId: (id: string | null) => void
  setFilterRarity: (f: FilterRarity) => void
  detailOpen: boolean
  setDetailOpen: (v: boolean) => void

  // Wallet (MVP mock)
  walletConnected: boolean
  walletAddress: string | null
  isHolder: boolean
  ownedIds: string[]
  connectWallet: () => void
  disconnectWallet: () => void

  // AI
  chatOpen: boolean
  setChatOpen: (v: boolean) => void

  // Cursor
  cursorState: CursorState
  cursorLabel: string
  setCursorState: (s: CursorState, label?: string) => void

  // Mobile
  isMobile: boolean
  isTouch: boolean
  setDevice: (mobile: boolean, touch: boolean) => void

  reducedMotion: boolean
  setReducedMotion: (v: boolean) => void
}

const MOCK_ADDRESS = '0xN3m0…7a4f'

export const useAppStore = create<AppState>((set) => ({
  isLoaded: false,
  loadProgress: 0,
  setLoaded: (v) => set({ isLoaded: v }),
  setLoadProgress: (n) => set({ loadProgress: n }),

  scrollProgress: 0,
  setScrollProgress: (n) => set({ scrollProgress: n }),
  activeSection: 'hero',
  setActiveSection: (s) => set({ activeSection: s }),
  cameraMode: 'hero',
  setCameraMode: (m) => set({ cameraMode: m }),

  activeUniverseId: null,
  hoveredUniverseId: null,
  filterRarity: 'all',
  setActiveUniverseId: (id) => set({ activeUniverseId: id }),
  setHoveredUniverseId: (id) => set({ hoveredUniverseId: id }),
  setFilterRarity: (f) => set({ filterRarity: f }),
  detailOpen: false,
  setDetailOpen: (v) => set({ detailOpen: v }),

  walletConnected: false,
  walletAddress: null,
  isHolder: false,
  ownedIds: [],
  connectWallet: () =>
    set({
      walletConnected: true,
      walletAddress: MOCK_ADDRESS,
      isHolder: true,
      ownedIds: MOCK_OWNED_IDS,
    }),
  disconnectWallet: () =>
    set({
      walletConnected: false,
      walletAddress: null,
      isHolder: false,
      ownedIds: [],
    }),

  chatOpen: false,
  setChatOpen: (v) => set({ chatOpen: v }),

  cursorState: 'default',
  cursorLabel: '',
  setCursorState: (s, label = '') => set({ cursorState: s, cursorLabel: label }),

  isMobile: false,
  isTouch: false,
  setDevice: (mobile, touch) => set({ isMobile: mobile, isTouch: touch }),

  reducedMotion: false,
  setReducedMotion: (v) => set({ reducedMotion: v }),
}))
