'use client'

import { useSceneStore } from '@/components/providers/SceneStateProvider'

export default function ViewToggle() {
  const viewMode = useSceneStore((state) => state.viewMode)
  const setViewMode = useSceneStore((state) => state.setViewMode)

  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-40 flex items-center bg-[#0d1117]/80 backdrop-blur-md border border-cyan-500/30 rounded-full p-1 shadow-lg shadow-cyan-950/40">
      <button
        onClick={() => setViewMode('globe')}
        className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-2 ${
          viewMode === 'globe'
            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
            : 'text-gray-400 hover:text-cyan-200'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        3D Globe (react-globe.gl)
      </button>

      <button
        onClick={() => setViewMode('orbital')}
        className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-2 ${
          viewMode === 'orbital'
            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
            : 'text-gray-400 hover:text-cyan-200'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-purple-400" />
        Orbital System
      </button>
    </div>
  )
}
