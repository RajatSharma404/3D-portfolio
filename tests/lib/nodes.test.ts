import { describe, it, expect } from 'vitest'
import { NODES, GLOBE_ARCS, OrbitalNode } from '@/lib/nodes'

describe('NODES Dataset Integrity', () => {
  it('contains valid orbital nodes', () => {
    expect(NODES.length).toBeGreaterThan(0)
  })

  it('ensures all nodes have unique IDs', () => {
    const ids = NODES.map((node) => node.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('validates required fields for each node', () => {
    const validGeometries = ['icosahedron', 'octahedron', 'tetrahedron', 'dodecahedron', 'torus']

    NODES.forEach((node: OrbitalNode) => {
      expect(node.id).toBeTruthy()
      expect(node.label).toBeTruthy()
      expect(['project', 'contact']).toContain(node.type)
      expect(node.description).toBeTruthy()
      expect(Array.isArray(node.tech)).toBe(true)
      expect(node.tech.length).toBeGreaterThan(0)

      // Geometrical and orbital constraints
      expect(validGeometries).toContain(node.geometry)
      expect(typeof node.orbitRadius).toBe('number')
      expect(node.orbitRadius).toBeGreaterThan(0)
      expect(typeof node.orbitSpeed).toBe('number')
      expect(typeof node.orbitOffset).toBe('number')
      expect(typeof node.inclination).toBe('number')

      // Geographical constraints
      expect(node.lat).toBeGreaterThanOrEqual(-90)
      expect(node.lat).toBeLessThanOrEqual(90)
      expect(node.lng).toBeGreaterThanOrEqual(-180)
      expect(node.lng).toBeLessThanOrEqual(180)
      expect(node.city).toBeTruthy()
      expect(node.country).toBeTruthy()
      expect(node.continent).toBeTruthy()
    })
  })

  it('validates project metrics and technical categories when present', () => {
    NODES.forEach((node) => {
      if (node.metrics) {
        expect(Array.isArray(node.metrics)).toBe(true)
        node.metrics.forEach((metric) => {
          expect(metric.label).toBeTruthy()
          expect(metric.value).toBeTruthy()
        })
      }

      if (node.techCategories) {
        expect(Array.isArray(node.techCategories)).toBe(true)
        node.techCategories.forEach((cat) => {
          expect(cat.category).toBeTruthy()
          expect(Array.isArray(cat.skills)).toBe(true)
          expect(cat.skills.length).toBeGreaterThan(0)
        })
      }

      if (node.challenges) {
        expect(Array.isArray(node.challenges)).toBe(true)
        node.challenges.forEach((challenge) => {
          expect(challenge.trim().length).toBeGreaterThan(0)
        })
      }
    })
  })
})

describe('GLOBE_ARCS Dataset Integrity', () => {
  it('contains valid orbital globe arcs', () => {
    expect(GLOBE_ARCS.length).toBeGreaterThan(0)
  })

  it('validates coordinates, colors, and labels for all globe arcs', () => {
    GLOBE_ARCS.forEach((arc) => {
      expect(arc.label).toBeTruthy()
      expect(arc.color.length).toBe(2)
      expect(arc.color[0]).toMatch(/^#[0-9a-fA-F]{6}$/)
      expect(arc.color[1]).toMatch(/^#[0-9a-fA-F]{6}$/)

      expect(arc.startLat).toBeGreaterThanOrEqual(-90)
      expect(arc.startLat).toBeLessThanOrEqual(90)
      expect(arc.endLat).toBeGreaterThanOrEqual(-90)
      expect(arc.endLat).toBeLessThanOrEqual(90)

      expect(arc.startLng).toBeGreaterThanOrEqual(-180)
      expect(arc.startLng).toBeLessThanOrEqual(180)
      expect(arc.endLng).toBeGreaterThanOrEqual(-180)
      expect(arc.endLng).toBeLessThanOrEqual(180)
    })
  })
})
