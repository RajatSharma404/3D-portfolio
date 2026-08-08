'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useSceneStore } from '@/components/providers/SceneStateProvider'

export default function UserProfileModal() {
  const modalRef = useRef<HTMLDivElement>(null)
  const isZoomedOut = useSceneStore((state) => state.isZoomedOut)
  const setIsZoomedOut = useSceneStore((state) => state.setIsZoomedOut)

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsZoomedOut(false)
  }

  // Listen for Escape key to close bio modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZoomedOut) {
        setIsZoomedOut(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isZoomedOut, setIsZoomedOut])

  // GSAP Entrance & Exit animation
  useEffect(() => {
    if (!modalRef.current) return

    if (isZoomedOut) {
      gsap.to(modalRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        pointerEvents: 'auto',
        duration: 0.5,
        ease: 'power3.out'
      })
    } else {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 20,
        pointerEvents: 'none',
        duration: 0.35,
        ease: 'power2.in'
      })
    }
  }, [isZoomedOut])

  return (
    <div
      ref={modalRef}
      style={{ opacity: 0, scale: 0.95, transform: 'translateY(20px)', pointerEvents: 'none' }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/75 backdrop-blur-xl overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#070d19]/95 border border-cyan-500/30 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(56,189,248,0.25)] p-6 sm:p-8 md:p-10 overflow-y-auto text-white scrollbar-thin scrollbar-thumb-cyan-500/20 pointer-events-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-cyan-500/20 hover:border-cyan-400 border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all text-xl cursor-pointer pointer-events-auto"
          title="Zoom back into Globe"
          aria-label="Close bio details"
        >
          ✕
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 w-fit mb-4">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-cyan-400 uppercase font-semibold">
            Macro Orbit View · Detailed Profile
          </span>
        </div>

        {/* Name & Subtitle */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
          Rajat Sharma
        </h1>
        <p className="text-sm sm:text-base font-medium text-cyan-400/90 mb-3">
          Full-Stack Developer · AI/ML Learner · DSA Enthusiast
        </p>
        <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-6">
          Co-Founder @ <span className="text-white font-medium">Pradite™</span> · Software Engineer Intern @ <span className="text-white font-medium">Sparqor Technologies</span> · B.Tech CS @ <span className="text-white font-medium">KIT, AKTU</span>
        </p>

        {/* Badges / Links Row */}
        <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-white/10">
          <a
            href="https://www.linkedin.com/in/rajat-sharma-9a053128b/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0A66C2]/20 border border-[#0A66C2]/50 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all text-xs font-semibold"
          >
            <span>LinkedIn</span>
            <span>↗</span>
          </a>
          <a
            href="https://github.com/RajatSharma404"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black transition-all text-xs font-semibold"
          >
            <span>GitHub</span>
            <span>↗</span>
          </a>
          <a
            href="https://leetcode.com/u/RajatSharma404/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#FFA116]/20 border border-[#FFA116]/50 text-[#FFA116] hover:bg-[#FFA116] hover:text-black transition-all text-xs font-semibold"
          >
            <span>LeetCode</span>
            <span>↗</span>
          </a>
          <a
            href="https://x.com/RajatSharma404"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all text-xs font-semibold"
          >
            <span>X (Twitter)</span>
            <span>↗</span>
          </a>
          <a
            href="https://portfolio-chi-self-31.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all text-xs font-semibold"
          >
            <span>Portfolio</span>
            <span>↗</span>
          </a>
          <a
            href="mailto:rajat.sharma.myid1@gmail.com"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#EA4335]/20 border border-[#EA4335]/50 text-[#EA4335] hover:bg-[#EA4335] hover:text-white transition-all text-xs font-semibold"
          >
            <span>Email</span>
            <span>✉</span>
          </a>
        </div>

        {/* Grid Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column 1: About & Experience */}
          <div className="flex flex-col gap-6">
            {/* About */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <h2 className="font-mono text-xs tracking-widest text-cyan-400 uppercase font-bold mb-3 flex items-center gap-2">
                <span>📌</span> ABOUT ME
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-4 italic border-l-2 border-cyan-400 pl-3">
                &ldquo;I build portfolio-grade full-stack apps, AI utilities, and DSA tools while studying Computer Science. The goal is simple: ship useful products, not just polished screens.&rdquo;
              </p>
              <ul className="flex flex-col gap-2.5 text-xs text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">🔨</span>
                  <span>Currently building at <strong>Pradite™</strong> — next-gen AI tools for developers focusing on privacy and high-performance UX.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">🎓</span>
                  <span>Final-year B.Tech CS student at <strong>Kanpur Institute of Technology</strong> (AKTU, 2023–2027).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">🤖</span>
                  <span>Specialised in agentic AI systems, scalable backend architectures, and practical LLM integrations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">🧩</span>
                  <span>Daily C++ Data Structures & Algorithms practice (Trees, Sliding Window, Dynamic Programming).</span>
                </li>
              </ul>
            </div>

            {/* Experience */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <h2 className="font-mono text-xs tracking-widest text-cyan-400 uppercase font-bold mb-4 flex items-center gap-2">
                <span>💼</span> EXPERIENCE
              </h2>
              <div className="flex flex-col gap-5">
                {/* Exp 1 */}
                <div className="border-l-2 border-cyan-400/50 pl-3.5">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <h3 className="font-bold text-white text-sm">Co-Founder & Frontend Engineer</h3>
                    <span className="font-mono text-[10px] text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">June 2026 – Present</span>
                  </div>
                  <p className="text-xs text-cyan-300/80 font-medium mb-2">Pradite™ <span className="text-[10px] opacity-70">(Registered Trademark)</span></p>
                  <ul className="list-disc list-inside text-xs text-white/70 space-y-1">
                    <li>Leading frontend architecture and web client engineering</li>
                    <li>Building browser-native UI and workflows for AI dev tools</li>
                    <li>Frontend integration with machine learning backend systems</li>
                    <li>Performance optimization and client-side security</li>
                  </ul>
                </div>

                {/* Exp 2 */}
                <div className="border-l-2 border-white/20 pl-3.5">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <h3 className="font-bold text-white text-sm">Software Engineer Intern</h3>
                    <span className="font-mono text-[10px] text-white/50 bg-white/5 px-2 py-0.5 rounded">May 2026 – July 2026</span>
                  </div>
                  <p className="text-xs text-white/60 mb-2">Sparqor Technologies (2-month Internship)</p>
                  <ul className="list-disc list-inside text-xs text-white/70 space-y-1">
                    <li>Technical proficiency in modern engineering practices</li>
                    <li>Contributed to building scalable digital products</li>
                    <li>Issued Certificate of Completion on July 22, 2026</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education & Certifications */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <h2 className="font-mono text-xs tracking-widest text-cyan-400 uppercase font-bold mb-3 flex items-center gap-2">
                <span>🎓</span> EDUCATION & CERTIFICATIONS
              </h2>
              <div className="mb-4">
                <h3 className="text-xs font-bold text-white">B.Tech in Computer Science & Engineering</h3>
                <p className="text-xs text-white/60">Kanpur Institute of Technology · AKTU, Lucknow (2023 – 2027)</p>
                <p className="text-xs text-cyan-400 font-mono mt-0.5">CGPA: 7.2 / 10</p>
              </div>
              <div className="space-y-1.5 text-xs text-white/70">
                <p>🏅 <strong>Software Engineer Internship Certificate</strong> — Sparqor Technologies</p>
                <p>📘 <strong>45-Day Industrial DSA Training</strong> — RCPL (Interview Problem Solving)</p>
                <p>🎓 <strong>7 Infosys Springboard Courses</strong> — CS & Development Fundamentals</p>
                <p>🏆 <strong>Chandigarh University Hackathon</strong> — Participant</p>
              </div>
            </div>
          </div>

          {/* Column 2: Tech Stack & Projects */}
          <div className="flex flex-col gap-6">
            {/* Tech Stack Matrix */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <h2 className="font-mono text-xs tracking-widest text-cyan-400 uppercase font-bold mb-4 flex items-center gap-2">
                <span>⚡</span> TECH STACK MATRIX
              </h2>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-mono text-[10px] text-white/40 uppercase block mb-1">Languages</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['C++', 'Python', 'TypeScript', 'JavaScript', 'SQL'].map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 font-mono text-[11px]">{t}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-white/40 uppercase block mb-1">Frontend Frameworks</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['React 19', 'Next.js 15/16', 'Tailwind CSS 4'].map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-white font-mono text-[11px]">{t}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-white/40 uppercase block mb-1">Backend & Database</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Node.js', 'Express.js 5', 'Flask', 'PostgreSQL', 'Prisma'].map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 font-mono text-[11px]">{t}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-white/40 uppercase block mb-1">AI / ML & Tools</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Gemini API', 'Ollama', 'LLM Integration', 'Claude', 'OpenAI', 'Git', 'Docker', 'Google OAuth'].map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-purple-400/10 border border-purple-400/30 text-purple-300 font-mono text-[11px]">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Projects Overview */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <h2 className="font-mono text-xs tracking-widest text-cyan-400 uppercase font-bold mb-4 flex items-center gap-2">
                <span>🚀</span> FEATURED ENGINEERING PROJECTS
              </h2>
              <div className="space-y-4 text-xs">
                {/* Proj 1 */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <h3 className="font-bold text-white text-sm mb-1">🏋️ Fitness Progression Tracker</h3>
                  <p className="text-white/70 text-xs mb-2">Gamified strength app with ReactFlow DAG skill-tree, PR logging, Epley 1RM formula, and Gemini AI coaching.</p>
                  <div className="flex flex-wrap gap-1">
                    {['Next.js 15', 'React 19', 'Express.js', 'Prisma', 'PostgreSQL', 'Gemini API'].map((t) => (
                      <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Proj 2 */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <h3 className="font-bold text-white text-sm mb-1">📚 DSA Tracker Pro</h3>
                  <p className="text-white/70 text-xs mb-2">Full-stack DSA platform with Monaco editor, AI hint trace, spaced-repetition flow, and Chrome extension for LeetCode sync.</p>
                  <div className="flex flex-wrap gap-1">
                    {['Next.js 16', 'Express 5', 'Prisma', 'PostgreSQL', 'Monaco Editor', 'ReactFlow'].map((t) => (
                      <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Proj 3 */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <h3 className="font-bold text-white text-sm mb-1">🤖 Autonomous Job-Hunting Agent</h3>
                  <p className="text-white/70 text-xs mb-2">Browser-automation agent for job applications across LinkedIn, Internshala, Unstop & Naukri with Qwen LLM form filling.</p>
                  <div className="flex flex-wrap gap-1">
                    {['Python', 'Qwen (Ollama)', 'Playwright', 'Selenium'].map((t) => (
                      <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Proj 4 */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <h3 className="font-bold text-white text-sm mb-1">💰 AI Salary Predictor</h3>
                  <p className="text-white/70 text-xs mb-2">Server-side Linear Regression salary predictor with Matplotlib chart rendering and zero client JS.</p>
                  <div className="flex flex-wrap gap-1">
                    {['Flask', 'scikit-learn', 'Matplotlib', 'Jinja2'].map((t) => (
                      <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Quote & Action Button */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-cyan-400/80 italic text-center sm:text-left">
            &ldquo;Ship useful products, not just polished screens.&rdquo;
          </p>
          <button
            onClick={handleClose}
            className="px-6 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-all shadow-[0_0_20px_rgba(56,189,248,0.5)] flex items-center gap-2 cursor-pointer pointer-events-auto"
          >
            <span>🔍 Zoom In to Interactive Globe</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  )
}
