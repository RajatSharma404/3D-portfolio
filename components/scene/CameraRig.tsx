'use client'

import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import useMouseParallax from '@/lib/useMouseParallax'
import { useSceneStore } from '@/components/providers/SceneStateProvider'

export default function CameraRig() {
  const { camera } = useThree()
  const mouseRef = useMouseParallax()
  const activeNode = useSceneStore((state) => state.activeNode)
  const activeNodeWorldPos = useSceneStore((state) => state.activeNodeWorldPos)

  useFrame((_, delta) => {
    const mouseX = mouseRef.current.x
    const mouseY = mouseRef.current.y

    let targetX = mouseX * 1.8
    let targetY = mouseY * 1.2
    let targetZ = 14

    if (activeNode) {
      targetX = activeNodeWorldPos[0] * 0.3 + mouseX * 0.8
      targetY = activeNodeWorldPos[1] * 0.3 + mouseY * 0.6
      targetZ = 11
    }

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.028 * delta * 60)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.028 * delta * 60)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.02 * delta * 60)

    camera.lookAt(0, 0, 0)
  })

  return null
}
