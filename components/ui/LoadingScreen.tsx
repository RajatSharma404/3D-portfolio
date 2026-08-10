'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useSceneStore } from '@/components/providers/SceneStateProvider'

export default function LoadingScreen() {
  const isLoaded = useSceneStore((state) => state.isLoaded)
  const setIsLoaded = useSceneStore((state) => state.setIsLoaded)
  const [visible, setVisible] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if site has already loaded in this session
    const hasSessionLoaded = typeof window !== 'undefined' && sessionStorage.getItem('orbital_loaded') === 'true'
    if (isLoaded || hasSessionLoaded) {
      if (!isLoaded) setIsLoaded(true)
      setVisible(false)
      return
    }

    setVisible(true)

    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false)
        setIsLoaded(true)
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('orbital_loaded', 'true')
        }
      }
    })

    tl.to(textRef.current, { opacity: 0.8, duration: 0.4, delay: 0.1 })
      .to(barRef.current, { width: '100%', duration: 1.4, ease: 'power2.inOut' }, '-=0.2')
      .to(textRef.current, { opacity: 0, duration: 0.4 }, '+=0.2')
      .to(overlayRef.current, { opacity: 0, duration: 0.6, ease: 'power2.inOut' })
  }, [isLoaded, setIsLoaded])

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-[#050508] flex flex-col items-center justify-center pointer-events-auto select-none"
    >
      <div className="flex flex-col items-center gap-6">
        <p
          ref={textRef}
          className="opacity-0 text-[11px] tracking-[0.25em] text-white/50 font-mono uppercase"
        >
          Rajat Sharma
        </p>

        <div className="w-40 h-[1px] bg-white/10 relative overflow-hidden rounded-full">
          <div
            ref={barRef}
            className="h-full w-0 bg-[var(--color-accent)] transition-all"
          />
        </div>

        <span className="text-[10px] tracking-[0.15em] text-white/25 font-mono">
          INITIALIZING ORBITAL SYSTEM
        </span>
      </div>
    </div>
  )
}
