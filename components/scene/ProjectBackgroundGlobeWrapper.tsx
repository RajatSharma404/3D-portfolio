'use client'

import dynamic from 'next/dynamic'
import { OrbitalNode } from '@/lib/nodes'

const ProjectBackgroundGlobe = dynamic(
  () => import('@/components/scene/ProjectBackgroundGlobe'),
  { ssr: false }
)

export default function ProjectBackgroundGlobeWrapper({
  node,
  onZoomOut
}: {
  node: OrbitalNode
  onZoomOut?: () => void
}) {
  return <ProjectBackgroundGlobe node={node} onZoomOut={onZoomOut} />
}
