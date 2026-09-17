---
name: sound-fx-synthesis
description: >-
  Use this skill when modifying, tuning, or adding procedural Web Audio API sound effects in lib/sound.ts.
---

# Procedural Web Audio Synthesis Runbook (`/audio`)

This skill standardizes zero-dependency procedural sound generation using browser-native Web Audio API oscillators.

---

## ⚡ Audio Engine Architecture

Located in [lib/sound.ts](file:///d:/3D%20Portfolio/lib/sound.ts):
- **Zero Asset Downloads**: All audio is synthesized mathematically using `AudioContext`, `OscillatorNode`, and `GainNode`.
- **Browser Autoplay Compliance**: The `AudioContext` initializes in a suspended state and safely resumes only upon explicit user gesture (e.g. click, canvas pan, keydown).
- **Privacy & Persistence**: Mute preferences are stored strictly in client-side `localStorage` (`orbital_audio_muted`) without any external telemetry.

---

## 🎵 Sound Profiles & Math Formulas

| Sound Profile | Oscillator Type | Frequency Ramp | Duration | Used For |
|---|---|---|---|---|
| **`playHover`** | `sine` | $800\text{Hz} \to 1400\text{Hz}$ | 35ms | Button hovers, Command Palette navigation |
| **`playClick`** | `triangle` | $600\text{Hz} \to 1200\text{Hz}$ | 60ms | Button clicks, tab selections |
| **`playWarp`** | `sine` | $180\text{Hz} \to 540\text{Hz}$ | 200ms | Camera orbital flight, route navigation |
| **`playSwoop`** | `sine` | $350\text{Hz} \to 110\text{Hz}$ | 140ms | Modal dismissal, panel close |

---

## 📋 Adding a New Sound Effect

```typescript
// Pattern for adding a new synthesized procedural sound in lib/sound.ts
public playCustomTone() {
  if (this.isMuted || !this.ctx) return
  this.ensureContext()

  const osc = this.ctx.createOscillator()
  const gain = this.ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(440, this.ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.1)

  gain.gain.setValueAtTime(0.08, this.ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.1)

  osc.connect(gain)
  gain.connect(this.ctx.destination)

  osc.start()
  osc.stop(this.ctx.currentTime + 0.1)
}
```

---

## 🧪 Verification Commands

```bash
# Run sound manager unit tests
npm test tests/lib/sound.test.ts
```
