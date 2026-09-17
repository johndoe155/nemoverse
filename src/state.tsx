import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { universes, type Product, type Universe } from './data'

export type WalletStage = 'idle' | 'connecting' | 'signing' | 'checking' | 'verified'
export type CheckoutStage = 'closed' | 'open' | 'processing' | 'success'

type AppState = {
  wallet: WalletStage
  address: string
  connectWallet: () => void
  disconnect: () => void
  pulls: string[]
  lastPull: Universe | null
  clearLastPull: () => void
  previewPull: () => void
  cart: Product | null
  checkout: CheckoutStage
  openCheckout: (p: Product) => void
  closeCheckout: () => void
  confirmCheckout: () => void
  webhookLog: string[]
  chatOpen: boolean
  setChatOpen: (v: boolean) => void
  reducedMotion: boolean
}

const Ctx = createContext<AppState | null>(null)

export function useApp() {
  const v = useContext(Ctx)
  if (!v) throw new Error('AppProvider missing')
  return v
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<WalletStage>('idle')
  const [pulls, setPulls] = useState<string[]>(['001', '003'])
  const [lastPull, setLastPull] = useState<Universe | null>(null)
  const [cart, setCart] = useState<Product | null>(null)
  const [checkout, setCheckout] = useState<CheckoutStage>('closed')
  const [webhookLog, setWebhookLog] = useState<string[]>([])
  const [chatOpen, setChatOpen] = useState(false)
  const timers = useRef<number[]>([])
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const fn = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  useEffect(() => () => timers.current.forEach(t => window.clearTimeout(t)), [])
  const later = useCallback((fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)) }, [])

  const connectWallet = useCallback(() => {
    setWallet(w => {
      if (w !== 'idle') return w
      later(() => setWallet('signing'), 900)
      later(() => setWallet('checking'), 1800)
      later(() => setWallet('verified'), 2900)
      return 'connecting'
    })
  }, [later])

  const disconnect = useCallback(() => setWallet('idle'), [])

  const drawPull = useCallback(() => {
    const pool = universes.filter(u => u.status !== 'upcoming')
    const unowned = pool.filter(u => !pulls.includes(u.id))
    const pick = (unowned.length ? unowned : pool)[Math.floor(Math.random() * (unowned.length ? unowned.length : pool.length))]
    return pick
  }, [pulls])

  const previewPull = useCallback(() => {
    const pick = drawPull()
    setLastPull(pick)
  }, [drawPull])

  const openCheckout = useCallback((p: Product) => { setCart(p); setCheckout('open') }, [])
  const closeCheckout = useCallback(() => { setCheckout('closed'); later(() => setCart(null), 400) }, [later])

  const confirmCheckout = useCallback(() => {
    setCheckout('processing')
    setWebhookLog([])
    const log = (line: string, ms: number) => later(() => setWebhookLog(l => [...l, line]), ms)
    log('POST /webhooks/orders-paid — 200 OK', 700)
    log('DRAW  random pull from live catalog…', 1300)
    log('MINT  base · fee < $0.01 · metadata → ipfs://', 2000)
    later(() => {
      const pick = drawPull()
      setWebhookLog(l => [...l, `SENT  UNIVERSE #${pick.id} → 0x7F4A…91C2`])
      setPulls(prev => (prev.includes(pick.id) ? prev : [...prev, pick.id]))
      setCheckout('success')
      later(() => setLastPull(pick), 500)
    }, 2700)
  }, [drawPull, later])

  const clearLastPull = useCallback(() => setLastPull(null), [])

  const value = useMemo<AppState>(() => ({
    wallet, address: '0x7F4A…91C2', connectWallet, disconnect,
    pulls, lastPull, clearLastPull, previewPull,
    cart, checkout, openCheckout, closeCheckout, confirmCheckout, webhookLog,
    chatOpen, setChatOpen, reducedMotion,
  }), [wallet, connectWallet, disconnect, pulls, lastPull, clearLastPull, previewPull, cart, checkout, openCheckout, closeCheckout, confirmCheckout, webhookLog, chatOpen, reducedMotion])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
