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
      soundManager.playClick()
    }
  }

  if (!mounted) return null

  return (
    <button
      onClick={handleToggle}
      onMouseEnter={() => soundManager.playHover()}
      aria-label={muted ? 'Unmute sci-fi audio effects' : 'Mute sci-fi audio effects'}
      className={`fixed top-6 right-6 z-50 pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all duration-300 backdrop-blur-xl shadow-lg cursor-pointer ${
        muted
          ? 'bg-white/5 border-white/15 text-white/50 hover:text-white hover:bg-white/10'
          : 'bg-cyan-950/80 border-cyan-400/50 text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
      }`}
    >
      <span className="text-sm">{muted ? '🔇' : '🔊'}</span>
      <span className="hidden sm:inline font-bold tracking-wider uppercase text-[10px]">
        {muted ? 'Audio Muted' : 'Audio FX On'}
      </span>
      {!muted && (
        <span className="flex items-center gap-0.5 ml-0.5">
          <span className="w-0.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="w-0.5 h-3 rounded-full bg-cyan-400 animate-pulse delay-75" />
          <span className="w-0.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-150" />
        </span>
      )}
    </button>
  )
}
