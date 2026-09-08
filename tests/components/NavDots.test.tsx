import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import * as navigation from 'next/navigation'
import NavDots from '@/components/ui/NavDots'
import { NODES } from '@/lib/nodes'
import { useSceneStore } from '@/components/providers/SceneStateProvider'

describe('NavDots Component', () => {
  const pushMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    useSceneStore.getState().setActiveNode(null)
    vi.spyOn(navigation, 'useRouter').mockReturnValue({
      push: pushMock,
      replace: vi.fn(),
      back: vi.fn(),
      prefetch: vi.fn()
    } as any)
  })

  it('renders navigation buttons for each node in NODES', () => {
    render(<NavDots />)

    NODES.forEach((node) => {
      const button = screen.getByRole('button', { name: `Jump to ${node.label} project` })
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('title', node.label)
    })
  })

  it('navigates to the corresponding project route when clicked', () => {
    render(<NavDots />)

    const targetNode = NODES[0]
    const button = screen.getByRole('button', { name: `Jump to ${targetNode.label} project` })
    fireEvent.click(button)

    expect(pushMock).toHaveBeenCalledWith(`/projects/${targetNode.id}`)
  })

  it('sets aria-current on the currently active project dot', () => {
    const activeNode = NODES[1]
    useSceneStore.getState().setActiveNode(activeNode)

    render(<NavDots />)

    const activeButton = screen.getByRole('button', { name: `Jump to ${activeNode.label} project` })
    expect(activeButton).toHaveAttribute('aria-current', 'true')

    const inactiveButton = screen.getByRole('button', { name: `Jump to ${NODES[0].label} project` })
    expect(inactiveButton).not.toHaveAttribute('aria-current')
  })
})
