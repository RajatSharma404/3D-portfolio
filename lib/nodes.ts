export interface OrbitalNode {
  id: string
  label: string
  type: 'project' | 'contact'
  description: string
  longDescription?: string
  keyFeatures?: string[]
  architecture?: string
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
    longDescription: 'Flow transforms raw receipts, bank statements, and natural-language inputs into structured ledger transactions. Leveraging Google Gemini API, it parses messy text and images into categorized financial records with automated tax estimation, multi-currency conversion, and zero-latency local caching.',
    keyFeatures: [
      'Natural-language expense logging via Google Gemini 2.0 Flash API',
      'Automated receipt image OCR & instant category classification',
      'Multi-account ledgering powered by Prisma ORM and PostgreSQL',
      'Interactive spending analytics charts and budget goal alerts'
    ],
    architecture: 'Next.js 15 App Router frontend with server actions, Prisma ORM communicating with PostgreSQL database, and Gemini API for unstructured financial parsing.',
    tech: ['Next.js 15', 'Gemini API', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'TypeScript'],
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
    longDescription: 'A pure spatial geography challenge application rendered using D3.js and GeoJSON maps. Users are tested on world geography by clicking exact country borders directly on an interactive SVG vector globe without any multiple-choice hints, tracking accuracy speed and global streaks.',
    keyFeatures: [
      'Interactive GeoJSON world map with pixel-precise D3.js projection rendering',
      'Zero multiple choice — click countries directly to test spatial memory',
      'Timed geography challenges with streak leaderboards & accuracy tracking',
      'Optimized SVG path rendering maintaining 60fps pan/zoom performance'
    ],
    architecture: 'Next.js frontend integrated with Leaflet.js map layers, GeoJSON topology datasets, and D3.js path projection generators.',
    tech: ['Leaflet.js', 'D3.js', 'GeoJSON', 'Next.js', 'Tailwind CSS', 'TypeScript'],
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
    longDescription: 'MasterMind bridges deep evaluation engines with natural language explanations. Powered by Stockfish 17 compiled to WebAssembly and Gemini 2.0 Flash, it analyses PGN games, calculates win probabilities, identifies blunders, and provides grandmaster-level positional commentary in simple terms.',
    keyFeatures: [
      'Stockfish 17 engine integration for deep evaluation graph generation',
      'Gemini 2.0 Flash position breakdown & blunder explanation',
      'Interactive PGN reader with move-by-move evaluation advantage bar',
      'FastAPI microservice backend for high-speed engine analysis requests'
    ],
    architecture: 'Next.js frontend with WebAssembly Stockfish engine worker, communicating with a FastAPI backend service powering Gemini LLM prompt pipelines.',
    tech: ['Next.js', 'FastAPI', 'Stockfish 17', 'Gemini 2.0 Flash', 'WebAssembly', 'Python'],
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
    longDescription: 'DSA Tracker Pro is a comprehensive algorithm practice platform featuring embedded VS Code-grade Monaco Editor, AI execution tracing, and a custom Chrome Extension that automatically syncs LeetCode submissions (verdicts, runtimes, memory, and code snippets) directly into your personal dashboard.',
    keyFeatures: [
      'Monaco Editor integration supporting C++, Python, Java, and TypeScript',
      'AI hint trace generation endpoints for step-by-step problem guidance',
      'Chrome Extension API sync for automatic LeetCode submission logging',
      'Spaced-repetition review queue ensuring long-term algorithm mastery'
    ],
    architecture: 'Monorepo architecture featuring Next.js 16 client, Express 5 backend REST API, Prisma ORM on PostgreSQL, and custom Chrome Extension content scripts.',
    tech: ['Monaco Editor', 'Next.js 16', 'Express 5', 'Chrome Extension API', 'Gemini API', 'Prisma', 'PostgreSQL'],
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
    longDescription: 'DSA City turns algorithmic problem-solving into a 3D city-building simulation. As users solve coding problems and maintain daily streaks on DSA Tracker Pro, their 3D city evolves with new skyscrapers, glowing data highways, and unlocked districts visualised using Three.js canvas WebGL.',
    keyFeatures: [
      'Procedural 3D city generator rendering structures based on solved problem counts',
      'Gamified Duolingo-style skill progression with level gating and XP multipliers',
      'Real-time global multiplayer leaderboard with streak shields & badges',
      'Seamless companion sync with DSA Tracker Pro problem logs'
    ],
    architecture: 'Three.js R3F WebGL canvas frontend, Next.js App Router, and PostgreSQL database storing user progression trees and city layouts.',
    tech: ['Three.js', 'Next.js', 'PostgreSQL', 'Tailwind CSS', 'TypeScript', 'Prisma'],
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
    longDescription: 'Body Planner is a full-stack AI fitness tracker featuring a node-based DAG skill-tree (ReactFlow), PR progressive overload tracking, and Epley 1RM math calculations. Gemini AI acts as an intelligent coach analyzing weekly fatigue and performance to dynamically adjust workout volume.',
    keyFeatures: [
      'ReactFlow DAG node graph visualising workout split progression & skill trees',
      'Epley formula 1RM calculations & automatic progressive overload recommendations',
      'Gemini AI workout recommendations based on user fatigue logs and target goals',
      'Google OAuth 2.0 authentication with PostgreSQL persistence'
    ],
    architecture: 'Next.js 15, React 19, Express.js backend API, Prisma ORM communicating with PostgreSQL, and Gemini API LLM agent.',
    tech: ['Next.js 15', 'ReactFlow', 'Recharts', 'Gemini AI', 'Prisma', 'PostgreSQL', 'Express.js'],
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
