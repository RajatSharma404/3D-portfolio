'use client'

import React from 'react'
import { create } from 'zustand'
import { OrbitalNode } from '@/lib/nodes'

export type ViewMode = 'globe' | 'orbital'

interface SceneState {
  activeNode: OrbitalNode | null
  setActiveNode: (node: OrbitalNode | null) => void
  hoveredNode: OrbitalNode | null
  setHoveredNode: (node: OrbitalNode | null) => void
  activeNodeWorldPos: [number, number, number]
  setActiveNodeWorldPos: (pos: [number, number, number]) => void
  isLoaded: boolean
  setIsLoaded: (v: boolean) => void
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
}

export const useSceneStore = create<SceneState>()((set) => ({
  activeNode: null,
  setActiveNode: (node) => set({ activeNode: node }),
  hoveredNode: null,
  setHoveredNode: (node) => set({ hoveredNode: node }),
  activeNodeWorldPos: [0, 0, 0],
  setActiveNodeWorldPos: (pos) => set({ activeNodeWorldPos: pos }),
  isLoaded: false,
  setIsLoaded: (v) => set({ isLoaded: v }),
  viewMode: 'globe',
  setViewMode: (mode) => set({ viewMode: mode })
}))

export default function SceneStateProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
