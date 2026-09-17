---
name: interactive-demo-builder
description: >-
  Use this skill when building or modifying interactive client-side mini-demos inside ProjectInteractiveDemo.tsx.
---

# Interactive Demo Builder Runbook (`/add-demo`)

This skill standardizes the creation of lightweight, highly engaging interactive micro-simulations embedded directly within project case study pages.

---

## ⚡ Design Philosophy

Each featured project includes an interactive, playable sandbox (e.g. AI expense classification, Stockfish chess depth evaluation, 3D city generator, vector geography quiz):
- **Zero Heavy External Runtimes**: Simulate complex backend behavior client-side with realistic latency delays and optimistic state updates.
- **Audio Feedback**: Connect user interactions to synthesized Web Audio sound chirps (`soundManager.playClick()`, `soundManager.playHover()`).
- **Strict Privacy & Safety**: Never require real third-party API keys from the user in client demos; use intelligent client-side heuristics or deterministic mock models.

---

## 📋 Step-by-Step Implementation Guide

### Step 1: Open Target Component
Target file: [components/ui/ProjectInteractiveDemo.tsx](file:///d:/3D%20Portfolio/components/ui/ProjectInteractiveDemo.tsx).

### Step 2: Define State & Interactive Flow
Follow the established pattern:
1. Provide preset sample inputs or interactive controls.
2. Maintain loading state with realistic processing micro-delays (`setTimeout` ~400–800ms) to simulate AI reasoning or algorithmic computation.
3. Render styled glassmorphism cards with telemetry badges (e.g., *Confidence Score*, *Execution Time*, *Memory Usage*).

```tsx
function MyNewProjectDemo({ accentColor }: { accentColor: string }) {
  const [isRunning, setIsRunning] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleAction = () => {
    soundManager.playClick()
    setIsRunning(true)
    setTimeout(() => {
      setResult({ status: 'SUCCESS', latency: '42ms' })
      setIsRunning(false)
      soundManager.playHover()
    }, 600)
  }

  return (
    <div className="p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
      {/* Interactive Controls */}
      <button
        onClick={handleAction}
        disabled={isRunning}
        className="px-4 py-2 rounded-lg font-mono text-xs uppercase transition-all"
        style={{ backgroundColor: accentColor }}
      >
        {isRunning ? 'Processing...' : 'Run Simulation'}
      </button>
    </div>
  )
}
```

### Step 3: Register in Switch Dispatcher
Add the new project case to `ProjectInteractiveDemo`:
```tsx
case 'my-new-project':
  return <MyNewProjectDemo accentColor={accentColor} />
```

### Step 4: Background Web Worker Offloading (Optional for Heavy Compute)
For intensive algorithms (e.g. chess engines, physics solvers, tokenizers), place a worker script in `public/workers/<engine>-worker.js`:
```typescript
useEffect(() => {
  if (typeof window === 'undefined') return
  const worker = new Worker('/workers/chess-eval-worker.js')
  worker.onmessage = (e) => {
    // Process depth or solver data without main-thread blocking
  }
  worker.postMessage({ targetDepth: 24 })
  return () => worker.terminate()
}, [])
```

---

## 🧪 Verification
```bash
# Verify component compiles without type errors
npx tsc --noEmit

# Run unit tests
npm test tests/components/
```
