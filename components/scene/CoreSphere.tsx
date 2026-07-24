'use client'

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { useSceneStore } from '@/components/providers/SceneStateProvider'

export default function CoreSphere() {
  const meshRef = useRef<THREE.Group>(null)
  const activeNode = useSceneStore((state) => state.activeNode)

  useEffect(() => {
    if (meshRef.current) {
      gsap.fromTo(
        meshRef.current.scale,
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1, duration: 1.8, ease: 'elastic.out(1, 0.5)', delay: 0.3 }
      )
    }
  }, [])

  useEffect(() => {
    if (!meshRef.current) return
    const targetScale = activeNode ? 0.7 : 1.0
    gsap.to(meshRef.current.scale, {
      x: targetScale,
      y: targetScale,
      z: targetScale,
      duration: 0.5,
      ease: 'power2.out'
    })
  }, [activeNode])

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003 * delta * 60
    }
  })

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Outer Glowing Core */}
      <Sphere args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#ffffff"
          emissive="#c8f0ff"
          emissiveIntensity={0.3}
          distort={0.25}
          speed={1.5}
          roughness={0}
          metalness={0.1}
        />
      </Sphere>

      {/* Inner Aura */}
      <Sphere args={[0.95, 32, 32]}>
        <MeshDistortMaterial
          color="#c8f0ff"
          transparent
          opacity={0.08}
          distort={0.4}
          speed={2}
          roughness={0}
        />
      </Sphere>
    </group>
  )
}
