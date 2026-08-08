'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import { useSceneStore } from '@/components/providers/SceneStateProvider'

export default function NameTag() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isZoomedOut = useSceneStore((state) => state.isZoomedOut)
  const setIsZoomedOut = useSceneStore((state) => state.setIsZoomedOut)

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 1.2 }
      )
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute top-6 left-6 z-40 select-none pointer-events-auto flex flex-col gap-2"
    >
      {/* Availability Status Badge */}
      <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 w-fit backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
        <span className="font-mono text-[9px] tracking-[0.2em] text-emerald-400 uppercase font-bold">
          Available For Projects
        </span>
      </div>

      {/* Main Name & Title */}
      <div>
        <h1 className="font-mono text-sm tracking-[0.25em] text-white uppercase font-bold m-0">
          Rajat Sharma
        </h1>
        <p className="text-xs text-white/50 mt-0.5 font-normal tracking-wide m-0">
          Interactive 3D Earth Portfolio
        </p>
      </div>

      {/* Interactive Guidance Hint */}
      <div className="flex items-center gap-2 text-[11px] text-cyan-400/80 font-mono mt-1">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />
        <span>Click a project to explore · Zoom out for Bio</span>
      </div>

      {/* Zoom out for Bio Button */}
      <button
        onClick={() => setIsZoomedOut(!isZoomedOut)}
        aria-label="Toggle full bio and resume overlay"
        className="mt-1 flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-400 hover:text-black transition-all text-xs font-semibold w-fit shadow-[0_0_12px_rgba(56,189,248,0.2)]"
      >
        <span>🔍 {isZoomedOut ? 'Zoom In to Globe' : 'Zoom Out for Full Bio & Resume'}</span>
      </button>
    </div>
  )
}
