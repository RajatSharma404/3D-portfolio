'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { NODES } from '@/lib/nodes'
import { useSceneStore } from '@/components/providers/SceneStateProvider'

export default function NavDots() {
  const containerRef = useRef<HTMLDivElement>(null)
  const activeNode = useSceneStore((state) => state.activeNode)
  const router = useRouter()

  useEffect(() => {
    if (containerRef.current) {
      const dots = containerRef.current.children
      gsap.fromTo(
        dots,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
          delay: 1.8,
          ease: 'back.out(1.7)'
        }
      )
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 items-center pointer-events-auto"
    >
      {NODES.map((node) => {
        const isActive = activeNode?.id === node.id
        return (
          <button
            key={node.id}
            onClick={() => router.push(`/projects/${node.id}`)}
            title={node.label}
            aria-label={`Jump to ${node.label} project`}
            aria-current={isActive ? 'true' : undefined}
            className={`rounded-full transition-all duration-300 ${
              isActive
                ? 'w-2.5 h-2.5 bg-white shadow-[0_0_8px_#c8f0ff]'
                : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/60'
            }`}
          />
        )
      })}
    </div>
  )
}
