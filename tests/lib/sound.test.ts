import { describe, it, expect, beforeEach } from 'vitest'
import { soundManager } from '@/lib/sound'

describe('Procedural Sound Engine', () => {
  beforeEach(() => {
    localStorage.clear()
    if (soundManager.getIsMuted()) {
      soundManager.toggleMute()
    }
  })

  it('starts unmuted by default when localStorage is empty', () => {
    expect(soundManager.getIsMuted()).toBe(false)
  })

  it('toggles mute state and persists preference in localStorage', () => {
    const isMutedNow = soundManager.toggleMute()
    expect(isMutedNow).toBe(true)
    expect(soundManager.getIsMuted()).toBe(true)
    expect(localStorage.getItem('orbital_audio_muted')).toBe('true')

    const isUnmutedNow = soundManager.toggleMute()
    expect(isUnmutedNow).toBe(false)
    expect(soundManager.getIsMuted()).toBe(false)
    expect(localStorage.getItem('orbital_audio_muted')).toBe('false')
  })

  it('executes sound synthesizers without errors when unmuted', () => {
    expect(() => soundManager.playHover(0.5)).not.toThrow()
    expect(() => soundManager.playClick(-0.2)).not.toThrow()
    expect(() => soundManager.playWarp()).not.toThrow()
    expect(() => soundManager.playSwoop(0.1)).not.toThrow()
    expect(() => soundManager.playTourBeacon(0)).not.toThrow()
    expect(() => soundManager.playKeypress()).not.toThrow()
  })

  it('bypasses audio generation completely when muted', () => {
    soundManager.toggleMute()
    expect(soundManager.getIsMuted()).toBe(true)

    // Should return early and not throw
    expect(() => {
      soundManager.playHover()
      soundManager.playClick()
      soundManager.playWarp()
      soundManager.playSwoop()
      soundManager.playTourBeacon()
      soundManager.playKeypress()
    }).not.toThrow()
  })
})
