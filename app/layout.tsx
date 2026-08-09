import React from 'react'
import type { Metadata } from 'next'
import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/700.css'
import '@fontsource/space-mono/400.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rajat Sharma — Software Engineer & Builder',
  description: 'Interactive 3D Portfolio showcasing full-stack applications, AI integrations, and high-concurrency systems built by Rajat Sharma.',
  openGraph: {
    title: 'Rajat Sharma — 3D Portfolio',
    description: 'Explore full-stack, AI, and 3D web applications engineered by Rajat Sharma.',
    type: 'website'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased dark">
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
