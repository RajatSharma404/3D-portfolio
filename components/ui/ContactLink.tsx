'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ContactLink() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 1.8 }
      )
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute bottom-8 right-8 z-40 flex flex-col items-end gap-1.5 select-none pointer-events-auto"
    >
      <a
        href="https://github.com/RajatSharma404"
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[10px] tracking-[0.1em] text-white/30 hover:text-white/60 transition-colors"
      >
        github.com/RajatSharma404
      </a>

      <a
        href="mailto:rajat.sharma.myid1@gmail.com"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-sm text-white/60 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-300 panel-blur bg-black/20"
      >
        <span>say hello</span>
        <span className="text-xs">→</span>
      </a>
    </div>
  )
}
