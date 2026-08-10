'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Globe, { GlobeMethods } from 'react-globe.gl'
import { NODES, GLOBE_ARCS, OrbitalNode } from '@/lib/nodes'
import { useSceneStore } from '@/components/providers/SceneStateProvider'
import { soundManager } from '@/lib/sound'

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

  const isAnimatingCam = useRef(false)
  const isNavigatingRef = useRef(false)

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

  // Initial camera placement & WebGL renderer optimization on load
  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls()
      if (controls) {
        controls.autoRotate = true
        controls.autoRotateSpeed = 0.75
        controls.enableZoom = true
      }
      const renderer = globeRef.current.renderer()
      if (renderer && typeof window !== 'undefined') {
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
      }
      globeRef.current.pointOfView({ lat: -15, lng: 130, altitude: 2.1 }, 0)
    }
  }, [])

  // Consolidated OrbitControls listener: Handles zoom-in navigation and zoom state tracking safely
  useEffect(() => {
    isNavigatingRef.current = false
    if (!globeRef.current) return

    const controls = globeRef.current.controls()
    if (!controls) return

    const handleControlsChange = () => {
      if (isNavigatingRef.current || !globeRef.current || isAnimatingCam.current) return

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
  }, [setIsZoomedOut, router])

  // Fly camera to zoomed-out or zoomed-in position when isZoomedOut state changes
  useEffect(() => {
    if (globeRef.current) {
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
  }, [isZoomedOut])

  // Fly to active node position when selected, or reset to initial view when null
  useEffect(() => {
    if (globeRef.current) {
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
  }, [activeNode, isZoomedOut])

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

  const activeThemeColor = activeNode?.accentColor || hoveredNode?.accentColor || '#38bdf8'

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
        atmosphereAltitude={0.16}
        showAtmosphere={true}
        
        // Arc configuration (subtle connecting trajectories)
        arcsData={GLOBE_ARCS}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        arcAltitude={0.14}
        arcStroke={0.8}

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
        ringsData={activeNode ? [activeNode] : NODES}
        ringLat="lat"
        ringLng="lng"
        ringColor={(d: object) => {
          const color = (d as OrbitalNode).accentColor || '#38bdf8'
          return (t: number) => `${color}${Math.floor(Math.max(0, 1 - t) * 180).toString(16).padStart(2, '0')}`
        }}
        ringMaxRadius={6}
        ringPropagationSpeed={2.5}
        ringRepeatPeriod={1400}

        // Custom HTML Badge Cards for Project Nodes matching Reference UI
        htmlElementsData={NODES}
        htmlLat="lat"
        htmlLng="lng"
        htmlAltitude={0.04}
        htmlTransitionDuration={0}
        htmlElement={(d: object) => {
          const node = d as OrbitalNode
          const isActive = activeNode?.id === node.id
          const themeAccent = node.accentColor || '#38bdf8'

          const el = document.createElement('div')
          el.setAttribute('role', 'button')
          el.setAttribute('tabindex', '0')
          el.setAttribute('aria-label', `View ${node.label} project in ${node.continent}`)
          el.className = `group cursor-pointer select-none flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#080d19]/90 backdrop-blur-md border pointer-events-auto ${
            isActive
              ? 'border-cyan-400 shadow-[0_0_22px_rgba(56,189,248,0.7)] bg-[#0c162d]'
              : 'border-cyan-500/30 hover:border-cyan-400/80 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] shadow-lg'
          } transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-cyan-400`

          const continentUpper = node.continent.toUpperCase()

          el.innerHTML = `
            <div class="w-5 h-5 rounded-md bg-[#0f172a] border ${
              isActive ? 'border-cyan-400' : 'border-cyan-500/40'
            } flex items-center justify-center shadow-inner group-hover:border-cyan-400 transition-colors">
              <span class="w-2 h-2 rounded-sm group-hover:scale-125 transition-transform" style="background-color: ${themeAccent}; box-shadow: 0 0 8px ${themeAccent};"></span>
            </div>
            <div class="flex flex-col text-left">
              <span class="text-[8px] font-mono tracking-widest font-semibold leading-none mb-0.5" style="color: ${themeAccent};">${continentUpper}</span>
              <span class="text-[11px] font-bold text-white tracking-wide leading-tight group-hover:text-cyan-100">${node.label}</span>
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
