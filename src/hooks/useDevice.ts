import { useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'

export function useDevice() {
  const setDevice = useAppStore((s) => s.setDevice)
  const setReducedMotion = useAppStore((s) => s.setReducedMotion)

  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 900px)')
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const touch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches

    const apply = () => {
      setDevice(mqMobile.matches, touch)
      setReducedMotion(mqMotion.matches)
      document.body.classList.toggle('is-touch', touch)
      document.body.classList.toggle('is-mobile', mqMobile.matches)
    }

    apply()
    mqMobile.addEventListener('change', apply)
    mqMotion.addEventListener('change', apply)
    return () => {
      mqMobile.removeEventListener('change', apply)
      mqMotion.removeEventListener('change', apply)
    }
  }, [setDevice, setReducedMotion])
}
