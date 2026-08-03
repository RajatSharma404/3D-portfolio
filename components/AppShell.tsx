'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const SceneStateProvider = dynamic(
  () => import('@/components/providers/SceneStateProvider'),
  { ssr: false }
)
const InteractiveGlobe = dynamic(
  () => import('@/components/scene/InteractiveGlobe'),
  { ssr: false }
)
const NodePanel = dynamic(
  () => import('@/components/ui/NodePanel'),
  { ssr: false }
)
const NameTag = dynamic(
  () => import('@/components/ui/NameTag'),
  { ssr: false }
)
const NavDots = dynamic(
  () => import('@/components/ui/NavDots'),
  { ssr: false }
)
const ContinentBar = dynamic(
  () => import('@/components/ui/ContinentBar'),
  { ssr: false }
)
const LoadingScreen = dynamic(
  () => import('@/components/ui/LoadingScreen'),
  { ssr: false }
)
const ContactLink = dynamic(
  () => import('@/components/ui/ContactLink'),
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
        <LoadingScreen />
      </SceneStateProvider>
    </Suspense>
  )
}
