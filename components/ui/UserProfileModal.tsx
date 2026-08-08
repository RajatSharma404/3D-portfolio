'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useSceneStore } from '@/components/providers/SceneStateProvider'

export default function UserProfileModal() {
  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)
  const centerPromptRef = useRef<HTMLDivElement>(null)

  const isZoomedOut = useSceneStore((state) => state.isZoomedOut)
  const setIsZoomedOut = useSceneStore((state) => state.setIsZoomedOut)

  // Listen for Escape key to close bio view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZoomedOut) {
        setIsZoomedOut(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isZoomedOut, setIsZoomedOut])

  // GSAP Timeline Entrance & Exit Animations
  useEffect(() => {
    const leftEl = leftPanelRef.current
    const rightEl = rightPanelRef.current
    const centerEl = centerPromptRef.current

    if (!leftEl || !rightEl || !centerEl) return

    if (isZoomedOut) {
      // Entrance TL
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      
      tl.to([leftEl, rightEl], {
        pointerEvents: 'auto'
      })
      .fromTo(
        leftEl,
        { x: -500, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.65 },
        0
      )
      .fromTo(
        rightEl,
        { x: 500, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.65 },
        0.1
      )
      .fromTo(
        centerEl,
        { y: -30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, pointerEvents: 'auto' },
        0.3
      )
    } else {
      // Exit TL
      gsap.to(leftEl, { x: -500, opacity: 0, duration: 0.45, ease: 'power2.in', pointerEvents: 'none' })
      gsap.to(rightEl, { x: 500, opacity: 0, duration: 0.45, ease: 'power2.in', pointerEvents: 'none' })
      gsap.to(centerEl, { y: -20, opacity: 0, duration: 0.3, ease: 'power2.in', pointerEvents: 'none' })
    }
  }, [isZoomedOut])

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden select-none">
      {/* Top Center Guidance Prompt */}
      <div
        ref={centerPromptRef}
        style={{ opacity: 0, pointerEvents: 'none' }}
        className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2 rounded-full bg-[#080d19]/90 border border-cyan-400/50 shadow-[0_0_25px_rgba(56,189,248,0.4)] backdrop-blur-xl transition-all"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
        <span className="font-mono text-xs font-bold text-cyan-300 tracking-wide">
          LIVE 3D GLOBE RUNNING IN BACKGROUND
        </span>
        <button
          onClick={() => setIsZoomedOut(false)}
          className="ml-2 px-3 py-1 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-[11px] transition-all cursor-pointer pointer-events-auto flex items-center gap-1.5 shadow-md"
        >
          <span>Zoom In to Earth</span>
          <span>→</span>
        </button>
      </div>

      {/* Main Content Layout Container */}
      <div className="relative w-full h-full p-4 sm:p-6 flex flex-col md:flex-row justify-between pointer-events-none overflow-hidden">
        
        {/* LEFT HUD PANEL: Bio, Experience & Links */}
        <div
          ref={leftPanelRef}
          style={{ opacity: 0, transform: 'translateX(-500px)', pointerEvents: 'none' }}
          className="w-full md:w-[440px] max-h-full overflow-y-auto bg-[#080d19]/85 border border-cyan-500/30 rounded-3xl p-5 sm:p-6 shadow-[0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-white scrollbar-thin scrollbar-thumb-cyan-500/20 flex flex-col justify-between gap-6 pointer-events-auto"
        >
          <div>
            {/* Header & Badges */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 w-fit">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-mono text-[9px] tracking-[0.2em] text-cyan-400 uppercase font-bold">
                  Developer Profile & Bio
                </span>
              </div>
              <button
                onClick={() => setIsZoomedOut(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-cyan-500/20 hover:border-cyan-400 border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all text-sm cursor-pointer"
                title="Zoom back into Globe"
                aria-label="Close profile panel"
              >
                ✕
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-1">
              Rajat Sharma
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-cyan-400 mb-2">
              Full-Stack Developer · AI/ML Learner · DSA Enthusiast
            </p>
            <p className="text-[11px] text-white/70 leading-relaxed mb-4">
              Co-Founder @ <a href="https://pradite.com" target="_blank" rel="noopener noreferrer" className="text-cyan-300 font-bold hover:underline">Pradite™</a> · Software Engineer Intern @ <span className="text-white font-medium">Sparqor Technologies</span> · B.Tech CS @ <span className="text-white font-medium">KIT, AKTU</span>
            </p>

            {/* Social & Company Links Row */}
            <div className="flex flex-wrap gap-1.5 mb-5 pb-4 border-b border-white/10">
              <a
                href="https://pradite.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-400 hover:text-black transition-all text-[11px] font-bold shadow-[0_0_10px_rgba(56,189,248,0.2)] flex items-center gap-1"
              >
                <span>🌐 Pradite.com</span>
                <span>↗</span>
              </a>
              <a
                href="https://www.linkedin.com/in/rajat-sharma-9a053128b/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-[#0A66C2]/20 border border-[#0A66C2]/50 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all text-[11px] font-semibold"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/RajatSharma404"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black transition-all text-[11px] font-semibold"
              >
                GitHub ↗
              </a>
              <a
                href="https://leetcode.com/u/RajatSharma404/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-[#FFA116]/20 border border-[#FFA116]/50 text-[#FFA116] hover:bg-[#FFA116] hover:text-black transition-all text-[11px] font-semibold"
              >
                LeetCode ↗
              </a>
              <a
                href="https://x.com/RajatSharma404"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all text-[11px] font-semibold"
              >
                X ↗
              </a>
              <a
                href="https://portfolio-chi-self-31.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500 hover:text-white transition-all text-[11px] font-semibold"
              >
                Portfolio ↗
              </a>
              <a
                href="mailto:rajat.sharma.myid1@gmail.com"
                className="px-2.5 py-1 rounded-lg bg-[#EA4335]/20 border border-[#EA4335]/50 text-[#EA4335] hover:bg-[#EA4335] hover:text-white transition-all text-[11px] font-semibold"
              >
                Email ✉
              </a>
            </div>

            {/* About Me */}
            <div className="mb-5">
              <h2 className="font-mono text-[11px] tracking-widest text-cyan-400 uppercase font-bold mb-2 flex items-center gap-1.5">
                <span>📌</span> ABOUT ME & MISSION
              </h2>
              <p className="text-xs text-white/80 leading-relaxed mb-3 italic border-l-2 border-cyan-400 pl-2.5">
                &ldquo;I build portfolio-grade full-stack apps, AI utilities, and DSA tools while studying Computer Science. The goal is simple: ship useful products, not just polished screens.&rdquo;
              </p>
              <ul className="space-y-2 text-[11px] text-white/75">
                <li className="flex items-start gap-1.5">
                  <span className="text-cyan-400">🔨</span>
                  <span>Currently building at <a href="https://pradite.com" target="_blank" rel="noopener noreferrer" className="text-cyan-300 font-bold hover:underline">Pradite™</a> — next-gen AI tools for developers focusing on absolute data privacy and high-performance UX.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-cyan-400">🎓</span>
                  <span>Final-year B.Tech CS student at <strong>Kanpur Institute of Technology</strong> (AKTU, Lucknow · 2023–2027 · CGPA 7.2).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-cyan-400">🤖</span>
                  <span>Specialised in agentic AI systems, complex backend architectures (Express 5, Prisma, PostgreSQL), and practical LLM integrations.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-cyan-400">🧩</span>
                  <span>Daily C++ Data Structures & Algorithms practice (Trees, Sliding Window, Dynamic Programming, Graphs).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-cyan-400">📬</span>
                  <span>Open for engineering internships, AI collabs, and challenging full-stack problems.</span>
                </li>
              </ul>
            </div>

            {/* Detailed Experience */}
            <div>
              <h2 className="font-mono text-[11px] tracking-widest text-cyan-400 uppercase font-bold mb-3 flex items-center gap-1.5">
                <span>💼</span> WORK EXPERIENCE
              </h2>
              <div className="space-y-4">
                {/* Exp 1 */}
                <div className="border-l-2 border-cyan-400/60 pl-3">
                  <div className="flex items-center justify-between text-[11px] mb-0.5">
                    <h3 className="font-bold text-white text-xs">Co-Founder & Frontend Engineer</h3>
                    <span className="font-mono text-[9px] text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded">June 2026 – Present</span>
                  </div>
                  <p className="text-[11px] text-cyan-300 font-medium mb-1">
                    <a href="https://pradite.com" target="_blank" rel="noopener noreferrer" className="hover:underline font-bold">Pradite™ (pradite.com)</a>
                    <span className="text-[9px] text-white/40 ml-1.5">(Registered Trademark)</span>
                  </p>
                  <ul className="list-disc list-inside text-[10px] text-white/70 space-y-1 leading-normal">
                    <li>Leading frontend architecture and web client engineering across AI developer tools</li>
                    <li>Building browser-native UI and application workflows focused on user privacy & speed</li>
                    <li>Frontend integration with high-performance machine learning backend systems</li>
                    <li>Client-side security, zero-trust data privacy, and responsive layout optimization</li>
                  </ul>
                </div>

                {/* Exp 2 */}
                <div className="border-l-2 border-white/20 pl-3">
                  <div className="flex items-center justify-between text-[11px] mb-0.5">
                    <h3 className="font-bold text-white text-xs">Software Engineer Intern</h3>
                    <span className="font-mono text-[9px] text-white/50 bg-white/5 px-1.5 py-0.5 rounded">May – July 2026</span>
                  </div>
                  <p className="text-[11px] text-white/60 mb-1">Sparqor Technologies (2-month Internship)</p>
                  <ul className="list-disc list-inside text-[10px] text-white/70 space-y-1 leading-normal">
                    <li>Demonstrated technical proficiency in modern engineering practices & full-stack web dev</li>
                    <li>Contributed to building scalable digital products and modular web application components</li>
                    <li>Issued official Certificate of Completion — July 22, 2026</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Education & Certifications Summary */}
          <div className="pt-3 border-t border-white/10 text-[10px] text-white/70 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">B.Tech Computer Science & Engineering</span>
              <span className="font-mono text-cyan-400 font-bold">CGPA: 7.2 / 10</span>
            </div>
            <p className="text-white/50">Kanpur Institute of Technology · AKTU, Lucknow (2023 – 2027)</p>
            <div className="text-[9px] text-cyan-300/80 pt-1 flex flex-wrap gap-x-3 gap-y-0.5">
              <span>🏅 Sparqor Intern Cert</span>
              <span>📘 45-Day RCPL DSA Training</span>
              <span>🎓 7 Infosys Springboard Certs</span>
              <span>🏆 Hackathon Participant</span>
            </div>
          </div>
        </div>

        {/* RIGHT HUD PANEL: Tech Stack & Featured Projects */}
        <div
          ref={rightPanelRef}
          style={{ opacity: 0, transform: 'translateX(500px)', pointerEvents: 'none' }}
          className="w-full md:w-[450px] max-h-full overflow-y-auto bg-[#080d19]/85 border border-cyan-500/30 rounded-3xl p-5 sm:p-6 shadow-[0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-white scrollbar-thin scrollbar-thumb-cyan-500/20 flex flex-col justify-between gap-5 pointer-events-auto"
        >
          <div>
            {/* Expanded Tech Stack Matrix */}
            <div className="mb-5">
              <h2 className="font-mono text-[11px] tracking-widest text-cyan-400 uppercase font-bold mb-3 flex items-center gap-1.5">
                <span>⚡</span> COMPREHENSIVE TECH STACK MATRIX
              </h2>
              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="font-mono text-[9px] text-white/40 uppercase block mb-1">Core Languages</span>
                  <div className="flex flex-wrap gap-1">
                    {['C++', 'Python', 'TypeScript', 'JavaScript', 'SQL', 'HTML5/CSS3'].map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 font-mono text-[10px]">{t}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-white/40 uppercase block mb-1">Frontend Engineering</span>
                  <div className="flex flex-wrap gap-1">
                    {['React 19', 'Next.js 15/16', 'Tailwind CSS 4', 'Three.js', 'ReactFlow DAG', 'Monaco Editor'].map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-white font-mono text-[10px]">{t}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-white/40 uppercase block mb-1">Backend & Database</span>
                  <div className="flex flex-wrap gap-1">
                    {['Node.js', 'Express.js 5', 'Flask', 'PostgreSQL', 'Prisma ORM', 'REST APIs'].map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 font-mono text-[10px]">{t}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-white/40 uppercase block mb-1">AI / ML & Automation</span>
                  <div className="flex flex-wrap gap-1">
                    {['Gemini API', 'Ollama (Qwen)', 'LLM Integration', 'Claude', 'OpenAI', 'Playwright', 'Selenium', 'scikit-learn'].map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-purple-400/10 border border-purple-400/30 text-purple-300 font-mono text-[10px]">{t}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-white/40 uppercase block mb-1">Tools & Infrastructure</span>
                  <div className="flex flex-wrap gap-1">
                    {['Git / GitHub', 'Docker', 'Google OAuth', 'Antigravity IDE', 'Chrome Extension API'].map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-[10px]">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Featured Engineering Projects */}
            <div>
              <h2 className="font-mono text-[11px] tracking-widest text-cyan-400 uppercase font-bold mb-3 flex items-center gap-1.5">
                <span>🚀</span> FEATURED ENGINEERING PROJECTS
              </h2>
              <div className="space-y-3.5">
                {/* Proj 1 */}
                <Link
                  href="/projects/body-planner"
                  className="block p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/60 hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-white text-xs group-hover:text-cyan-300 transition-colors">🏋️ Fitness Progression Tracker</h3>
                    <span className="text-[10px] font-mono text-cyan-400 group-hover:translate-x-0.5 transition-transform">Explore →</span>
                  </div>
                  <p className="text-white/75 text-[11px] mb-2 leading-relaxed">Gamified strength-training app featuring a skill-tree UI (ReactFlow DAG), PR logging, and Epley 1RM math. Integrated Gemini AI coaching & Google OAuth; deployed end-to-end.</p>
                  <div className="flex flex-wrap gap-1">
                    {['Next.js 15', 'React 19', 'Express.js', 'Prisma', 'PostgreSQL', 'Gemini API', 'Google OAuth'].map((t) => (
                      <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400">{t}</span>
                    ))}
                  </div>
                </Link>

                {/* Proj 2 */}
                <Link
                  href="/projects/dsa-tracker"
                  className="block p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/60 hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-white text-xs group-hover:text-cyan-300 transition-colors">📚 DSA Tracker Pro</h3>
                    <span className="text-[10px] font-mono text-cyan-400 group-hover:translate-x-0.5 transition-transform">Explore →</span>
                  </div>
                  <p className="text-white/75 text-[11px] mb-2 leading-relaxed">Full-stack DSA platform with roadmap tracking, Monaco problem workspace, AI hint/code trace endpoints, and a Chrome extension syncing LeetCode submissions with verdict, runtime, and memory stats.</p>
                  <div className="flex flex-wrap gap-1">
                    {['Next.js 16', 'Express 5', 'Prisma', 'PostgreSQL', 'Monaco Editor', 'Chrome Extension'].map((t) => (
                      <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400">{t}</span>
                    ))}
                  </div>
                </Link>

                {/* Proj 3 */}
                <Link
                  href="/projects/dsa-city"
                  className="block p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-400/60 hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-white text-xs group-hover:text-purple-300 transition-colors">🏙️ DSA City 3D</h3>
                    <span className="text-[10px] font-mono text-purple-300 group-hover:translate-x-0.5 transition-transform">Explore →</span>
                  </div>
                  <p className="text-white/75 text-[11px] mb-2 leading-relaxed">Gamified 3D city-building leaderboard for data structures and algorithms built with Three.js WebGL and procedural building generation.</p>
                  <div className="flex flex-wrap gap-1">
                    {['Three.js', 'Next.js', 'PostgreSQL', 'Prisma', 'WebGL'].map((t) => (
                      <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300">{t}</span>
                    ))}
                  </div>
                </Link>

                {/* Proj 4 */}
                <Link
                  href="/projects/mastermind"
                  className="block p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-400/60 hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-white text-xs group-hover:text-emerald-300 transition-colors">♟️ MasterMind Chess Analysis</h3>
                    <span className="text-[10px] font-mono text-emerald-300 group-hover:translate-x-0.5 transition-transform">Explore →</span>
                  </div>
                  <p className="text-white/75 text-[11px] mb-2 leading-relaxed">Chess engine platform combining Stockfish 17 WebAssembly evaluation graphs with Gemini 2.0 Flash positional commentary.</p>
                  <div className="flex flex-wrap gap-1">
                    {['Next.js', 'FastAPI', 'Stockfish 17', 'Gemini 2.0 Flash', 'WebAssembly'].map((t) => (
                      <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300">{t}</span>
                    ))}
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Footer Quote */}
          <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-cyan-400/80 italic text-center">
            &ldquo;Ship useful products, not just polished screens.&rdquo;
          </div>
        </div>

      </div>
    </div>
  )
}
