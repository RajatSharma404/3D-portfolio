'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { NODES } from '@/lib/nodes'
import { useSceneStore } from '@/components/providers/SceneStateProvider'
import { soundManager } from '@/lib/sound'
import {
  CITY_TIMEZONE_MAP,
  getCityLocalTime,
  getCityDaylightStatus
} from '@/lib/planetary'

const STEP_DURATION_MS = 5500 // 5.5 seconds per node tour stop

export default function TourControls() {
  const isTourActive = useSceneStore((state) => state.isTourActive)
  const setIsTourActive = useSceneStore((state) => state.setIsTourActive)
  const tourIndex = useSceneStore((state) => state.tourIndex)
  const setTourIndex = useSceneStore((state) => state.setTourIndex)
  const isTourPaused = useSceneStore((state) => state.isTourPaused)
  const setIsTourPaused = useSceneStore((state) => state.setIsTourPaused)
  const setActiveNode = useSceneStore((state) => state.setActiveNode)

  const [progress, setProgress] = useState(0)
  const startTimeRef = useRef<number>(Date.now())
  const elapsedBeforePauseRef = useRef<number>(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const currentNode = NODES[tourIndex] || NODES[0]
  const accentColor = currentNode.accentColor || '#38bdf8'

  const handleNext = useCallback(() => {
    soundManager.playWarp()
    setTimeout(() => soundManager.playTourBeacon(0.2), 350)
    const nextIdx = (tourIndex + 1) % NODES.length
    setTourIndex(nextIdx)
    setActiveNode(NODES[nextIdx])
    setProgress(0)
    startTimeRef.current = Date.now()
    elapsedBeforePauseRef.current = 0
  }, [tourIndex, setTourIndex, setActiveNode])

  const handlePrev = useCallback(() => {
    soundManager.playClick()
    setTimeout(() => soundManager.playTourBeacon(-0.2), 350)
    const prevIdx = (tourIndex - 1 + NODES.length) % NODES.length
    setTourIndex(prevIdx)
    setActiveNode(NODES[prevIdx])
    setProgress(0)
    startTimeRef.current = Date.now()
    elapsedBeforePauseRef.current = 0
  }, [tourIndex, setTourIndex, setActiveNode])

  const handleExit = useCallback(() => {
    soundManager.playClick()
    setIsTourActive(false)
    setIsTourPaused(false)
    setProgress(0)
    elapsedBeforePauseRef.current = 0
  }, [setIsTourActive, setIsTourPaused])

  const handleTogglePause = useCallback(() => {
    soundManager.playClick()
    if (!isTourPaused) {
      // Pausing
      elapsedBeforePauseRef.current += Date.now() - startTimeRef.current
      setIsTourPaused(true)
    } else {
      // Resuming
      startTimeRef.current = Date.now()
      setIsTourPaused(false)
    }
  }, [isTourPaused, setIsTourPaused])

  // Timer loop for auto progression
  useEffect(() => {
    if (!isTourActive || isTourPaused) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    startTimeRef.current = Date.now()

    timerRef.current = setInterval(() => {
      const currentElapsed = elapsedBeforePauseRef.current + (Date.now() - startTimeRef.current)
      const currentProgress = Math.min(100, (currentElapsed / STEP_DURATION_MS) * 100)
      setProgress(currentProgress)

      if (currentElapsed >= STEP_DURATION_MS) {
        handleNext()
      }
    }, 50)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isTourActive, isTourPaused, tourIndex, handleNext])

  // Keyboard navigation shortcuts when tour is active
  useEffect(() => {
    if (!isTourActive) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleExit()
      } else if (e.key === ' ' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault()
        handleTogglePause()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isTourActive, handleExit, handleTogglePause, handleNext, handlePrev])

  if (!isTourActive) return null

  return (
    <div className="fixed inset-0 z-50 pointer-events-none select-none flex flex-col justify-between p-4 sm:p-6">
      {/* Top Floating Tour Header Bar */}
      <div className="w-full flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#080d19]/90 border border-cyan-500/40 backdrop-blur-xl shadow-[0_0_25px_rgba(56,189,248,0.3)]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-xs font-bold text-cyan-300 tracking-wider uppercase">
              CINEMATIC EARTH TOUR
            </span>
          </div>
          <span className="text-white/30">•</span>
          <span className="font-mono text-xs text-white/80 font-bold">
            Project {tourIndex + 1} of {NODES.length}
          </span>
        </div>

        <button
          onClick={handleExit}
          aria-label="Exit Guided Earth Tour"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#080d19]/90 border border-white/20 text-white/80 hover:text-white hover:border-red-400/60 hover:bg-red-950/40 backdrop-blur-xl transition-all text-xs font-mono font-semibold cursor-pointer shadow-lg"
        >
          <span>✕</span>
          <span>Exit Tour</span>
          <kbd className="hidden sm:inline-block text-[9px] px-1 py-0.5 rounded bg-white/10 text-white/50">ESC</kbd>
        </button>
      </div>

      {/* Bottom Floating Tour Feature Card & Player Controls */}
      <div className="w-full max-w-xl mx-auto pointer-events-auto flex flex-col gap-3">
        {/* Project Tour Card */}
        <div className="relative overflow-hidden rounded-3xl bg-[#080d19]/92 border border-cyan-500/40 p-5 sm:p-6 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.85)] flex flex-col gap-3.5 transition-all">
          
          {/* Top Progress Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
            <div
              className="h-full transition-all duration-75"
              style={{
                width: `${progress}%`,
                backgroundColor: accentColor,
                boxShadow: `0 0 10px ${accentColor}`
              }}
            />
          </div>

          {/* Node Meta & Continent Header */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <span
                className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase border"
                style={{
                  color: accentColor,
                  borderColor: `${accentColor}50`,
                  backgroundColor: `${accentColor}15`
                }}
              >
                {currentNode.continent}
              </span>
              <span className="text-white/40 text-xs">•</span>
              <span className="text-xs font-mono text-white/80 font-bold">
                {currentNode.city}, {currentNode.country}
              </span>
              {(() => {
                const info = CITY_TIMEZONE_MAP[currentNode.city] || { timezone: 'UTC', tzCode: 'UTC' }
                const time = getCityLocalTime(info.timezone)
                const daylight = getCityDaylightStatus(info.timezone)
                return (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded-full border border-cyan-500/20">
                    <span>{daylight.icon}</span>
                    <span>{time.slice(0, 5)} {time.slice(-2)} {info.tzCode}</span>
                  </span>
                )
              })()}
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[10px] text-white/40">
              <span>{Math.ceil((STEP_DURATION_MS - (progress / 100) * STEP_DURATION_MS) / 1000)}s</span>
              <span>remaining</span>
            </div>
          </div>

          {/* Title & Short Description */}
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <span>{currentNode.label}</span>
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
              />
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed mt-1 font-normal line-clamp-2">
              {currentNode.description}
            </p>
          </div>

          {/* Key Metric Spotlight & Tech Stack */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
            <div className="flex flex-wrap gap-1.5">
              {currentNode.tech.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-white/70"
                >
                  {tech}
                </span>
              ))}
            </div>

            {currentNode.metrics && currentNode.metrics.length > 0 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-[11px] font-bold">
                <span className="text-white/40 text-[9px] uppercase font-normal">
                  {currentNode.metrics[0].label}:
                </span>
                <span>{currentNode.metrics[0].value}</span>
              </div>
            )}
          </div>

          {/* Controls Bar & Deep Dive CTA */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
            {/* Player controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                aria-label="Previous project in tour"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer text-xs"
                title="Previous Project (Left Arrow)"
              >
                ◀
              </button>

              <button
                onClick={handleTogglePause}
                aria-label={isTourPaused ? 'Resume tour playback' : 'Pause tour playback'}
                className="px-3 py-1.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 flex items-center gap-1.5 text-cyan-300 hover:text-white transition-all cursor-pointer text-xs font-mono font-bold"
                title="Pause / Resume (Spacebar)"
              >
                <span>{isTourPaused ? '▶' : '⏸'}</span>
                <span className="hidden sm:inline">{isTourPaused ? 'Resume' : 'Pause'}</span>
              </button>

              <button
                onClick={handleNext}
                aria-label="Next project in tour"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer text-xs"
                title="Next Project (Right Arrow)"
              >
                ▶
              </button>
            </div>

            {/* Case study direct button */}
            <Link
              href={`/projects/${currentNode.id}`}
              onClick={() => {
                soundManager.playWarp()
                setIsTourActive(false)
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(56,189,248,0.4)] hover:scale-105"
            >
              <span>Explore Case Study</span>
              <span>→</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
