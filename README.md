# 🌍 Interactive 3D Earth Portfolio

<div align="center">

[![Next.js 16](https://img.shields.io/badge/Next.js-16.2.10-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.7-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4.3.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP 3](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-chi-self-31.vercel.app/)

<br />

**A state-of-the-art, interactive 3D WebGL Earth portfolio engineered with Next.js 16, React 19, Three.js, React Globe, GSAP, and synthesized Web Audio.**

[Explore Live Demo](https://portfolio-chi-self-31.vercel.app/) · [Report Bug](https://github.com/RajatSharma404/3D-portfolio/issues) · [Request Feature](https://github.com/RajatSharma404/3D-portfolio/issues)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
  - [1. Interactive 3D WebGL Earth Globe](#1-interactive-3d-webgl-earth-globe)
  - [2. Spatial & Continental Exploration System](#2-spatial--continental-exploration-system)
  - [3. Full-Stack Engineering Case Studies & Project Routes](#3-full-stack-engineering-case-studies--project-routes)
  - [4. Developer Profile & Bio HUD Modal](#4-developer-profile--bio-hud-modal)
  - [5. Global Command Palette (⌘K / Ctrl+K / /)](#5-global-command-palette-k--ctrlk--)
  - [6. Synthesized Web Audio Sound Engine](#6-synthesized-web-audio-sound-engine)
  - [7. Interactive Resume & CV Modal](#7-interactive-resume--cv-modal)
  - [8. Architecture & Performance Optimizations](#8-architecture--performance-optimizations)
- [Featured Projects Showcase](#-featured-projects-showcase)
- [Keyboard Shortcuts Reference](#-keyboard-shortcuts-reference)
- [Technology Stack](#-technology-stack)
- [Project Architecture & Directory Structure](#-project-architecture--directory-structure)
- [Setup & Installation Guide](#-setup--installation-guide)
  - [Prerequisites](#prerequisites)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Run the Development Server](#3-run-the-development-server)
  - [4. Production Build & Deployment](#4-production-build--deployment)
  - [5. Code Quality & Bug Auditing](#5-code-quality--bug-auditing)
- [Customization & Extensibility Guide](#-customization--extensibility-guide)
  - [Adding a New Project Node](#adding-a-new-project-node)
  - [Customizing Audio Frequencies](#customizing-audio-frequencies)
  - [Adjusting 3D Globe Physics & Camera](#adjusting-3d-globe-physics--camera)
- [About the Author](#-about-the-author)
- [License](#-license)

---

## 🌟 Overview

The **Interactive 3D Earth Portfolio** completely reimagines traditional static developer portfolios into an immersive, spatial exploration experience. Built on top of **Next.js 16**, **React 19**, **Three.js**, and **react-globe.gl**, this application maps production software projects, AI utilities, and developer tools to real-world orbital coordinates across the continents of Earth.

Visitors can interactively spin the Earth, filter projects by continent, engage in orbital warp-speed camera flights, trigger fuzzy global search via a keyboard-driven command palette, inspect detailed technical case studies with system architecture diagrams, and toggle dynamic sci-fi synthesized sound effects.

---

## ✨ Key Features

### 1. Interactive 3D WebGL Earth Globe
- **Photorealistic Texture Mapping**: High-definition NASA Blue Marble surface textures combined with topology elevation bump mapping for realistic terrain depth.
- **Atmospheric Rayleigh Scattering Glow**: Dynamic atmospheric halo rendering with an adaptive color spectrum that responds to hovered and active project node accent colors.
- **Smooth Orbit Controls**: 360° rotational freedom with inertial dampening, pitch limits, momentum glide, and an automatic gentle rotation speed (0.75 RPM) that gracefully halts during user interaction.
- **Great-Circle Orbital Flight Arcs**: 3D animated bezier curves with moving dash strokes connecting continental tech hubs across North America, South America, Europe, Africa, Asia, and Australia.
- **Pulsing Beacon Wave Rings**: Radar-like beacon rings that radiate outwards from active project coordinates with opacity drop-off curves.
- **Custom 3D HTML Billboard Cards**: Interactive DOM elements projected into 3D world space displaying continent tags, project names, and colored beacon indicators, complete with drag-vs-click thresholds to prevent accidental selection during globe panning.

```
       ▲  [North America: Flow]
      / \
  [Europe: MasterMind] ─── (3D Great Circle Arc) ─── [Asia: DSA City]
      \ /
       ▼  [South America: Countries Quiz]
```

### 2. Spatial & Continental Exploration System
- **Floating Continental Navigation Dock**: Glassmorphism control dock fixed at the bottom center enabling single-click camera flights to:
  - 🌐 **All Earth** (Global reset & overview)
  - 🇺🇸 **North America** (Flow AI Expense Tracker)
  - 🇪🇺 **Europe** (MasterMind Stockfish & Gemini Chess Coach)
  - 🌍 **Africa** (DSA Tracker Pro Algorithm Workspace)
  - 🇮🇳 **Asia** (DSA City 3D Gamified Metaverse)
  - 🇦🇺 **Australia & Oceania** (Body Planner AI Split Graph)
  - 🇧🇷 **South America** (Countries Quiz Spatial Vector Game)
- **Automatic Camera Flight Interpolation**: Smooth spherical camera transitions using point-of-view spherical trigonometry (latitude, longitude, altitude) with acceleration curves.
- **Right-Side Radial Dot Navigation**: Vertical navigator dots positioned on the viewport edge featuring staggered entrance animations (GSAP `back.out(1.7)`) with active-state halos.

### 3. Full-Stack Engineering Case Studies & Project Routes
- **Dynamic Pre-Rendered Routes (`/projects/[id]`)**: Instantaneous zero-latency routing powered by Next.js App Router and `generateStaticParams`.
- **Interactive Background 3D Globe**: The 3D globe remains active behind project detail pages. Zooming or scrolling out on the globe smoothly triggers an exit transition returning to the Earth overview.
- **Comprehensive Case Study Layout**:
  - **Executive Overview & Purpose**: Deep narrative breakdown of the problem statement, business value, and engineering objectives.
  - **KPI Metrics Matrix**: Key performance indicators (e.g., *99.2% OCR accuracy*, *60 FPS WebGL render target*, *110ms optimistic mutations*, *Depth 24+ Stockfish workers*).
  - **Key Technical Features**: Numbered card grid detailing standout platform capabilities.
  - **Engineering Challenges & Architectural Trade-offs**: In-depth post-mortem analyses of complex obstacles (e.g., WebAssembly worker threading, SVG point-in-polygon math, SM-2 spaced repetition scheduling).
  - **System Architecture Blueprint**: Clean monospace breakdown of client-server data flows, protocols, and database caching layers.
  - **Categorized Tech Stack Matrix**: Categorized tags grouped by Frontend, Backend & Database, AI / ML Pipelines, and Specialized Engines.
  - **Orbital Geographic Metadata**: Exact coordinates, continent, country, and city mappings.
  - **Interactive Screenshot & Visual Blueprint Gallery**: Multi-card preview gallery with click-to-expand Lightbox modal and system status logs.
  - **Bidirectional Carousel Traversal**: Fast previous/next project navigation controls at both header and footer.

### 4. Developer Profile & Bio HUD Modal
- **Split-Screen HUD Architecture**: Bi-directional sliding panels (Left: Bio, Experience, Education; Right: Full Tech Matrix, Featured Systems) powered by GSAP timelines.
- **Interactive Background Continuity**: The live 3D Earth globe continues to spin in the background while the HUD modal is active.
- **Comprehensive Career History**:
  - **Co-Founder & Frontend Engineer** @ [Pradite™](https://pradite.com) (Registered Trademark): Building privacy-first developer AI tools and browser-native interfaces.
  - **Software Engineer Intern** @ Sparqor Technologies: Modular web applications, digital product scalability.
  - **B.Tech in Computer Science & Engineering** @ Kanpur Institute of Technology (AKTU, Lucknow · CGPA 7.2 / 10).
- **Accredited Certifications**: Sparqor Internship Certificate, 45-Day RCPL DSA Training, 7 Infosys Springboard Certifications.
- **Quick Dismissal**: Press `ESC`, click the HUD close button, or click the "Zoom In to Earth" guidance pill.

### 5. Global Command Palette (`⌘K` / `Ctrl+K` / `/`)
- **Fuzzy Multi-Attribute Search**: Live filtering across project titles, descriptions, technical skills (e.g. *Gemini*, *Three.js*, *Prisma*, *Stockfish*, *FastAPI*, *ReactFlow*, *Monaco*), continents, and cities.
- **Full Keyboard Navigation**:
  - `↑` / `↓` Arrow Keys: Move selection through filtered results with synthesized hover audio feedback.
  - `↵ Enter`: Open highlighted project with warp sound effect.
  - `ESC`: Close palette immediately.
- **Auto-Focus & Backdrop Dimming**: Instant input focus on shortcut trigger with glassmorphism backdrop blur.

### 6. Synthesized Web Audio Sound Engine
- **Zero-Dependency Web Audio API**: Completely synthesized sound effects using browser-native oscillators (`sine` and `triangle` wave forms) with exponential gain ramps — no external audio asset downloads required.
- **Audio Sound Profiles**:
  - 🎵 **Hover Feedback** (`playHover`): High-frequency sine wave chirp ($800\text{Hz} \to 1400\text{Hz}$, 35ms duration).
  - 🔔 **Click Confirmation** (`playClick`): Snappy triangle wave click ($600\text{Hz} \to 1200\text{Hz}$, 60ms duration).
  - 🚀 **Warp Travel** (`playWarp`): Low-to-mid frequency acceleration sweep ($180\text{Hz} \to 540\text{Hz}$, 200ms duration) triggered on camera navigation and project selection.
  - 💨 **Swoop Dismissal** (`playSwoop`): Descending frequency swoop ($350\text{Hz} \to 110\text{Hz}$, 140ms duration) for smooth modal and page exits.
- **Persistent Audio State**: Mute/unmute preference automatically persists in `localStorage` (`orbital_audio_muted`).
- **Pulsing Equalizer Toggle**: Fixed top-right button with live CSS animated equalizer bars showing active audio state.

### 7. Interactive Resume & CV Modal
- **Quick-Access Modal**: Accessible via the top-left HUD or the Command Palette.
- **Structured Overview**: Executive summary, skills taxonomy, and key project highlights.
- **Direct PDF Download**: Single-click PDF download and live portfolio CV linking.

### 8. Architecture & Performance Optimizations
- **Dynamic Pixel Ratio Capping**: Automatically clamps `devicePixelRatio` to $\le 1.5$ to guarantee smooth 60 FPS rendering on high-DPI (Retina/4K) screens.
- **Zero-Lag Route Prefetching**: Automatic background prefetching of all project routes via `router.prefetch()` ensures instant navigation with no load spinners.
- **SEO & Social OpenGraph Engine**: Full Next.js 16 metadata generation including Twitter cards, OpenGraph previews, and `application/ld+json` Person Schema structured data.
- **Pure CSS Off-Screen Sliders**: Hardware-accelerated CSS keyframe transforms (`translate3d`) with `will-change` optimizations for 60 FPS transitions.
- **Space-Themed Typography**: Self-hosted Google Fonts `@fontsource/space-grotesk` (Display) and `@fontsource/space-mono` (Code/Data).

---

## 🚀 Featured Projects Showcase

| Project | Domain | Core Tech Stack | Geographic Node | Highlights |
|---|---|---|---|---|
| **[Flow](https://github.com/RajatSharma404/flow)** | AI Finance & Ledger | Next.js 15, Gemini 2.0 Flash, Prisma, PostgreSQL | 🇺🇸 USA (39.82°N, 98.57°W) | 99.2% OCR receipt extraction, natural language expense parsing, multi-currency ledgering |
| **[Countries Quiz](https://github.com/RajatSharma404/countries-quiz)** | Spatial Geography | D3.js, Leaflet, GeoJSON, Next.js, TopoJSON | 🇧🇷 Brazil (14.23°S, 51.92°W) | Zero multiple-choice vector quiz, 195 UN borders, 60 FPS D3 projection rendering |
| **[MasterMind](https://github.com/RajatSharma404/mastermind)** | AI Chess Analytics | Stockfish 17 WASM, Gemini 2.0 Flash, FastAPI, Python | 🇩🇪 Germany (51.16°N, 10.45°E) | Parallel WASM engine web workers, depth 24+ eval graphs, natural language coach |
| **[DSA Tracker Pro](https://github.com/RajatSharma404/dsa-tracker-pro)** | Interview Workspace | Monaco Editor, Chrome Extension V3, Express 5, Prisma | 🇨🇫 CAR (7.18°N, 21.09°E) | LeetCode GraphQL auto-sync extension, SM-2 spaced repetition, multi-language Monaco |
| **[DSA City](https://github.com/RajatSharma404/dsa-city)** | 3D Gamified Metaverse | Three.js, React Three Fiber, WebGL, WebSockets, Prisma | 🇮🇳 India (20.59°N, 78.96°E) | Procedural 3D skyscraper generator, Duolingo-style skill progression tree, live leaderboards |
| **[Body Planner](https://github.com/RajatSharma404/body-planner)** | AI Fitness Progression | ReactFlow DAG, Gemini AI, Epley 1RM, Google OAuth | 🇦🇺 Australia (25.27°S, 133.77°E) | DAG split-tree graph visualizer, automated progressive overload formulas, fatigue heatmaps |

---

## ⌨️ Keyboard Shortcuts Reference

| Shortcut | Scope | Action |
|---|---|---|
| <kbd>⌘</kbd> + <kbd>K</kbd> / <kbd>Ctrl</kbd> + <kbd>K</kbd> | Global | Open / Close Command Palette Search |
| <kbd>/</kbd> | Global | Quick-open Command Palette (when not in an input) |
| <kbd>ESC</kbd> | Modal / Overlay | Close Command Palette, Profile HUD, Resume Modal, or Lightbox |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Command Palette | Navigate through search results |
| <kbd>↵ Enter</kbd> | Command Palette / Globe | Launch selected project case study |
| <kbd>Space</kbd> / <kbd>Enter</kbd> | 3D Billboard Badges | Activate focused 3D project badge |

---

## 🛠️ Technology Stack

```
3D Portfolio Architecture
├── Presentation Layer: Next.js 16 (App Router) + React 19 + TypeScript
├── 3D Graphics Pipeline: Three.js + react-globe.gl (WebGL Canvas)
├── Animation & Transitions: GSAP 3.15 + Tailwind CSS v4 Keyframes
├── State Management: Zustand 5 (Scene & Navigation Store)
├── Audio Synthesis: Web Audio API (Sine & Triangle Oscillators)
├── Styling & Typography: Tailwind CSS 4 + Space Grotesk + Space Mono
└── Code Quality & Auditing: Custom Node.js AST/Regex Bug Auditing Scripts
```

### Dependencies Overview

| Package | Version | Purpose |
|---|---|---|
| `next` | `^16.2.10` | React Server Components, dynamic routing, image & metadata optimization |
| `react` & `react-dom` | `^19.2.7` | UI library with concurrency & server actions support |
| `three` | `^0.185.1` | Core WebGL 3D rendering engine |
| `react-globe.gl` | `^2.38.0` | 3D Globe visualization component layer |
| `zustand` | `^5.0.14` | Global lightweight reactive scene state management |
| `gsap` | `^3.15.0` | Timeline-based entrance, exit, and HUD sliding animations |
| `@tailwindcss/postcss` & `tailwindcss` | `^4.3.3` | Next-generation utility-first styling engine |
| `@fontsource/space-grotesk` | `^5.3.0` | Self-hosted futuristic geometric sans-serif font |
| `@fontsource/space-mono` | `^5.3.0` | Monospace font for telemetry, metrics, and code specs |
| `typescript` | `^5.6.3` | Static type safety and data contract enforcement |

---

## 📂 Project Architecture & Directory Structure

```
3D-Portfolio/
├── app/
│   ├── globals.css                       # Global design tokens, keyframes, scrollbar & glassmorphism
│   ├── layout.tsx                        # Root layout, fonts, JSON-LD Schema, OpenGraph metadata
│   ├── page.tsx                          # Root entry point, dynamic AppShell loader
│   └── projects/
│       └── [id]/
│           └── page.tsx                  # Static pre-rendered dynamic project case study pages
├── components/
│   ├── AppShell.tsx                      # Main interactive client shell & keyboard listener
│   ├── providers/
│   │   └── SceneStateProvider.tsx        # Zustand global scene state (activeNode, isZoomedOut)
│   ├── scene/
│   │   ├── InteractiveGlobe.tsx          # Primary WebGL 3D Earth canvas & event orchestrator
│   │   ├── NodeLabel.tsx                 # 3D label rendering helper
│   │   ├── ProjectBackgroundGlobe.tsx    # Secondary background 3D globe for case study pages
│   │   ├── ProjectBackgroundGlobeWrapper.tsx # Client boundary wrapper for background globe
│   │   └── ProjectDetailView.tsx         # Comprehensive case study detail view container
│   └── ui/
│       ├── CommandPalette.tsx            # Global ⌘K fuzzy search modal
│       ├── ContactLink.tsx               # Bottom-right quick contact trigger
│       ├── ContinentBar.tsx              # Bottom floating continent navigation dock
│       ├── LoadingScreen.tsx             # Entry load screen animation
│       ├── NameTag.tsx                   # Top-left identity badge & HUD toggles
│       ├── NavDots.tsx                   # Right-side vertical navigation dots
│       ├── NodePanel.tsx                 # Project summary drawer
│       ├── ProjectMediaGallery.tsx       # Screenshot & architecture blueprint gallery with lightbox
│       ├── ResumeModal.tsx               # Resume viewer with PDF download
│       ├── SoundToggle.tsx               # Top-right Web Audio synthesizer toggle button
│       └── UserProfileModal.tsx          # Split-screen developer bio & career history HUD
├── lib/
│   ├── nodes.ts                          # Central dataset of projects, orbital coordinates, and arcs
│   └── sound.ts                          # Zero-dependency Web Audio API oscillator sound manager
├── public/
│   └── textures/
│       ├── earth-blue-marble.jpg         # High-resolution NASA Blue Marble diffuse texture
│       ├── earth-topology.png            # Elevation bump & topology displacement map
│       └── night-sky.png                 # Background stellar constellation skybox
├── scripts/
│   ├── bug-checker.js                    # Automated code quality, React hooks & data audit script
│   └── redundant-cleaner.js              # Orphan component and data duplication audit script
├── LICENSE                               # MIT License
├── package.json                          # Project dependencies, scripts, and metadata
├── postcss.config.js                     # PostCSS configuration for Tailwind CSS v4
└── tsconfig.json                         # TypeScript compiler configuration
```

---

## 💻 Setup & Installation Guide

### Prerequisites

Ensure your development environment meets the following requirements:
- **Node.js**: `v18.18.0` or higher (Node.js `v20.x` LTS recommended)
- **Package Manager**: `npm` (v9+), `pnpm` (v8+), or `yarn` (v1.22+)
- **WebGL Support**: Modern browser with hardware acceleration enabled (Chrome, Firefox, Edge, Safari, Brave).

### 1. Clone the Repository

```bash
git clone https://github.com/RajatSharma404/3D-portfolio.git
cd 3D-portfolio
```

### 2. Install Dependencies

Install all required production and development dependencies:

```bash
npm install
# or if using pnpm:
# pnpm install
# or if using yarn:
# yarn install
```

### 3. Run the Development Server

Start the local development server with Next.js Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser to view the application.

### 4. Production Build & Deployment

To generate an optimized production bundle:

```bash
# Compile and build static routes
npm run build

# Start the production server
npm run start
```

#### Deploying to Vercel

The easiest way to deploy this Next.js application is through the [Vercel Platform](https://vercel.com/):

1. Push your code to a GitHub repository.
2. Import the project into the [Vercel Dashboard](https://vercel.com/new).
3. Vercel automatically detects Next.js — click **Deploy**.

### 5. Code Quality & Bug Auditing

The repository includes custom built-in auditing scripts to verify data schema integrity, hook conventions, and prune orphan files:

```bash
# Run comprehensive bug & code quality checker
npm run audit:bugs

# Check for orphan components or duplicate node IDs
npm run audit:clean

# Run Next.js ESLint validation
npm run lint
```

---

## 🔧 Customization & Extensibility Guide

### Adding a New Project Node

To add a new project to the 3D Earth, open [`lib/nodes.ts`](file:///d:/3D%20Portfolio/lib/nodes.ts) and append a new object to the `NODES` array:

```typescript
{
  id: 'my-new-project',
  label: 'Project Name',
  type: 'project',
  description: 'Concise summary displayed on badge cards and search.',
  longDescription: 'In-depth description for the case study overview section.',
  keyFeatures: [
    'Key feature #1 with technical details',
    'Key feature #2 with performance benchmarks',
    'Key feature #3 with security/data integrations'
  ],
  architecture: 'Architecture description: Next.js frontend, Express backend, PostgreSQL database.',
  metrics: [
    { label: 'Throughput', value: '10k req/s', subtext: 'Load tested with k6' },
    { label: 'Latency', value: '45ms', subtext: 'p99 global latency' }
  ],
  challenges: [
    'Challenge #1 description and how it was resolved.'
  ],
  techCategories: [
    { category: 'Frontend', skills: ['React 19', 'Next.js 16', 'Tailwind CSS'] },
    { category: 'Backend', skills: ['Node.js', 'PostgreSQL', 'Prisma'] }
  ],
  tech: ['Next.js', 'React', 'PostgreSQL', 'Prisma', 'TypeScript'],
  orbitRadius: 4.0,
  orbitSpeed: 0.35,
  orbitOffset: 1.0,
  inclination: 0.2,
  geometry: 'icosahedron',
  url: 'https://github.com/RajatSharma404/my-new-project',
  lat: 37.7749,       // Latitude on Earth
  lng: -122.4194,     // Longitude on Earth
  city: 'San Francisco',
  country: 'USA',
  continent: 'North America',
  accentColor: '#38bdf8',
  glowColor: 'rgba(56, 189, 248, 0.35)',
  gradientClass: 'from-cyan-400 via-blue-400 to-indigo-400'
}
```

The application automatically creates:
- 3D interactive beacon on the globe at the given latitude and longitude.
- Dedicated `/projects/my-new-project` case study route.
- Search indexing entry in the `⌘K` Command Palette.
- Navigation dot and continent filter binding.

### Customizing Audio Frequencies

All sound effects are generated mathematically in [`lib/sound.ts`](file:///d:/3D%20Portfolio/lib/sound.ts). You can adjust frequencies or wave shapes (`sine`, `triangle`, `sawtooth`, `square`):

```typescript
// Example: Modify hover chirp frequencies
osc.frequency.setValueAtTime(800, this.ctx.currentTime)
osc.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 0.03)
```

### Adjusting 3D Globe Physics & Camera

Globe parameters can be configured in [`components/scene/InteractiveGlobe.tsx`](file:///d:/3D%20Portfolio/components/scene/InteractiveGlobe.tsx):

- **Auto-Rotation Speed**: Adjust `controls.autoRotateSpeed = 0.75`
- **Initial Altitude**: Modify `globeRef.current.pointOfView({ lat: -15, lng: 130, altitude: 2.1 }, 0)`
- **Atmospheric Glow Intensity**: Adjust `atmosphereAltitude={0.16}` and `atmosphereColor`

---

## 👨‍💻 About the Author

**Rajat Sharma**  
*Full-Stack Software Engineer · AI/ML Systems Builder · Co-Founder @ [Pradite™](https://pradite.com)*

- 🌐 **Company**: [Pradite.com](https://pradite.com)
- 💼 **LinkedIn**: [linkedin.com/in/rajat-sharma-9a053128b](https://www.linkedin.com/in/rajat-sharma-9a053128b/)
- 🐙 **GitHub**: [@RajatSharma404](https://github.com/RajatSharma404)
- 🧩 **LeetCode**: [leetcode.com/u/RajatSharma404](https://leetcode.com/u/RajatSharma404/)
- 🐦 **X (Twitter)**: [@RajatSharma404](https://x.com/RajatSharma404)
- ✉️ **Email**: [rajat.sharma.myid1@gmail.com](mailto:rajat.sharma.myid1@gmail.com)
- 🌍 **Portfolio**: [portfolio-chi-self-31.vercel.app](https://portfolio-chi-self-31.vercel.app/)

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](file:///d:/3D%20Portfolio/LICENSE) for full details.

```
MIT License

Copyright (c) 2026 Rajat Sharma

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<div align="center">
  <sub>Engineered with precision by <a href="https://github.com/RajatSharma404">Rajat Sharma</a>. Powered by Next.js, Three.js, and WebGL.</sub>
</div>
