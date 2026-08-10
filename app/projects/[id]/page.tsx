import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { NODES, OrbitalNode } from '@/lib/nodes'
import ProjectBackgroundGlobeWrapper from '@/components/scene/ProjectBackgroundGlobeWrapper'

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

  return (
    <main className="min-h-screen w-full bg-[#030712] text-white selection:bg-cyan-500/20 selection:text-cyan-300 relative overflow-x-hidden overflow-y-auto select-text">
      {/* 3D Interactive Background Globe */}
      <ProjectBackgroundGlobeWrapper node={node} />

      {/* Ambient gradient glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#080d19]/85 backdrop-blur-xl border-b border-white/10 px-6 py-4 animate-card-top" style={{ animationDelay: '100ms' }}>
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
              className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/70 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
              title={`Previous: ${prevNode.label}`}
            >
              <span>←</span>
              <span className="hidden sm:inline">{prevNode.label}</span>
            </Link>
            <Link
              href={`/projects/${nextNode.id}`}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/70 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
              title={`Next: ${nextNode.label}`}
            >
              <span className="hidden sm:inline">{nextNode.label}</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Interactive Zoom-Out Banner Hint */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 pt-4 animate-card-top" style={{ animationDelay: '180ms' }}>
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 backdrop-blur-md text-xs font-mono text-cyan-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>🔍 <strong>Interactive 3D Globe Active in Background:</strong> Scroll or Zoom OUT on the background globe to return to the Earth view!</span>
          </div>
          <Link href="/" className="underline text-cyan-400 hover:text-white shrink-0">
            Exit to Home →
          </Link>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-6 py-8 sm:py-10 relative z-20">
        
        {/* Node Location Badge Header */}
        <div className="flex flex-wrap items-center gap-3 mb-6 animate-card-top-left" style={{ animationDelay: '250ms' }}>
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

        {/* Hero Title & Primary Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10 mb-10">
          <div className="max-w-3xl animate-card-left" style={{ animationDelay: '300ms' }}>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
              {node.label}
            </h1>
            <p className="text-lg sm:text-xl text-white/80 font-normal leading-relaxed">
              {node.description}
            </p>
          </div>

          {node.url && (
            <div className="flex items-center gap-3 shrink-0 animate-card-top-right" style={{ animationDelay: '350ms' }}>
              <a
                href={node.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-cyan-400 text-slate-950 font-bold text-sm hover:bg-cyan-300 transition-all shadow-[0_0_25px_rgba(56,189,248,0.45)] hover:scale-105"
              >
                <span>View GitHub Repository</span>
                <span>↗</span>
              </a>
            </div>
          )}
        </div>

        {/* Technical Key Metrics Grid */}
        {node.metrics && node.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {node.metrics.map((metric, idx) => {
              const animClasses = [
                'animate-card-top-left',
                'animate-card-top-right',
                'animate-card-bottom-left',
                'animate-card-bottom-right'
              ]
              const animClass = animClasses[idx % animClasses.length]
              const delay = 400 + idx * 60
              return (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl bg-[#080d19]/80 border border-cyan-500/20 backdrop-blur-xl shadow-xl flex flex-col justify-between ${animClass}`}
                  style={{ animationDelay: `${delay}ms` }}
                >
                  <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider mb-2">
                    {metric.label}
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-300 mb-1">
                    {metric.value}
                  </span>
                  {metric.subtext && (
                    <span className="text-[10px] font-mono text-white/40">
                      {metric.subtext}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left 2 Columns: Deep Technical Analysis */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Executive Overview */}
            <section className="p-6 sm:p-8 rounded-3xl bg-[#080d19]/85 border border-cyan-500/20 backdrop-blur-xl shadow-2xl animate-card-left" style={{ animationDelay: '600ms' }}>
              <h2 className="font-mono text-xs tracking-widest text-cyan-400 uppercase font-bold mb-4 flex items-center gap-2">
                <span>📌</span> EXECUTIVE OVERVIEW & PURPOSE
              </h2>
              <p className="text-white/85 leading-relaxed text-sm sm:text-base font-normal">
                {node.longDescription || node.description}
              </p>
            </section>

            {/* Key Technical Features */}
            {node.keyFeatures && node.keyFeatures.length > 0 && (
              <section className="p-6 sm:p-8 rounded-3xl bg-[#080d19]/85 border border-cyan-500/20 backdrop-blur-xl shadow-2xl animate-card-bottom-left" style={{ animationDelay: '680ms' }}>
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
                      <p className="text-xs text-white/85 leading-relaxed font-normal">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Engineering Challenges & Solutions */}
            {node.challenges && node.challenges.length > 0 && (
              <section className="p-6 sm:p-8 rounded-3xl bg-[#080d19]/85 border border-cyan-500/20 backdrop-blur-xl shadow-2xl animate-card-left" style={{ animationDelay: '750ms' }}>
                <h2 className="font-mono text-xs tracking-widest text-cyan-400 uppercase font-bold mb-5 flex items-center gap-2">
                  <span>⚡</span> ENGINEERING CHALLENGES & SOLUTIONS
                </h2>
                <div className="space-y-4">
                  {node.challenges.map((challenge, idx) => (
                    <div
                      key={idx}
                      className="p-4.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3.5"
                    >
                      <span className="text-base leading-none">🧠</span>
                      <p className="text-xs text-white/85 leading-relaxed font-normal">
                        {challenge}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* System Architecture */}
            {node.architecture && (
              <section className="p-6 sm:p-8 rounded-3xl bg-[#080d19]/85 border border-cyan-500/20 backdrop-blur-xl shadow-2xl animate-card-bottom" style={{ animationDelay: '820ms' }}>
                <h2 className="font-mono text-xs tracking-widest text-cyan-400 uppercase font-bold mb-4 flex items-center gap-2">
                  <span>🏗️</span> SYSTEM ARCHITECTURE
                </h2>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs text-cyan-300/90 leading-relaxed">
                  {node.architecture}
                </div>
              </section>
            )}

          </div>

          {/* Right Column: Specs & Technology Breakdown */}
          <div className="space-y-8">
            
            {/* Categorized Tech Stack */}
            {node.techCategories && node.techCategories.length > 0 ? (
              <div className="p-6 rounded-3xl bg-[#080d19]/85 border border-cyan-500/20 backdrop-blur-xl shadow-2xl space-y-6 animate-card-right" style={{ animationDelay: '650ms' }}>
                <h3 className="font-mono text-xs tracking-widest text-cyan-400 uppercase font-bold flex items-center gap-2">
                  <span>🛠️</span> TECH STACK MATRIX
                </h3>
                {node.techCategories.map((cat, idx) => (
                  <div key={idx} className="space-y-2">
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-semibold block">
                      {cat.category}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-xs text-cyan-300 px-3 py-1 rounded-xl border border-cyan-400/30 bg-cyan-400/10 font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-3xl bg-[#080d19]/85 border border-cyan-500/20 backdrop-blur-xl shadow-2xl animate-card-right" style={{ animationDelay: '650ms' }}>
                <h3 className="font-mono text-xs tracking-widest text-cyan-400 uppercase font-bold mb-4 flex items-center gap-2">
                  <span>🛠️</span> TECHNOLOGY STACK
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
            )}

            {/* Globe Coordinates Specs Card */}
            <div className="p-6 rounded-3xl bg-[#080d19]/85 border border-cyan-500/20 backdrop-blur-xl shadow-2xl animate-card-top-right" style={{ animationDelay: '720ms' }}>
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
                  <span className="text-white/40">Latitude</span>
                  <span className="text-cyan-300">{node.lat.toFixed(4)}°</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-white/40">Longitude</span>
                  <span className="text-cyan-300">{node.lng.toFixed(4)}°</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40">Repository</span>
                  <a
                    href={node.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 underline hover:text-cyan-300 truncate max-w-[160px]"
                  >
                    {node.url?.replace('https://github.com/', '')}
                  </a>
                </div>
              </div>
            </div>

            {/* GitHub Callout Card */}
            {node.url && (
              <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-950/60 to-slate-900/90 border border-cyan-400/30 backdrop-blur-xl text-center space-y-4 animate-card-bottom-right" style={{ animationDelay: '800ms' }}>
                <div className="text-2xl">🐙</div>
                <h4 className="font-bold text-white text-sm">Explore Source Code</h4>
                <p className="text-xs text-white/70 leading-relaxed font-normal">
                  View full source code, commit history, and technical documentation directly on GitHub.
                </p>
                <a
                  href={node.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                >
                  <span>Open Repository</span>
                  <span>↗</span>
                </a>
              </div>
            )}

          </div>

        </div>

        {/* Footer Navigation Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 animate-card-bottom" style={{ animationDelay: '880ms' }}>
          <Link
            href={`/projects/${prevNode.id}`}
            className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 transition-all w-full sm:w-auto"
          >
            <span className="text-lg">←</span>
            <div className="text-left">
              <span className="text-[10px] font-mono text-white/40 uppercase block">Previous Project</span>
              <span className="text-xs font-bold text-white">{prevNode.label}</span>
            </div>
          </Link>

          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-white/10 border border-white/20 hover:bg-cyan-400 hover:text-slate-950 text-xs font-mono font-bold transition-all text-center"
          >
            Return to 3D Earth Globe
          </Link>

          <Link
            href={`/projects/${nextNode.id}`}
            className="flex items-center justify-end gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 transition-all w-full sm:w-auto"
          >
            <div className="text-right">
              <span className="text-[10px] font-mono text-white/40 uppercase block">Next Project</span>
              <span className="text-xs font-bold text-white">{nextNode.label}</span>
            </div>
            <span className="text-lg">→</span>
          </Link>
        </div>

      </div>
    </main>
  )
}
