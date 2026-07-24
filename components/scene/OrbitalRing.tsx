'use client'

import { useMemo } from 'react'
import * as THREE from 'three'
import { OrbitalNode } from '@/lib/nodes'

interface OrbitalRingProps {
  node: OrbitalNode
}

export default function OrbitalRing({ node }: OrbitalRingProps) {
  const lineObject = useMemo(() => {
    const curve = new THREE.EllipseCurve(
      0,
      0,
      node.orbitRadius,
      node.orbitRadius * 0.38,
      0,
      Math.PI * 2,
      false,
      0
    )
    const points = curve.getPoints(128)
    const positions = new Float32Array(points.length * 3)

    points.forEach((p, i) => {
      positions[i * 3] = p.x
      positions[i * 3 + 1] = p.y
      positions[i * 3 + 2] = 0
    })

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const mat = new THREE.LineBasicMaterial({
      color: '#ffffff',
      transparent: true,
      opacity: 0.06
    })

    return new THREE.Line(geo, mat)
  }, [node.orbitRadius])

  return (
    <group rotation={[node.inclination, 0, node.orbitOffset]}>
      <primitive object={lineObject} />
    </group>
  )
}
