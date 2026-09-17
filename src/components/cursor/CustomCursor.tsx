import { useEffect, useRef } from 'react'
import { useAppStore } from '@/store/useAppStore'
import './cursor.css'

export function CustomCursor() {
  const isTouch = useAppStore((s) => s.isTouch)
  const cursorState = useAppStore((s) => s.cursorState)
  const cursorLabel = useAppStore((s) => s.cursorLabel)
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0, rx: 0, ry: 0 })
  const raf = useRef(0)

  useEffect(() => {
    if (isTouch) return

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
    }

    const tick = () => {
      pos.current.rx += (pos.current.x - pos.current.rx) * 0.18
      pos.current.ry += (pos.current.y - pos.current.ry) * 0.18

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.rx}px, ${pos.current.ry}px, 0)`
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${pos.current.rx}px, ${pos.current.ry}px, 0)`
      }
      raf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf.current = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <div className={`cursor-root state-${cursorState}`} aria-hidden>
      <div className="cursor-ring" ref={ringRef} />
      <div className="cursor-dot" ref={dotRef} />
      <div className={`cursor-label ${cursorLabel ? 'visible' : ''}`} ref={labelRef}>
        {cursorLabel}
      </div>
    </div>
  )
}
