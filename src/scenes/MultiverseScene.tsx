import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, Preload } from '@react-three/drei'
import { universes } from '@/data/universes'
import { useAppStore } from '@/store/useAppStore'
import { UniverseCard } from './UniverseCard'
import { StarField } from './StarField'
import { CameraRig } from './CameraRig'

function CardField() {
  const positions = useMemo(() => {
    const cols = 4
    return universes.map((_, i) => {
      const col = i % cols
      const row = Math.floor(i / cols)
      const x = (col - (cols - 1) / 2) * 2.1
      const y = -row * 2.5 + 1.2
      const z = (Math.random() - 0.5) * 0.4
      return [x, y, z] as [number, number, number]
    })
  }, [])

  return (
    <group>
      {universes.map((u, i) => (
        <UniverseCard key={u.id} universe={u} position={positions[i]} index={i} />
      ))}
    </group>
  )
}

function Atmosphere() {
  return (
    <>
      <color attach="background" args={['#050508']} />
      <fog attach="fog" args={['#050508', 8, 28]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 6, 8]} intensity={1.2} color="#a78bfa" />
      <pointLight position={[-6, -2, 4]} intensity={0.6} color="#67e8f9" />
      <pointLight position={[0, 4, -4]} intensity={0.4} color="#f0c674" />
    </>
  )
}

export function MultiverseScene() {
  const isLoaded = useAppStore((s) => s.isLoaded)
  const isMobile = useAppStore((s) => s.isMobile)
  const cameraMode = useAppStore((s) => s.cameraMode)
  const reducedMotion = useAppStore((s) => s.reducedMotion)
  const detailOpen = useAppStore((s) => s.detailOpen)

  if (!isLoaded || isMobile || reducedMotion) return null

  const interactive = (cameraMode === 'gallery' || cameraMode === 'focus') && !detailOpen

  return (
    <div className={`canvas-host ${interactive ? 'interactive' : ''}`}>
      <Canvas
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: 0,
        }}
        camera={{ position: [0, 0.2, 7.5], fov: 42, near: 0.1, far: 60 }}
        eventPrefix="client"
        onPointerMissed={() => {
          // keep gallery calm when clicking empty space
        }}
      >
        <Suspense fallback={null}>
          <Atmosphere />
          <StarField count={500} />
          <CardField />
          <CameraRig />
          <AdaptiveDpr pixelated />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
