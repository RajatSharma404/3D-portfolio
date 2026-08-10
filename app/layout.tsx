import React from 'react'
import type { Metadata } from 'next'
import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/700.css'
import '@fontsource/space-mono/400.css'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-chi-self-31.vercel.app'),
  title: 'Rajat Sharma — Interactive 3D Earth Portfolio',
  description: 'Interactive 3D Earth Portfolio showcasing full-stack applications, AI integrations, and WebGL graphics built by Rajat Sharma (Co-Founder @ Pradite™).',
  keywords: [
    'Rajat Sharma',
    'Full Stack Developer',
    'Software Engineer',
    'Next.js 15',
    'Three.js',
    '3D Earth Portfolio',
    'Gemini 2.0 Flash API',
    'Prisma ORM',
    'PostgreSQL',
    'React 19',
    'TypeScript',
    'Pradite'
  ],
  authors: [{ name: 'Rajat Sharma', url: 'https://pradite.com' }],
  creator: 'Rajat Sharma',
  openGraph: {
    title: 'Rajat Sharma — Interactive 3D Earth Portfolio',
    description: 'Explore full-stack, AI, and 3D web applications engineered by Rajat Sharma on an interactive 3D WebGL Earth globe.',
    url: 'https://portfolio-chi-self-31.vercel.app',
    siteName: 'Rajat Sharma 3D Portfolio',
    images: [
      {
        url: '/textures/earth-blue-marble.jpg',
        width: 1200,
        height: 630,
        alt: 'Rajat Sharma 3D Earth Portfolio'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rajat Sharma — Interactive 3D Earth Portfolio',
    description: 'Explore full-stack, AI, and 3D web applications engineered by Rajat Sharma on an interactive 3D WebGL Earth globe.',
    creator: '@RajatSharma404',
    images: ['/textures/earth-blue-marble.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

const jsonLdData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Rajat Sharma',
  jobTitle: 'Full-Stack Software Engineer & Co-Founder',
  worksFor: {
    '@type': 'Organization',
    name: 'Pradite™'
  },
  url: 'https://pradite.com',
  sameAs: [
    'https://github.com/RajatSharma404',
    'https://www.linkedin.com/in/rajat-sharma-9a053128b/',
    'https://x.com/RajatSharma404',
    'https://leetcode.com/u/RajatSharma404/'
  ]
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          background: '#050508',
          color: '#ffffff',
          margin: 0,
          overflowX: 'hidden',
          overflowY: 'auto'
        }}
      >
        {children}
      </body>
    </html>
  )
}
