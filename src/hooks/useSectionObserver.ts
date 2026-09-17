import { useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'

const SECTION_CAMERA: Record<string, 'hero' | 'gallery' | 'focus' | 'idle'> = {
  hero: 'hero',
  multiverse: 'gallery',
  belong: 'idle',
  collect: 'idle',
  store: 'idle',
  artists: 'idle',
  voice: 'idle',
  footer: 'idle',
}

export function useSectionObserver() {
  const setActiveSection = useAppStore((s) => s.setActiveSection)
  const setCameraMode = useAppStore((s) => s.setCameraMode)
  const detailOpen = useAppStore((s) => s.detailOpen)
  const isLoaded = useAppStore((s) => s.isLoaded)

  useEffect(() => {
    if (!isLoaded) return

    const sections = document.querySelectorAll<HTMLElement>('[data-section]')
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (detailOpen) return
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const top = visible[0]
        if (!top) return
        const id = top.target.getAttribute('data-section') || 'hero'
        setActiveSection(id)
        const mode = SECTION_CAMERA[id] ?? 'idle'
        setCameraMode(mode)
      },
      { threshold: [0.2, 0.35, 0.5], rootMargin: '-10% 0px -30% 0px' },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [isLoaded, detailOpen, setActiveSection, setCameraMode])
}
