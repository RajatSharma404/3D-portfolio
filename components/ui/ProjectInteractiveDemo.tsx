'use client'

import React, { useState, useEffect } from 'react'
import { soundManager } from '@/lib/sound'

interface ProjectInteractiveDemoProps {
  projectId: string
  accentColor?: string
}

export default function ProjectInteractiveDemo({ projectId, accentColor = '#38bdf8' }: ProjectInteractiveDemoProps) {
  switch (projectId) {
    case 'flow':
      return <FlowDemo accentColor={accentColor} />
    case 'countries-quiz':
      return <CountriesQuizDemo accentColor={accentColor} />
    case 'mastermind':
      return <MasterMindDemo accentColor={accentColor} />
    case 'dsa-tracker-pro':
    case 'dsa-tracker':
      return <DsaTrackerDemo accentColor={accentColor} />
    case 'dsa-city':
      return <DsaCityDemo accentColor={accentColor} />
    case 'body-planner':
      return <BodyPlannerDemo accentColor={accentColor} />
    default:
      return <FlowDemo accentColor={accentColor} />
  }
}

// 1. FLOW: AI Expense Parser Demo
function FlowDemo({ accentColor }: { accentColor: string }) {
  const SAMPLES = [
    'Paid $48.50 for dinner at Brooklyn Ramen with Alex',
    'Uber ride to JFK airport $62.00 #travel',
    'Monthly AWS Server Cloud Credits $120.00',
    'Bought 2 coffees and pastry $14.80 for morning meeting'
  ]

  const [input, setInput] = useState(SAMPLES[0])
  const [isParsing, setIsParsing] = useState(false)
  const [parsedResult, setParsedResult] = useState<{
    amount: string
    currency: string
    category: string
    account: string
    confidence: string
    taxDeductible: string
    notes: string
  }>({
    amount: '$48.50',
    currency: 'USD ($)',
    category: 'Meals & Entertainment',
    account: 'Business Checking ****4920',
    confidence: '99.4%',
    taxDeductible: '50% Eligible',
    notes: 'Dinner at Brooklyn Ramen with Alex'
  })

  const handleParse = (textToParse: string) => {
    soundManager.playClick()
    setIsParsing(true)

    setTimeout(() => {
      soundManager.playWarp()
      setIsParsing(false)
      if (textToParse.toLowerCase().includes('uber') || textToParse.toLowerCase().includes('jfk')) {
        setParsedResult({
          amount: '$62.00',
          currency: 'USD ($)',
          category: 'Ground Transportation / Travel',
          account: 'Corporate Card ****1092',
          confidence: '99.8%',
          taxDeductible: '100% Eligible',
          notes: 'Uber ride to JFK Airport'
        })
      } else if (textToParse.toLowerCase().includes('aws') || textToParse.toLowerCase().includes('server')) {
        setParsedResult({
          amount: '$120.00',
          currency: 'USD ($)',
          category: 'Cloud Infrastructure & Software',
          account: 'Operations Ledger ****8831',
          confidence: '99.9%',
          taxDeductible: '100% Business Expense',
          notes: 'AWS Server Cloud Credits'
        })
      } else {
        setParsedResult({
          amount: '$14.80',
          currency: 'USD ($)',
          category: 'Office & Meeting Supplies',
          account: 'Business Checking ****4920',
          confidence: '98.9%',
          taxDeductible: '50% Eligible',
          notes: 'Coffee and pastry for morning meeting'
        })
      }
    }, 450)
  }

  return (
    <div className="space-y-5 select-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
            Live AI Receipt & Natural Language Parser Sandbox
          </span>
        </div>
        <span className="text-[10px] font-mono text-white/50">Gemini 2.0 Flash Simulation</span>
      </div>

      {/* Preset Prompts */}
      <div className="flex flex-wrap gap-2">
        <span className="text-[11px] font-mono text-white/40 self-center">Presets:</span>
        {SAMPLES.map((s, idx) => (
          <button
            key={idx}
            onClick={() => {
              setInput(s)
              handleParse(s)
            }}
            aria-label={`Load sample prompt ${idx + 1}`}
            className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400 text-white/70 hover:text-cyan-200 transition-all cursor-pointer truncate max-w-[200px]"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. Paid $35 for team lunch..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white font-sans text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
        />
        <button
          onClick={() => handleParse(input)}
          disabled={isParsing}
          aria-label="Parse receipt with Gemini AI"
          className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.3)] disabled:opacity-50"
        >
          <span>{isParsing ? '⚡ Extracting...' : '⚡ Parse with Gemini AI'}</span>
        </button>
      </div>

      {/* Result Ledger Card */}
      <div className="p-5 rounded-2xl bg-black/60 border border-cyan-500/30 font-mono text-xs text-white space-y-3 shadow-inner">
        <div className="flex items-center justify-between pb-2 border-b border-white/10 text-white/40 text-[10px]">
          <span>STRUCTURED LEDGER TRANSACTION</span>
          <span className="text-cyan-400 font-bold">STATUS: RECONCILED</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
            <span className="text-[10px] text-white/40 block">Amount Extracted</span>
            <span className="text-lg font-bold text-cyan-300">{parsedResult.amount}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
            <span className="text-[10px] text-white/40 block">Category Assigned</span>
            <span className="text-xs font-bold text-emerald-300 truncate block">{parsedResult.category}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-white/40 block">Tax Deduction</span>
            <span className="text-xs font-bold text-amber-300">{parsedResult.taxDeductible}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-white/5 text-[11px] text-white/70">
          <span>Target Account: <strong className="text-white">{parsedResult.account}</strong></span>
          <span className="text-cyan-400 font-bold">AI Confidence: {parsedResult.confidence}</span>
        </div>
      </div>
    </div>
  )
}

// 2. COUNTRIES QUIZ: Clickable SVG Vector Map Demo
function CountriesQuizDemo({ accentColor }: { accentColor: string }) {
  const COUNTRIES = [
    { id: 'USA', name: 'United States', code: 'US', x: 22, y: 35 },
    { id: 'BRA', name: 'Brazil', code: 'BR', x: 34, y: 68 },
    { id: 'DEU', name: 'Germany', code: 'DE', x: 50, y: 28 },
    { id: 'EGY', name: 'Egypt', code: 'EG', x: 55, y: 44 },
    { id: 'IND', name: 'India', code: 'IN', x: 68, y: 45 },
    { id: 'AUS', name: 'Australia', code: 'AU', x: 84, y: 74 },
    { id: 'JPN', name: 'Japan', code: 'JP', x: 85, y: 36 }
  ]

  const [targetIdx, setTargetIdx] = useState(0)
  const [streak, setStreak] = useState(3)
  const [score, setScore] = useState(450)
  const [feedback, setFeedback] = useState<string | null>(null)

  const currentTarget = COUNTRIES[targetIdx]

  const handleCountryClick = (c: (typeof COUNTRIES)[number]) => {
    if (c.id === currentTarget.id) {
      soundManager.playWarp()
      setFeedback(`✓ Correct! Found ${c.name}!`)
      setStreak((s) => s + 1)
      setScore((sc) => sc + 100 * (streak + 1))
      setTimeout(() => {
        setTargetIdx((idx) => (idx + 1) % COUNTRIES.length)
        setFeedback(null)
      }, 900)
    } else {
      soundManager.playClick()
      setFeedback(`✕ Miss! You clicked ${c.name}. Find ${currentTarget.name}!`)
      setStreak(0)
    }
  }

  return (
    <div className="space-y-4 select-none">
      <div className="flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span className="font-bold text-purple-300">Target: Click on {currentTarget.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-amber-300 font-bold">🔥 Streak: {streak}x</span>
          <span className="text-cyan-300 font-bold">Score: {score}</span>
        </div>
      </div>

      {/* Vector World Map Canvas Representation */}
      <div className="relative w-full h-56 sm:h-64 rounded-2xl bg-[#040914] border border-purple-500/30 overflow-hidden flex items-center justify-center p-4">
        {/* Stylized Grid Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:20px_20px] opacity-15" />

        {/* Clickable Country Nodes on Vector Coordinate Projection */}
        <div className="relative w-full h-full">
          {COUNTRIES.map((c) => {
            const isTarget = c.id === currentTarget.id
            return (
              <button
                key={c.id}
                onClick={() => handleCountryClick(c)}
                aria-label={`Select country ${c.name}`}
                style={{ left: `${c.x}%`, top: `${c.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-xl font-mono text-[10px] font-bold transition-all duration-300 cursor-pointer flex flex-col items-center gap-1 ${
                  isTarget
                    ? 'bg-purple-500/20 border border-purple-400 text-purple-200 shadow-[0_0_15px_rgba(192,132,252,0.5)] scale-110'
                    : 'bg-white/5 border border-white/15 text-white/70 hover:bg-white/15 hover:text-white'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]" />
                <span className="truncate max-w-[65px]">{c.name}</span>
              </button>
            )
          })}
        </div>

        {feedback && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#080d19]/95 border border-purple-400 text-xs font-mono font-bold shadow-xl">
            <span className={feedback.startsWith('✓') ? 'text-emerald-400' : 'text-red-400'}>
              {feedback}
            </span>
          </div>
        )}
      </div>

      <p className="text-[11px] font-mono text-white/50 text-center">
        💡 Spatial memory challenge: Click country pin coordinates directly without multiple choice!
      </p>
    </div>
  )
}

// 3. MASTERMIND: Interactive Chess Position & Web Worker Eval Bar Demo
function MasterMindDemo({ accentColor }: { accentColor: string }) {
  const POSITIONS = [
    { key: 'open-sicilian', label: 'Sicilian Najdorf', sub: 'Sharp Tactical Defense' },
    { key: 'queens-gambit', label: "Queen's Gambit", sub: 'Classical Positional Battle' },
    { key: 'kings-indian', label: "King's Indian", sub: 'Opposite-Side Pawn Storm' },
    { key: 'endgame-rook', label: 'Lucena Endgame', sub: 'Bridge Building Technique' }
  ]

  const [activePosKey, setActivePosKey] = useState('open-sicilian')
  const [evalData, setEvalData] = useState<{
    depth: number
    targetDepth: number
    evalStr: string
    score: number
    winChance: number
    nodes: number
    nps: number
    pv: string
    bestMove: string
    theme: string
    isDone: boolean
  }>({
    depth: 4,
    targetDepth: 24,
    evalStr: '+0.35',
    score: 0.35,
    winChance: 55,
    nodes: 12400,
    nps: 950000,
    pv: '6... a6 7. Be3 e5 8. Nb3 Be6 9. f3 Be7',
    bestMove: 'a6',
    theme: 'Dynamic center tension with sharp asymmetrical counter-attacking chances for Black.',
    isDone: false
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    let worker: Worker | null = null
    try {
      worker = new Worker('/workers/chess-eval-worker.js')

      worker.onmessage = (e) => {
        const data = e.data
        if (data.type === 'depth-progress') {
          setEvalData({
            depth: data.depth,
            targetDepth: data.targetDepth,
            evalStr: data.evalStr,
            score: data.score,
            winChance: data.winChance,
            nodes: data.nodes,
            nps: data.nps,
            pv: data.pv,
            bestMove: data.bestMove,
            theme: data.theme,
            isDone: false
          })
        } else if (data.type === 'done') {
          setEvalData({
            depth: data.depth,
            targetDepth: data.depth,
            evalStr: data.evalStr,
            score: data.score,
            winChance: data.winChance,
            nodes: data.nodes,
            nps: data.nps,
            pv: data.pv,
            bestMove: data.bestMove,
            theme: data.theme,
            isDone: true
          })
        }
      }

      worker.postMessage({ positionKey: activePosKey, targetDepth: 24 })
    } catch {
      // Fallback if Web Workers are restricted in environment
    }

    return () => {
      if (worker) worker.terminate()
    }
  }, [activePosKey])

  const handleSelectPosition = (key: string) => {
    soundManager.playClick()
    soundManager.playWarp()
    setActivePosKey(key)
  }

  // Calculate eval bar fill percentage (clamped between 5% and 95%)
  const evalPercent = Math.min(95, Math.max(5, 50 + evalData.score * 12))

  return (
    <div className="space-y-4 select-none font-mono text-xs">
      {/* Engine Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              evalData.isDone ? 'bg-emerald-400' : 'bg-indigo-400 animate-ping'
            }`}
          />
          <span className="font-bold text-indigo-300">
            Stockfish 17 WASM Web Worker + Gemini Coach
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-white/50">
          <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            {evalData.isDone ? '✓ DEPTH 24 CONVERGED' : `COMPUTING DEPTH ${evalData.depth}/24`}
          </span>
          <span>{(evalData.nps / 1000000).toFixed(2)}M NPS</span>
        </div>
      </div>

      {/* Position Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {POSITIONS.map((pos) => {
          const isActive = pos.key === activePosKey
          return (
            <button
              key={pos.key}
              onClick={() => handleSelectPosition(pos.key)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-500/20 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="font-bold block truncate">{pos.label}</span>
              <span className="text-[9px] text-white/40 block truncate">{pos.sub}</span>
            </button>
          )
        })}
      </div>

      {/* Interactive Engine Board Telemetry & Eval Bar */}
      <div className="p-5 rounded-2xl bg-black/60 border border-indigo-500/30 space-y-4">
        {/* Dynamic Dual-Color Evaluation Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] items-baseline">
            <span className="text-white font-bold flex items-center gap-1.5">
              <span>Engine Eval:</span>
              <span className="text-indigo-300 text-sm font-extrabold">{evalData.evalStr}</span>
              <span className="text-[10px] text-white/40">({evalData.winChance}% White Win)</span>
            </span>
            <span className="text-[10px] text-white/40">
              Analyzed {evalData.nodes.toLocaleString()} Nodes
            </span>
          </div>

          <div className="w-full h-3.5 rounded-full bg-[#0f172a] border border-white/10 overflow-hidden flex p-0.5">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-indigo-400 rounded-l-full transition-all duration-300 shadow-[0_0_12px_rgba(56,189,248,0.6)]"
              style={{ width: `${evalPercent}%` }}
            />
            <div className="h-full bg-slate-900/80 rounded-r-full flex-1" />
          </div>
        </div>

        {/* Engine Principal Variation & Best Move */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 col-span-1">
            <span className="text-[9px] text-white/40 uppercase block">Engine Best Move</span>
            <span className="text-lg font-bold text-cyan-300 tracking-wide font-mono">
              {evalData.bestMove}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 col-span-1 sm:col-span-2">
            <span className="text-[9px] text-white/40 uppercase block">Principal Variation (PV)</span>
            <span className="text-xs text-indigo-200 font-mono block truncate mt-0.5">
              {evalData.pv}
            </span>
          </div>
        </div>

        {/* Gemini Grandmaster Natural Language Coach */}
        <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-indigo-100 flex items-start gap-2.5">
          <span className="text-base shrink-0">♟️</span>
          <div>
            <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider block">
              Gemini Grandmaster Positional Coach
            </span>
            <p className="text-xs font-sans text-white/80 leading-relaxed mt-0.5">
              {evalData.theme}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// 4. DSA TRACKER PRO: Monaco-grade Editor & AI Hint Workspace
function DsaTrackerDemo({ accentColor }: { accentColor: string }) {
  const PROBLEMS = [
    {
      title: '1. Two Sum',
      difficulty: 'Easy',
      lang: 'C++',
      code: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> map;\n        for (int i = 0; i < nums.size(); ++i) {\n            int complement = target - nums[i];\n            if (map.count(complement)) return {map[complement], i};\n            map[nums[i]] = i;\n        }\n        return {};\n    }\n};`,
      hints: [
        'Hint 1: Can we check if the complement (target - current) exists in O(1) time?',
        'Hint 2: Use a hash table to store number values and their corresponding indices.',
        'Hint 3: In a single pass, query the map before inserting the current element to achieve O(N) runtime.'
      ]
    },
    {
      title: '146. LRU Cache',
      difficulty: 'Medium',
      lang: 'TypeScript',
      code: `class LRUCache {\n  private capacity: number;\n  private map: Map<number, number>;\n\n  constructor(capacity: number) {\n    this.capacity = capacity;\n    this.map = new Map();\n  }\n\n  get(key: number): number {\n    if (!this.map.has(key)) return -1;\n    const val = this.map.get(key)!;\n    this.map.delete(key);\n    this.map.set(key, val); // Refresh recency\n    return val;\n  }\n}`,
      hints: [
        'Hint 1: We need O(1) lookup and O(1) removal/insertion of least recently used items.',
        'Hint 2: Combine a Hash Map with a Doubly Linked List (or JavaScript Map insertion order).',
        'Hint 3: On every get() or put(), move the accessed node to the head of the list.'
      ]
    }
  ]

  const [probIdx, setProbIdx] = useState(0)
  const [hintStage, setHintStage] = useState(0)

  const currentProb = PROBLEMS[probIdx]

  return (
    <div className="space-y-4 select-none font-mono text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-bold text-amber-300">Monaco Workspace & AI Hint Stepper</span>
        </div>
        <div className="flex gap-2">
          {PROBLEMS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundManager.playClick()
                setProbIdx(idx)
                setHintStage(0)
              }}
              aria-label={`Select problem ${p.title}`}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                probIdx === idx
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-white/10 text-white/60 hover:text-white'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* Code Editor Container */}
      <div className="rounded-2xl bg-[#040812] border border-amber-500/30 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10 text-[10px] text-white/50">
          <span>LANG: {currentProb.lang}</span>
          <span className="text-amber-400 font-bold">{currentProb.difficulty}</span>
        </div>

        <pre className="p-4 text-[11px] leading-relaxed text-cyan-200 overflow-x-auto font-mono">
          <code>{currentProb.code}</code>
        </pre>
      </div>

      {/* AI Hint Box */}
      <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-400/40 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-amber-300 flex items-center gap-1.5">
            <span>💡</span> Progressive AI Hint (No Spoilers):
          </span>
          <button
            onClick={() => {
              soundManager.playClick()
              setHintStage((h) => (h + 1) % currentProb.hints.length)
            }}
            aria-label="Reveal next hint step"
            className="px-3 py-1 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[10px] cursor-pointer"
          >
            Reveal Hint {hintStage + 1} of {currentProb.hints.length} →
          </button>
        </div>
        <p className="text-xs text-white/90 font-sans leading-relaxed bg-black/40 p-3 rounded-xl border border-white/5">
          {currentProb.hints[hintStage]}
        </p>
      </div>
    </div>
  )
}

// 5. DSA CITY: Procedural Building & Streak Growth Simulator
function DsaCityDemo({ accentColor }: { accentColor: string }) {
  const [problemsSolved, setProblemsSolved] = useState(42)

  const buildingsCount = Math.max(3, Math.floor(problemsSolved / 6))
  const heights = [60, 110, 85, 140, 95, 160, 120, 180, 130, 210, 175, 240]

  return (
    <div className="space-y-4 select-none font-mono text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-emerald-300">Procedural 3D City Builder Simulation</span>
        </div>
        <span className="text-emerald-400 font-bold">Streak XP: {problemsSolved * 15} XP</span>
      </div>

      {/* Slider Controls */}
      <div className="p-4 rounded-2xl bg-white/5 border border-emerald-500/30 space-y-2">
        <div className="flex justify-between text-[11px]">
          <span className="text-white/60">Solved LeetCode Problems:</span>
          <span className="font-bold text-emerald-300 text-sm">{problemsSolved} Solved</span>
        </div>
        <input
          type="range"
          min="5"
          max="100"
          value={problemsSolved}
          onChange={(e) => {
            soundManager.playClick()
            setProblemsSolved(parseInt(e.target.value))
          }}
          className="w-full accent-emerald-400 cursor-pointer"
        />
        <div className="flex justify-between text-[9px] text-white/30">
          <span>Tier 1: Novice Village</span>
          <span>Tier 2: Graph Grove</span>
          <span>Tier 3: DP Metropolis</span>
          <span>Tier 4: Cyber Citadel</span>
        </div>
      </div>

      {/* Procedural 3D Building Visualizer */}
      <div className="h-44 rounded-2xl bg-[#020b08] border border-emerald-500/30 p-4 flex items-end justify-center gap-2.5 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

        {Array.from({ length: buildingsCount }).map((_, idx) => {
          const height = Math.min(150, (heights[idx % heights.length] * (problemsSolved / 45)))
          return (
            <div
              key={idx}
              style={{ height: `${height}px` }}
              className="w-7 rounded-t-lg bg-gradient-to-t from-emerald-950 via-teal-900 to-emerald-400 border-t-2 border-x border-emerald-400/60 shadow-[0_0_15px_rgba(52,211,153,0.3)] transition-all duration-300 flex flex-col justify-between items-center py-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
              <div className="space-y-1 opacity-70">
                <div className="w-3 h-1 bg-emerald-200 rounded-sm" />
                <div className="w-3 h-1 bg-emerald-200 rounded-sm" />
                <div className="w-3 h-1 bg-emerald-200 rounded-sm" />
              </div>
            </div>
          )
        })}
      </div>
      <p className="text-[10px] text-white/40 text-center">
        🏢 As problems are logged in DSA Tracker Pro, your personalized 3D city automatically constructs glowing skyscrapers!
      </p>
    </div>
  )
}

// 6. BODY PLANNER: DAG Workout Graph & Epley 1RM Calculator
function BodyPlannerDemo({ accentColor }: { accentColor: string }) {
  const [weight, setWeight] = useState(100)
  const [reps, setReps] = useState(6)

  // Epley formula: 1RM = Weight * (1 + Reps / 30)
  const calculated1RM = Math.round(weight * (1 + reps / 30))

  return (
    <div className="space-y-4 select-none font-mono text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="font-bold text-blue-300">ReactFlow DAG & Epley 1RM Calculator</span>
        </div>
        <span className="text-[10px] text-white/40">Adaptive Hypertrophy Model</span>
      </div>

      {/* DAG Node Graph Blueprint Representation */}
      <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-black/60 border border-blue-500/30 text-center">
        <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-400/50 text-blue-200 font-bold text-[10px]">
          <span>🏋️ Push Day</span>
          <span className="text-[8px] block text-white/50 mt-0.5">Primary Target</span>
        </div>
        <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-200 font-bold text-[10px]">
          <span>📊 Progressive Overload</span>
          <span className="text-[8px] block text-white/50 mt-0.5">+2.5% Next Split</span>
        </div>
        <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-200 font-bold text-[10px]">
          <span>🤖 Gemini Recovery</span>
          <span className="text-[8px] block text-white/50 mt-0.5">RPE 8.5 Optimized</span>
        </div>
      </div>

      {/* Interactive 1RM Calculator */}
      <div className="p-5 rounded-2xl bg-white/5 border border-blue-500/30 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] text-white/50 block mb-1">Lift Weight (kg/lbs):</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/20 text-white font-bold text-sm focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label className="text-[10px] text-white/50 block mb-1">Reps Completed:</label>
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/20 text-white font-bold text-sm focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-400/40 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-white/40 block">Estimated Epley 1RM:</span>
            <span className="text-xl font-extrabold text-blue-300">{calculated1RM} kg / lbs</span>
          </div>
          <span className="text-[10px] text-cyan-300 font-bold bg-blue-500/20 px-2.5 py-1 rounded-lg border border-blue-400/30">
            Formula: Weight × (1 + Reps/30)
          </span>
        </div>
      </div>
    </div>
  )
}
