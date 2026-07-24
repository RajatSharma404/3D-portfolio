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

  // Configure initial globe controls & auto-rotation
  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls()
      if (controls) {
        controls.autoRotate = !activeNode
        controls.autoRotateSpeed = 0.8
        controls.enableZoom = true
      }
    }
  }, [activeNode])

  // Fly to active node position when selected
  useEffect(() => {
    if (globeRef.current && activeNode) {
      globeRef.current.pointOfView(
        {
          lat: activeNode.lat,
          lng: activeNode.lng,
          altitude: 1.8
        },
        1400
      )
    }
  }, [activeNode])

  const handlePointClick = (point: object) => {
    const node = point as OrbitalNode
    setActiveNode(node)
  }

  const handleLabelClick = (label: object) => {
    const node = label as OrbitalNode
    setActiveNode(node)
  }

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full bg-[#050508] overflow-hidden">
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(5, 5, 8, 1)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        atmosphereColor="#38bdf8"
        atmosphereAltitude={0.18}
        
        // Arc configuration
        arcsData={GLOBE_ARCS}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={1600}
        arcAltitude={0.18}
        arcStroke={1.2}

        // Point markers for project nodes
        pointsData={NODES}
        pointLat="lat"
        pointLng="lng"
        pointColor={(d: object) =>
          (d as OrbitalNode).id === activeNode?.id ? '#ffffff' : '#00f2fe'
        }
        pointAltitude={0.04}
        pointRadius={(d: object) =>
          (d as OrbitalNode).id === activeNode?.id ? 0.9 : 0.6
        }
        pointsMerge={false}
        onPointClick={handlePointClick}
        onPointHover={(point) => setHoveredNode(point ? (point as OrbitalNode) : null)}

        // Pulsing rings around nodes
        ringsData={activeNode ? [activeNode] : NODES}
        ringLat="lat"
        ringLng="lng"
        ringColor={() => (t: number) => `rgba(0, 242, 254, ${Math.max(0, 1 - t)})`}
        ringMaxRadius={8}
        ringPropagationSpeed={3}
        ringRepeatPeriod={1200}

        // Floating interactive labels
        labelsData={NODES}
        labelLat="lat"
        labelLng="lng"
        labelText={(d: object) => {
          const n = d as OrbitalNode
          return `✦ ${n.label} (${n.city})`
        }}
        labelSize={(d: object) =>
          (d as OrbitalNode).id === activeNode?.id ? 1.6 : 1.2
        }
        labelDotRadius={0.4}
        labelColor={(d: object) =>
          (d as OrbitalNode).id === activeNode?.id ? '#ffffff' : '#38bdf8'
        }
        labelResolution={2}
        onLabelClick={handleLabelClick}
        onLabelHover={(label) => setHoveredNode(label ? (label as OrbitalNode) : null)}
      />
    </div>
  )
}
