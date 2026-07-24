'use client'

import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitalNode as OrbitalNodeType } from '@/lib/nodes'
import { calcNodePosition } from '@/lib/orbitMath'
import { useSceneStore } from '@/components/providers/SceneStateProvider'
import NodeLabel from './NodeLabel'

interface OrbitalNodeProps {
  node: OrbitalNodeType
}

export default function OrbitalNode({ node }: OrbitalNodeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const timeRef = useRef(0)
  const [hovered, setHovered] = useState(false)

  const setActiveNode = useSceneStore((state) => state.setActiveNode)
  const setActiveNodeWorldPos = useSceneStore((state) => state.setActiveNodeWorldPos)

  const { baseGeometry, wireframeGeometry } = useMemo(() => {
    let geo: THREE.BufferGeometry

    switch (node.geometry) {
      case 'icosahedron':
        geo = new THREE.IcosahedronGeometry(0.42, 0)
        break
      case 'octahedron':
        geo = new THREE.OctahedronGeometry(0.48, 0)
        break
      case 'tetrahedron':
        geo = new THREE.TetrahedronGeometry(0.52, 0)
        break
      case 'dodecahedron':
        geo = new THREE.DodecahedronGeometry(0.38, 0)
        break
      case 'torus':
        geo = new THREE.TorusGeometry(0.35, 0.12, 8, 24)
        break
      default:
        geo = new THREE.IcosahedronGeometry(0.4, 0)
    }

    const wireGeo = new THREE.WireframeGeometry(geo)
    return { baseGeometry: geo, wireframeGeometry: wireGeo }
  }, [node.geometry])

  useFrame((_, delta) => {
    timeRef.current += node.orbitSpeed * delta * 0.4
    const [x, y, z] = calcNodePosition(node, timeRef.current)

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z)
    }

    if (meshRef.current) {
      meshRef.current.rotation.x += 0.006 * delta * 60
      meshRef.current.rotation.y += 0.009 * delta * 60
      meshRef.current.rotation.z += 0.003 * delta * 60
    }
  })

  const handlePointerEnter = (e: any) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = 'pointer'
    if (meshRef.current) {
      gsap.to(meshRef.current.scale, {
        x: 1.35,
        y: 1.35,
        z: 1.35,
        duration: 0.4,
        ease: 'back.out(1.5)'
      })
    }
  }

  const handlePointerLeave = () => {
    setHovered(false)
    document.body.style.cursor = 'default'
    if (meshRef.current) {
      gsap.to(meshRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }

  const handleClick = (e: any) => {
    e.stopPropagation()
    setActiveNode(node)

    if (groupRef.current) {
      const pos = groupRef.current.position
      setActiveNodeWorldPos([pos.x, pos.y, pos.z])
    }

    if (meshRef.current) {
      gsap.timeline()
        .to(meshRef.current.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.12 })
        .to(meshRef.current.scale, { x: 1.35, y: 1.35, z: 1.35, duration: 0.18 })
    }
  }

  return (
    <group ref={groupRef}>
      {/* Interactive Mesh */}
      <mesh
        ref={meshRef}
        geometry={baseGeometry}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        <meshStandardMaterial
          color={hovered ? '#c8f0ff' : '#ffffff'}
          emissive={hovered ? '#c8f0ff' : '#050508'}
          emissiveIntensity={hovered ? 0.6 : 0}
          roughness={0.15}
          metalness={0.4}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Wireframe Overlay */}
      <lineSegments geometry={wireframeGeometry}>
        <lineBasicMaterial
          color="#ffffff"
          transparent
          opacity={hovered ? 0.6 : 0.22}
        />
      </lineSegments>

      {/* Billboard Hover Label */}
      <NodeLabel node={node} visible={hovered} />
    </group>
  )
}
