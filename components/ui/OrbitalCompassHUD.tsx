'use client'

import React, { useMemo, useState } from 'react'
import { useSceneStore } from '@/components/providers/SceneStateProvider'
import { calculateHaversineDistance, calculateBearing } from '@/lib/planetary'
import { soundManager } from '@/lib/sound'

export default function OrbitalCompassHUD() {
  const [isMinimized, setIsMinimized] = useState(false)
  const cameraPov = useSceneStore((state) => state.cameraPov)
  const activeNode = useSceneStore((state) => state.activeNode)
  const hoveredNode = useSceneStore((state) => state.hoveredNode)

  const targetNode = hoveredNode || activeNode

  // Real-time telemetry calculations
  const telemetry = useMemo(() => {
    const cameraAltKm = Math.round((cameraPov.altitude || 2.1) * 6371)
    
    if (!targetNode) {
      return {
        distanceKm: null,
        bearingDeg: null,
        bearingCompass: '--',
        altKm: cameraAltKm
      }
    }

    const dist = calculateHaversineDistance(
      cameraPov.lat,
      cameraPov.lng,
      targetNode.lat,
      targetNode.lng
    )

    const bearing = calculateBearing(
      cameraPov.lat,
      cameraPov.lng,
      targetNode.lat,
      targetNode.lng
    )

    return {
      distanceKm: dist,
      bearingDeg: bearing.degrees,
      bearingCompass: bearing.compass,
      altKm: cameraAltKm
    }
  }, [cameraPov, targetNode])

  const targetColor = targetNode?.accentColor || '#38bdf8'

  return (
    <div className="fixed top-20 right-6 z-40 select-none pointer-events-auto hidden md:block">
      <div
        className="rounded-2xl bg-[#080d19]/85 border border-cyan-500/30 hover:border-cyan-400/70 backdrop-blur-xl transition-all duration-300 shadow-[0_0_25px_rgba(0,0,0,0.7)] text-white overflow-hidden"
        onMouseEnter={() => soundManager.playHover()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-3 px-3.5 py-2 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
            <span className="font-mono text-[10px] tracking-wider uppercase font-bold text-cyan-300">
              ORBITAL COMPASS & TELEMETRY
            </span>
          </div>

          <button
            onClick={() => {
              soundManager.playClick()
              setIsMinimized((prev) => !prev)
            }}
            aria-label={isMinimized ? 'Expand Orbital Compass' : 'Minimize Orbital Compass'}
            className="text-[10px] text-white/40 hover:text-white font-mono px-1.5 py-0.5 rounded hover:bg-white/10 transition-colors cursor-pointer"
          >
            {isMinimized ? '＋' : '—'}
          </button>
        </div>

        {/* Telemetry Body */}
        {!isMinimized && (
          <div className="p-3.5 space-y-3 font-mono text-xs">
            {/* Target & Distance */}
            <div>
              <div className="flex items-center justify-between text-[10px] text-white/40 mb-1">
                <span>ORBITAL VECTOR TARGET</span>
                <span
                  className="font-bold uppercase"
                  style={{ color: targetColor }}
                >
                  {targetNode ? `${targetNode.label} (${targetNode.country})` : 'GLOBAL SCAN'}
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-[11px] text-white/70">Spherical Distance:</span>
                <span className="text-sm font-extrabold text-cyan-300 tracking-wide">
                  {telemetry.distanceKm !== null
                    ? `${telemetry.distanceKm.toLocaleString()} km`
                    : '12,742 km (LEO)'}
                </span>
              </div>
            </div>

            {/* Compass Azimuth & Bearing Dial */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/10">
              {/* Mini Circular Gyro Compass Dial */}
              <div className="relative w-11 h-11 rounded-full bg-[#040814] border border-cyan-500/40 flex items-center justify-center shadow-inner shrink-0">
                <span className="absolute top-0.5 text-[7px] text-cyan-400 font-bold">N</span>
                <span className="absolute bottom-0.5 text-[7px] text-white/30">S</span>
                <span className="absolute left-1 text-[7px] text-white/30">W</span>
                <span className="absolute right-1 text-[7px] text-white/30">E</span>
                {/* Rotating Azimuth Needle */}
                <div
                  className="w-full h-0.5 relative transition-transform duration-500 ease-out"
                  style={{
                    transform: `rotate(${telemetry.bearingDeg !== null ? telemetry.bearingDeg : 0}deg)`
                  }}
                >
                  <span className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />
                </div>
              </div>

              {/* Bearing Values */}
              <div className="flex flex-col text-right">
                <span className="text-[10px] text-white/40">BEARING AZIMUTH</span>
                <div className="flex items-center justify-end gap-1.5">
                  <span className="text-sm font-extrabold text-white">
                    {telemetry.bearingDeg !== null ? `${telemetry.bearingDeg}°` : '000°'}
                  </span>
                  <span className="text-[10px] font-bold text-amber-300 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/30">
                    {telemetry.bearingCompass}
                  </span>
                </div>
              </div>
            </div>

            {/* Camera POV & Orbital Altitude */}
            <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-[10px]">
              <div>
                <span className="text-white/40 block">POV COORDS</span>
                <span className="text-white/90 font-bold">
                  {cameraPov.lat.toFixed(1)}°N, {cameraPov.lng.toFixed(1)}°E
                </span>
              </div>
              <div className="text-right">
                <span className="text-white/40 block">SIM ALTITUDE</span>
                <span className="text-cyan-300 font-bold">
                  {telemetry.altKm.toLocaleString()} km
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
