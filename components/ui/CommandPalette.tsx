'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { NODES, OrbitalNode } from '@/lib/nodes'
import { soundManager } from '@/lib/sound'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Filter projects by title, description, tech stack, or location
  const filteredNodes = NODES.filter((node) => {
    const q = query.toLowerCase().trim()
    if (!q) return true
    return (
      node.label.toLowerCase().includes(q) ||
      node.description.toLowerCase().includes(q) ||
      node.continent.toLowerCase().includes(q) ||
      node.city.toLowerCase().includes(q) ||
      node.country.toLowerCase().includes(q) ||
      node.tech.some((t) => t.toLowerCase().includes(q))
    )
  })

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      soundManager.playClick()
    } else {
      setQuery('')
    }
  }, [isOpen])

  const handleSelect = useCallback(
    (node: OrbitalNode) => {
      soundManager.playWarp()
      onClose()
      router.push(`/projects/${node.id}`)
    },
    [onClose, router]
  )

  // Keyboard navigation inside palette
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        soundManager.playHover()
        setSelectedIndex((prev) => (filteredNodes.length > 0 ? (prev + 1) % filteredNodes.length : 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        soundManager.playHover()
        setSelectedIndex((prev) => (filteredNodes.length > 0 ? (prev - 1 + filteredNodes.length) % filteredNodes.length : 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredNodes[selectedIndex]) {
          handleSelect(filteredNodes[selectedIndex])
        }
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredNodes, selectedIndex, handleSelect, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-md select-none pointer-events-auto">
      {/* Backdrop Click to Close */}
      <div className="absolute inset-0 z-0" onClick={onClose} />

      {/* Main Command Palette Box */}
      <div className="relative z-10 w-full max-w-2xl bg-[#080d19]/95 border border-cyan-500/30 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden backdrop-blur-2xl flex flex-col">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/5">
          <span className="text-cyan-400 text-lg">🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects by tech (e.g. Gemini, Stockfish, Prisma, Three.js)..."
            className="w-full bg-transparent text-white placeholder-white/40 text-sm sm:text-base focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-white/40 hover:text-white text-xs px-2 py-1 rounded-full bg-white/10"
            >
              Clear
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-1 text-[10px] font-mono text-white/50 bg-white/10 rounded-md border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-cyan-500/20 flex flex-col gap-2">
          {filteredNodes.length === 0 ? (
            <div className="py-12 text-center text-white/50 text-sm font-mono">
              No matching projects found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredNodes.map((node, idx) => {
              const isSelected = idx === selectedIndex
              const accentColor = node.accentColor || '#38bdf8'
              return (
                <div
                  key={node.id}
                  onClick={() => handleSelect(node)}
                  onMouseEnter={() => {
                    soundManager.playHover()
                    setSelectedIndex(idx)
                  }}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl cursor-pointer transition-all duration-200 border ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-400/60 shadow-[0_0_20px_rgba(56,189,248,0.25)] translate-x-1'
                      : 'bg-white/5 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="w-3 h-3 rounded-full mt-1.5 shrink-0 shadow-[0_0_8px_currentColor]"
                      style={{ backgroundColor: accentColor, color: accentColor }}
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-white text-base">{node.label}</span>
                        <span
                          className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase border"
                          style={{ color: accentColor, borderColor: `${accentColor}50`, backgroundColor: `${accentColor}15` }}
                        >
                          {node.continent}
                        </span>
                      </div>
                      <p className="text-xs text-white/70 line-clamp-1">{node.description}</p>
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1 shrink-0 ml-6 sm:ml-0">
                    {node.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-white/10 border border-white/10 text-[10px] font-mono text-white/80"
                      >
                        {t}
                      </span>
                    ))}
                    {node.tech.length > 3 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono text-white/40">
                        +{node.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/10 bg-white/5 text-[11px] font-mono text-white/40">
          <div className="flex items-center gap-4">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-cyan-400 font-bold">Orbital Search Engine</span>
        </div>
      </div>
    </div>
  )
}
