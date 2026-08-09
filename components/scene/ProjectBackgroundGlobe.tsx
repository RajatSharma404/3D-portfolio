'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Globe, { GlobeMethods } from 'react-globe.gl'
import { OrbitalNode, GLOBE_ARCS } from '@/lib/nodes'

interface ProjectBackgroundGlobeProps {
  node: OrbitalNode
}

export default function ProjectBackgroundGlobe({ node }: ProjectBackgroundGlobeProps) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const router = useRouter()
  const redirectingRef = useRef(false)
  const isReadyRef = useRef(false)

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
          altitude: 1.6
        },
        1200
      )

      // Grace period: Only enable zoom-out detection after initial camera animation finishes
      const timer = setTimeout(() => {
        isReadyRef.current = true
      }, 1500)

      const controls = globeRef.current.controls()
      if (controls) {
        controls.autoRotate = true
        controls.autoRotateSpeed = 0.4
        controls.enableZoom = true

        const handleControlsChange = () => {
          if (!isReadyRef.current || redirectingRef.current || !globeRef.current) return
          const pov = globeRef.current.pointOfView()
          if (!pov || pov.altitude === undefined) return

          // If user manually zooms OUT past altitude 2.65, return to home 3D Earth Globe
          if (pov.altitude > 2.65) {
            redirectingRef.current = true
            router.push('/')
          }
        }

        controls.addEventListener('change', handleControlsChange)
        return () => {
          clearTimeout(timer)
          controls.removeEventListener('change', handleControlsChange)
        }
      }
    }
  }, [node, router])

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full pointer-events-auto opacity-40 z-0">
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0, 0, 0, 0)"
        backgroundImageUrl="/textures/night-sky.png"
        globeImageUrl="/textures/earth-blue-marble.jpg"
        bumpImageUrl="/textures/earth-topology.png"
        atmosphereColor="#38bdf8"
        atmosphereAltitude={0.18}
        arcsData={GLOBE_ARCS}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashInitialGap={() => Math.random()}
        arcDashAnimateTime={2000}
        arcStroke={0.5}
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
