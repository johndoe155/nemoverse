import { useRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { useAppStore } from '@/store/useAppStore'
import './ui.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'outline' | 'gold'
  size?: 'sm' | 'md' | 'lg'
  magnetic?: boolean
}

export function MagneticButton({
  children,
  variant = 'primary',
  size = 'md',
  magnetic = true,
  className = '',
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  ...rest
}: Props) {
  const ref = useRef<HTMLButtonElement>(null)
  const setCursorState = useAppStore((s) => s.setCursorState)
  const isTouch = useAppStore((s) => s.isTouch)

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseMove?.(e)
    if (!magnetic || isTouch || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * 0.22}px, ${y * 0.28}px)`
  }

  const reset = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseLeave?.(e)
    setCursorState('default')
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
  }

  return (
    <button
      ref={ref}
      className={`btn btn-${variant} btn-${size} ${className}`}
      onMouseEnter={(e) => {
        onMouseEnter?.(e)
        setCursorState('lock', 'ENTER')
      }}
      onMouseLeave={reset}
      onMouseMove={handleMove}
      {...rest}
    >
      <span className="btn-label">{children}</span>
      <span className="btn-shine" aria-hidden />
    </button>
  )
}
