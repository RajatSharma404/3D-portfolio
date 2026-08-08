'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useSceneStore } from '@/components/providers/SceneStateProvider'

export default function NodePanel() {
  const panelRef = useRef<HTMLDivElement>(null)
  const activeNode = useSceneStore((state) => state.activeNode)
  const setActiveNode = useSceneStore((state) => state.setActiveNode)

  // Listen for Escape key to close panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeNode) {
        setActiveNode(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeNode, setActiveNode])

  useEffect(() => {
    if (!panelRef.current) return
    const isMobile = window.innerWidth < 640
    if (isMobile) {
      gsap.set(panelRef.current, { y: '100%', x: '0%' })
    } else {
      gsap.set(panelRef.current, { x: '100%', y: '0%' })
    }
  }, [])

  useEffect(() => {
    if (!panelRef.current) return
    const isMobile = window.innerWidth < 640

    if (activeNode) {
      gsap.to(panelRef.current, {
        x: '0%',
        y: '0%',
        duration: 0.55,
        ease: 'power3.out'
      })
    } else {
      gsap.to(panelRef.current, {
        x: isMobile ? '0%' : '100%',
        y: isMobile ? '100%' : '0%',
        duration: 0.45,
        ease: 'power3.in'
      })
    }
  }, [activeNode])

  return (
    <div
      ref={panelRef}
      className="fixed bottom-0 right-0 sm:top-0 h-auto max-h-[85vh] sm:h-full w-full sm:w-[420px] sm:max-w-[90vw] z-50 panel-blur bg-[var(--color-panel-bg)] border-t sm:border-t-0 sm:border-l border-[var(--color-panel-border)] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl pointer-events-auto rounded-t-3xl sm:rounded-none"
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
            aria-label="Close project panel"
          >
            ×
          </button>
        </div>

        {/* Project Title & Continent */}
        <h2 className="text-2xl font-medium text-white mb-2 tracking-tight">
          {activeNode?.label}
        </h2>
        {activeNode?.continent && (
          <div className="flex items-center gap-2 mb-4 font-mono text-xs text-cyan-400">
            <span>🌐 {activeNode.continent}</span>
            <span>•</span>
            <span>{activeNode.city}, {activeNode.country}</span>
          </div>
        )}

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

      {/* Footer Project Links */}
      {activeNode && (
        <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
          <Link
            href={`/projects/${activeNode.id}`}
            className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm transition-all shadow-[0_0_20px_rgba(56,189,248,0.4)]"
          >
            <span>🚀 Explore Dedicated Project Page</span>
            <span>→</span>
          </Link>

          {activeNode.url && (
            <a
              href={activeNode.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-full border border-white/20 text-white/80 text-xs hover:border-cyan-400 hover:text-cyan-300 transition-all bg-white/5 hover:bg-white/10"
            >
              <span>View GitHub Repository</span>
              <span>↗</span>
            </a>
          )}
        </div>
      )}
    </div>
  )
}
