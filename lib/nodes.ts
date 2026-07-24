export interface OrbitalNode {
  id: string
  label: string
  type: 'project' | 'contact'
  description: string
  tech: string[]
  url?: string
  orbitRadius: number
  orbitSpeed: number
  orbitOffset: number
  inclination: number
  geometry: 'icosahedron' | 'octahedron' | 'tetrahedron' | 'dodecahedron' | 'torus'
}

export const NODES: OrbitalNode[] = [
  {
    id: 'flow',
    label: 'Flow',
    type: 'project',
    description: 'An AI expense tracker that understands natural language. Built with the Gemini API for receipt parsing and Prisma for persistent multi-account ledgering.',
    tech: ['Next.js 15', 'Gemini API', 'Prisma', 'PostgreSQL'],
    orbitRadius: 3.4,
    orbitSpeed: 0.42,
    orbitOffset: 0,
    inclination: 0.22,
    geometry: 'icosahedron',
    url: 'https://github.com/RajatSharma404/flow'
  },
  {
    id: 'mastermind',
    label: 'MasterMind',
    type: 'project',
    description: 'Chess analysis platform powered by Stockfish 17 and Gemini 2.0 Flash. Classifies moves, draws evaluation graphs, and explains positions in plain language.',
    tech: ['Next.js', 'FastAPI', 'Stockfish 17', 'Gemini 2.0 Flash'],
    orbitRadius: 4.1,
    orbitSpeed: 0.34,
    orbitOffset: 1.2,
    inclination: 0.55,
    geometry: 'octahedron',
    url: 'https://github.com/RajatSharma404/mastermind'
  },
  {
    id: 'mocktest365',
    label: 'MockTest365',
    type: 'project',
    description: 'High-concurrency exam prep platform built for 10,000+ simultaneous test-takers. Engineered with RabbitMQ queues, Redis caching, and Aurora PostgreSQL under AWS Lambda.',
    tech: ['AWS Lambda', 'RabbitMQ', 'Redis', 'Aurora PostgreSQL'],
    orbitRadius: 4.9,
    orbitSpeed: 0.28,
    orbitOffset: 2.5,
    inclination: -0.35,
    geometry: 'dodecahedron',
    url: 'https://github.com/RajatSharma404/mocktest365'
  },
  {
    id: 'dsa-city',
    label: 'DSA City',
    type: 'project',
    description: 'A gamified 3D leaderboard platform for data structures and algorithms. Duolingo-style progression system with level gating and visual city building.',
    tech: ['Three.js', 'Next.js', 'PostgreSQL'],
    orbitRadius: 3.8,
    orbitSpeed: 0.46,
    orbitOffset: 3.9,
    inclination: 0.72,
    geometry: 'tetrahedron',
    url: 'https://github.com/RajatSharma404/dsa-city'
  },
  {
    id: 'dsa-tracker',
    label: 'DSA Tracker Pro',
    type: 'project',
    description: 'A DSA problem tracker with Monaco editor integration, AI-generated hints, and a browser extension that syncs your LeetCode submissions automatically.',
    tech: ['Monaco Editor', 'Next.js', 'Chrome Extension API', 'Gemini API'],
    orbitRadius: 5.2,
    orbitSpeed: 0.32,
    orbitOffset: 0.8,
    inclination: -0.6,
    geometry: 'icosahedron',
    url: 'https://github.com/RajatSharma404/dsa-tracker-pro'
  },
  {
    id: 'countries-quiz',
    label: 'Countries Quiz',
    type: 'project',
    description: 'Interactive world geography quiz built on a live SVG world map. Click countries directly on the map — no multiple choice, just pure spatial memory.',
    tech: ['Leaflet.js', 'D3.js', 'GeoJSON', 'Next.js'],
    orbitRadius: 4.5,
    orbitSpeed: 0.38,
    orbitOffset: 5.1,
    inclination: 0.15,
    geometry: 'torus',
    url: 'https://github.com/RajatSharma404/countries-quiz'
  },
  {
    id: 'body-planner',
    label: 'Body Planner',
    type: 'project',
    description: 'Adaptive fitness planning app that generates personalised weekly programs with Gemini AI, visualised as a ReactFlow node graph that evolves with your progress.',
    tech: ['Next.js 15', 'ReactFlow', 'Recharts', 'Gemini AI'],
    orbitRadius: 5.8,
    orbitSpeed: 0.3,
    orbitOffset: 2.0,
    inclination: -0.18,
    geometry: 'octahedron',
    url: 'https://github.com/RajatSharma404/body-planner'
  }
]
