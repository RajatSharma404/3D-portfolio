import { OrbitalNode } from './nodes'

export function calcNodePosition(
  node: OrbitalNode,
  time: number
): [number, number, number] {
  const angle = time + node.orbitOffset

  const x = Math.cos(angle) * node.orbitRadius
  const z = Math.sin(angle) * node.orbitRadius * 0.38

  const y = z * Math.sin(node.inclination)
  const zFinal = z * Math.cos(node.inclination)

  return [x, y, zFinal]
}

export function calcRingPoints(node: OrbitalNode, segments = 128): [number, number, number][] {
  return Array.from({ length: segments + 1 }, (_, i) => {
    const angle = (i / segments) * Math.PI * 2
    const x = Math.cos(angle) * node.orbitRadius
    const z = Math.sin(angle) * node.orbitRadius * 0.38
    const y = z * Math.sin(node.inclination)
    const zFinal = z * Math.cos(node.inclination)
    return [x, y, zFinal] as [number, number, number]
  })
}
