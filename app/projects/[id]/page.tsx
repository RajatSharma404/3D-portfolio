import React from 'react'
import { notFound } from 'next/navigation'
import { NODES, OrbitalNode } from '@/lib/nodes'
import ProjectDetailView from '@/components/scene/ProjectDetailView'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return NODES.map((node) => ({
    id: node.id
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const node = NODES.find((n) => n.id === id)
  if (!node) return { title: 'Project Not Found' }
  return {
    title: `${node.label} — Engineering Case Study`,
    description: node.description
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params
  const nodeIndex = NODES.findIndex((n) => n.id === id)
  if (nodeIndex === -1) notFound()

  const node: OrbitalNode = NODES[nodeIndex]
  const prevNode = NODES[(nodeIndex - 1 + NODES.length) % NODES.length]
  const nextNode = NODES[(nodeIndex + 1) % NODES.length]

  return <ProjectDetailView node={node} prevNode={prevNode} nextNode={nextNode} />
}
