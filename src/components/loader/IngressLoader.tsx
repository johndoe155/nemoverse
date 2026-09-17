import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'
import './loader.css'

export function IngressLoader() {
  const isLoaded = useAppStore((s) => s.isLoaded)
  const loadProgress = useAppStore((s) => s.loadProgress)
  const setLoadProgress = useAppStore((s) => s.setLoadProgress)
  const setLoaded = useAppStore((s) => s.setLoaded)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    let frame = 0
    let progress = 0
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      // Cinematic fake load with ease — real assets are light
      const target = Math.min(1, elapsed / 2200)
      progress += (target - progress) * 0.08
      const display = Math.min(0.99, progress)
      setLoadProgress(display)

      if (elapsed > 2400 && display > 0.95) {
        setLoadProgress(1)
        setExiting(true)
        setTimeout(() => setLoaded(true), 900)
        return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [setLoadProgress, setLoaded])

  const pct = Math.round(loadProgress * 100)

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          className={`ingress-loader ${exiting ? 'is-exiting' : ''}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="ingress-veil" />
          <div className="ingress-core">
            <div className="ingress-ring" />
            <div className="ingress-ring ring-2" />
            <div className="ingress-orb" />
          </div>
          <div className="ingress-copy">
            <p className="eyebrow">The Nemoverse</p>
            <h1 className="ingress-title">
              Enter the
              <br />
              Multiverse
            </h1>
            <div className="ingress-progress">
              <div className="ingress-bar">
                <div className="ingress-bar-fill" style={{ width: `${pct}%` }} />
              </div>
              <span className="mono-num ingress-pct">{String(pct).padStart(3, '0')}</span>
            </div>
            <p className="ingress-hint">Dimensional archive initializing</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
