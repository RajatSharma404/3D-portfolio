'use client'

import { useEffect, useRef, useState } from 'react'
import Globe, { GlobeMethods } from 'react-globe.gl'
import { NODES, GLOBE_ARCS, OrbitalNode } from '@/lib/nodes'
import { useSceneStore } from '@/components/providers/SceneStateProvider'

export default function InteractiveGlobe() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })

  const activeNode = useSceneStore((state) => state.activeNode)
  const setActiveNode = useSceneStore((state) => state.setActiveNode)
  const setHoveredNode = useSceneStore((state) => state.setHoveredNode)
  const isZoomedOut = useSceneStore((state) => state.isZoomedOut)
  const setIsZoomedOut = useSceneStore((state) => state.setIsZoomedOut)

  const isAnimatingCam = useRef(false)

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

  // Configure initial globe controls & position
  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls()
      if (controls) {
        controls.autoRotate = true
        controls.autoRotateSpeed = 0.35
        controls.enableZoom = true
      }
      globeRef.current.pointOfView({ lat: -15, lng: 130, altitude: 2.1 }, 0)
    }
  }, [])

  // Track zoom level altitude from OrbitControls change listener
  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls()
      if (controls) {
        const handleControlsChange = () => {
          if (globeRef.current && !isAnimatingCam.current) {
            const pov = globeRef.current.pointOfView()
            if (pov && typeof pov.altitude === 'number') {
              const zoomedOut = pov.altitude >= 3.2
              if (useSceneStore.getState().isZoomedOut !== zoomedOut) {
                setIsZoomedOut(zoomedOut)
              }
            }
          }
        }
        controls.addEventListener('change', handleControlsChange)
        return () => controls.removeEventListener('change', handleControlsChange)
      }
    }
  }, [setIsZoomedOut])

  // Fly camera to zoomed-out or zoomed-in position when isZoomedOut state changes
  useEffect(() => {
    if (globeRef.current) {
      const currentPov = globeRef.current.pointOfView()
      if (isZoomedOut && currentPov.altitude < 3.2) {
        isAnimatingCam.current = true
        globeRef.current.pointOfView(
          { lat: currentPov.lat, lng: currentPov.lng, altitude: 3.8 },
          1000
        )
        setTimeout(() => {
          isAnimatingCam.current = false
        }, 1100)
      } else if (!isZoomedOut && currentPov.altitude >= 3.0) {
        isAnimatingCam.current = true
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
        controls.autoRotate = !activeNode && !isZoomedOut
        controls.autoRotateSpeed = 0.35
      }
      if (activeNode) {
        globeRef.current.pointOfView(
          {
            lat: activeNode.lat,
            lng: activeNode.lng,
            altitude: 1.8
          },
          1400
        )
      }
    }
  }, [activeNode, isZoomedOut])

  const handlePointClick = (point: object) => {
    const node = point as OrbitalNode
    setActiveNode(node)
  }

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
        atmosphereColor="#38bdf8"
        atmosphereAltitude={0.15}
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
          (d as OrbitalNode).id === activeNode?.id ? '#ffffff' : '#38bdf8'
        }
        pointAltitude={0.03}
        pointRadius={(d: object) =>
          (d as OrbitalNode).id === activeNode?.id ? 0.7 : 0.45
        }
        pointsMerge={false}
        onPointClick={handlePointClick}
        onPointHover={(point) => setHoveredNode(point ? (point as OrbitalNode) : null)}

        // Pulsing rings around active nodes
        ringsData={activeNode ? [activeNode] : NODES}
        ringLat="lat"
        ringLng="lng"
        ringColor={() => (t: number) => `rgba(56, 189, 248, ${Math.max(0, 1 - t) * 0.7})`}
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

          const el = document.createElement('div')
          el.setAttribute('role', 'button')
          el.setAttribute('tabindex', '0')
          el.setAttribute('aria-label', `View ${node.label} project in ${node.continent}`)
          el.className = `group cursor-pointer select-none flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#080d19]/90 backdrop-blur-md border pointer-events-auto ${
            isActive
              ? 'border-cyan-400 shadow-[0_0_22px_rgba(56,189,248,0.7)] bg-[#0c162d]'
              : 'border-cyan-500/30 hover:border-cyan-400/80 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] shadow-lg'
          } transition-colors duration-300 transform -translate-x-1/2 -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-cyan-400`

          const continentUpper = node.continent.toUpperCase()

          el.innerHTML = `
            <div class="w-5 h-5 rounded-md bg-[#0f172a] border ${
              isActive ? 'border-cyan-400' : 'border-cyan-500/40'
            } flex items-center justify-center shadow-inner group-hover:border-cyan-400 transition-colors">
              <span class="w-2 h-2 rounded-sm bg-cyan-400 shadow-[0_0_6px_#38bdf8] group-hover:scale-125 transition-transform"></span>
            </div>
            <div class="flex flex-col text-left">
              <span class="text-[8px] font-mono tracking-widest text-cyan-400 font-semibold leading-none mb-0.5">${continentUpper}</span>
              <span class="text-[11px] font-bold text-white tracking-wide leading-tight group-hover:text-cyan-100">${node.label}</span>
            </div>
          `

          const triggerSelect = (e: Event) => {
            e.preventDefault()
            e.stopPropagation()
            setActiveNode(node)
          }

          // Prevent OrbitControls on canvas from capturing pointer clicks on badge
          el.onpointerdown = (e) => e.stopPropagation()
          el.onmousedown = (e) => e.stopPropagation()
          el.ontouchstart = (e) => e.stopPropagation()
          el.onpointerup = (e) => e.stopPropagation()
          el.onmouseup = (e) => e.stopPropagation()

          el.onclick = triggerSelect
          el.ontouchend = triggerSelect

          el.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              triggerSelect(e)
            }
          }
          el.onmouseenter = () => setHoveredNode(node)
          el.onmouseleave = () => setHoveredNode(null)

          return el
        }}
      />
    </div>
  )
}
