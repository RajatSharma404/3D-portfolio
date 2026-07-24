'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function NameTag() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current && lineRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 1.6 }
      )
      gsap.fromTo(
        lineRef.current,
        { width: 0 },
        { width: 24, duration: 0.5, ease: 'power2.out', delay: 2.0 }
      )
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute top-8 left-8 z-40 select-none pointer-events-auto"
    >
      <p className="font-mono text-[11px] tracking-[0.2em] text-white/90 uppercase m-0">
        Rajat Sharma
      </p>
      <p className="text-[13px] text-white/40 mt-1 font-normal m-0">
        Software Engineer · Sparqor
      </p>
      <div
        ref={lineRef}
        className="h-[1px] bg-[var(--color-accent)] mt-2.5 rounded-full"
      />
    </div>
  )
}
