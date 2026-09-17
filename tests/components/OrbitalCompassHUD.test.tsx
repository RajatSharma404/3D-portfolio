import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import OrbitalCompassHUD from '@/components/ui/OrbitalCompassHUD'
import { useSceneStore } from '@/components/providers/SceneStateProvider'
import { NODES } from '@/lib/nodes'

describe('OrbitalCompassHUD Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    const { setActiveNode, setHoveredNode, setCameraPov } = useSceneStore.getState()
    setActiveNode(null)
    setHoveredNode(null)
    setCameraPov({ lat: 0, lng: 0, altitude: 2.1 })
  })

  it('renders compass header and telemetry readout', () => {
    render(<OrbitalCompassHUD />)

    expect(screen.getByText(/ORBITAL COMPASS & TELEMETRY/i)).toBeInTheDocument()
    expect(screen.getByText(/SPHERICAL DISTANCE/i)).toBeInTheDocument()
    expect(screen.getByText(/BEARING AZIMUTH/i)).toBeInTheDocument()
    expect(screen.getByText(/POV COORDS/i)).toBeInTheDocument()
  })

  it('calculates spherical distance and bearing when an active node is selected', () => {
    const testNode = NODES[0] // Flow (USA, lat: 39.82, lng: -98.57)
    useSceneStore.getState().setActiveNode(testNode)

    render(<OrbitalCompassHUD />)

    expect(screen.getByText(new RegExp(`${testNode.label} \\(${testNode.country}\\)`, 'i'))).toBeInTheDocument()
    expect(screen.getAllByText(/km/i).length).toBeGreaterThanOrEqual(1)
  })

  it('minimizes and expands when minimize button is clicked', () => {
    render(<OrbitalCompassHUD />)

    const toggleBtn = screen.getByRole('button', { name: 'Minimize Orbital Compass' })
    fireEvent.click(toggleBtn)

    // Body content hidden
    expect(screen.queryByText(/SPHERICAL DISTANCE/i)).not.toBeInTheDocument()

    // Expand again
    const expandBtn = screen.getByRole('button', { name: 'Expand Orbital Compass' })
    fireEvent.click(expandBtn)
    expect(screen.getByText(/SPHERICAL DISTANCE/i)).toBeInTheDocument()
  })
})
