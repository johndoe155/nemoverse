import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useAppStore } from '@/store/useAppStore'
import { damp } from '@/lib/math'
import { universes } from '@/data/universes'

const MODES: Record<string, { pos: THREE.Vector3; look: THREE.Vector3 }> = {
  hero: {
    pos: new THREE.Vector3(0, 0.2, 7.5),
    look: new THREE.Vector3(0, 0, 0),
  },
  gallery: {
    pos: new THREE.Vector3(0, 0.4, 9.2),
    look: new THREE.Vector3(0, 0, 0),
  },
  focus: {
    pos: new THREE.Vector3(0, 0.3, 5.5),
    look: new THREE.Vector3(0, 0, 0),
  },
  idle: {
    pos: new THREE.Vector3(1.2, 0.8, 11),
    look: new THREE.Vector3(0, 0, -2),
  },
}

export function CameraRig() {
  const { camera } = useThree()
  const look = useRef(new THREE.Vector3())
  const cameraMode = useAppStore((s) => s.cameraMode)
  const activeUniverseId = useAppStore((s) => s.activeUniverseId)
  const scrollProgress = useAppStore((s) => s.scrollProgress)
  const reducedMotion = useAppStore((s) => s.reducedMotion)

  useFrame((state, dt) => {
    const mode = MODES[cameraMode] ?? MODES.hero
    let targetPos = mode.pos.clone()
    let targetLook = mode.look.clone()

    if (cameraMode === 'focus' && activeUniverseId) {
      const idx = universes.findIndex((u) => u.id === activeUniverseId)
      if (idx >= 0) {
        const cols = 4
        const col = idx % cols
        const row = Math.floor(idx / cols)
        const x = (col - (cols - 1) / 2) * 2.1
        const y = -row * 2.5 + 1.2
        targetLook.set(x, y, 0)
        targetPos.set(x * 0.3, y * 0.25 + 0.2, 4.8)
      }
    }

    if (cameraMode === 'gallery') {
      // Subtle parallax from pointer + scroll
      targetPos.x += state.pointer.x * 0.6
      targetPos.y += state.pointer.y * 0.35
      targetPos.z += Math.sin(scrollProgress * Math.PI) * 0.4
    }

    if (cameraMode === 'hero') {
      targetPos.x += Math.sin(state.clock.elapsedTime * 0.2) * 0.25
      targetPos.y += Math.cos(state.clock.elapsedTime * 0.15) * 0.15
    }

    const lambda = reducedMotion ? 20 : 2.8
    camera.position.x = damp(camera.position.x, targetPos.x, lambda, dt)
    camera.position.y = damp(camera.position.y, targetPos.y, lambda, dt)
    camera.position.z = damp(camera.position.z, targetPos.z, lambda, dt)

    look.current.x = damp(look.current.x, targetLook.x, lambda, dt)
    look.current.y = damp(look.current.y, targetLook.y, lambda, dt)
    look.current.z = damp(look.current.z, targetLook.z, lambda, dt)
    camera.lookAt(look.current)
  })

  return null
}
