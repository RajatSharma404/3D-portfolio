'use client'

import dynamic from 'next/dynamic'
import { OrbitalNode } from '@/lib/nodes'

const ProjectBackgroundGlobe = dynamic(
  () => import('@/components/scene/ProjectBackgroundGlobe'),
  { ssr: false }
)

export default function ProjectBackgroundGlobeWrapper({ node }: { node: OrbitalNode }) {
  return <ProjectBackgroundGlobe node={node} />
}
