'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useSceneStore } from '@/components/providers/SceneStateProvider'

const SceneStateProvider = dynamic(
  () => import('@/components/providers/SceneStateProvider'),
  { ssr: false }
)
const InteractiveGlobe = dynamic(
  () => import('@/components/scene/InteractiveGlobe'),
  { ssr: false }
)
const OrbitalScene = dynamic(
  () => import('@/components/scene/OrbitalScene'),
  { ssr: false }
)
const ViewToggle = dynamic(
  () => import('@/components/ui/ViewToggle'),
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
const LoadingScreen = dynamic(
  () => import('@/components/ui/LoadingScreen'),
  { ssr: false }
)
const ContactLink = dynamic(
  () => import('@/components/ui/ContactLink'),
  { ssr: false }
)

function SceneContent() {
  const viewMode = useSceneStore((state) => state.viewMode)

  return (
    <>
      {viewMode === 'globe' ? <InteractiveGlobe /> : <OrbitalScene />}
      <ViewToggle />
      <NameTag />
      <NavDots />
      <ContactLink />
      <NodePanel />
      <LoadingScreen />
    </>
  )
}

export default function AppShell() {
  return (
    <Suspense fallback={null}>
      <SceneStateProvider>
        <SceneContent />
      </SceneStateProvider>
    </Suspense>
  )
}

