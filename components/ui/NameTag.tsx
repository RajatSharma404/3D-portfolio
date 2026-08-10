'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useSceneStore } from '@/components/providers/SceneStateProvider'
import { soundManager } from '@/lib/sound'

interface NameTagProps {
  onOpenSearch?: () => void
  onOpenResume?: () => void
}

export default function NameTag({ onOpenSearch, onOpenResume }: NameTagProps) {
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

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center gap-2 mt-1">
        <button
          onClick={() => {
            soundManager.playClick()
            setIsZoomedOut(!isZoomedOut)
          }}
          onMouseEnter={() => soundManager.playHover()}
          aria-label="Toggle full bio and resume overlay"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-400 hover:text-black transition-all text-xs font-semibold shadow-[0_0_12px_rgba(56,189,248,0.2)] cursor-pointer"
        >
          <span>🔍 {isZoomedOut ? 'Zoom In to Globe' : 'Zoom Out for Full Bio'}</span>
        </button>

        {onOpenSearch && (
          <button
            onClick={() => {
              soundManager.playClick()
              onOpenSearch()
            }}
            onMouseEnter={() => soundManager.playHover()}
            aria-label="Open Command Palette Search"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black transition-all text-xs font-mono font-semibold cursor-pointer"
          >
            <span>⚡ ⌘K Search</span>
          </button>
        )}

        {onOpenResume && (
          <button
            onClick={() => {
              soundManager.playClick()
              onOpenResume()
            }}
            onMouseEnter={() => soundManager.playHover()}
            aria-label="View Resume PDF"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 hover:bg-purple-500 hover:text-white transition-all text-xs font-mono font-semibold cursor-pointer"
          >
            <span>📄 Resume</span>
          </button>
        )}
      </div>
    </div>
  )
}
