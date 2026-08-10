import React from 'react'
import type { Metadata } from 'next'
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const node = NODES.find((n) => n.id === id)
  if (!node) return { title: 'Project Not Found — Rajat Sharma Portfolio' }

  return {
    title: `${node.label} — ${node.continent} Case Study | Rajat Sharma`,
    description: node.longDescription || node.description,
    keywords: [node.label, node.continent, node.city, node.country, ...node.tech],
    openGraph: {
      title: `${node.label} — Engineering Case Study by Rajat Sharma`,
      description: node.description,
      url: `https://portfolio-chi-self-31.vercel.app/projects/${node.id}`,
      siteName: 'Rajat Sharma 3D Portfolio',
      images: [
        {
          url: '/textures/earth-blue-marble.jpg',
          width: 1200,
          height: 630,
          alt: `${node.label} Case Study`
        }
      ],
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${node.label} — Rajat Sharma Portfolio`,
      description: node.description,
      creator: '@RajatSharma404'
    }
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
