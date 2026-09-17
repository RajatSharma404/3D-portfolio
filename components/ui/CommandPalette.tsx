'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { NODES, OrbitalNode } from '@/lib/nodes'
import { useSceneStore } from '@/components/providers/SceneStateProvider'
import { soundManager } from '@/lib/sound'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onOpenResume?: () => void
  onOpenBio?: () => void
  onStartTour?: () => void
  onOpenStats?: () => void
}

interface CLICommand {
  id: string
  cmd: string
  label: string
  sublabel: string
  icon: string
  category: string
  action: () => void
}

export default function CommandPalette({
  isOpen,
  onClose,
  onOpenResume,
  onOpenBio,
  onStartTour,
  onOpenStats
}: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const setIsZoomedOut = useSceneStore((state) => state.setIsZoomedOut)
  const setIsTourActive = useSceneStore((state) => state.setIsTourActive)
  const setTourIndex = useSceneStore((state) => state.setTourIndex)
  const setIsTourPaused = useSceneStore((state) => state.setIsTourPaused)
  const setActiveNode = useSceneStore((state) => state.setActiveNode)

  // System CLI Commands Registry
  const SYSTEM_COMMANDS: CLICommand[] = useMemo(
    () => [
      {
        id: 'cmd-tour',
        cmd: '> tour',
        label: 'Launch Guided Cinematic 3D Earth Tour',
        sublabel: 'Automated great-circle camera flight across continents',
        icon: '🚀',
        category: 'System Navigation',
        action: () => {
          soundManager.playWarp()
          onClose()
          setTourIndex(0)
          setIsTourPaused(false)
          setIsTourActive(true)
          setActiveNode(null)
          if (onStartTour) onStartTour()
        }
      },
      {
        id: 'cmd-bio',
        cmd: '> bio',
        label: 'Open Developer Profile & Mission HUD',
        sublabel: 'View founder bio, education, and credentials',
        icon: '👤',
        category: 'Profile & Bio',
        action: () => {
          soundManager.playClick()
          onClose()
          setIsZoomedOut(true)
          if (onOpenBio) onOpenBio()
        }
      },
      {
        id: 'cmd-resume',
        cmd: '> resume',
        label: 'View Developer Resume & Download PDF',
        sublabel: 'Official full-stack & AI software engineer CV',
        icon: '📄',
        category: 'Documents',
        action: () => {
          soundManager.playClick()
          onClose()
          if (onOpenResume) onOpenResume()
        }
      },
      {
        id: 'cmd-stats',
        cmd: '> stats',
        label: 'Inspect Engineering Telemetry & Metrics Matrix',
        sublabel: 'Live solved DSA problems, AI accuracy, and WASM depth',
        icon: '📊',
        category: 'Analytics',
        action: () => {
          soundManager.playClick()
          onClose()
          if (onOpenStats) onOpenStats()
        }
      },
      {
        id: 'cmd-pradite',
        cmd: '> pradite',
        label: 'Open Pradite™ Co-Founder Portal',
        sublabel: 'Navigate to official pradite.com website',
        icon: '🌐',
        category: 'External Link',
        action: () => {
          soundManager.playClick()
          onClose()
          window.open('https://pradite.com', '_blank')
        }
      },
      {
        id: 'cmd-github',
        cmd: '> github',
        label: 'Open GitHub Profile & Repositories',
        sublabel: 'github.com/RajatSharma404',
        icon: '🐙',
        category: 'External Link',
        action: () => {
          soundManager.playClick()
          onClose()
          window.open('https://github.com/RajatSharma404', '_blank')
        }
      },
      {
        id: 'cmd-leetcode',
        cmd: '> leetcode',
        label: 'Open LeetCode 400+ Problem Profile',
        sublabel: 'leetcode.com/u/RajatSharma404/',
        icon: '🧩',
        category: 'External Link',
        action: () => {
          soundManager.playClick()
          onClose()
          window.open('https://leetcode.com/u/RajatSharma404/', '_blank')
        }
      },
      {
        id: 'cmd-sound',
        cmd: '> sound',
        label: 'Toggle Sci-Fi Web Audio FX',
        sublabel: 'Mute or unmute synthesized sound effects',
        icon: '🔊',
        category: 'Preferences',
        action: () => {
          soundManager.toggleMute()
          soundManager.playClick()
          onClose()
        }
      }
    ],
    [
      onClose,
      setIsTourActive,
      setTourIndex,
      setIsTourPaused,
      setActiveNode,
      onStartTour,
      setIsZoomedOut,
      onOpenBio,
      onOpenResume,
      onOpenStats
    ]
  )

  // Filter commands matching search query
  const filteredCommands = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return SYSTEM_COMMANDS
    const cleanQ = q.startsWith('>') ? q.slice(1).trim() : q
    return SYSTEM_COMMANDS.filter(
      (c) =>
        c.cmd.toLowerCase().includes(cleanQ) ||
        c.label.toLowerCase().includes(cleanQ) ||
        c.sublabel.toLowerCase().includes(cleanQ) ||
        c.category.toLowerCase().includes(cleanQ)
    )
  }, [query, SYSTEM_COMMANDS])

  // Filter projects by title, description, tech stack, or location
  const filteredNodes = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return NODES
    if (q.startsWith('>')) return [] // In explicit CLI mode, only show commands
    return NODES.filter(
      (node) =>
        node.label.toLowerCase().includes(q) ||
        node.description.toLowerCase().includes(q) ||
        node.continent.toLowerCase().includes(q) ||
        node.city.toLowerCase().includes(q) ||
        node.country.toLowerCase().includes(q) ||
        node.tech.some((t) => t.toLowerCase().includes(q))
    )
  }, [query])

  // Flat list of all selectable items (commands first, then projects)
  const combinedItems = useMemo(
    () => [
      ...filteredCommands.map((c) => ({ type: 'command' as const, item: c })),
      ...filteredNodes.map((n) => ({ type: 'node' as const, item: n }))
    ],
    [filteredCommands, filteredNodes]
  )

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

  const handleSelectNode = useCallback(
    (node: OrbitalNode) => {
      soundManager.playWarp()
      onClose()
      router.push(`/projects/${node.id}`)
    },
    [onClose, router]
  )

  const handleSelectCommand = useCallback((cmd: CLICommand) => {
    cmd.action()
  }, [])

  const selectedIndexRef = useRef(selectedIndex)
  selectedIndexRef.current = selectedIndex

  // Keyboard navigation inside palette
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        soundManager.playHover()
        setSelectedIndex((prev) => (combinedItems.length > 0 ? (prev + 1) % combinedItems.length : 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        soundManager.playHover()
        setSelectedIndex((prev) => (combinedItems.length > 0 ? (prev - 1 + combinedItems.length) % combinedItems.length : 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const currentIdx = selectedIndexRef.current
        const selected = combinedItems[currentIdx]
        if (selected) {
          if (selected.type === 'command') {
            handleSelectCommand(selected.item)
          } else {
            handleSelectNode(selected.item)
          }
        }
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, combinedItems, handleSelectCommand, handleSelectNode, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-4 bg-black/75 backdrop-blur-md select-none pointer-events-auto">
      {/* Backdrop Click to Close */}
      <div className="absolute inset-0 z-0" onClick={onClose} />

      {/* Main Command Palette Box */}
      <div className="relative z-10 w-full max-w-2xl bg-[#080d19]/95 border border-cyan-500/30 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.95)] overflow-hidden backdrop-blur-2xl flex flex-col">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/5">
          <span className="text-cyan-400 font-mono text-base font-bold">➜</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              soundManager.playKeypress()
              setQuery(e.target.value)
            }}
            placeholder="Type a command (e.g. > tour, > bio, > resume) or search projects..."
            className="w-full bg-transparent text-white placeholder-white/40 text-sm sm:text-base focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear search query"
              className="text-white/40 hover:text-white text-xs px-2 py-1 rounded-full bg-white/10"
            >
              Clear
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-1 text-[10px] font-mono text-white/50 bg-white/10 rounded-md border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Quick Action Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-black/40 border-b border-white/5 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-mono text-white/40 uppercase shrink-0 mr-1">CLI Quick:</span>
          {[
            { label: '🚀 > tour', cmd: '> tour' },
            { label: '👤 > bio', cmd: '> bio' },
            { label: '📄 > resume', cmd: '> resume' },
            { label: '📊 > stats', cmd: '> stats' },
            { label: '🌐 > pradite', cmd: '> pradite' }
          ].map((pill) => (
            <button
              key={pill.cmd}
              onClick={() => {
                soundManager.playClick()
                setQuery(pill.cmd)
                const matched = SYSTEM_COMMANDS.find((c) => c.cmd === pill.cmd)
                if (matched) matched.action()
              }}
              aria-label={`Run command ${pill.cmd}`}
              className="px-2.5 py-0.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-400 hover:text-slate-950 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-400/30 transition-all shrink-0 cursor-pointer"
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[55vh] overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-cyan-500/20 flex flex-col gap-3">
          {combinedItems.length === 0 ? (
            <div className="py-12 text-center text-white/50 text-sm font-mono">
              No matching commands or projects found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            <>
              {/* 1. System Commands Section */}
              {filteredCommands.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-widest px-2 block">
                    ⚡ Terminal & System Commands ({filteredCommands.length})
                  </span>
                  {filteredCommands.map((cmd) => {
                    const itemIndex = combinedItems.findIndex(
                      (ci) => ci.type === 'command' && ci.item.id === cmd.id
                    )
                    const isSelected = itemIndex === selectedIndex

                    return (
                      <div
                        key={cmd.id}
                        onClick={() => handleSelectCommand(cmd)}
                        onMouseEnter={() => {
                          soundManager.playHover()
                          setSelectedIndex(itemIndex)
                        }}
                        className={`flex items-center justify-between gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-150 border ${
                          isSelected
                            ? 'bg-cyan-500/15 border-cyan-400/60 shadow-[0_0_20px_rgba(56,189,248,0.25)] translate-x-1'
                            : 'bg-white/5 border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-sm shrink-0">
                            {cmd.icon}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-cyan-300 bg-cyan-400/10 px-1.5 py-0.5 rounded">
                                {cmd.cmd}
                              </span>
                              <span className="font-bold text-white text-xs sm:text-sm">{cmd.label}</span>
                            </div>
                            <p className="text-[11px] text-white/60 line-clamp-1">{cmd.sublabel}</p>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono text-white/40 px-2 py-0.5 rounded bg-white/5 shrink-0 hidden sm:inline">
                          {cmd.category}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* 2. Project Nodes Section */}
              {filteredNodes.length > 0 && (
                <div className="space-y-1 pt-2 border-t border-white/5">
                  <span className="text-[9px] font-mono text-white/40 font-bold uppercase tracking-widest px-2 block">
                    🪐 Case Studies & Projects ({filteredNodes.length})
                  </span>
                  {filteredNodes.map((node) => {
                    const itemIndex = combinedItems.findIndex(
                      (ci) => ci.type === 'node' && ci.item.id === node.id
                    )
                    const isSelected = itemIndex === selectedIndex
                    const accentColor = node.accentColor || '#38bdf8'

                    return (
                      <div
                        key={node.id}
                        onClick={() => handleSelectNode(node)}
                        onMouseEnter={() => {
                          soundManager.playHover()
                          setSelectedIndex(itemIndex)
                        }}
                        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl cursor-pointer transition-all duration-150 border ${
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
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="font-bold text-white text-sm">{node.label}</span>
                              <span
                                className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase border"
                                style={{
                                  color: accentColor,
                                  borderColor: `${accentColor}50`,
                                  backgroundColor: `${accentColor}15`
                                }}
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
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/10 bg-white/5 text-[11px] font-mono text-white/40">
          <div className="flex items-center gap-4">
            <span>↑↓ Navigate</span>
            <span>↵ Execute</span>
            <span>ESC Close</span>
          </div>
          <span className="text-cyan-400 font-bold">Orbital CLI Terminal v2.0</span>
        </div>
      </div>
    </div>
  )
}

