'use client'

import React, { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const followerRef = useRef<HTMLDivElement>(null)
  const [isPointerDevice, setIsPointerDevice] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const mousePos = useRef({ x: -100, y: -100 })
  const followerPos = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse/trackpad, not touch)
    const mediaQuery = window.matchMedia('(pointer: fine)')
    setIsPointerDevice(mediaQuery.matches)

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPointerDevice(e.matches)
    }
    mediaQuery.addEventListener('change', handleMediaChange)

    return () => mediaQuery.removeEventListener('change', handleMediaChange)
  }, [])

  useEffect(() => {
    if (!isPointerDevice) return

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)

      const target = e.target as HTMLElement | null
      if (target) {
        const isInteractive = Boolean(
          target.closest('button') ||
          target.closest('a') ||
          target.closest('[role="button"]') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('.cursor-pointer') ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'A'
        )
        setIsHovered(isInteractive)
      }
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.body.addEventListener('mouseleave', handleMouseLeave)
    document.body.addEventListener('mouseenter', handleMouseEnter)

    // Smooth spring physics for the subtle trailing aura
    const renderLoop = () => {
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.22
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.22

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`
      }

      rafRef.current = requestAnimationFrame(renderLoop)
    }
    rafRef.current = requestAnimationFrame(renderLoop)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isPointerDevice, isVisible])

  if (!isPointerDevice) return null

  return (
    <div className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Delicate Non-Obtrusive Ambient Follower Halo */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-150 ease-out ${
          isClicked
            ? 'w-5 h-5 bg-cyan-400/30 shadow-[0_0_12px_#38bdf8] scale-75'
            : isHovered
            ? 'w-4 h-4 bg-cyan-400/25 border border-cyan-400/40 shadow-[0_0_10px_rgba(56,189,248,0.3)] opacity-60'
            : 'w-3 h-3 bg-cyan-400/40 shadow-[0_0_8px_#38bdf8] opacity-75'
        }`}
      />
    </div>
  )
}
