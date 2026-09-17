import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAppStore } from '@/store/useAppStore'

gsap.registerPlugin(ScrollTrigger)

let lenisSingleton: Lenis | null = null

export function getLenis() {
  return lenisSingleton
}

export function useLenis() {
  const reducedMotion = useAppStore((s) => s.reducedMotion)
  const isLoaded = useAppStore((s) => s.isLoaded)
  const setScrollProgress = useAppStore((s) => s.setScrollProgress)

  useEffect(() => {
    if (!isLoaded || reducedMotion) {
      if (lenisSingleton) {
        lenisSingleton.destroy()
        lenisSingleton = null
      }
      return
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    })
    lenisSingleton = lenis

    lenis.on('scroll', (e) => {
      ScrollTrigger.update()
      const limit = e.limit || 1
      setScrollProgress(limit > 0 ? e.scroll / limit : 0)
    })

    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)

    return () => {
      gsap.ticker.remove(ticker)
      window.removeEventListener('resize', onResize)
      lenis.destroy()
      if (lenisSingleton === lenis) lenisSingleton = null
    }
  }, [isLoaded, reducedMotion, setScrollProgress])
}

export function scrollToId(id: string, offset = -40) {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.4 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
