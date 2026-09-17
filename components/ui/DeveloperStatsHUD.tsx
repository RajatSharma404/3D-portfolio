'use client'

import React, { useState, useEffect } from 'react'
import { soundManager } from '@/lib/sound'

const METRICS_TICKER = [
  { label: 'DSA Problems Solved', value: '400+ Solved', sub: 'C++ · Trees · DP · Graphs', icon: '🧩' },
  { label: 'Role & Venture', value: 'Co-Founder @ Pradite™', sub: 'Privacy-First AI Tools', icon: '💼' },
  { label: 'AI OCR Accuracy', value: '99.2% Precision', sub: 'Gemini 2.0 Flash Pipeline', icon: '🤖' },
  { label: 'Chess Engine Core', value: 'Depth 24 WASM', sub: 'Stockfish 17 Parallel Workers', icon: '♟️' },
  { label: 'WebGL Graphics Target', value: '60 FPS Target', sub: 'Three.js Procedural Meshes', icon: '🪐' }
]

interface DeveloperStatsHUDProps {
  onOpenBio?: () => void
  onOpenResume?: () => void
}

export default function DeveloperStatsHUD({ onOpenBio, onOpenResume }: DeveloperStatsHUDProps) {
  const [metricIndex, setMetricIndex] = useState(0)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [utcTime, setUtcTime] = useState('')

  // Rotate telemetry metrics every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setMetricIndex((prev) => (prev + 1) % METRICS_TICKER.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  // Live UTC Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setUtcTime(now.toUTCString().slice(17, 25) + ' UTC')
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Listen for Escape key to close telemetry modal
  useEffect(() => {
    if (!isOpenModal) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        soundManager.playClick()
        setIsOpenModal(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpenModal])

  const current = METRICS_TICKER[metricIndex]

  return (
    <>
      {/* Floating Bottom-Left Telemetry Ticker */}
      <div className="absolute bottom-4 sm:bottom-6 left-6 z-40 select-none pointer-events-auto hidden lg:block">
        <button
          onClick={() => {
            soundManager.playClick()
            setIsOpenModal(true)
          }}
          onMouseEnter={() => soundManager.playHover()}
          aria-label="Open full developer telemetry stats"
          className="group flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-[#080d19]/85 hover:bg-[#0c162d] border border-cyan-500/30 hover:border-cyan-400/80 backdrop-blur-xl transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.6)] cursor-pointer text-left"
        >
          <div className="w-8 h-8 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-sm shadow-inner group-hover:scale-110 transition-transform">
            {current.icon}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 font-mono text-[9px] text-cyan-400 font-bold uppercase tracking-wider">
              <span>{current.label}</span>
              <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-white tracking-wide">{current.value}</span>
              <span className="text-[10px] font-mono text-white/40">{current.sub}</span>
            </div>
          </div>

          <div className="pl-2 border-l border-white/10 flex flex-col text-right">
            <span className="font-mono text-[9px] text-white/40 font-semibold">{utcTime}</span>
            <span className="font-mono text-[9px] text-cyan-300 group-hover:translate-x-0.5 transition-transform font-bold">
              Telemetry ↗
            </span>
          </div>
        </button>
      </div>

      {/* Expanded Telemetry Matrix Modal */}
      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md select-none pointer-events-auto">
          <div
            className="absolute inset-0 z-0"
            onClick={() => {
              soundManager.playClick()
              setIsOpenModal(false)
            }}
          />
          <div className="relative z-10 w-full max-w-2xl bg-[#080d19]/95 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl text-white space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
                <span className="font-mono text-xs font-bold text-cyan-300 uppercase tracking-widest">
                  ENGINEERING TELEMETRY & SYSTEM METRICS
                </span>
              </div>
              <button
                onClick={() => setIsOpenModal(false)}
                aria-label="Close telemetry modal"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {METRICS_TICKER.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3.5 hover:border-cyan-400/50 transition-colors"
                >
                  <span className="text-2xl p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/20">{m.icon}</span>
                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase block">{m.label}</span>
                    <span className="text-base font-extrabold text-cyan-300 block">{m.value}</span>
                    <span className="text-[11px] font-mono text-white/70">{m.sub}</span>
                  </div>
                </div>
              ))}

              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 flex items-start gap-3.5">
                <span className="text-2xl p-2 rounded-xl bg-cyan-900/40 border border-cyan-400/30">🌐</span>
                <div>
                  <span className="text-[10px] font-mono text-cyan-300 uppercase block">Orbital Sync</span>
                  <span className="text-base font-extrabold text-white block">Real-time {utcTime}</span>
                  <span className="text-[11px] font-mono text-white/70">6 Geo Continents Tracked</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex gap-2">
                {onOpenBio && (
                  <button
                    onClick={() => {
                      setIsOpenModal(false)
                      onOpenBio()
                    }}
                    aria-label="View developer bio"
                    className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono font-bold cursor-pointer"
                  >
                    View Bio →
                  </button>
                )}
                {onOpenResume && (
                  <button
                    onClick={() => {
                      setIsOpenModal(false)
                      onOpenResume()
                    }}
                    aria-label="View developer resume"
                    className="px-3.5 py-1.5 rounded-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/40 text-purple-300 text-xs font-mono font-bold cursor-pointer"
                  >
                    Resume PDF →
                  </button>
                )}
              </div>

              <button
                onClick={() => setIsOpenModal(false)}
                aria-label="Close telemetry matrix modal"
                className="px-5 py-2 rounded-full bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-colors cursor-pointer"
              >
                Close Telemetry
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
