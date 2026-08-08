'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import SceneStateProvider from '@/components/providers/SceneStateProvider'
import NodePanel from '@/components/ui/NodePanel'
import NameTag from '@/components/ui/NameTag'
import NavDots from '@/components/ui/NavDots'
import ContinentBar from '@/components/ui/ContinentBar'
import LoadingScreen from '@/components/ui/LoadingScreen'
import ContactLink from '@/components/ui/ContactLink'

import UserProfileModal from '@/components/ui/UserProfileModal'

const InteractiveGlobe = dynamic(
  () => import('@/components/scene/InteractiveGlobe'),
  { ssr: false }
)

export default function AppShell() {
  return (
    <Suspense fallback={null}>
      <SceneStateProvider>
        <InteractiveGlobe />
        <NameTag />
        <NavDots />
        <ContinentBar />
        <ContactLink />
        <NodePanel />
        <UserProfileModal />
        <LoadingScreen />
      </SceneStateProvider>
    </Suspense>
  )
}
