import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import type { Universe } from '@/data/universes'
import { useAppStore } from '@/store/useAppStore'
import { damp } from '@/lib/math'
import { cardFragmentShader, cardVertexShader } from './shaders/cardShader'

interface Props {
  universe: Universe
  position: [number, number, number]
  index: number
}

function hslToVec3(h: number, s: number, l: number): THREE.Vector3 {
  const c = new THREE.Color(`hsl(${h}, ${s}%, ${l}%)`)
  return new THREE.Vector3(c.r, c.g, c.b)
}

export function UniverseCard({ universe, position, index }: Props) {
  const meshRef = useRef<THREE.Mesh>(null)
  const hoverRef = useRef(0)
  const targetHover = useRef(0)
  const baseY = position[1]
  const baseZ = position[2]

  const setHoveredUniverseId = useAppStore((s) => s.setHoveredUniverseId)
  const setActiveUniverseId = useAppStore((s) => s.setActiveUniverseId)
  const setDetailOpen = useAppStore((s) => s.setDetailOpen)
  const setCameraMode = useAppStore((s) => s.setCameraMode)
  const setCursorState = useAppStore((s) => s.setCursorState)
  const ownedIds = useAppStore((s) => s.ownedIds)
  const hoveredUniverseId = useAppStore((s) => s.hoveredUniverseId)
  const activeUniverseId = useAppStore((s) => s.activeUniverseId)
  const filterRarity = useAppStore((s) => s.filterRarity)
  const cameraMode = useAppStore((s) => s.cameraMode)

  const owned = ownedIds.includes(universe.id) ? 1 : 0
  const rarityVal =
    universe.rarity === 'secret' ? 2 : universe.rarity === 'variant' ? 1 : 0

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uOwned: { value: owned },
      uRarity: { value: rarityVal },
      uColorA: { value: hslToVec3(universe.hue, universe.sat, Math.max(universe.light - 8, 6)) },
      uColorB: {
        value: hslToVec3(universe.secondaryHue, universe.sat + 5, Math.min(universe.light + 20, 55)),
      },
      uAccent: { value: hslToVec3((universe.hue + 30) % 360, 70, 65) },
    }),
    [universe, owned, rarityVal],
  )

  const visible =
    filterRarity === 'all' || filterRarity === universe.rarity

  useFrame((state, dt) => {
    const mesh = meshRef.current
    if (!mesh) return

    uniforms.uTime.value = state.clock.elapsedTime
    uniforms.uOwned.value = owned

    const isHovered = hoveredUniverseId === universe.id
    const isActive = activeUniverseId === universe.id
    targetHover.current = isHovered || isActive ? 1 : 0
    hoverRef.current = damp(hoverRef.current, targetHover.current, 8, dt)
    uniforms.uHover.value = hoverRef.current

    // Gentle float
    const t = state.clock.elapsedTime + index * 0.7
    const floatY = Math.sin(t * 0.6) * 0.08
    const targetY = baseY + floatY + hoverRef.current * 0.35
    const targetZ = baseZ + hoverRef.current * 0.55 + (isActive ? 0.8 : 0)

    mesh.position.y = damp(mesh.position.y, targetY, 6, dt)
    mesh.position.z = damp(mesh.position.z, targetZ, 6, dt)

    // Magnetic tilt toward pointer when hovered
    if (isHovered) {
      const px = state.pointer.x
      const py = state.pointer.y
      mesh.rotation.y = damp(mesh.rotation.y, px * 0.25, 5, dt)
      mesh.rotation.x = damp(mesh.rotation.x, -py * 0.18, 5, dt)
    } else {
      mesh.rotation.y = damp(mesh.rotation.y, Math.sin(t * 0.25) * 0.05, 4, dt)
      mesh.rotation.x = damp(mesh.rotation.x, 0, 4, dt)
    }

    // Filter fade
    const mat = mesh.material as THREE.ShaderMaterial
    const targetOp = visible && cameraMode !== 'hero' ? 1 : cameraMode === 'hero' ? 0.35 : 0.15
    mat.opacity = damp(mat.opacity, visible ? targetOp : 0.08, 5, dt)
    mesh.visible = mat.opacity > 0.02
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation()
        if (!visible) return
        setHoveredUniverseId(universe.id)
        setCursorState('hover', formatId(universe.id))
        document.body.style.cursor = 'none'
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHoveredUniverseId(null)
        setCursorState('default')
      }}
      onClick={(e) => {
        e.stopPropagation()
        if (!visible) return
        setActiveUniverseId(universe.id)
        setDetailOpen(true)
        setCameraMode('focus')
        setCursorState('lock', 'OPEN')
      }}
    >
      <planeGeometry args={[1.35, 1.9, 16, 16]} />
      <shaderMaterial
        vertexShader={cardVertexShader}
        fragmentShader={cardFragmentShader}
        uniforms={uniforms}
        transparent
        opacity={1}
        side={THREE.DoubleSide}
      />
      <Html
        position={[0, -0.78, 0.02]}
        center
        distanceFactor={8}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
        zIndexRange={[1, 0]}
      >
        <div
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.16em',
            color: owned ? '#67e8f9' : 'rgba(242,240,248,0.75)',
            textShadow: '0 2px 12px rgba(0,0,0,0.8)',
            whiteSpace: 'nowrap',
          }}
        >
          #{universe.id}
        </div>
      </Html>
    </mesh>
  )
}

function formatId(id: string) {
  return `#${id}`
}
