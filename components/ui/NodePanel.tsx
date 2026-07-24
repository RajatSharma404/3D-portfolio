'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useSceneStore } from '@/components/providers/SceneStateProvider'

export default function NodePanel() {
  const panelRef = useRef<HTMLDivElement>(null)
  const activeNode = useSceneStore((state) => state.activeNode)
  const setActiveNode = useSceneStore((state) => state.setActiveNode)

  useEffect(() => {
    if (!panelRef.current) return
    gsap.set(panelRef.current, { x: '100%' })
  }, [])

  useEffect(() => {
    if (!panelRef.current) return
    if (activeNode) {
      gsap.to(panelRef.current, {
        x: '0%',
        duration: 0.55,
        ease: 'power3.out'
      })
    } else {
      gsap.to(panelRef.current, {
        x: '100%',
        duration: 0.45,
        ease: 'power3.in'
      })
    }
  }, [activeNode])

  return (
    <div
      ref={panelRef}
      className="fixed top-0 right-0 h-full w-[400px] max-w-[90vw] z-50 panel-blur bg-[var(--color-panel-bg)] border-l border-[var(--color-panel-border)] p-8 flex flex-col justify-between overflow-y-auto shadow-2xl pointer-events-auto"
    >
      <div>
        {/* Header & Close Button */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-[11px] tracking-[0.2em] text-[var(--color-accent)] uppercase">
            {activeNode?.type || 'PROJECT'}
          </span>
          <button
            onClick={() => setActiveNode(null)}
            className="w-8 h-8 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all text-xl"
            title="Close Panel"
          >
            ×
          </button>
        </div>

        {/* Project Title */}
        <h2 className="text-2xl font-medium text-white mb-4 tracking-tight">
          {activeNode?.label}
        </h2>

        <div className="h-[1px] w-full bg-white/10 my-6" />

        {/* Project Description */}
        <p className="text-[14px] text-white/70 leading-relaxed font-normal mb-8">
          {activeNode?.description}
        </p>

        {/* Tech Stack Chips */}
        {activeNode?.tech && activeNode.tech.length > 0 && (
          <div className="mb-8">
            <h3 className="font-mono text-[10px] tracking-[0.15em] text-white/30 uppercase mb-3">
              TECHNOLOGY STACK
            </h3>
            <div className="flex flex-wrap gap-2">
              {activeNode.tech.map((techItem) => (
                <span
                  key={techItem}
                  className="font-mono text-[11px] text-white/70 px-3 py-1 rounded-full border border-white/10 bg-white/5"
                >
                  {techItem}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Project Link */}
      {activeNode?.url && (
        <div className="pt-6 border-t border-white/10">
          <a
            href={activeNode.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full border border-white/20 text-white text-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all bg-white/5 hover:bg-white/10"
          >
            <span>View Project Repository</span>
            <span>→</span>
          </a>
        </div>
      )}
    </div>
  )
}
