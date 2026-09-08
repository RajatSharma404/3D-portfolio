import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import SoundToggle from '@/components/ui/SoundToggle'
import { soundManager } from '@/lib/sound'

describe('SoundToggle Component', () => {
  beforeEach(() => {
    localStorage.clear()
    if (soundManager.getIsMuted()) {
      soundManager.toggleMute()
    }
    vi.clearAllMocks()
  })

  it('renders spatial audio button in unmuted state by default', () => {
    render(<SoundToggle />)

    const button = screen.getByRole('button', { name: /mute sci-fi spatial audio effects/i })
    expect(button).toBeInTheDocument()
    expect(screen.getByText('Spatial Audio')).toBeInTheDocument()
    expect(screen.getByText('🔊')).toBeInTheDocument()
  })

  it('toggles to muted state when clicked and updates accessible attributes', () => {
    render(<SoundToggle />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(soundManager.getIsMuted()).toBe(true)
    expect(screen.getByRole('button', { name: /unmute sci-fi spatial audio effects/i })).toBeInTheDocument()
    expect(screen.getByText('Spatial Muted')).toBeInTheDocument()
    expect(screen.getByText('🔇')).toBeInTheDocument()
  })

  it('plays audio beacon when unmuting', () => {
    // Mute first
    soundManager.toggleMute()
    const beaconSpy = vi.spyOn(soundManager, 'playTourBeacon')

    render(<SoundToggle />)
    const button = screen.getByRole('button')
    fireEvent.click(button) // Unmute

    expect(beaconSpy).toHaveBeenCalledWith(0)
  })
})
