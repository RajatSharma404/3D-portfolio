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
  lat: number
  lng: number
  city: string
  country: string
  continent: string
}

export interface GlobeArc {
  startLat: number
  startLng: number
  endLat: number
  endLng: number
  color: [string, string]
  label: string
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
    url: 'https://github.com/RajatSharma404/flow',
    lat: 39.8283,
    lng: -98.5795,
    city: 'Geographic Center',
    country: 'USA',
    continent: 'North America'
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
    url: 'https://github.com/RajatSharma404/countries-quiz',
    lat: -14.2350,
    lng: -51.9253,
    city: 'Geographic Center',
    country: 'Brazil',
    continent: 'South America'
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
    url: 'https://github.com/RajatSharma404/mastermind',
    lat: 51.1657,
    lng: 10.4515,
    city: 'Geographic Center',
    country: 'Germany',
    continent: 'Europe'
  },
  {
    id: 'dsa-tracker',
    label: 'DSA Tracker Pro',
    type: 'project',
    description: 'A DSA problem tracker with Monaco editor integration, AI-generated hints, and automatic LeetCode submission syncing. Integrated with DSA City for gamified practice.',
    tech: ['Monaco Editor', 'Next.js', 'Chrome Extension API', 'Gemini API'],
    orbitRadius: 5.2,
    orbitSpeed: 0.32,
    orbitOffset: 0.8,
    inclination: -0.6,
    geometry: 'icosahedron',
    url: 'https://github.com/RajatSharma404/dsa-tracker-pro',
    lat: 7.1881,
    lng: 21.0936,
    city: 'Geographic Center',
    country: 'CAR',
    continent: 'Africa'
  },
  {
    id: 'dsa-city',
    label: 'DSA City',
    type: 'project',
    description: 'A gamified 3D leaderboard platform for data structures and algorithms. Duolingo-style progression system with level gating, companion to DSA Tracker Pro.',
    tech: ['Three.js', 'Next.js', 'PostgreSQL'],
    orbitRadius: 3.8,
    orbitSpeed: 0.46,
    orbitOffset: 3.9,
    inclination: 0.72,
    geometry: 'tetrahedron',
    url: 'https://github.com/RajatSharma404/dsa-city',
    lat: 20.5937,
    lng: 78.9629,
    city: 'Geographic Center',
    country: 'India',
    continent: 'Asia'
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
    url: 'https://github.com/RajatSharma404/body-planner',
    lat: -25.2744,
    lng: 133.7751,
    city: 'Geographic Center',
    country: 'Australia',
    continent: 'Australia & Oceania'
  }
]

export const GLOBE_ARCS: GlobeArc[] = [
  {
    startLat: 39.8283,
    startLng: -98.5795,
    endLat: -14.2350,
    endLng: -51.9253,
    color: ['#00f2fe', '#4facfe'],
    label: 'North America → South America'
  },
  {
    startLat: -14.2350,
    startLng: -51.9253,
    endLat: 51.1657,
    endLng: 10.4515,
    color: ['#4facfe', '#00c6ff'],
    label: 'South America → Europe'
  },
  {
    startLat: 51.1657,
    startLng: 10.4515,
    endLat: 7.1881,
    endLng: 21.0936,
    color: ['#00c6ff', '#38bdf8'],
    label: 'Europe → Africa'
  },
  {
    startLat: 7.1881,
    startLng: 21.0936,
    endLat: 20.5937,
    endLng: 78.9629,
    color: ['#38bdf8', '#00f2fe'],
    label: 'Africa → Asia'
  },
  {
    startLat: 20.5937,
    startLng: 78.9629,
    endLat: -25.2744,
    endLng: 133.7751,
    color: ['#00f2fe', '#38bdf8'],
    label: 'Asia → Australia & Oceania'
  },
  {
    startLat: -25.2744,
    startLng: 133.7751,
    endLat: 39.8283,
    endLng: -98.5795,
    color: ['#38bdf8', '#4facfe'],
    label: 'Australia & Oceania → North America'
  }
]
