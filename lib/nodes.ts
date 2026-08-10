export interface ProjectMetric {
  label: string
  value: string
  subtext?: string
}

export interface ProjectTechCategory {
  category: string
  skills: string[]
}

export interface OrbitalNode {
  id: string
  label: string
  type: 'project' | 'contact'
  description: string
  longDescription?: string
  keyFeatures?: string[]
  architecture?: string
  metrics?: ProjectMetric[]
  challenges?: string[]
  techCategories?: ProjectTechCategory[]
  tech: string[]
  url?: string
  liveUrl?: string
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
  accentColor?: string
  glowColor?: string
  gradientClass?: string
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
    longDescription: 'Flow completely reimagines personal and business expense tracking by converting messy unstructured financial inputs — audio voice notes, photo receipts, CSV bank dumps, and plain text notes like "paid $45 for gas in Brooklyn" — into structured ledger transactions. Powered by Google Gemini 2.0 Flash API and Prisma ORM, it automates multi-currency conversion, real-time tax deduction calculations, and intelligent category allocation across custom accounts.',
    keyFeatures: [
      'Natural-language expense & income logging via Google Gemini 2.0 Flash API',
      'Automated receipt image OCR, itemized line extraction, & tax categorisation',
      'Multi-account ledgering powered by Prisma ORM and PostgreSQL with ACID transactions',
      'Interactive spending velocity charts, budget variance alerts, & CSV export',
      'Zero-latency optimistic UI updates with offline IndexedDB queue sync',
      'Multi-currency auto-conversion engine fetching real-time exchange rates'
    ],
    architecture: 'Next.js 15 App Router frontend with React Server Components and Optimistic Actions, Prisma ORM communicating with PostgreSQL database instance, connected to Google Gemini API for multimodal unstructured financial extraction and categorization.',
    metrics: [
      { label: 'Parsing Accuracy', value: '99.2%', subtext: 'Gemini 2.0 OCR extraction' },
      { label: 'Avg Latency', value: '110ms', subtext: 'Optimistic local mutation' },
      { label: 'Supported Currencies', value: '34+', subtext: 'Real-time exchange API' },
      { label: 'Test Coverage', value: '94%', subtext: 'Jest & Playwright suites' }
    ],
    challenges: [
      'Handling messy receipt images with irregular folds, shadows, and low lighting through multimodal LLM prompt engineering and image preprocessing.',
      'Ensuring strict double-entry ledger integrity across concurrent multi-account transactions without database lock contention.',
      'Preventing API rate limiting during high-volume document batch imports using exponential backoff retry queues.'
    ],
    techCategories: [
      { category: 'Frontend', skills: ['Next.js 15', 'React 19', 'Tailwind CSS', 'Recharts', 'TypeScript'] },
      { category: 'Backend & Data', skills: ['Prisma ORM', 'PostgreSQL', 'Express.js', 'Redis Cache'] },
      { category: 'AI & Processing', skills: ['Gemini 2.0 Flash API', 'Tesseract OCR Fallback', 'Google Cloud Vision'] }
    ],
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
    continent: 'North America',
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.35)',
    gradientClass: 'from-cyan-400 via-blue-400 to-indigo-400'
  },
  {
    id: 'countries-quiz',
    label: 'Countries Quiz',
    type: 'project',
    description: 'Interactive world geography quiz built on a live SVG world map. Click countries directly on the map — no multiple choice, just pure spatial memory.',
    longDescription: 'Countries Quiz is a spatial geography challenge application rendered using D3.js vector maps and GeoJSON topology data. Users are tested on world geography by locating and clicking exact country polygon borders directly on an interactive vector globe or flat projection map without any multiple-choice text hints. Features custom difficulty modes, streak multiplier counters, and real-time accuracy heatmaps.',
    keyFeatures: [
      'Interactive GeoJSON world map with pixel-precise D3.js projection rendering',
      'Zero multiple choice — click country borders directly to test true spatial memory',
      'Timed geography speed runs with streak leaderboards & regional filtering',
      'Optimized SVG path rendering maintaining liquid 60fps pan & zoom performance',
      'Sub-country detail modes including capitals, flags, and landlocked territory challenges',
      'Audio feedback engine and spatial visual pulse hints for high streaks'
    ],
    architecture: 'Next.js 16 web application integrated with TopoJSON / GeoJSON topology datasets, Leaflet.js map layers, D3-geo path projection generators, and Web Audio API for interactive feedback.',
    metrics: [
      { label: 'Render FPS', value: '60 FPS', subtext: 'GPU accelerated SVG/WebGL' },
      { label: 'Map Data Nodes', value: '195', subtext: 'Exact UN recognized borders' },
      { label: 'Bundle Footprint', value: '42 KB', subtext: 'Tree-shaken GeoJSON loader' },
      { label: 'User Accuracy', value: 'Spatial', subtext: 'Vector proximity checks' }
    ],
    challenges: [
      'Optimizing D3.js SVG path rendering across 190+ detailed country polygons to maintain 60 FPS performance on mobile devices.',
      'Implementing exact point-in-polygon math algorithms to accurately handle tiny island nations and complex archipelagos.',
      'Ensuring responsive projection resizing across mobile portrait and ultra-wide desktop display viewports.'
    ],
    techCategories: [
      { category: 'Mapping & WebGL', skills: ['D3.js', 'GeoJSON', 'Leaflet.js', 'SVG Vector Math', 'D3-Geo'] },
      { category: 'Frontend Engine', skills: ['Next.js 16', 'React 19', 'Tailwind CSS', 'Framer Motion'] },
      { category: 'State & Storage', skills: ['Zustand', 'LocalStorage Sync', 'TypeScript'] }
    ],
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
    continent: 'South America',
    accentColor: '#c084fc',
    glowColor: 'rgba(192, 132, 252, 0.35)',
    gradientClass: 'from-purple-400 via-fuchsia-400 to-pink-400'
  },
  {
    id: 'mastermind',
    label: 'MasterMind',
    type: 'project',
    description: 'Chess analysis platform powered by Stockfish 17 and Gemini 2.0 Flash. Classifies moves, draws evaluation graphs, and explains positions in plain language.',
    longDescription: 'MasterMind bridges deep evaluation chess engines with accessible natural language grandmaster commentary. Powered by Stockfish 17 compiled into WebAssembly and Gemini 2.0 Flash LLM pipelines, it parses PGN game files, calculates turn-by-turn win probabilities, highlights brilliant vs blunder moves, and explains complex positional concepts in plain English.',
    keyFeatures: [
      'Stockfish 17 engine WebAssembly integration for deep turn evaluation graphs',
      'Gemini 2.0 Flash LLM positional breakdown & plain-language blunder explanations',
      'Interactive PGN reader with move-by-move evaluation advantage bar & visual arrows',
      'FastAPI microservice backend handling high-concurrency analysis & cache lookup',
      'Opening book lookup and tactical pattern classification (forks, pins, skewers)',
      'Custom chessboard UI with drag-and-drop piece animation and engine evaluation eval bar'
    ],
    architecture: 'Next.js 15 frontend running Stockfish 17 WebAssembly web worker client-side, communicating with a FastAPI microservice backend connected to Gemini 2.0 Flash API for natural language chess coaching.',
    metrics: [
      { label: 'Engine Depth', value: '24+ Nodes', subtext: 'Stockfish 17 WASM worker' },
      { label: 'Analysis Speed', value: '1.2s / move', subtext: 'Parallel worker processing' },
      { label: 'PGN Parsing', value: 'Instant', subtext: 'Full game timeline graph' },
      { label: 'Model Pipeline', value: 'Gemini 2.0', subtext: 'Flash low-latency inference' }
    ],
    challenges: [
      'Compiling and running Stockfish 17 in WebAssembly Web Workers without blocking the main UI thread during deep position calculations.',
      'Structuring prompts for Gemini 2.0 Flash to consistently return high-precision chess insights matching official engine FEN annotations.',
      'Synchronizing move playback controls with asynchronous evaluation streams.'
    ],
    techCategories: [
      { category: 'Engine & Core', skills: ['Stockfish 17 WASM', 'WebAssembly Workers', 'Chess.js', 'FastAPI'] },
      { category: 'Frontend', skills: ['Next.js 15', 'Chessboard.js', 'Tailwind CSS', 'TypeScript'] },
      { category: 'AI Pipeline', skills: ['Gemini 2.0 Flash', 'Python', 'AsyncIO', 'Pydantic'] }
    ],
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
    continent: 'Europe',
    accentColor: '#818cf8',
    glowColor: 'rgba(129, 140, 248, 0.35)',
    gradientClass: 'from-indigo-400 via-sky-400 to-cyan-400'
  },
  {
    id: 'dsa-tracker',
    label: 'DSA Tracker Pro',
    type: 'project',
    description: 'A DSA problem tracker with Monaco editor integration, AI-generated hints, and automatic LeetCode submission syncing. Integrated with DSA City for gamified practice.',
    longDescription: 'DSA Tracker Pro is an algorithm mastery platform built for developers preparing for technical interviews. It features an embedded VS Code-grade Monaco Editor, step-by-step AI code execution tracing, spaced-repetition review scheduling (SuperMemo 2 algorithm), and a dedicated Chrome Extension that automatically captures LeetCode submissions (verdicts, runtimes, memory, and code solutions) and syncs them seamlessly into your dashboard.',
    keyFeatures: [
      'Monaco Editor integration supporting C++, Python, Java, Go, and TypeScript',
      'AI hint trace generation endpoints providing progressive problem guidance without spoiling answers',
      'Custom Chrome Extension API sync auto-logging LeetCode submissions and metrics',
      'Spaced-repetition review queue powered by SM-2 algorithm to prevent knowledge decay',
      'Topic mastery breakdown across Data Structures, Algorithms, and System Design',
      'Companion synchronization with DSA City 3D leaderboard'
    ],
    architecture: 'Monorepo architecture featuring Next.js 16 App Router client, Express 5 REST API backend, Prisma ORM querying PostgreSQL database, and Manifest V3 Chrome Extension content scripts.',
    metrics: [
      { label: 'Synced Submissions', value: 'Auto-Sync', subtext: 'Chrome Extension V3' },
      { label: 'Supported Langs', value: '8 Languages', subtext: 'Monaco syntax & linting' },
      { label: 'Review Algorithm', value: 'SM-2 Curve', subtext: 'Spaced repetition queue' },
      { label: 'Database Queries', value: '< 15ms', subtext: 'Indexed Prisma queries' }
    ],
    challenges: [
      'Designing a Manifest V3 Chrome Extension capable of sniffing and parsing GraphQL LeetCode submission responses cleanly across DOM updates.',
      'Integrating Monaco Editor with custom language server protocols and auto-completion snippets in a Next.js SSR environment.',
      'Building an SM-2 spaced repetition scheduler that dynamically adapts review dates based on problem difficulty feedback.'
    ],
    techCategories: [
      { category: 'Frontend Workspace', skills: ['Monaco Editor', 'Next.js 16', 'React 19', 'Tailwind CSS'] },
      { category: 'Browser Extension', skills: ['Manifest V3', 'Chrome Extension API', 'DOM Observer'] },
      { category: 'Backend & Data', skills: ['Express 5', 'Prisma ORM', 'PostgreSQL', 'Gemini AI'] }
    ],
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
    continent: 'Africa',
    accentColor: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.35)',
    gradientClass: 'from-amber-400 via-yellow-400 to-orange-400'
  },
  {
    id: 'dsa-city',
    label: 'DSA City',
    type: 'project',
    description: 'A gamified 3D leaderboard platform for data structures and algorithms. Duolingo-style progression system with level gating, companion to DSA Tracker Pro.',
    longDescription: 'DSA City transforms tedious coding problem practice into an immersive 3D city-building metaverse simulation. As users solve DSA problems and maintain daily coding streaks on DSA Tracker Pro, their personalized 3D city dynamically constructs new glowing skyscrapers, neon data highways, and unlocked tech districts using Three.js WebGL rendering.',
    keyFeatures: [
      'Procedural 3D city generator rendering buildings based on problem counts & categories',
      'Gamified Duolingo-style skill progression tree with level gating, XP multipliers, & badges',
      'Real-time global multiplayer leaderboard with streak shields & custom avatar customization',
      'Seamless real-time synchronization with DSA Tracker Pro problem logs & metrics',
      'Dynamic lighting, day/night weather cycles, and camera inspection fly-throughs',
      'Interactive building click inspection displaying solved problem details'
    ],
    architecture: 'Three.js React Three Fiber WebGL canvas frontend, Next.js App Router, WebSocket real-time leaderboard update service, and PostgreSQL database storing user progression trees and city layouts.',
    metrics: [
      { label: 'Graphics Pipeline', value: 'WebGL R3F', subtext: 'GPU procedural shader' },
      { label: 'Progression Levels', value: '50+ Tiers', subtext: 'Skill tree unlockable' },
      { label: 'Real-time Sync', value: 'WebSocket', subtext: 'Sub-50ms score updates' },
      { label: 'FPS Target', value: '60 FPS', subtext: 'Instanced mesh rendering' }
    ],
    challenges: [
      'Using Three.js instanced rendering to efficiently draw thousands of building polygons, windows, and neon lights at 60 FPS.',
      'Designing a procedural layout algorithm that converts user problem-solving statistics into aesthetically pleasing city architectures.',
      'Ensuring smooth mobile WebGL performance with dynamic LOD (Level of Detail) scaling.'
    ],
    techCategories: [
      { category: '3D WebGL Engine', skills: ['Three.js', 'React Three Fiber', 'GLSL Shaders', 'Drei', 'Canvas'] },
      { category: 'Platform Core', skills: ['Next.js 15', 'Tailwind CSS', 'Zustand', 'TypeScript'] },
      { category: 'Persistence & Sync', skills: ['PostgreSQL', 'Prisma ORM', 'WebSockets', 'Redis'] }
    ],
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
    continent: 'Asia',
    accentColor: '#34d399',
    glowColor: 'rgba(52, 211, 153, 0.35)',
    gradientClass: 'from-emerald-400 via-teal-300 to-cyan-400'
  },
  {
    id: 'body-planner',
    label: 'Body Planner',
    type: 'project',
    description: 'Adaptive fitness planning app that generates personalised weekly programs with Gemini AI, visualised as a ReactFlow node graph that evolves with your progress.',
    longDescription: 'Body Planner is a full-stack AI fitness planning system built around a node-based DAG skill-tree (ReactFlow), progressive overload tracking, and accurate Epley 1RM math calculations. Google Gemini AI acts as an intelligent personal trainer analyzing weekly muscle fatigue, rate of perceived exertion (RPE), and strength logs to dynamically adjust workout volume and recovery days.',
    keyFeatures: [
      'ReactFlow DAG node graph visualising workout split progression & skill trees',
      'Epley formula 1RM calculations & automated progressive overload recommendations',
      'Gemini AI workout recommendations based on user fatigue logs & target goals',
      'Google OAuth 2.0 authentication with secure PostgreSQL persistence',
      'Interactive volume heatmaps tracking weekly set counts per muscle group',
      'Custom PR celebrate animations and personal record history timeline'
    ],
    architecture: 'Next.js 15 frontend, React 19, Express.js backend REST API, Prisma ORM communicating with PostgreSQL, ReactFlow canvas rendering, and Gemini API LLM coach.',
    metrics: [
      { label: 'Graph UI', value: 'ReactFlow', subtext: 'Interactive DAG skill tree' },
      { label: 'AI Recommendations', value: 'Adaptive', subtext: 'Gemini RPE volume scaling' },
      { label: 'Overload Math', value: 'Epley 1RM', subtext: 'Automated weight targeting' },
      { label: 'Auth Provider', value: 'Google OAuth', subtext: 'JWT session management' }
    ],
    challenges: [
      'Building a DAG layout algorithm for workout split progression nodes in ReactFlow that prevents edge crossing and overlapping.',
      'Designing an algorithm to calculate target training weights based on 1RM formulas and daily RPE ratings.',
      'Fine-tuning Gemini AI prompts to generate realistic, injury-aware hypertrophy and strength programs.'
    ],
    techCategories: [
      { category: 'Graph & Data UI', skills: ['ReactFlow', 'Recharts', 'Framer Motion', 'Tailwind CSS'] },
      { category: 'Full-Stack Core', skills: ['Next.js 15', 'Express.js', 'Prisma ORM', 'PostgreSQL'] },
      { category: 'AI & Auth', skills: ['Gemini AI API', 'Google OAuth 2.0', 'JWT', 'TypeScript'] }
    ],
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
    continent: 'Australia & Oceania',
    accentColor: '#60a5fa',
    glowColor: 'rgba(96, 165, 250, 0.35)',
    gradientClass: 'from-blue-400 via-sky-300 to-indigo-400'
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
