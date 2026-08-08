import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { NODES, OrbitalNode } from '@/lib/nodes'

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
    title: `${node.label} — Rajat Sharma Portfolio`,
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

  return (
    <main className="min-h-screen bg-[#030712] text-white selection:bg-cyan-500/20 selection:text-cyan-300 relative overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#080d19]/80 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/15 hover:border-cyan-400 hover:text-cyan-300 text-xs font-mono transition-all group"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
            <span>Return to 3D Earth Globe</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href={`/projects/${prevNode.id}`}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/60 hover:text-white hover:bg-white/10 transition-all"
              title={`Previous: ${prevNode.label}`}
            >
              ← {prevNode.label}
            </Link>
            <Link
              href={`/projects/${nextNode.id}`}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/60 hover:text-white hover:bg-white/10 transition-all"
              title={`Next: ${nextNode.label}`}
            >
              {nextNode.label} →
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 py-10 sm:py-12 relative z-10">
        
        {/* Node Location Badge Header */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            {node.type}
          </span>
          <span className="text-white/40">•</span>
          <span className="text-xs font-mono text-cyan-300 flex items-center gap-1.5">
            <span>🌐</span> {node.continent}
          </span>
          <span className="text-white/40">•</span>
          <span className="text-xs font-mono text-white/60">
            {node.city}, {node.country} ({node.lat.toFixed(2)}°, {node.lng.toFixed(2)}°)
          </span>
        </div>

        {/* Hero Title & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10 mb-10">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
              {node.label}
            </h1>
            <p className="text-lg text-white/70 max-w-2xl font-normal leading-relaxed">
              {node.description}
            </p>
          </div>

          {node.url && (
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={node.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-400 text-slate-950 font-bold text-sm hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(56,189,248,0.4)]"
              >
                <span>View GitHub Repository</span>
                <span>↗</span>
              </a>
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left 2 Columns: Deep Breakdown */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Detailed Overview */}
            <section className="p-6 sm:p-8 rounded-3xl bg-[#080d19]/80 border border-cyan-500/20 backdrop-blur-xl shadow-xl">
              <h2 className="font-mono text-xs tracking-widest text-cyan-400 uppercase font-bold mb-4 flex items-center gap-2">
                <span>📌</span> EXECUTIVE OVERVIEW & PURPOSE
              </h2>
              <p className="text-white/80 leading-relaxed text-sm sm:text-base mb-4 font-normal">
                {node.longDescription || node.description}
              </p>
            </section>

            {/* Key Technical Features */}
            {node.keyFeatures && node.keyFeatures.length > 0 && (
              <section className="p-6 sm:p-8 rounded-3xl bg-[#080d19]/80 border border-cyan-500/20 backdrop-blur-xl shadow-xl">
                <h2 className="font-mono text-xs tracking-widest text-cyan-400 uppercase font-bold mb-5 flex items-center gap-2">
                  <span>✨</span> KEY TECHNICAL FEATURES
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {node.keyFeatures.map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-colors flex items-start gap-3"
                    >
                      <span className="w-6 h-6 rounded-lg bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-white/80 leading-relaxed font-normal">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* System Architecture */}
            {node.architecture && (
              <section className="p-6 sm:p-8 rounded-3xl bg-[#080d19]/80 border border-cyan-500/20 backdrop-blur-xl shadow-xl">
                <h2 className="font-mono text-xs tracking-widest text-cyan-400 uppercase font-bold mb-4 flex items-center gap-2">
                  <span>🏗️</span> SYSTEM ARCHITECTURE
                </h2>
                <p className="text-white/80 leading-relaxed text-sm font-normal bg-white/5 border border-white/10 p-4 rounded-2xl font-mono text-xs text-cyan-300/90">
                  {node.architecture}
                </p>
              </section>
            )}

          </div>

          {/* Right Column: Sidebar Specs */}
          <div className="space-y-8">
            
            {/* Tech Stack Matrix Card */}
            <div className="p-6 rounded-3xl bg-[#080d19]/80 border border-cyan-500/20 backdrop-blur-xl shadow-xl">
              <h3 className="font-mono text-xs tracking-widest text-cyan-400 uppercase font-bold mb-4 flex items-center gap-2">
                <span>⚡</span> TECHNOLOGY STACK
              </h3>
              <div className="flex flex-wrap gap-2">
                {node.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs text-cyan-300 px-3 py-1.5 rounded-xl border border-cyan-400/30 bg-cyan-400/10 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Globe Coordinates Card */}
            <div className="p-6 rounded-3xl bg-[#080d19]/80 border border-cyan-500/20 backdrop-blur-xl shadow-xl">
              <h3 className="font-mono text-xs tracking-widest text-cyan-400 uppercase font-bold mb-4 flex items-center gap-2">
                <span>🌍</span> ORBITAL COORDINATES
              </h3>
              <div className="space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-white/40">Continent</span>
                  <span className="text-white font-bold">{node.continent}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-white/40">Location</span>
                  <span className="text-white font-bold">{node.city}, {node.country}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-white/40">Latitude / Longitude</span>
                  <span className="text-cyan-400 font-bold">{node.lat}° / {node.lng}°</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40">3D Mesh Geometry</span>
                  <span className="text-purple-300 font-bold uppercase">{node.geometry}</span>
                </div>
              </div>
            </div>

            {/* Other Earth Node Projects Navigation */}
            <div className="p-6 rounded-3xl bg-[#080d19]/80 border border-cyan-500/20 backdrop-blur-xl shadow-xl">
              <h3 className="font-mono text-xs tracking-widest text-cyan-400 uppercase font-bold mb-4 flex items-center gap-2">
                <span>🚀</span> OTHER EARTH PROJECTS
              </h3>
              <div className="space-y-2">
                {NODES.filter((n) => n.id !== node.id).map((other) => (
                  <Link
                    key={other.id}
                    href={`/projects/${other.id}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all text-xs group"
                  >
                    <span className="font-bold text-white group-hover:text-cyan-300 transition-colors">{other.label}</span>
                    <span className="font-mono text-[10px] text-cyan-400/70">{other.continent} →</span>
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  )
}
