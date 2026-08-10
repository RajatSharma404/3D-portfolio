'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import SceneStateProvider from '@/components/providers/SceneStateProvider'
import NameTag from '@/components/ui/NameTag'
import NavDots from '@/components/ui/NavDots'
import ContinentBar from '@/components/ui/ContinentBar'
import LoadingScreen from '@/components/ui/LoadingScreen'
import ContactLink from '@/components/ui/ContactLink'

import { useState, useEffect } from 'react'
import UserProfileModal from '@/components/ui/UserProfileModal'
import SoundToggle from '@/components/ui/SoundToggle'
import CommandPalette from '@/components/ui/CommandPalette'
import ResumeModal from '@/components/ui/ResumeModal'

const InteractiveGlobe = dynamic(
  () => import('@/components/scene/InteractiveGlobe'),
  { ssr: false }
)

export default function AppShell() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  // Listen for Cmd+K / Ctrl+K / '/' global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen((prev) => !prev)
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <Suspense fallback={null}>
      <SceneStateProvider>
        <InteractiveGlobe />
        <NameTag
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />
        <NavDots />
        <ContinentBar />
        <ContactLink />
        <UserProfileModal />
        <SoundToggle />
        <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        <LoadingScreen />
      </SceneStateProvider>
    </Suspense>
  )
}
