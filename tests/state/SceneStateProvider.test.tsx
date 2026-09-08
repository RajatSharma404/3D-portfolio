import { describe, it, expect, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import SceneStateProvider, { useSceneStore } from '@/components/providers/SceneStateProvider'
import { NODES } from '@/lib/nodes'

describe('Scene State Store (Zustand)', () => {
  beforeEach(() => {
    // Reset Zustand store to clean initial state
    const {
      setActiveNode,
      setHoveredNode,
      setIsLoaded,
      setIsZoomedOut,
      setIsTourActive,
      setTourIndex,
      setIsTourPaused
    } = useSceneStore.getState()

    setActiveNode(null)
    setHoveredNode(null)
    setIsLoaded(false)
    setIsZoomedOut(false)
    setIsTourActive(false)
    setTourIndex(0)
    setIsTourPaused(false)
  })

  it('initializes with default scene parameters', () => {
    const state = useSceneStore.getState()
    expect(state.activeNode).toBeNull()
    expect(state.hoveredNode).toBeNull()
    expect(state.isLoaded).toBe(false)
    expect(state.isZoomedOut).toBe(false)
    expect(state.isTourActive).toBe(false)
    expect(state.tourIndex).toBe(0)
    expect(state.isTourPaused).toBe(false)
  })

  it('updates active and hovered nodes', () => {
    const sampleNode = NODES[0]
    const { setActiveNode, setHoveredNode } = useSceneStore.getState()

    setActiveNode(sampleNode)
    expect(useSceneStore.getState().activeNode).toEqual(sampleNode)

    setHoveredNode(sampleNode)
    expect(useSceneStore.getState().hoveredNode).toEqual(sampleNode)

    setActiveNode(null)
    expect(useSceneStore.getState().activeNode).toBeNull()
  })

  it('controls tour playback and state progression', () => {
    const { setIsTourActive, setTourIndex, setIsTourPaused } = useSceneStore.getState()

    setIsTourActive(true)
    expect(useSceneStore.getState().isTourActive).toBe(true)

    setTourIndex(3)
    expect(useSceneStore.getState().tourIndex).toBe(3)

    setIsTourPaused(true)
    expect(useSceneStore.getState().isTourPaused).toBe(true)
  })

  it('renders SceneStateProvider wrapper children without error', () => {
    const { getByText } = render(
      <SceneStateProvider>
        <div>Scene Canvas Child</div>
      </SceneStateProvider>
    )
    expect(getByText('Scene Canvas Child')).toBeInTheDocument()
  })
})
