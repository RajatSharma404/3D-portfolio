'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Globe, { GlobeMethods } from 'react-globe.gl'
import * as THREE from 'three'
import { OrbitalNode, GLOBE_ARCS } from '@/lib/nodes'
import { calculateSubsolarPoint } from '@/lib/planetary'

interface ProjectBackgroundGlobeProps {
  node: OrbitalNode
  onZoomOut?: () => void
}

export default function ProjectBackgroundGlobe({ node, onZoomOut }: ProjectBackgroundGlobeProps) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const router = useRouter()
  const redirectingRef = useRef(false)
  const isReadyRef = useRef(false)
  const starFieldRef = useRef<THREE.Points | null>(null)
  const animFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        })
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    isReadyRef.current = false
    redirectingRef.current = false

    if (globeRef.current) {
      // Focus globe on target project coordinates
      globeRef.current.pointOfView(
        {
          lat: node.lat,
          lng: node.lng,
          altitude: 2.1
        },
        1000
      )

      // Setup Scene Starfield and Lighting
      const scene = globeRef.current.scene()
      if (scene) {
        const existingStarfield = scene.getObjectByName('bg-starfield')
        if (existingStarfield) scene.remove(existingStarfield)
        const existingSun = scene.getObjectByName('bg-sunlight')
        if (existingSun) scene.remove(existingSun)
        const existingAmb = scene.getObjectByName('bg-ambient')
        if (existingAmb) scene.remove(existingAmb)

        // 1,000 Parallax Stars
        const starCount = 1000
        const starGeo = new THREE.BufferGeometry()
        const positions = new Float32Array(starCount * 3)
        const colors = new Float32Array(starCount * 3)

        const palette = [
          new THREE.Color('#38bdf8'),
          new THREE.Color('#818cf8'),
          new THREE.Color('#c084fc'),
          new THREE.Color('#34d399'),
          new THREE.Color('#ffffff')
        ]

        for (let i = 0; i < starCount; i++) {
          const r = 320 + Math.random() * 400
          const theta = Math.random() * Math.PI * 2
          const phi = Math.acos(Math.random() * 2 - 1)

          positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
          positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
          positions[i * 3 + 2] = r * Math.cos(phi)

          const col = palette[Math.floor(Math.random() * palette.length)]
          colors[i * 3] = col.r
          colors[i * 3 + 1] = col.g
          colors[i * 3 + 2] = col.b
        }

        starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

        const starMat = new THREE.PointsMaterial({
          size: 1.8,
          vertexColors: true,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending,
          sizeAttenuation: true
        })

        const starField = new THREE.Points(starGeo, starMat)
        starField.name = 'bg-starfield'
        scene.add(starField)
        starFieldRef.current = starField

        // Real-World Subsolar Planetary Lighting
        const subsolar = calculateSubsolarPoint(new Date(), 280)
        const sunLight = new THREE.DirectionalLight(0xffffff, 2.0)
        sunLight.position.set(subsolar.x, subsolar.y, subsolar.z)
        sunLight.name = 'bg-sunlight'
        scene.add(sunLight)

        const ambientLight = new THREE.AmbientLight(0x1e293b, 0.8)
        ambientLight.name = 'bg-ambient'
        scene.add(ambientLight)

        let lastTime = performance.now()
        const animateScene = (now: number) => {
          const delta = (now - lastTime) * 0.001
          lastTime = now

          if (starFieldRef.current) {
            starFieldRef.current.rotation.y += 0.012 * delta
          }

          animFrameRef.current = requestAnimationFrame(animateScene)
        }
        animFrameRef.current = requestAnimationFrame(animateScene)
      }

      // Grace period: Enable zoom-out detection quickly after initial camera flight
      const timer = setTimeout(() => {
        isReadyRef.current = true
      }, 400)

      const renderer = globeRef.current.renderer()
      if (renderer && typeof window !== 'undefined') {
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.15
      }

      const controls = globeRef.current.controls()
      if (controls) {
        controls.autoRotate = true
        controls.autoRotateSpeed = 0.4
        controls.enableZoom = true

        const handleControlsChange = () => {
          if (!isReadyRef.current || redirectingRef.current || !globeRef.current) return
          const pov = globeRef.current.pointOfView()
          if (!pov || pov.altitude === undefined) return

          // If user zooms OUT past altitude 2.30, trigger exit slide & return to home 3D Earth Globe
          if (pov.altitude > 2.30) {
            redirectingRef.current = true
            if (onZoomOut) {
              onZoomOut()
            } else {
              router.push('/')
            }
          }
        }

        controls.addEventListener('change', handleControlsChange)
        return () => {
          clearTimeout(timer)
          controls.removeEventListener('change', handleControlsChange)
          if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
        }
      }
    }
  }, [node, router, onZoomOut])

  const themeAccent = node.accentColor || '#38bdf8'

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full pointer-events-auto opacity-45 z-0">
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0, 0, 0, 0)"
        backgroundImageUrl="/textures/night-sky.png"
        globeImageUrl="/textures/earth-blue-marble.jpg"
        bumpImageUrl="/textures/earth-topology.png"
        atmosphereColor={themeAccent}
        atmosphereAltitude={0.2}
        arcsData={GLOBE_ARCS}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashInitialGap={() => Math.random()}
        arcDashAnimateTime={2000}
        arcStroke={0.5}

        // Custom 3D Objects Layer: 3D Floating Geometry Polyhedron & Laser Beacon for this Project
        customLayerData={[node]}
        customThreeObject={(d: object) => {
          const targetNode = d as OrbitalNode
          const group = new THREE.Group()

          const colorHex = targetNode.accentColor || '#38bdf8'
          const col = new THREE.Color(colorHex)

          // 1. Base ring
          const ringGeo = new THREE.RingGeometry(0.35, 0.5, 24)
          ringGeo.rotateX(-Math.PI / 2)
          const ringMat = new THREE.MeshBasicMaterial({
            color: col,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.7
          })
          group.add(new THREE.Mesh(ringGeo, ringMat))

          // 2. Beacon cylinder
          const beaconHeight = 1.4
          const beaconGeo = new THREE.CylinderGeometry(0.02, 0.08, beaconHeight, 12)
          beaconGeo.translate(0, beaconHeight / 2, 0)
          const beaconMat = new THREE.MeshBasicMaterial({
            color: col,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending
          })
          group.add(new THREE.Mesh(beaconGeo, beaconMat))

          // 3. Polyhedron
          let polyGeo: THREE.BufferGeometry
          switch (targetNode.geometry) {
            case 'octahedron':
              polyGeo = new THREE.OctahedronGeometry(0.65, 0)
              break
            case 'tetrahedron':
              polyGeo = new THREE.TetrahedronGeometry(0.7, 0)
              break
            case 'torus':
              polyGeo = new THREE.TorusGeometry(0.55, 0.2, 12, 24)
              break
            case 'dodecahedron':
              polyGeo = new THREE.DodecahedronGeometry(0.65, 0)
              break
            case 'icosahedron':
            default:
              polyGeo = new THREE.IcosahedronGeometry(0.65, 0)
              break
          }

          const coreMesh = new THREE.Mesh(
            polyGeo,
            new THREE.MeshStandardMaterial({
              color: 0x071126,
              roughness: 0.2,
              metalness: 0.8,
              emissive: col,
              emissiveIntensity: 0.5
            })
          )

          const wireMesh = new THREE.Mesh(
            polyGeo,
            new THREE.MeshBasicMaterial({
              color: col,
              wireframe: true,
              transparent: true,
              opacity: 0.9
            })
          )

          const polyGroup = new THREE.Group()
          polyGroup.add(coreMesh)
          polyGroup.add(wireMesh)
          polyGroup.position.y = beaconHeight + 0.15
          group.add(polyGroup)

          group.userData = { polyGroup }
          return group
        }}
        customThreeObjectUpdate={(obj: THREE.Object3D) => {
          const { polyGroup } = obj.userData
          if (polyGroup) {
            polyGroup.rotation.x += 0.015
            polyGroup.rotation.y += 0.02
          }
        }}

        htmlElementsData={[node]}
        htmlElement={(point: object) => {
          const el = document.createElement('div')
          el.className = 'group relative cursor-pointer pointer-events-auto flex items-center gap-2'
          el.innerHTML = `
            <div class="relative flex items-center justify-center">
              <span class="absolute w-6 h-6 rounded-full bg-cyan-400/40 animate-ping"></span>
              <span class="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8]"></span>
            </div>
            <div class="flex flex-col text-left bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-cyan-400/40">
              <span class="text-[9px] font-mono tracking-widest text-cyan-400 font-bold uppercase">${node.continent}</span>
              <span class="text-xs font-bold text-white tracking-wide">${node.label}</span>
            </div>
          `
          return el
        }}
      />
    </div>
  )
}
