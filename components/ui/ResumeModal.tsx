'use client'

import { soundManager } from '@/lib/sound'

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null

  const handleDownload = () => {
    soundManager.playClick()
    // Trigger direct resume download or open portfolio resume window
    window.open('https://portfolio-chi-self-31.vercel.app/', '_blank')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md select-none pointer-events-auto">
      <div
        className="absolute inset-0 z-0"
        onClick={() => {
          soundManager.playClick()
          onClose()
        }}
      />
      <div className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#080d19]/95 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl text-white scrollbar-thin scrollbar-thumb-cyan-500/20">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
            <span className="font-mono text-xs font-bold text-cyan-300 uppercase tracking-widest">
              OFFICIAL DEVELOPER RESUME & CV
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="px-4 py-1.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(56,189,248,0.4)] cursor-pointer"
            >
              <span>📄</span>
              <span>Download PDF Resume</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Resume Content */}
        <div className="space-y-6 select-text">
          {/* Header Info */}
          <div>
            <h1 className="text-3xl font-extrabold text-white mb-1">Rajat Sharma</h1>
            <p className="text-sm font-semibold text-cyan-400 mb-2">
              Full-Stack Software Engineer · AI/ML Learner · DSA Specialist
            </p>
            <p className="text-xs text-white/70">
              Co-Founder @ Pradite™ · Software Engineer Intern @ Sparqor Technologies · B.Tech Computer Science @ KIT, AKTU
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="font-mono text-xs text-cyan-400 font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
              <span>⚡</span> CORE TECHNICAL SKILLS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="font-bold text-white block mb-1">Languages & Frameworks:</span>
                <span className="text-white/70">JavaScript, TypeScript, Python, C++, Java, React 19, Next.js 16, Express 5, FastAPI</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="font-bold text-white block mb-1">3D Graphics & AI Integration:</span>
                <span className="text-white/70">Three.js, React Three Fiber, WebGL, Gemini 2.0 Flash API, Stockfish 17 WASM, Leaflet, D3.js</span>
              </div>
            </div>
          </div>

          {/* Key Experience & Projects */}
          <div>
            <h2 className="font-mono text-xs text-cyan-400 font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
              <span>💼</span> FEATURED PORTFOLIO PROJECTS
            </h2>
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex justify-between font-bold text-white mb-1">
                  <span>Flow — AI Expense Tracker</span>
                  <span className="text-cyan-300">Next.js 15, Gemini API, Prisma</span>
                </div>
                <p className="text-white/70 leading-relaxed">
                  Converts unstructured audio, receipts, and natural language into multi-account ledger entries with 99.2% OCR extraction accuracy.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex justify-between font-bold text-white mb-1">
                  <span>MasterMind — Stockfish 17 & Gemini Chess Coach</span>
                  <span className="text-cyan-300">FastAPI, WASM, Gemini 2.0</span>
                </div>
                <p className="text-white/70 leading-relaxed">
                  WebAssembly engine integration running Stockfish 17 workers alongside LLM grandmaster commentary and turn evaluation graphs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex justify-between font-bold text-white mb-1">
                  <span>DSA City & DSA Tracker Pro</span>
                  <span className="text-cyan-300">Three.js, Monaco, Extension V3</span>
                </div>
                <p className="text-white/70 leading-relaxed">
                  Monaco editor algorithm tracker paired with a gamified 3D WebGL city generator that builds skyscrapers based on LeetCode streaks.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono text-white/40">rajat.sharma.myid1@gmail.com</span>
          <button
            onClick={handleDownload}
            className="px-5 py-2 rounded-full bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-colors cursor-pointer"
          >
            Open Full PDF →
          </button>
        </div>
      </div>
    </div>
  )
}
