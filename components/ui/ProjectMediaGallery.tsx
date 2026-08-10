'use client'

import { useState } from 'react'
import { OrbitalNode } from '@/lib/nodes'
import { soundManager } from '@/lib/sound'

interface ProjectMediaGalleryProps {
  node: OrbitalNode
}

export default function ProjectMediaGallery({ node }: ProjectMediaGalleryProps) {
  const [activeMedia, setActiveMedia] = useState<{ title: string; category: string; description: string } | null>(null)

  const accentColor = node.accentColor || '#38bdf8'

  // Dynamic visual gallery items based on project node architecture & features
  const galleryItems = [
    {
      title: 'System Architecture Blueprint',
      category: 'Architecture',
      description: node.architecture || 'High-performance microservices and cloud infrastructure breakdown.'
    },
    {
      title: 'Core Engine Performance Metrics',
      category: 'Analytics',
      description: `Live runtime benchmarking across ${node.metrics?.[0]?.label || 'key systems'} and high-concurrency requests.`
    },
    {
      title: 'Multimodal AI & Data Pipeline',
      category: 'AI Pipeline',
      description: `Real-time feature processing powered by ${node.tech[1] || 'Gemini API'} with zero-latency optimistic UI state.`
    }
  ]

  return (
    <div className="my-10 pt-8 border-t border-white/10 select-none">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-mono text-sm tracking-widest uppercase font-bold flex items-center gap-2" style={{ color: accentColor }}>
          <span>📸</span> VISUAL ARCHITECTURE & SCREENSHOTS
        </h2>
        <span className="text-xs font-mono text-white/50">Click card for preview</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {galleryItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => {
              soundManager.playClick()
              setActiveMedia(item)
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="group relative p-5 rounded-2xl bg-[#080d19]/80 border border-white/10 hover:border-cyan-400/60 backdrop-blur-xl transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase border"
                  style={{ color: accentColor, borderColor: `${accentColor}40`, backgroundColor: `${accentColor}15` }}
                >
                  {item.category}
                </span>
                <span className="text-xs text-white/40 group-hover:text-cyan-300 transition-colors">🔍 Preview</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-white/70 leading-relaxed line-clamp-2">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40">
              <span>{node.label} v1.0</span>
              <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">Inspect →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md select-none pointer-events-auto">
          <div
            className="absolute inset-0 z-0"
            onClick={() => {
              soundManager.playClick()
              setActiveMedia(null)
            }}
          />
          <div className="relative z-10 w-full max-w-3xl bg-[#080d19]/95 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl text-white">
            <div className="flex items-center justify-between mb-4">
              <span
                className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border"
                style={{ color: accentColor, borderColor: `${accentColor}50`, backgroundColor: `${accentColor}15` }}
              >
                {activeMedia.category} Preview
              </span>
              <button
                onClick={() => setActiveMedia(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3">{activeMedia.title}</h3>
            <p className="text-sm text-white/80 leading-relaxed mb-6 bg-white/5 p-4 rounded-xl border border-white/10 font-sans">
              {activeMedia.description}
            </p>

            <div className="p-6 rounded-2xl bg-black/50 border border-cyan-500/20 font-mono text-xs text-cyan-300 flex flex-col gap-2">
              <div className="flex items-center justify-between text-white/50 text-[11px] pb-2 border-b border-white/10">
                <span>SYSTEM STATUS LOG</span>
                <span>STATUS: OPERATIONAL</span>
              </div>
              <p>➜ Project Target: {node.label}</p>
              <p>➜ Geographic Node: {node.city}, {node.country} ({node.continent})</p>
              <p>➜ Primary Tech: {node.tech.join(' · ')}</p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveMedia(null)}
                className="px-5 py-2 rounded-full bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-colors cursor-pointer"
              >
                Close Blueprint
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
