import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Suspense, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { universes, type Universe } from './data'

/* ------------------------------------------------------------------ */
/* Hero — deep-space particle field with cursor drift (Apechain)       */
/* ------------------------------------------------------------------ */

function DriftField({ reduced }: { reduced: boolean }) {
  const pts = useRef<THREE.Points>(null)
  const gold = useRef<THREE.Points>(null)
  const { pointer } = useThree()

  const [geo, goldGeo] = useMemo(() => {
    const make = (count: number, spread: number) => {
      const g = new THREE.BufferGeometry()
      const pos = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * spread
        pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.62
        pos[i * 3 + 2] = (Math.random() - 0.5) * 7
      }
      g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      return g
    }
    return [make(1600, 22), make(90, 17)]
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (pts.current) {
      pts.current.rotation.y = reduced ? 0 : t * 0.012
      if (!reduced) {
        pts.current.rotation.x += (pointer.y * 0.06 - pts.current.rotation.x) * 0.03
        pts.current.rotation.z += (pointer.x * -0.05 - pts.current.rotation.z) * 0.03
      }
    }
    if (gold.current) {
      gold.current.rotation.y = reduced ? 0 : -t * 0.02
      const m = gold.current.material as THREE.PointsMaterial
      m.opacity = 0.5 + Math.sin(t * 0.8) * 0.25
    }
  })

  return (
    <>
      <points ref={pts} geometry={geo}>
        <pointsMaterial size={0.024} color="#8fb7e8" transparent opacity={0.75} sizeAttenuation depthWrite={false} />
      </points>
      <points ref={gold} geometry={goldGeo}>
        <pointsMaterial size={0.05} color="#ECD06F" transparent opacity={0.6} sizeAttenuation depthWrite={false} />
      </points>
      <fog attach="fog" args={['#050608', 6, 16]} />
    </>
  )
}

export function HeroCanvas({ reduced }: { reduced: boolean }) {
  return (
    <Canvas className="webgl" dpr={[1, 1.6]} camera={{ position: [0, 0, 7], fov: 55 }} gl={{ antialias: false, alpha: true }}>
      <DriftField reduced={reduced} />
    </Canvas>
  )
}

/* ------------------------------------------------------------------ */
/* Multiverse — spatial exhibition room (Gucci Vault / Moon Phases)    */
/* ------------------------------------------------------------------ */

function ArtPlane({ u, x, z, onPick, focused }: { u: Universe; x: number; z: number; onPick: (u: Universe) => void; focused: boolean }) {
  const tex = useLoader(THREE.TextureLoader, u.art)
  const group = useRef<THREE.Group>(null)
  const [hover, setHover] = useState(false)
  tex.colorSpace = THREE.SRGBColorSpace

  useFrame((state) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    const targetY = Math.sin(t * 0.5 + x) * 0.05 + (hover ? 0.12 : 0)
    g.position.y += (targetY - g.position.y) * 0.06
    const s = hover || focused ? 1.06 : 1
    g.scale.x += (s - g.scale.x) * 0.08
    g.scale.y += (s - g.scale.y) * 0.08
  })

  return (
    <group ref={group} position={[x, 0, z]}>
      <mesh
        onClick={(e) => { e.stopPropagation(); onPick(u) }}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { setHover(false); document.body.style.cursor = '' }}
      >
        <planeGeometry args={[1.7, 2.55]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
      {/* frame */}
      <mesh position={[0, 0, -0.012]}>
        <planeGeometry args={[1.82, 2.67]} />
        <meshBasicMaterial color={hover ? u.accent : '#1c242e'} toneMapped={false} />
      </mesh>
      {/* floor glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.62, 0.35]}>
        <planeGeometry args={[1.9, 1.4]} />
        <meshBasicMaterial color={u.accent} transparent opacity={hover ? 0.16 : 0.05} depthWrite={false} />
      </mesh>
    </group>
  )
}

function RoomRig({ reduced }: { reduced: boolean }) {
  const { camera, pointer } = useThree()
  const vel = useRef({ x: 0, y: 0 })
  useFrame(() => {
    if (reduced) return
    // inertia-based pan: velocity eases toward pointer, camera integrates velocity
    vel.current.x += (pointer.x * 2.2 - vel.current.x) * 0.025
    vel.current.y += (pointer.y * 0.5 - vel.current.y) * 0.025
    camera.position.x += (vel.current.x - camera.position.x) * 0.06
    camera.position.y += (vel.current.y * 0.6 - camera.position.y) * 0.06
    camera.lookAt(camera.position.x * 0.35, camera.position.y * 0.3, -2)
  })
  return null
}

function RoomScene({ onPick, reduced }: { onPick: (u: Universe) => void; reduced: boolean }) {
  const spread = 2.6
  return (
    <>
      <color attach="background" args={['#04060a']} />
      <fog attach="fog" args={['#04060a', 5.5, 13]} />
      {universes.map((u, i) => (
        <ArtPlane
          key={u.id}
          u={u}
          x={(i - (universes.length - 1) / 2) * spread}
          z={-1.8 - Math.abs(i - (universes.length - 1) / 2) * 0.55}
          onPick={onPick}
          focused={false}
        />
      ))}
      {/* floor grid */}
      <gridHelper args={[40, 46, '#13202c', '#0c141c']} position={[0, -1.75, -2]} />
      <RoomRig reduced={reduced} />
    </>
  )
}

export function RoomCanvas({ onPick, reduced }: { onPick: (u: Universe) => void; reduced: boolean }) {
  return (
    <Canvas className="webgl room-webgl" dpr={[1, 1.6]} camera={{ position: [0, 0, 4.6], fov: 50 }} gl={{ antialias: true, alpha: false }}>
      <Suspense fallback={null}>
        <RoomScene onPick={onPick} reduced={reduced} />
      </Suspense>
    </Canvas>
  )
}

/* ------------------------------------------------------------------ */
/* Persona — reactive point-cloud core (Apechain / Navigate)           */
/* ------------------------------------------------------------------ */

function PersonaCore({ speaking, reduced }: { speaking: boolean; reduced: boolean }) {
  const inner = useRef<THREE.Points>(null)
  const ring = useRef<THREE.Points>(null)
  const { pointer } = useThree()

  const [sphereGeo, ringGeo] = useMemo(() => {
    const sg = new THREE.BufferGeometry()
    const n = 1400
    const pos = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const phi = Math.acos(2 * Math.random() - 1)
      const th = Math.random() * Math.PI * 2
      const r = 1.15 + Math.random() * 0.05
      pos[i * 3] = r * Math.sin(phi) * Math.cos(th)
      pos[i * 3 + 1] = r * Math.cos(phi)
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(th)
    }
    sg.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const rg = new THREE.BufferGeometry()
    const m = 420
    const rp = new Float32Array(m * 3)
    for (let i = 0; i < m; i++) {
      const a = (i / m) * Math.PI * 2
      const rr = 1.75 + (Math.random() - 0.5) * 0.08
      rp[i * 3] = Math.cos(a) * rr
      rp[i * 3 + 1] = (Math.random() - 0.5) * 0.06
      rp[i * 3 + 2] = Math.sin(a) * rr
    }
    rg.setAttribute('position', new THREE.BufferAttribute(rp, 3))
    return [sg, rg]
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (inner.current) {
      inner.current.rotation.y = reduced ? 0 : t * (speaking ? 0.5 : 0.12)
      if (!reduced) {
        inner.current.rotation.x += (pointer.y * 0.35 - inner.current.rotation.x) * 0.04
        inner.current.rotation.z += (pointer.x * -0.2 - inner.current.rotation.z) * 0.04
      }
      const scale = 1 + (speaking ? Math.sin(t * 7) * 0.05 : Math.sin(t * 1.4) * 0.02)
      inner.current.scale.setScalar(reduced ? 1 : scale)
      const m = inner.current.material as THREE.PointsMaterial
      m.opacity = speaking ? 0.95 : 0.7
    }
    if (ring.current) {
      ring.current.rotation.x = 1.15
      ring.current.rotation.y = reduced ? 0 : -t * 0.25
    }
  })

  return (
    <>
      <points ref={inner} geometry={sphereGeo}>
        <pointsMaterial size={0.028} color="#298DFF" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
      </points>
      <points ref={ring} geometry={ringGeo}>
        <pointsMaterial size={0.02} color="#8fc2ff" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
      </points>
    </>
  )
}

export function PersonaCanvas({ speaking, reduced }: { speaking: boolean; reduced: boolean }) {
  return (
    <Canvas className="webgl" dpr={[1, 1.6]} camera={{ position: [0, 0, 4.2], fov: 45 }} gl={{ antialias: false, alpha: true }}>
      <PersonaCore speaking={speaking} reduced={reduced} />
    </Canvas>
  )
}
