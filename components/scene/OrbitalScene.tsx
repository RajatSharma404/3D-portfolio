'use client'

import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei'
import { NODES } from '@/lib/nodes'
import CoreSphere from './CoreSphere'
import OrbitalRing from './OrbitalRing'
import OrbitalNode from './OrbitalNode'
import StarField from './StarField'
import CameraRig from './CameraRig'
import PostProcessing from './PostProcessing'

export default function OrbitalScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 14], fov: 60, near: 0.1, far: 1000 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
      className="absolute inset-0 w-full h-full"
      style={{ background: '#050508' }}
    >
      <color attach="background" args={['#050508']} />
      <fog attach="fog" args={['#050508', 20, 60]} />

      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#c8f0ff" distance={30} decay={2} />
      <directionalLight position={[10, 10, 5]} intensity={0.4} color="#ffffff" />

      <StarField />
      <CoreSphere />

      {NODES.map((node) => (
        <OrbitalRing key={`ring-${node.id}`} node={node} />
      ))}

      {NODES.map((node) => (
        <OrbitalNode key={`node-${node.id}`} node={node} />
      ))}

      <CameraRig />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <Preload all />
      <PostProcessing />
    </Canvas>
  )
}
