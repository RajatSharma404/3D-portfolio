'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Billboard, Text } from '@react-three/drei'
import * as THREE from 'three'
import { OrbitalNode } from '@/lib/nodes'

interface NodeLabelProps {
  node: OrbitalNode
  visible: boolean
}

export default function NodeLabel({ node, visible }: NodeLabelProps) {
  const labelRef = useRef<any>(null)
  const tagRef = useRef<any>(null)
  const bgRef = useRef<THREE.Mesh>(null)
  const opacityRef = useRef(0)

  useFrame((_, delta) => {
    opacityRef.current = THREE.MathUtils.lerp(
      opacityRef.current,
      visible ? 1 : 0,
      0.15 * delta * 60
    )

    if (labelRef.current) {
      labelRef.current.fillOpacity = opacityRef.current
    }
    if (tagRef.current) {
      tagRef.current.fillOpacity = opacityRef.current
    }
    if (bgRef.current) {
      const mat = bgRef.current.material as THREE.Material
      if (mat) mat.opacity = opacityRef.current * 0.7
    }
  })

  return (
    <Billboard>
      {/* Label Text */}
      <Text
        ref={labelRef}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="bottom"
        position={[0, 0.75, 0]}
        fillOpacity={0}
      >
        {node.label}
      </Text>

      {/* Background Pill */}
      <mesh ref={bgRef} position={[0, 0.72, -0.01]}>
        <planeGeometry args={[1.3, 0.45]} />
        <meshBasicMaterial color="#050508" transparent opacity={0} />
      </mesh>

      {/* Subtitle / Type */}
      <Text
        ref={tagRef}
        fontSize={0.1}
        color="#c8f0ff"
        anchorX="center"
        anchorY="top"
        position={[0, 0.54, 0]}
        fillOpacity={0}
      >
        {node.type.toUpperCase()}
      </Text>
    </Billboard>
  )
}
