'use client'

import React from 'react'
import { create } from 'zustand'
import { OrbitalNode } from '@/lib/nodes'

interface SceneState {
  activeNode: OrbitalNode | null
  setActiveNode: (node: OrbitalNode | null) => void
  hoveredNode: OrbitalNode | null
  setHoveredNode: (node: OrbitalNode | null) => void
  isLoaded: boolean
  setIsLoaded: (v: boolean) => void
  isZoomedOut: boolean
  setIsZoomedOut: (v: boolean) => void
  isTourActive: boolean
  setIsTourActive: (v: boolean) => void
  tourIndex: number
  setTourIndex: (idx: number) => void
  isTourPaused: boolean
  setIsTourPaused: (v: boolean) => void
}

export const useSceneStore = create<SceneState>()((set) => ({
  activeNode: null,
  setActiveNode: (node) => set({ activeNode: node }),
  hoveredNode: null,
  setHoveredNode: (node) => set({ hoveredNode: node }),
  isLoaded: false,
  setIsLoaded: (v) => set({ isLoaded: v }),
  isZoomedOut: false,
  setIsZoomedOut: (v) => set({ isZoomedOut: v }),
  isTourActive: false,
  setIsTourActive: (v) => set({ isTourActive: v }),
  tourIndex: 0,
  setTourIndex: (idx) => set({ tourIndex: idx }),
  isTourPaused: false,
  setIsTourPaused: (v) => set({ isTourPaused: v })
}))

export default function SceneStateProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
