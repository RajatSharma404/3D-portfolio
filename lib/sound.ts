'use client'

/**
 * Advanced Procedural Web Audio Synthesizer Engine
 * Features spatial stereo panning, multi-oscillator harmonic layering,
 * Doppler warp swooshes, sonar radar beacons, and mechanical UI key clicks.
 */

class SoundManager {
  private ctx: AudioContext | null = null
  private muted: boolean = false

  constructor() {
    if (typeof window !== 'undefined') {
      const storedMuted = localStorage.getItem('orbital_audio_muted')
      this.muted = storedMuted === 'true'
    }
  }

  private initCtx(): AudioContext | null {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {
        // Safe fallback: AudioContext remains suspended until explicit user interaction
      })
    }
    return this.ctx
  }

  private createPanner(pan: number = 0): AudioNode | null {
    if (!this.ctx) return null
    try {
      if (this.ctx.createStereoPanner) {
        const panner = this.ctx.createStereoPanner()
        const clampedPan = Math.max(-1, Math.min(1, pan))
        panner.pan.setValueAtTime(clampedPan, this.ctx.currentTime)
        return panner
      }
    } catch {
      // Fall back if createStereoPanner is unsupported
    }
    return null
  }

  public getIsMuted(): boolean {
    return this.muted
  }

  public toggleMute(): boolean {
    this.muted = !this.muted
    if (typeof window !== 'undefined') {
      localStorage.setItem('orbital_audio_muted', String(this.muted))
    }
    return this.muted
  }

  /**
   * 1. Holographic Crystal Hover Chime (Dual Oscillator + Spatial Panning)
   */
  public playHover(pan: number = 0) {
    if (this.muted) return
    try {
      const ctx = this.initCtx()
      if (!ctx) return

      const now = ctx.currentTime
      const osc1 = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      const gain = ctx.createGain()
      const panner = this.createPanner(pan)

      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(880, now)
      osc1.frequency.exponentialRampToValueAtTime(1760, now + 0.035)

      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(1320, now)
      osc2.frequency.exponentialRampToValueAtTime(2640, now + 0.035)

      gain.gain.setValueAtTime(0.045, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045)

      osc1.connect(gain)
      osc2.connect(gain)

      if (panner) {
        gain.connect(panner)
        panner.connect(ctx.destination)
      } else {
        gain.connect(ctx.destination)
      }

      osc1.start(now)
      osc2.start(now)
      osc1.stop(now + 0.05)
      osc2.stop(now + 0.05)
    } catch {
      // Browser autoplay policy catch
    }
  }

  /**
   * 2. Mechanical Shutter Click (High-Frequency Transient + Sub-Acoustic Pop)
   */
  public playClick(pan: number = 0) {
    if (this.muted) return
    try {
      const ctx = this.initCtx()
      if (!ctx) return

      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const subOsc = ctx.createOscillator()
      const gain = ctx.createGain()
      const panner = this.createPanner(pan)

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(950, now)
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.04)

      subOsc.type = 'sine'
      subOsc.frequency.setValueAtTime(160, now)
      subOsc.frequency.exponentialRampToValueAtTime(60, now + 0.04)

      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055)

      osc.connect(gain)
      subOsc.connect(gain)

      if (panner) {
        gain.connect(panner)
        panner.connect(ctx.destination)
      } else {
        gain.connect(ctx.destination)
      }

      osc.start(now)
      subOsc.start(now)
      osc.stop(now + 0.06)
      subOsc.stop(now + 0.06)
    } catch {
      // Catch audio block
    }
  }

  /**
   * 3. Doppler Warp Swoosh (Sub-Bass 80Hz + Sweeping Bandpass Resonance)
   */
  public playWarp(pan: number = 0) {
    if (this.muted) return
    try {
      const ctx = this.initCtx()
      if (!ctx) return

      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const subRumble = ctx.createOscillator()
      const filter = ctx.createBiquadFilter()
      const gain = ctx.createGain()
      const panner = this.createPanner(pan)

      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(140, now)
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.15)

      subRumble.type = 'sine'
      subRumble.frequency.setValueAtTime(80, now)
      subRumble.frequency.exponentialRampToValueAtTime(40, now + 0.22)

      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(300, now)
      filter.frequency.exponentialRampToValueAtTime(1200, now + 0.15)
      filter.Q.setValueAtTime(3.5, now)

      gain.gain.setValueAtTime(0.07, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22)

      osc.connect(filter)
      filter.connect(gain)
      subRumble.connect(gain)

      if (panner) {
        gain.connect(panner)
        panner.connect(ctx.destination)
      } else {
        gain.connect(ctx.destination)
      }

      osc.start(now)
      subRumble.start(now)
      osc.stop(now + 0.23)
      subRumble.stop(now + 0.23)
    } catch {
      // Catch audio block
    }
  }

  /**
   * 4. High-Pass Spatial Air Swoop (Modal & Page Transition Glide)
   */
  public playSwoop(pan: number = 0) {
    if (this.muted) return
    try {
      const ctx = this.initCtx()
      if (!ctx) return

      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const panner = this.createPanner(pan)

      osc.type = 'sine'
      osc.frequency.setValueAtTime(420, now)
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.14)

      gain.gain.setValueAtTime(0.06, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16)

      osc.connect(gain)

      if (panner) {
        gain.connect(panner)
        panner.connect(ctx.destination)
      } else {
        gain.connect(ctx.destination)
      }

      osc.start(now)
      osc.stop(now + 0.16)
    } catch {
      // Catch audio block
    }
  }

  /**
   * 5. Dual-Tone Sonar Radar Beacon (Node Lock & Tour Stop Ping)
   */
  public playTourBeacon(pan: number = 0) {
    if (this.muted) return
    try {
      const ctx = this.initCtx()
      if (!ctx) return

      const now = ctx.currentTime
      const ping1 = ctx.createOscillator()
      const ping2 = ctx.createOscillator()
      const gain = ctx.createGain()
      const panner = this.createPanner(pan)

      ping1.type = 'sine'
      ping1.frequency.setValueAtTime(1200, now)
      ping1.frequency.exponentialRampToValueAtTime(1200, now + 0.18)

      ping2.type = 'sine'
      ping2.frequency.setValueAtTime(2400, now)
      ping2.frequency.exponentialRampToValueAtTime(2400, now + 0.18)

      gain.gain.setValueAtTime(0.055, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28)

      ping1.connect(gain)
      ping2.connect(gain)

      if (panner) {
        gain.connect(panner)
        panner.connect(ctx.destination)
      } else {
        gain.connect(ctx.destination)
      }

      ping1.start(now)
      ping2.start(now)
      ping1.stop(now + 0.3)
      ping2.stop(now + 0.3)
    } catch {
      // Catch audio block
    }
  }

  /**
   * 6. Low-Latency Mechanical Keypress Click (CLI Terminal Feedback)
   */
  public playKeypress(pan: number = 0) {
    if (this.muted) return
    try {
      const ctx = this.initCtx()
      if (!ctx) return

      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const panner = this.createPanner(pan)

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(620 + Math.random() * 80, now)
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.02)

      gain.gain.setValueAtTime(0.035, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025)

      osc.connect(gain)

      if (panner) {
        gain.connect(panner)
        panner.connect(ctx.destination)
      } else {
        gain.connect(ctx.destination)
      }

      osc.start(now)
      osc.stop(now + 0.028)
    } catch {
      // Catch audio block
    }
  }
}

export const soundManager = new SoundManager()
