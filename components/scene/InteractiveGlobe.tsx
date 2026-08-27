'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Globe, { GlobeMethods } from 'react-globe.gl'
import * as THREE from 'three'
import { NODES, GLOBE_ARCS, OrbitalNode } from '@/lib/nodes'
import { useSceneStore } from '@/components/providers/SceneStateProvider'
import { soundManager } from '@/lib/sound'
import {
  calculateSubsolarPoint,
  CITY_TIMEZONE_MAP,
  getCityLocalTime,
  getCityDaylightStatus
} from '@/lib/planetary'

export default function InteractiveGlobe() {
  const router = useRouter()
  const globeRef = useRef<GlobeMethods | undefined>(undefined)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })

  const activeNode = useSceneStore((state) => state.activeNode)
  const setActiveNode = useSceneStore((state) => state.setActiveNode)
  const hoveredNode = useSceneStore((state) => state.hoveredNode)
  const setHoveredNode = useSceneStore((state) => state.setHoveredNode)
  const isZoomedOut = useSceneStore((state) => state.isZoomedOut)
  const setIsZoomedOut = useSceneStore((state) => state.setIsZoomedOut)

  const isTourActive = useSceneStore((state) => state.isTourActive)
  const tourIndex = useSceneStore((state) => state.tourIndex)

  const isAnimatingCam = useRef(false)
  const isNavigatingRef = useRef(false)
  const starFieldRef = useRef<THREE.Points | null>(null)
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null)
  const animFrameRef = useRef<number | null>(null)

  // Measure container dimensions for responsive canvas sizing
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        })
      }
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Prefetch all project routes for zero-lag instant page loading
  useEffect(() => {
    NODES.forEach((n) => router.prefetch(`/projects/${n.id}`))
  }, [router])

  // Initial camera placement, WebGL renderer & Three.js Starfield / Lighting Setup
  useEffect(() => {
    if (!globeRef.current) return

    const controls = globeRef.current.controls()
    if (controls) {
      controls.autoRotate = true
      controls.autoRotateSpeed = 0.75
      controls.enableZoom = true
    }

    const renderer = globeRef.current.renderer()
    if (renderer && typeof window !== 'undefined') {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.15
    }

    globeRef.current.pointOfView({ lat: -15, lng: 130, altitude: 2.1 }, 0)

    // Setup Custom Three.js Starfield Particles and Lighting in Scene
    const scene = globeRef.current.scene()
    if (scene) {
      // Remove any existing starfield / lights from previous mount
      const existingStarfield = scene.getObjectByName('portfolio-starfield')
      if (existingStarfield) scene.remove(existingStarfield)
      const existingSun = scene.getObjectByName('portfolio-sunlight')
      if (existingSun) scene.remove(existingSun)
      const existingAmb = scene.getObjectByName('portfolio-ambient')
      if (existingAmb) scene.remove(existingAmb)

      // 1. Construct 1,400+ Parallax Stardust Particles
      const starCount = 1400
      const starGeo = new THREE.BufferGeometry()
      const positions = new Float32Array(starCount * 3)
      const colors = new Float32Array(starCount * 3)

      const palette = [
        new THREE.Color('#38bdf8'),
        new THREE.Color('#818cf8'),
        new THREE.Color('#c084fc'),
        new THREE.Color('#34d399'),
        new THREE.Color('#fbbf24'),
        new THREE.Color('#ffffff')
      ]

      for (let i = 0; i < starCount; i++) {
        const r = 320 + Math.random() * 450
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
        size: 2.0,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      })

      const starField = new THREE.Points(starGeo, starMat)
      starField.name = 'portfolio-starfield'
      scene.add(starField)
      starFieldRef.current = starField

      // 2. Real-World Astronomical Planetary Sun Positioning (Subsolar Vector)
      const subsolar = calculateSubsolarPoint(new Date(), 280)
      const sunLight = new THREE.DirectionalLight(0xffffff, 2.2)
      sunLight.position.set(subsolar.x, subsolar.y, subsolar.z)
      sunLight.name = 'portfolio-sunlight'
      scene.add(sunLight)
      sunLightRef.current = sunLight

      const ambientLight = new THREE.AmbientLight(0x1e293b, 0.9)
      ambientLight.name = 'portfolio-ambient'
      scene.add(ambientLight)

      // 3. Animation loop for rotating starfield & ambient depth
      let lastTime = performance.now()
      const animateScene = (now: number) => {
        const delta = (now - lastTime) * 0.001
        lastTime = now

        if (starFieldRef.current) {
          starFieldRef.current.rotation.y += 0.015 * delta
          starFieldRef.current.rotation.x += 0.008 * delta
        }

        animFrameRef.current = requestAnimationFrame(animateScene)
      }
      animFrameRef.current = requestAnimationFrame(animateScene)
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  // Consolidated OrbitControls listener: Handles zoom-in navigation and zoom state tracking safely
  useEffect(() => {
    isNavigatingRef.current = false
    if (!globeRef.current) return

    const controls = globeRef.current.controls()
    if (!controls) return

    const handleControlsChange = () => {
      if (isNavigatingRef.current || !globeRef.current || isAnimatingCam.current || isTourActive) return

      const pov = globeRef.current.pointOfView()
      if (!pov || typeof pov.altitude !== 'number') return

      // Zoom-in auto-redirection: trigger when camera altitude < 1.45
      if (pov.altitude < 1.45) {
        isNavigatingRef.current = true
        const currentActive = useSceneStore.getState().activeNode
        
        let targetNode = currentActive
        if (!targetNode) {
          let minDist = Infinity
          NODES.forEach((node) => {
            const dist = Math.hypot(node.lat - pov.lat, node.lng - pov.lng)
            if (dist < minDist) {
              minDist = dist
              targetNode = node
            }
          })
        }
        if (targetNode) {
          const navNode: OrbitalNode = targetNode
          isAnimatingCam.current = true
          soundManager.playWarp()
          globeRef.current.pointOfView(
            { lat: navNode.lat, lng: navNode.lng, altitude: 2.1 },
            400
          )
          router.push(`/projects/${navNode.id}`)
          return
        }
      }

      // Update zoomed-out state indicator
      const zoomedOut = pov.altitude >= 3.2
      if (useSceneStore.getState().isZoomedOut !== zoomedOut) {
        setIsZoomedOut(zoomedOut)
      }
    }

    controls.addEventListener('change', handleControlsChange)
    return () => controls.removeEventListener('change', handleControlsChange)
  }, [setIsZoomedOut, router, isTourActive])

  // Guided Cinematic Tour camera flight controller
  useEffect(() => {
    if (!isTourActive || !globeRef.current) return

    const targetNode = NODES[tourIndex] || NODES[0]
    if (targetNode) {
      const controls = globeRef.current.controls()
      if (controls) {
        controls.autoRotate = false
      }
      isAnimatingCam.current = true
      globeRef.current.pointOfView(
        {
          lat: targetNode.lat,
          lng: targetNode.lng,
          altitude: 2.15
        },
        1300
      )
      const timer = setTimeout(() => {
        isAnimatingCam.current = false
      }, 1350)
      return () => clearTimeout(timer)
    }
  }, [isTourActive, tourIndex])

  // Fly camera to zoomed-out or zoomed-in position when isZoomedOut state changes
  useEffect(() => {
    if (globeRef.current && !isTourActive) {
      const currentPov = globeRef.current.pointOfView()
      if (isZoomedOut && currentPov.altitude < 3.2) {
        isAnimatingCam.current = true
        soundManager.playWarp()
        globeRef.current.pointOfView(
          { lat: currentPov.lat, lng: currentPov.lng, altitude: 3.8 },
          1000
        )
        setTimeout(() => {
          isAnimatingCam.current = false
        }, 1100)
      } else if (!isZoomedOut && currentPov.altitude >= 3.0) {
        isAnimatingCam.current = true
        soundManager.playWarp()
        globeRef.current.pointOfView(
          { lat: currentPov.lat, lng: currentPov.lng, altitude: 2.1 },
          1000
        )
        setTimeout(() => {
          isAnimatingCam.current = false
        }, 1100)
      }
    }
  }, [isZoomedOut, isTourActive])

  // Fly to active node position when selected, or reset to initial view when null
  useEffect(() => {
    if (globeRef.current && !isTourActive) {
      const controls = globeRef.current.controls()
      if (controls) {
        controls.autoRotate = !activeNode
        controls.autoRotateSpeed = 0.75
      }
      if (activeNode) {
        soundManager.playClick()
        globeRef.current.pointOfView(
          {
            lat: activeNode.lat,
            lng: activeNode.lng,
            altitude: 2.1
          },
          1000
        )
      }
    }
  }, [activeNode, isZoomedOut, isTourActive])

  const handlePointClick = (point: object) => {
    const node = point as OrbitalNode
    soundManager.playClick()
    soundManager.playWarp()
    if (globeRef.current) {
      isAnimatingCam.current = true
      globeRef.current.pointOfView(
        { lat: node.lat, lng: node.lng, altitude: 2.1 },
        400
      )
    }
    router.push(`/projects/${node.id}`)
  }

  const activeThemeColor = useMemo(() => {
    if (isTourActive && NODES[tourIndex]) return NODES[tourIndex].accentColor || '#38bdf8'
    return activeNode?.accentColor || hoveredNode?.accentColor || '#38bdf8'
  }, [isTourActive, tourIndex, activeNode, hoveredNode])

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full bg-[#030712] overflow-hidden">
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0, 0, 0, 0)"
        backgroundImageUrl="/textures/night-sky.png"
        globeImageUrl="/textures/earth-blue-marble.jpg"
        bumpImageUrl="/textures/earth-topology.png"
        atmosphereColor={activeThemeColor}
        atmosphereAltitude={0.18}
        showAtmosphere={true}
        
        // Arc configuration (subtle connecting trajectories)
        arcsData={GLOBE_ARCS}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        arcAltitude={0.14}
        arcStroke={0.8}

        // Custom 3D Objects Layer: 3D Floating Geometry Polyhedra & Glowing Vertical Laser Beacons
        customLayerData={NODES}
        customThreeObject={(d: object) => {
          const node = d as OrbitalNode
          const group = new THREE.Group()

          const colorHex = node.accentColor || '#38bdf8'
          const themeColor = new THREE.Color(colorHex)

          // 1. Base glowing ground ring
          const ringGeo = new THREE.RingGeometry(0.3, 0.45, 24)
          ringGeo.rotateX(-Math.PI / 2)
          const ringMat = new THREE.MeshBasicMaterial({
            color: themeColor,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.65
          })
          const baseRing = new THREE.Mesh(ringGeo, ringMat)
          group.add(baseRing)

          // 2. Vertical glowing holographic laser beacon cylinder
          const beaconHeight = 1.4
          const beaconGeo = new THREE.CylinderGeometry(0.02, 0.07, beaconHeight, 12)
          beaconGeo.translate(0, beaconHeight / 2, 0)
          const beaconMat = new THREE.MeshBasicMaterial({
            color: themeColor,
            transparent: true,
            opacity: 0.45,
            blending: THREE.AdditiveBlending
          })
          const beacon = new THREE.Mesh(beaconGeo, beaconMat)
          group.add(beacon)

          // 3. Floating 3D Polyhedron Geometry
          let polyGeo: THREE.BufferGeometry
          switch (node.geometry) {
            case 'octahedron':
              polyGeo = new THREE.OctahedronGeometry(0.55, 0)
              break
            case 'tetrahedron':
              polyGeo = new THREE.TetrahedronGeometry(0.6, 0)
              break
            case 'torus':
              polyGeo = new THREE.TorusGeometry(0.45, 0.16, 12, 24)
              break
            case 'dodecahedron':
              polyGeo = new THREE.DodecahedronGeometry(0.55, 0)
              break
            case 'icosahedron':
            default:
              polyGeo = new THREE.IcosahedronGeometry(0.55, 0)
              break
          }

          // Solid faceted inner core
          const coreMat = new THREE.MeshStandardMaterial({
            color: 0x071126,
            roughness: 0.2,
            metalness: 0.8,
            emissive: themeColor,
            emissiveIntensity: 0.4
          })
          const coreMesh = new THREE.Mesh(polyGeo, coreMat)

          // Glowing wireframe outer cage
          const wireMat = new THREE.MeshBasicMaterial({
            color: themeColor,
            wireframe: true,
            transparent: true,
            opacity: 0.85
          })
          const wireMesh = new THREE.Mesh(polyGeo, wireMat)

          const polyGroup = new THREE.Group()
          polyGroup.add(coreMesh)
          polyGroup.add(wireMesh)
          polyGroup.position.y = beaconHeight + 0.15

          group.add(polyGroup)

          group.userData = {
            polyGroup,
            beacon,
            baseRing,
            wireMat,
            initialY: beaconHeight + 0.15,
            rotSpeedX: 0.015 * (node.orbitSpeed || 0.4),
            rotSpeedY: 0.02 * (node.orbitSpeed || 0.4),
            offset: node.orbitOffset || 0
          }

          return group
        }}
        customThreeObjectUpdate={(obj: THREE.Object3D, d: object) => {
          const node = d as OrbitalNode
          const { polyGroup, wireMat, initialY, rotSpeedX, rotSpeedY, offset } = obj.userData

          if (polyGroup) {
            polyGroup.rotation.x += rotSpeedX
            polyGroup.rotation.y += rotSpeedY

            const time = performance.now() * 0.002
            polyGroup.position.y = initialY + Math.sin(time + offset) * 0.08

            const isCurrent =
              activeNode?.id === node.id ||
              hoveredNode?.id === node.id ||
              (isTourActive && NODES[tourIndex]?.id === node.id)

            const targetScale = isCurrent ? 1.35 : 1.0
            polyGroup.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)

            if (wireMat) {
              wireMat.opacity = THREE.MathUtils.lerp(wireMat.opacity, isCurrent ? 1.0 : 0.75, 0.1)
            }
          }
        }}

        // Point markers for project nodes
        pointsData={NODES}
        pointLat="lat"
        pointLng="lng"
        pointColor={(d: object) =>
          (d as OrbitalNode).accentColor || ((d as OrbitalNode).id === activeNode?.id ? '#ffffff' : '#38bdf8')
        }
        pointAltitude={0.03}
        pointRadius={(d: object) =>
          (d as OrbitalNode).id === activeNode?.id ? 0.7 : 0.45
        }
        pointsMerge={false}
        onPointClick={handlePointClick}
        onPointHover={(point) => {
          if (point) soundManager.playHover()
          setHoveredNode(point ? (point as OrbitalNode) : null)
        }}

        // Pulsing rings around active nodes
        ringsData={isTourActive ? [NODES[tourIndex]] : activeNode ? [activeNode] : NODES}
        ringLat="lat"
        ringLng="lng"
        ringColor={(d: object) => {
          const color = (d as OrbitalNode).accentColor || '#38bdf8'
          return (t: number) => `${color}${Math.floor(Math.max(0, 1 - t) * 180).toString(16).padStart(2, '0')}`
        }}
        ringMaxRadius={6}
        ringPropagationSpeed={2.5}
        ringRepeatPeriod={1400}

        // Custom HTML Badge Cards for Project Nodes
        htmlElementsData={NODES}
        htmlLat="lat"
        htmlLng="lng"
        htmlAltitude={0.04}
        htmlTransitionDuration={0}
        htmlElement={(d: object) => {
          const node = d as OrbitalNode
          const isActive = activeNode?.id === node.id || (isTourActive && NODES[tourIndex]?.id === node.id)
          const themeAccent = node.accentColor || '#38bdf8'
          const cityInfo = CITY_TIMEZONE_MAP[node.city] || { timezone: 'UTC', tzCode: 'UTC', climate: 'Orbital LEO' }
          const localTime = getCityLocalTime(cityInfo.timezone)
          const daylight = getCityDaylightStatus(cityInfo.timezone)

          const el = document.createElement('div')
          el.setAttribute('role', 'button')
          el.setAttribute('tabindex', '0')
          el.setAttribute('aria-label', `View ${node.label} project in ${node.city}, ${node.continent}`)
          el.className = `group cursor-pointer select-none flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#080d19]/90 backdrop-blur-md border pointer-events-auto ${
            isActive
              ? 'border-cyan-400 shadow-[0_0_25px_rgba(56,189,248,0.7)] bg-[#0c162d]'
              : 'border-cyan-500/30 hover:border-cyan-400/80 hover:shadow-[0_0_18px_rgba(56,189,248,0.35)] shadow-lg'
          } transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-cyan-400`

          const continentUpper = node.continent.toUpperCase()

          el.innerHTML = `
            <div class="w-6 h-6 rounded-lg bg-[#0f172a] border ${
              isActive ? 'border-cyan-400' : 'border-cyan-500/40'
            } flex items-center justify-center shadow-inner group-hover:border-cyan-400 transition-colors shrink-0">
              <span class="w-2.5 h-2.5 rounded-sm group-hover:scale-125 transition-transform" style="background-color: ${themeAccent}; box-shadow: 0 0 8px ${themeAccent};"></span>
            </div>
            <div class="flex flex-col text-left">
              <div class="flex items-center gap-1.5 leading-none mb-0.5">
                <span class="text-[8px] font-mono tracking-widest font-bold" style="color: ${themeAccent};">${continentUpper} · ${node.city}</span>
                <span class="text-[9px]" title="${daylight.label}">${daylight.icon}</span>
              </div>
              <span class="text-xs font-bold text-white tracking-wide leading-tight group-hover:text-cyan-100">${node.label}</span>
              <span class="text-[9px] font-mono text-white/50 leading-none mt-0.5">${localTime} ${cityInfo.tzCode}</span>
            </div>
          `

          let startX = 0
          let startY = 0

          el.onpointerdown = (e) => {
            startX = e.clientX
            startY = e.clientY
          }

          const triggerSelect = (e: Event) => {
            if (e instanceof MouseEvent) {
              const dx = Math.abs(e.clientX - startX)
              const dy = Math.abs(e.clientY - startY)
              if (dx > 6 || dy > 6) return // User was dragging the globe!
            }
            e.preventDefault()
            e.stopPropagation()
            
            soundManager.playClick()
            soundManager.playWarp()
            if (globeRef.current) {
              isAnimatingCam.current = true
              globeRef.current.pointOfView(
                { lat: node.lat, lng: node.lng, altitude: 2.1 },
                400
              )
            }
            router.push(`/projects/${node.id}`)
          }

          el.ondblclick = triggerSelect
          el.onclick = triggerSelect
          el.ontouchend = triggerSelect

          el.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              triggerSelect(e)
            }
          }
          el.onmouseenter = () => {
            soundManager.playHover()
            setHoveredNode(node)
          }
          el.onmouseleave = () => setHoveredNode(null)

          return el
        }}
      />
    </div>
  )
}

