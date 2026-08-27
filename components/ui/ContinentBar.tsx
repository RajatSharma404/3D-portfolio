'use client'

import { NODES, OrbitalNode } from '@/lib/nodes'
import { useSceneStore } from '@/components/providers/SceneStateProvider'
import { soundManager } from '@/lib/sound'

const CONTINENT_OPTIONS = [
  { label: 'All Earth', id: 'all', color: 'bg-cyan-400' },
  { label: 'North America', continent: 'North America', color: 'bg-[#38bdf8]' },
  { label: 'Europe', continent: 'Europe', color: 'bg-[#c084fc]' },
  { label: 'Africa', continent: 'Africa', color: 'bg-[#fbbf24]' },
  { label: 'Asia', continent: 'Asia', color: 'bg-[#34d399]' },
  { label: 'Australia', continent: 'Australia & Oceania', color: 'bg-[#60a5fa]' },
  { label: 'South America', continent: 'South America', color: 'bg-[#a78bfa]' }
]

export default function ContinentBar() {
  const activeNode = useSceneStore((state) => state.activeNode)
  const setActiveNode = useSceneStore((state) => state.setActiveNode)
  const isTourActive = useSceneStore((state) => state.isTourActive)
  const setIsTourActive = useSceneStore((state) => state.setIsTourActive)
  const setTourIndex = useSceneStore((state) => state.setTourIndex)
  const setIsTourPaused = useSceneStore((state) => state.setIsTourPaused)

  const handleSelect = (item: (typeof CONTINENT_OPTIONS)[number]) => {
    soundManager.playClick()
    if (isTourActive) {
      setIsTourActive(false)
    }

    if (item.id === 'all') {
      setActiveNode(null)
      return
    }

    const matchedNode = NODES.find(
      (n) => n.continent.toLowerCase() === item.continent?.toLowerCase()
    )
    if (matchedNode) {
      setActiveNode(matchedNode as OrbitalNode)
    }
  }

  const handleStartTour = () => {
    soundManager.playWarp()
    setTourIndex(0)
    setIsTourPaused(false)
    setIsTourActive(true)
    setActiveNode(null)
  }

  return (
    <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 p-1.5 max-w-[92vw] overflow-x-auto rounded-full bg-[#080d19]/85 backdrop-blur-xl border border-white/10 shadow-[0_0_25px_rgba(0,0,0,0.6)] pointer-events-auto scrollbar-none">
      <button
        onClick={handleStartTour}
        onMouseEnter={() => soundManager.playHover()}
        aria-label="Start Guided 3D Earth Tour"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all duration-300 ${
          isTourActive
            ? 'bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(56,189,248,0.5)] scale-105 font-bold'
            : 'bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-400 hover:text-slate-950'
        }`}
      >
        <span>🚀</span>
        <span>Auto Tour</span>
      </button>

      <div className="w-[1px] h-4 bg-white/20 mx-0.5 shrink-0" />

      {CONTINENT_OPTIONS.map((item) => {
        const isAll = item.id === 'all' && !activeNode && !isTourActive
        const isActiveNodeContinent =
          !isTourActive &&
          activeNode &&
          item.continent &&
          activeNode.continent.toLowerCase() === item.continent.toLowerCase()
        const isActive = isAll || isActiveNodeContinent

        return (
          <button
            key={item.label}
            onClick={() => handleSelect(item)}
            onMouseEnter={() => soundManager.playHover()}
            aria-label={`Filter by ${item.label}`}
            aria-pressed={Boolean(isActive)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all duration-300 ${
              isActive
                ? 'bg-white/15 text-white shadow-[0_0_12px_rgba(255,255,255,0.2)] border border-white/20 scale-105'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${item.color} ${
                isActive ? 'shadow-[0_0_8px_currentColor]' : 'opacity-70'
              }`}
            />
            <span>{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
