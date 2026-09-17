'use client'

import React from 'react'
import { create } from 'zustand'
import { OrbitalNode } from '@/lib/nodes'

export interface CameraPOV {
  lat: number
  lng: number
  altitude: number
}

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
  cameraPov: CameraPOV
  setCameraPov: (pov: CameraPOV) => void
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
  setIsTourPaused: (v) => set({ isTourPaused: v }),
  cameraPov: { lat: -15, lng: 130, altitude: 2.1 },
  setCameraPov: (pov) => set({ cameraPov: pov })
}))

export default function SceneStateProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
