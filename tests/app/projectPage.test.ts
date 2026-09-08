import { describe, it, expect } from 'vitest'
import { generateStaticParams, generateMetadata } from '@/app/projects/[id]/page'
import { NODES } from '@/lib/nodes'

describe('Project Static Generation and Metadata', () => {
  describe('generateStaticParams', () => {
    it('generates parameters for all defined orbital project nodes', async () => {
      const params = await generateStaticParams()
      expect(params).toHaveLength(NODES.length)
      expect(params.map((p) => p.id)).toEqual(NODES.map((n) => n.id))
    })
  })

  describe('generateMetadata', () => {
    it('generates rich SEO and OpenGraph metadata for a valid project ID', async () => {
      const targetNode = NODES[0]
      const metadata = await generateMetadata({
        params: Promise.resolve({ id: targetNode.id })
      })

      expect(metadata.title).toBe(`${targetNode.label} — ${targetNode.continent} Case Study | Rajat Sharma`)
      expect(metadata.description).toBe(targetNode.longDescription || targetNode.description)
      expect(metadata.keywords).toContain(targetNode.label)
      expect(metadata.keywords).toContain(targetNode.continent)
      expect(metadata.openGraph?.title).toBe(`${targetNode.label} — Engineering Case Study by Rajat Sharma`)
      expect(metadata.twitter?.creator).toBe('@RajatSharma404')
    })

    it('returns fallback metadata when project ID does not exist', async () => {
      const metadata = await generateMetadata({
        params: Promise.resolve({ id: 'non-existent-project' })
      })

      expect(metadata.title).toBe('Project Not Found — Rajat Sharma Portfolio')
    })
  })
})
