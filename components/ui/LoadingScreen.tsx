'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useSceneStore } from '@/components/providers/SceneStateProvider'
import { soundManager } from '@/lib/sound'

const BOOT_STAGES = [
  'INITIALIZING WEBGL 3D PLANETARY ENGINE...',
  'SYNCHRONIZING UTC SUBSOLAR COORDINATES...',
  'ESTABLISHING 6 CONTINENTAL ORBITAL BEACONS...',
  'SPATIAL AUDIO SYNTHESIZERS ONLINE.'
]

export default function LoadingScreen() {
  const isLoaded = useSceneStore((state) => state.isLoaded)
  const setIsLoaded = useSceneStore((state) => state.setIsLoaded)
  const [visible, setVisible] = useState(false)
  const [stageIndex, setStageIndex] = useState(0)
  const [progressPercent, setProgressPercent] = useState(0)

  const overlayRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const stageTextRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if site has already loaded in this session
    const hasSessionLoaded =
      typeof window !== 'undefined' && sessionStorage.getItem('orbital_loaded') === 'true'
    if (isLoaded || hasSessionLoaded) {
      if (!isLoaded) setIsLoaded(true)
      setVisible(false)
      return
    }

    setVisible(true)

    // Progress counter animation
    const progressInterval = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        const next = prev + Math.floor(Math.random() * 8) + 4
        const capped = Math.min(100, next)

        if (capped > 75) setStageIndex(3)
        else if (capped > 50) setStageIndex(2)
        else if (capped > 25) setStageIndex(1)
        else setStageIndex(0)

        return capped
      })
    }, 65)

    const tl = gsap.timeline({
      onComplete: () => {
        soundManager.playTourBeacon(0)
        setVisible(false)
        setIsLoaded(true)
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('orbital_loaded', 'true')
        }
      }
    })

    tl.to(textRef.current, { opacity: 0.9, duration: 0.35, delay: 0.1 })
      .to(barRef.current, { width: '100%', duration: 1.5, ease: 'power2.inOut' }, '-=0.1')
      .to(textRef.current, { opacity: 0, duration: 0.3 }, '+=0.1')
      .to(overlayRef.current, { opacity: 0, duration: 0.6, ease: 'power2.inOut' })

    return () => {
      clearInterval(progressInterval)
    }
  }, [isLoaded, setIsLoaded])

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-[#050508] flex flex-col items-center justify-center pointer-events-auto select-none p-6"
    >
      <div className="flex flex-col items-center gap-6 max-w-sm w-full text-center">
        
        {/* Subtitle / Developer Name */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <p
            ref={textRef}
            className="opacity-0 text-xs tracking-[0.3em] text-cyan-300 font-mono font-bold uppercase"
          >
            RAJAT SHARMA · 3D SYSTEM
          </p>
        </div>

        {/* Cyberpunk Progress Bar */}
        <div className="w-full h-1 bg-white/10 relative overflow-hidden rounded-full border border-white/5">
          <div
            ref={barRef}
            className="h-full w-0 bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 transition-all shadow-[0_0_15px_#38bdf8]"
          />
        </div>

        {/* Telemetry Stage & Percent Display */}
        <div className="flex flex-col items-center gap-1.5 font-mono text-center">
          <span
            ref={stageTextRef}
            className="text-[10px] tracking-[0.15em] text-white/70 font-semibold uppercase animate-pulse"
          >
            [ 0{stageIndex + 1}/04 ] {BOOT_STAGES[stageIndex]}
          </span>
          <span className="text-xs font-mono font-extrabold text-cyan-400">
            {progressPercent}%
          </span>
        </div>
      </div>
    </div>
  )
}
