import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import ContinentBar from '@/components/ui/ContinentBar'
import { useSceneStore } from '@/components/providers/SceneStateProvider'
import { soundManager } from '@/lib/sound'

describe('ContinentBar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    const { setActiveNode, setIsTourActive, setTourIndex, setIsTourPaused } = useSceneStore.getState()
    setActiveNode(null)
    setIsTourActive(false)
    setTourIndex(0)
    setIsTourPaused(false)
  })

  it('renders Auto Tour and continent filter options', () => {
    render(<ContinentBar />)

    expect(screen.getByRole('button', { name: 'Start Guided 3D Earth Tour' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Filter by All Earth' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Filter by North America' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Filter by Europe' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Filter by Asia' })).toBeInTheDocument()
  })

  it('activates tour mode when Auto Tour button is clicked', () => {
    const warpSpy = vi.spyOn(soundManager, 'playWarp')
    render(<ContinentBar />)

    const tourBtn = screen.getByRole('button', { name: 'Start Guided 3D Earth Tour' })
    fireEvent.click(tourBtn)

    const state = useSceneStore.getState()
    expect(state.isTourActive).toBe(true)
    expect(state.tourIndex).toBe(0)
    expect(state.isTourPaused).toBe(false)
    expect(warpSpy).toHaveBeenCalled()
  })

  it('filters active node by continent when a continent button is clicked', () => {
    const clickSpy = vi.spyOn(soundManager, 'playClick')
    render(<ContinentBar />)

    const naButton = screen.getByRole('button', { name: 'Filter by North America' })
    fireEvent.click(naButton)

    const state = useSceneStore.getState()
    expect(state.activeNode).not.toBeNull()
    expect(state.activeNode?.continent).toBe('North America')
    expect(clickSpy).toHaveBeenCalled()
  })

  it('resets active node when All Earth is selected', () => {
    render(<ContinentBar />)

    // Select Europe first
    const europeButton = screen.getByRole('button', { name: 'Filter by Europe' })
    fireEvent.click(europeButton)
    expect(useSceneStore.getState().activeNode?.continent).toBe('Europe')

    // Select All Earth
    const allButton = screen.getByRole('button', { name: 'Filter by All Earth' })
    fireEvent.click(allButton)
    expect(useSceneStore.getState().activeNode).toBeNull()
  })
})
