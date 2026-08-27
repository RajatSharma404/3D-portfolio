'use client'

import { useState, useEffect } from 'react'
import { soundManager } from '@/lib/sound'

export default function SoundToggle() {
  const [muted, setMuted] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMuted(soundManager.getIsMuted())
    setMounted(true)
  }, [])

  const handleToggle = () => {
    const isNowMuted = soundManager.toggleMute()
    setMuted(isNowMuted)
    if (!isNowMuted) {
      soundManager.playTourBeacon(0)
    }
  }

  if (!mounted) return null

  return (
    <button
      onClick={handleToggle}
      onMouseEnter={() => soundManager.playHover(0.5)}
      aria-label={muted ? 'Unmute sci-fi spatial audio effects' : 'Mute sci-fi spatial audio effects'}
      className={`fixed top-6 right-6 z-50 pointer-events-auto flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-xs font-mono transition-all duration-300 backdrop-blur-xl shadow-lg cursor-pointer ${
        muted
          ? 'bg-white/5 border-white/15 text-white/50 hover:text-white hover:bg-white/10'
          : 'bg-[#080d19]/90 border-cyan-400/60 text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:border-cyan-300'
      }`}
    >
      <span className="text-sm">{muted ? '🔇' : '🔊'}</span>
      <span className="hidden sm:inline font-bold tracking-wider uppercase text-[10px]">
        {muted ? 'Spatial Muted' : 'Spatial Audio'}
      </span>
      {!muted && (
        <span className="flex items-end gap-1 h-3.5 px-1 py-0.5 rounded bg-cyan-950/60 border border-cyan-400/30">
          <span className="w-0.5 rounded-full bg-cyan-400 animate-[pulse_0.6s_ease-in-out_infinite] h-2.5" />
          <span className="w-0.5 rounded-full bg-cyan-400 animate-[pulse_0.9s_ease-in-out_infinite] h-3.5" />
          <span className="w-0.5 rounded-full bg-cyan-400 animate-[pulse_0.45s_ease-in-out_infinite] h-1.5" />
          <span className="w-0.5 rounded-full bg-cyan-400 animate-[pulse_0.75s_ease-in-out_infinite] h-3" />
        </span>
      )}
    </button>
  )
}
