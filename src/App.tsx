import { useCallback, useEffect, useState } from 'react'
import Lenis from 'lenis'
import { AppProvider, useApp } from './state'
import { Cursor, Footer, Loader, TopBar } from './components/Shell'
import { Hero, Origin } from './components/Hero'
import { Multiverse } from './components/Multiverse'
import { Access } from './components/Access'
import { Store } from './components/Store'
import { Collect } from './components/Collect'
import { Persona } from './components/Persona'
import { Specs } from './components/Specs'

function Site() {
  const { reducedMotion } = useApp()
  const [ready, setReady] = useState(false)

  /* Motion pattern 02 — heavy inertial scroll */
  useEffect(() => {
    if (reducedMotion) return
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95 })
    let raf = 0
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    const onAnchor = (e: Event) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!a) return
      const el = document.querySelector(a.getAttribute('href')!)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el as HTMLElement, { offset: -70 })
    }
    document.addEventListener('click', onAnchor)
    return () => { cancelAnimationFrame(raf); lenis.destroy(); document.removeEventListener('click', onAnchor) }
  }, [reducedMotion])

  const done = useCallback(() => setReady(true), [])

  return (
    <div className="app-shell">
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Loader done={done} />
      <TopBar />
      <main>
        <Hero ready={ready} />
        <Origin />
        <Multiverse />
        <Access />
        <Store />
        <Collect />
        <Persona />
        <Specs />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Site />
    </AppProvider>
  )
}

