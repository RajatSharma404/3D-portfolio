# Orbital System — 3D Portfolio
## Complete Antigravity Prompt System

> Stack: Next.js 15 (App Router) · TypeScript · Three.js · React Three Fiber · Drei · GSAP · Tailwind CSS
> Each prompt is self-contained. Paste one at a time into Antigravity. Do NOT paste multiple together.

---

## System Map

```
orbital-portfolio/
├── app/
│   ├── page.tsx                  ← Route shell (Prompt 01)
│   ├── layout.tsx                ← Root layout + fonts (Prompt 02)
│   └── globals.css               ← CSS tokens + resets (Prompt 03)
├── components/
│   ├── scene/
│   │   ├── OrbitalScene.tsx      ← R3F Canvas root (Prompt 04)
│   │   ├── CoreSphere.tsx        ← Central identity sphere (Prompt 05)
│   │   ├── OrbitalRing.tsx       ← Single orbit path ring (Prompt 06)
│   │   ├── OrbitalNode.tsx       ← Floating geometry node (Prompt 07)
│   │   ├── NodeLabel.tsx         ← Billboard text label (Prompt 08)
│   │   ├── StarField.tsx         ← Background particle field (Prompt 09)
│   │   ├── CameraRig.tsx         ← Mouse-driven camera drift (Prompt 10)
│   │   └── PostProcessing.tsx    ← Bloom + vignette pass (Prompt 11)
│   ├── ui/
│   │   ├── NodePanel.tsx         ← Project detail drawer (Prompt 12)
│   │   ├── NameTag.tsx           ← Top-left name + title (Prompt 13)
│   │   ├── NavDots.tsx           ← Node navigator dots (Prompt 14)
│   │   ├── LoadingScreen.tsx     ← Entry animation screen (Prompt 15)
│   │   └── ContactLink.tsx       ← Bottom-right contact pill (Prompt 16)
│   └── providers/
│       └── SceneStateProvider.tsx ← Zustand state (Prompt 17)
├── lib/
│   ├── nodes.ts                  ← All project/node data (Prompt 18)
│   ├── orbitMath.ts              ← Kepler position math (Prompt 19)
│   └── useMouseParallax.ts       ← Mouse tracking hook (Prompt 20)
└── public/
    └── fonts/                    ← Local font files
```

---

## Libraries Reference

| Library | Version | Why |
|---|---|---|
| `three` | ^0.168 | Core WebGL renderer |
| `@react-three/fiber` | ^8.17 | React bindings for Three.js |
| `@react-three/drei` | ^9.112 | OrbitControls, Text, Billboard, Stars |
| `@react-three/postprocessing` | ^2.16 | Bloom, vignette, chromatic aberration |
| `gsap` | ^3.12 | Timeline animations, scroll triggers |
| `zustand` | ^4.5 | Global scene state (active node, panel open) |
| `leva` | ^0.9 (dev only) | Debug panel for tuning orbit params |
| `next` | 15.x | App router, RSC, image optimization |
| `tailwindcss` | ^3.4 | UI panel styling |
| `@fontsource/space-grotesk` | latest | Display font |
| `@fontsource/space-mono` | latest | Label monospace font |

Install command:
```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing gsap zustand @fontsource/space-grotesk @fontsource/space-mono
npm install -D leva @types/three
```

---

---

## PROMPT 01 — Page Shell
**File:** `app/page.tsx`
**Libraries used:** Next.js (dynamic import, Suspense)

```
Create the file app/page.tsx for a Next.js 15 App Router project.

This is the root page. It must:

1. Dynamically import `OrbitalScene` from `@/components/scene/OrbitalScene` with `ssr: false` and no loading fallback (loading={null}) — Three.js must never run on the server.
2. Dynamically import `SceneStateProvider` from `@/components/providers/SceneStateProvider` with `ssr: false`.
3. Dynamically import these UI components each with `ssr: false`:
   - `NodePanel` from `@/components/ui/NodePanel`
   - `NameTag` from `@/components/ui/NameTag`
   - `NavDots` from `@/components/ui/NavDots`
   - `LoadingScreen` from `@/components/ui/LoadingScreen`
   - `ContactLink` from `@/components/ui/ContactLink`

4. The page layout: a single `<main>` element with `className="relative w-screen h-screen overflow-hidden bg-[#050508]"`.
5. Inside that `<main>`, render: SceneStateProvider wrapping everything, then OrbitalScene fills the whole viewport as an absolute layer, then all UI components layered on top with `absolute` positioning.
6. Wrap the dynamic imports in `<Suspense fallback={null}>`.

No client directive on this file — it is a Server Component. All interactive children handle their own "use client".

TypeScript. No comments. Export default.
```

---

## PROMPT 02 — Root Layout + Fonts
**File:** `app/layout.tsx`
**Libraries used:** Next.js Metadata API, `@fontsource/space-grotesk`, `@fontsource/space-mono`

```
Create the file app/layout.tsx for a Next.js 15 App Router project.

Requirements:
1. Import `@fontsource/space-grotesk/400.css` and `@fontsource/space-grotesk/500.css` and `@fontsource/space-mono/400.css` at the top.
2. Import `./globals.css`.
3. Export a `metadata` object typed as `Metadata` from `next`:
   - title: "Rajat Sharma — Software Engineer"
   - description: "Full-stack and AI engineer. Building products under Sparqor."
   - openGraph: include title, description, type: "website"
4. The RootLayout component accepts `{ children: React.ReactNode }`.
5. Return `<html lang="en" className="antialiased">` with `<body style={{ fontFamily: "'Space Grotesk', sans-serif", background: '#050508', color: '#ffffff', margin: 0, overflow: 'hidden' }}>` wrapping `{children}`.

TypeScript. No comments. Export default.
```

---

## PROMPT 03 — Global CSS Tokens
**File:** `app/globals.css`
**Libraries used:** Tailwind CSS

```
Create the file app/globals.css.

It must include:

1. Tailwind directives: @tailwind base; @tailwind components; @tailwind utilities;

2. A :root block with these CSS custom properties:
   --color-bg: #050508;
   --color-core: #ffffff;
   --color-wireframe: rgba(255, 255, 255, 0.18);
   --color-accent: #c8f0ff;
   --color-accent-dim: rgba(200, 240, 255, 0.12);
   --color-text-primary: #ffffff;
   --color-text-secondary: rgba(255, 255, 255, 0.5);
   --color-text-muted: rgba(255, 255, 255, 0.25);
   --color-panel-bg: rgba(5, 5, 8, 0.85);
   --color-panel-border: rgba(255, 255, 255, 0.08);
   --font-display: 'Space Grotesk', sans-serif;
   --font-mono: 'Space Mono', monospace;
   --ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
   --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);

3. A * { box-sizing: border-box; } reset.
4. A body { background: var(--color-bg); overflow: hidden; } rule.
5. A ::selection { background: var(--color-accent-dim); color: var(--color-accent); } rule.
6. A .panel-blur { backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); } utility class.

No other rules. No Tailwind config changes needed.
```

---

## PROMPT 04 — OrbitalScene (R3F Canvas Root)
**File:** `components/scene/OrbitalScene.tsx`
**Libraries used:** `@react-three/fiber` (Canvas), `@react-three/drei` (AdaptiveDpr, AdaptiveEvents), Three.js

```
Create the file components/scene/OrbitalScene.tsx.

"use client" directive at top.

This is the root React Three Fiber canvas. Requirements:

1. Import `Canvas` from `@react-three/fiber`.
2. Import `AdaptiveDpr`, `AdaptiveEvents`, `Preload` from `@react-three/drei`.
3. Import these local scene components (stubs are fine if they don't exist yet — import them anyway):
   - CoreSphere from ./CoreSphere
   - OrbitalRing from ./OrbitalRing
   - OrbitalNode from ./OrbitalNode
   - StarField from ./StarField
   - CameraRig from ./CameraRig
   - PostProcessing from ./PostProcessing
4. Import `NODES` from `@/lib/nodes`.

Canvas props:
- `camera={{ position: [0, 0, 14], fov: 60, near: 0.1, far: 1000 }}`
- `gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}`
- `dpr={[1, 2]}`
- `className="absolute inset-0 w-full h-full"`
- `style={{ background: '#050508' }}`

Inside the Canvas, render:
- `<color attach="background" args={['#050508']} />`
- `<fog attach="fog" args={['#050508', 20, 60]} />`
- `<ambientLight intensity={0.15} />`
- `<pointLight position={[0, 0, 0]} intensity={2.5} color="#c8f0ff" distance={30} decay={2} />`
- `<directionalLight position={[10, 10, 5]} intensity={0.4} color="#ffffff" />`
- `<StarField />`
- `<CoreSphere />`
- Map over NODES and render `<OrbitalRing key={node.id} node={node} />` and `<OrbitalNode key={node.id + '-node'} node={node} />`
- `<CameraRig />`
- `<AdaptiveDpr pixelated />`
- `<AdaptiveEvents />`
- `<Preload all />`
- `<PostProcessing />`

TypeScript. No comments. Export default.
```

---

## PROMPT 05 — CoreSphere (Central Identity)
**File:** `components/scene/CoreSphere.tsx`
**Libraries used:** `@react-three/fiber` (useFrame), `@react-three/drei` (MeshDistortMaterial), Three.js, `gsap`

```
Create the file components/scene/CoreSphere.tsx.

"use client" directive at top.

This is the central glowing white sphere that represents Rajat's identity.

Requirements:
1. Import `useRef`, `useEffect` from react.
2. Import `useFrame` from `@react-three/fiber`.
3. Import `MeshDistortMaterial, Sphere` from `@react-three/drei`.
4. Import `gsap` from `gsap`.
5. Import `useSceneStore` from `@/components/providers/SceneStateProvider`.

Behavior:
- Render a `<Sphere args={[1, 64, 64]}>` at position [0,0,0].
- Use `MeshDistortMaterial` with: color="#ffffff", emissive="#c8f0ff", emissiveIntensity={0.3}, distort={0.25}, speed={1.5}, roughness={0}, metalness={0.1}.
- On mount, use gsap to animate scale from 0 to 1 with duration 1.8, ease: "elastic.out(1, 0.5)", delay: 0.3.
- In `useFrame`, slowly rotate the sphere mesh on Y axis at 0.003 per frame.
- When `activeNode` from the store is not null, tween scale to 0.7 (sphere shrinks slightly when a node is selected). When activeNode is null, tween back to 1. Use gsap for this tween with duration 0.5, ease "power2.out". Detect change in activeNode with a useEffect.
- Add a second inner sphere at scale 0.95 with `MeshDistortMaterial` color="#c8f0ff", transparent, opacity=0.08, distort=0.4, speed=2 — this gives a faint aura.

TypeScript. No comments. Export default.
```

---

## PROMPT 06 — OrbitalRing (Orbit Path Visualizer)
**File:** `components/scene/OrbitalRing.tsx`
**Libraries used:** `@react-three/fiber`, Three.js (`EllipseCurve`, `BufferGeometry`, `LineBasicMaterial`)

```
Create the file components/scene/OrbitalRing.tsx.

"use client" directive at top.

This renders the visible elliptical orbit path for a single node as a dashed line ring.

Props type:
interface OrbitalRingProps {
  node: OrbitalNode  // import from @/lib/nodes
}

Requirements:
1. Import `useMemo` from react.
2. Import `useThree` from `@react-three/fiber`.
3. Import Three.js: `EllipseCurve`, `BufferGeometry`, `LineBasicMaterial`, `Float32BufferAttribute`.
4. Import `OrbitalNode` type from `@/lib/nodes`.

Logic:
- Use `useMemo` to build the ring geometry:
  - Create an `EllipseCurve(0, 0, node.orbitRadius, node.orbitRadius * 0.38, 0, Math.PI * 2, false, 0)` — slightly elliptical, not circular.
  - Get 128 points from the curve.
  - Build a `BufferGeometry` from those points (Float32Array of x, y, 0 for each point).
  - Return the geometry.
- Render a `<line>` primitive with the geometry.
- Material: `<lineBasicMaterial color="#ffffff" transparent opacity={0.06} />`.
- Apply `node.inclination` as a rotation on X axis to the group wrapping the line: `<group rotation={[node.inclination, 0, node.orbitPhaseOffset]}>`.
- The ring should be extremely subtle — it marks the path without dominating.

TypeScript. No comments. Export default.
```

---

## PROMPT 07 — OrbitalNode (Floating Geometry)
**File:** `components/scene/OrbitalNode.tsx`
**Libraries used:** `@react-three/fiber` (useFrame, useThree), `@react-three/drei` (Billboard), Three.js, `gsap`, `zustand` (via store)

```
Create the file components/scene/OrbitalNode.tsx.

"use client" directive at top.

This is the main interactive floating geometry that orbits the CoreSphere. One instance per project.

Props type:
interface OrbitalNodeProps {
  node: OrbitalNode  // import from @/lib/nodes
}

Import: useRef, useCallback, useEffect, useState from react. useFrame, useThree from @react-three/fiber. gsap from gsap. useSceneStore from @/components/providers/SceneStateProvider. OrbitalNode type from @/lib/nodes. calcNodePosition from @/lib/orbitMath.

Geometry map (switch on node.geometry string):
- 'icosahedron'  → IcosahedronGeometry(0.42, 0)
- 'octahedron'   → OctahedronGeometry(0.48, 0)
- 'tetrahedron'  → TetrahedronGeometry(0.52, 0)
- 'dodecahedron' → DodecahedronGeometry(0.38, 0)
- 'torus'        → TorusGeometry(0.35, 0.12, 8, 24)

Use useMemo to create the geometry and a wireframe geometry from it (WireframeGeometry wrapping the base geometry).

State: `hovered` (boolean), `time` ref for orbit progress.

useFrame: increment time ref by `node.orbitSpeed * delta`. Call `calcNodePosition(node, time.current)` to get [x, y, z]. Apply to meshRef.current.position. Also slowly rotate the mesh itself on all axes for personality: X += 0.006 * delta * 60, Y += 0.009 * delta * 60, Z += 0.003 * delta * 60.

Render:
- A `<group>` ref for position.
- Inside: a `<mesh>` with the solid geometry. Material: `meshStandardMaterial` color={hovered ? "#c8f0ff" : "#ffffff"}, emissive={hovered ? "#c8f0ff" : "#050508"}, emissiveIntensity={hovered ? 0.6 : 0}, roughness={0.15}, metalness={0.4}, transparent, opacity={0.9}.
- A second `<lineSegments>` using the wireframe geometry. Material: `lineBasicMaterial` color="#ffffff", transparent, opacity={hovered ? 0.6 : 0.22}.
- onPointerEnter: set hovered true, document.body.style.cursor = 'pointer', gsap.to meshRef.current.scale with {x:1.35,y:1.35,z:1.35, duration:0.4, ease:'back.out(1.5)'}.
- onPointerLeave: set hovered false, cursor default, gsap scale back to {x:1,y:1,z:1, duration:0.3, ease:'power2.out'}.
- onClick: call setActiveNode(node) from store, gsap scale pulse to 1.5 then back to 1.35 over 0.25s.
- Import NodeLabel and render it below the mesh: `<NodeLabel node={node} visible={hovered} />`.

TypeScript. No comments. Export default.
```

---

## PROMPT 08 — NodeLabel (Billboard Text)
**File:** `components/scene/NodeLabel.tsx`
**Libraries used:** `@react-three/drei` (Billboard, Text), Three.js

```
Create the file components/scene/NodeLabel.tsx.

"use client" directive at top.

This renders a floating text label above each orbital node that appears on hover.

Props:
interface NodeLabelProps {
  node: OrbitalNode
  visible: boolean
}

Import: Billboard, Text from @react-three/drei.

Render a `<Billboard>` (always faces camera) containing:
1. A `<Text>` for the node label (node.label):
   - font: '/fonts/SpaceGrotesk-Medium.woff' (or fallback to system sans-serif)
   - fontSize: 0.18
   - color: "#ffffff"
   - anchorX: "center"
   - anchorY: "bottom"
   - position: [0, 0.75, 0]
   - fillOpacity: visible ? 1 : 0 — animate with `material.opacity` instead; use useFrame to lerp opacity toward target.
2. A small background plane behind the text (PlaneGeometry 1.2 × 0.3), meshBasicMaterial, color="#050508", transparent, opacity=0.6. Position at [0, 0.75, -0.01].
3. A `<Text>` for node.type tag (e.g. "PROJECT", "SKILL"):
   - fontSize: 0.1
   - color: "#c8f0ff"
   - font mono
   - position: [0, 0.52, 0]
   - opacity lerped the same way.

Use useRef for opacity current value and lerp it in useFrame: opacity.current = THREE.MathUtils.lerp(opacity.current, visible ? 1 : 0, 0.1). Apply to text material opacity.

TypeScript. No comments. Export default.
```

---

## PROMPT 09 — StarField (Background Particles)
**File:** `components/scene/StarField.tsx`
**Libraries used:** `@react-three/fiber` (useFrame), Three.js (`BufferGeometry`, `PointsMaterial`, `Float32BufferAttribute`)

```
Create the file components/scene/StarField.tsx.

"use client" directive at top.

This creates a subtle, deep starfield of 2400 random points in a sphere around the scene.

Requirements:
1. Import useMemo, useRef from react.
2. Import useFrame from @react-three/fiber.
3. Import * as THREE from three.

Logic:
- useMemo to generate particle positions:
  - 2400 particles.
  - Each particle placed randomly in a sphere shell between radius 35 and 80: use spherical coordinates, random theta and phi, random r in [35, 80].
  - Convert to Cartesian x, y, z.
  - Return Float32Array of all positions.
- Build a `<points>` with a BufferGeometry using this positions attribute.
- Material: `<pointsMaterial size={0.04} color="#ffffff" transparent opacity={0.55} sizeAttenuation fog={false} />`
- In useFrame: rotate the points mesh on Y axis very slowly: 0.00008 per frame. Also slightly on X: 0.00003.
- Do NOT make the stars twinkle (no per-frame opacity changes — too expensive).

TypeScript. No comments. Export default.
```

---

## PROMPT 10 — CameraRig (Mouse Parallax)
**File:** `components/scene/CameraRig.tsx`
**Libraries used:** `@react-three/fiber` (useFrame, useThree), Three.js (`MathUtils.lerp`), custom hook `useMouseParallax`

```
Create the file components/scene/CameraRig.tsx.

"use client" directive at top.

This component gently drifts the camera based on mouse position — giving the scene a "breathing" parallax feel.

Requirements:
1. Import useFrame, useThree from @react-three/fiber.
2. Import useMouseParallax from @/lib/useMouseParallax.
3. Import useSceneStore from @/components/providers/SceneStateProvider.
4. Import { MathUtils } from three.

Behavior:
- Call useMouseParallax() to get normalized { x, y } mouse position in range [-1, 1].
- In useFrame:
  - Target camera position: x = mouseX * 1.8, y = mouseY * 1.2 + 0, z = 14.
  - When activeNode is set (panel is open), camera should drift slightly toward [activeNode position x * 0.3, activeNode position y * 0.3, 11] to frame the node — use the node's last known 3D position stored in the scene store.
  - Lerp camera.position.x toward targetX at factor 0.028.
  - Lerp camera.position.y toward targetY at factor 0.028.
  - Lerp camera.position.z toward targetZ at factor 0.02.
  - Always call camera.lookAt(0, 0, 0) after lerping.
- Return null (no rendered output).

TypeScript. No comments. Export default.
```

---

## PROMPT 11 — PostProcessing (Bloom + Vignette)
**File:** `components/scene/PostProcessing.tsx`
**Libraries used:** `@react-three/postprocessing` (EffectComposer, Bloom, Vignette, ChromaticAberration)

```
Create the file components/scene/PostProcessing.tsx.

"use client" directive at top.

This adds the cinematic visual finish to the scene.

Requirements:
1. Import EffectComposer, Bloom, Vignette, ChromaticAberration from @react-three/postprocessing.
2. Import BlendFunction from postprocessing.

Render:
<EffectComposer multisampling={0}>
  <Bloom
    luminanceThreshold={0.2}
    luminanceSmoothing={0.9}
    intensity={0.6}
    mipmapBlur
  />
  <ChromaticAberration
    blendFunction={BlendFunction.NORMAL}
    offset={[0.0008, 0.0008]}
  />
  <Vignette
    offset={0.3}
    darkness={0.7}
    blendFunction={BlendFunction.NORMAL}
  />
</EffectComposer>

The Bloom makes the CoreSphere and hovered nodes glow. ChromaticAberration adds a subtle lens fringe. Vignette darkens edges for depth. Do not add more effects — this is the entire file.

TypeScript. No comments. Export default.
```

---

## PROMPT 12 — NodePanel (Project Detail Drawer)
**File:** `components/ui/NodePanel.tsx`
**Libraries used:** `gsap`, `zustand` (via store), Tailwind CSS

```
Create the file components/ui/NodePanel.tsx.

"use client" directive at top.

This is the off-canvas drawer panel that slides in from the right when a node is clicked. It shows full project details.

Requirements:
1. Import useRef, useEffect from react.
2. Import gsap from gsap.
3. Import useSceneStore from @/components/providers/SceneStateProvider.

Layout: a `<div>` absolutely positioned at top-0 right-0, h-full, w-[380px] max-w-[90vw]. z-index 50.

Background: panel-blur class + bg=[var(--color-panel-bg)] + border-l border-[var(--color-panel-border)].

Animation:
- On mount, set x to 400 (offscreen right) via gsap.set.
- useEffect watching activeNode:
  - If activeNode is set: gsap.to panel div, {x: 0, duration: 0.55, ease: "power3.out"}.
  - If activeNode is null: gsap.to panel div, {x: 400, duration: 0.45, ease: "power3.in"}.

Panel contents (when activeNode exists):
1. A close button top-right: "×" character, onClick calls setActiveNode(null), styled as w-8 h-8 text-white/50 hover:text-white.
2. A type tag: uppercase monospace, color var(--color-accent), fontSize 11px, letterSpacing 0.15em — e.g. "PROJECT".
3. Project name: Space Grotesk 500, 28px, white, margin-top 8px.
4. A thin 1px horizontal rule, color rgba(255,255,255,0.08), margin 20px 0.
5. Description paragraph: 15px, color var(--color-text-secondary), line-height 1.7.
6. Tech stack chips: map over node.tech array. Each chip: monospace 11px, border border-[rgba(255,255,255,0.12)], rounded-full, px-3 py-1, text-white/60, bg-transparent.
7. If node.url exists: an anchor tag styled as a pill button — inline-flex items-center gap-2, border border-[rgba(255,255,255,0.2)], rounded-full, px-5 py-2.5, text-white text-sm, hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors. Text: "View project →".

Padding: 32px on all sides.

TypeScript. No comments. Export default.
```

---

## PROMPT 13 — NameTag (Identity Header)
**File:** `components/ui/NameTag.tsx`
**Libraries used:** `gsap`, Tailwind CSS

```
Create the file components/ui/NameTag.tsx.

"use client" directive at top.

This is the minimal name + title block in the top-left corner of the viewport.

Requirements:
1. Import useRef, useEffect from react.
2. Import gsap from gsap.

Layout: `<div>` absolutely positioned top-8 left-8, z-index 40.

Contents:
1. `<p>` with text "RAJAT SHARMA" — font Space Mono, font-size 11px, letter-spacing 0.2em, color rgba(255,255,255,0.9), margin 0.
2. `<p>` with text "Software Engineer · Sparqor" — font Space Grotesk, font-size 13px, color rgba(255,255,255,0.4), margin-top 4px.
3. A 24px wide, 1px tall horizontal line below — background var(--color-accent), margin-top 10px, animated width 0→24px on mount.

Mount animation with gsap:
- The entire div starts with opacity 0, y: -8.
- After 0.8s delay, animate to opacity: 1, y: 0, duration: 0.7, ease: "power2.out".
- The accent line width animates from 0 to 24px with a 1.2s delay, duration 0.5s.

TypeScript. No comments. Export default.
```

---

## PROMPT 14 — NavDots (Node Navigator)
**File:** `components/ui/NavDots.tsx`
**Libraries used:** `zustand` (via store), `gsap`, Tailwind CSS

```
Create the file components/ui/NavDots.tsx.

"use client" directive at top.

This renders a vertical stack of dot indicators on the right edge (not overlapping the panel). Each dot represents one orbital node. Clicking a dot sets that node as active.

Requirements:
1. Import useSceneStore from @/components/providers/SceneStateProvider.
2. Import NODES from @/lib/nodes.
3. Import gsap from gsap.

Layout: `<div>` absolutely positioned right-6 top-1/2 -translate-y-1/2, z-40, flex flex-col gap-3, but only visible when NodePanel is CLOSED (when activeNode is null). Fade out with gsap when activeNode is set.

Each dot:
- A `<button>` with: w-1.5 h-1.5 rounded-full, transition-all duration-300.
- When the dot's node matches activeNode: scale up to w-2.5 h-2.5, bg-white.
- When not active: bg-white/20, hover:bg-white/50.
- onClick: setActiveNode(NODES[i]) from store.
- title attribute set to node.label for accessibility.

Mount animation: stagger each dot in from opacity 0 with gsap.from, stagger 0.08s, delay 1.5s.

TypeScript. No comments. Export default.
```

---

## PROMPT 15 — LoadingScreen (Entry Animation)
**File:** `components/ui/LoadingScreen.tsx`
**Libraries used:** `gsap`, Tailwind CSS

```
Create the file components/ui/LoadingScreen.tsx.

"use client" directive at top.

This is a full-screen overlay that plays once on first load, then disappears to reveal the scene.

Requirements:
1. Import useRef, useEffect, useState from react.
2. Import gsap from gsap.

State: `visible` boolean, starts true.

Layout: a `<div>` that covers the full screen — fixed inset-0 z-[100] bg-[#050508] flex items-center justify-content-center. When visible=false, pointer-events-none.

Contents:
1. A container div, ref'd.
2. A `<p>` showing "RAJAT SHARMA" in Space Mono, 11px, letter-spacing 0.25em, color rgba(255,255,255,0.3).
3. A thin loading bar: w-32 h-px bg-white/10 relative, with an inner div that animates width 0→100% over 1.4s with gsap, ease: "power2.inOut".

Sequence with gsap timeline:
- 0s: fade in the name text (opacity 0 → 0.3).
- 0.3s: animate the loading bar width 0 → 100% over 1.4s.
- 1.8s: fade out the name text.
- 2s: gsap.to the entire overlay div: opacity 0, duration 0.6s, ease "power2.inOut", then onComplete: setVisible(false).

When visible is false, return null.

TypeScript. No comments. Export default.
```

---

## PROMPT 16 — ContactLink (Footer Pill)
**File:** `components/ui/ContactLink.tsx`
**Libraries used:** `gsap`, Tailwind CSS

```
Create the file components/ui/ContactLink.tsx.

"use client" directive at top.

A minimal contact link pill in the bottom-right corner.

Requirements:
1. Import useRef, useEffect from react.
2. Import gsap from gsap.

Layout: `<div>` absolutely positioned bottom-8 right-8, z-40.

Render an `<a>` tag:
- href="mailto:rajat@sparqor.com"
- text: "say hello →"
- style: inline-flex items-center gap-2, border border-white/15, rounded-full, px-5 py-2.5, text-sm, font Space Grotesk, color rgba(255,255,255,0.5).
- hover: border-color transitions to var(--color-accent), color transitions to var(--color-accent). Use Tailwind transition-colors duration-300.

Also render a small `<p>` above the link:
- text "github.com/RajatSharma404"
- font Space Mono, 10px, color rgba(255,255,255,0.2), letter-spacing 0.1em, margin-bottom 8px.

Mount animation: opacity 0 → 1, y: 8 → 0, delay 1.8s, duration 0.6s via gsap.

TypeScript. No comments. Export default.
```

---

## PROMPT 17 — SceneStateProvider (Zustand Store)
**File:** `components/providers/SceneStateProvider.tsx`
**Libraries used:** `zustand`

```
Create the file components/providers/SceneStateProvider.tsx.

"use client" directive at top.

This is the global state store for the scene using Zustand.

Requirements:
1. Import create from zustand.
2. Import OrbitalNode type from @/lib/nodes.

Store interface:
interface SceneState {
  activeNode: OrbitalNode | null
  setActiveNode: (node: OrbitalNode | null) => void
  hoveredNode: OrbitalNode | null
  setHoveredNode: (node: OrbitalNode | null) => void
  activeNodeWorldPos: [number, number, number]
  setActiveNodeWorldPos: (pos: [number, number, number]) => void
  isLoaded: boolean
  setIsLoaded: (v: boolean) => void
}

Create the store with `create<SceneState>()((set) => ({ ... }))` with initial values: activeNode null, hoveredNode null, activeNodeWorldPos [0,0,0], isLoaded false, and the four setter functions.

Export the store as `useSceneStore`.

Also export a `SceneStateProvider` component that simply renders `{children}` — it exists only so page.tsx can wrap it cleanly as a dynamic import, not because Zustand needs a React provider.

TypeScript. No comments.
```

---

## PROMPT 18 — nodes.ts (All Project Data)
**File:** `lib/nodes.ts`
**Libraries used:** none (pure data)

```
Create the file lib/nodes.ts.

This file defines the OrbitalNode type and exports the NODES array containing all 7 project nodes for Rajat Sharma's portfolio.

TypeScript interface:
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

NODES array — 7 entries, one per project. Use varied orbit radii (3.2 to 5.8), varied speeds (0.28 to 0.52 — SLOWER is more majestic), varied offsets and inclinations to spread them across 3D space. No two nodes should share the same inclination or offset:

1. id: "flow"
   label: "Flow"
   type: "project"
   description: "An AI expense tracker that understands natural language. Built with the Gemini API for receipt parsing and Prisma for persistent multi-account ledgering."
   tech: ["Next.js 15", "Gemini API", "Prisma", "PostgreSQL"]
   orbitRadius: 3.4
   orbitSpeed: 0.42
   orbitOffset: 0
   inclination: 0.22
   geometry: "icosahedron"

2. id: "mastermind"
   label: "MasterMind"
   type: "project"
   description: "Chess analysis platform powered by Stockfish 17 and Gemini 2.0 Flash. Classifies moves, draws evaluation graphs, and explains positions in plain language."
   tech: ["Next.js", "FastAPI", "Stockfish 17", "Gemini 2.0 Flash"]
   orbitRadius: 4.1
   orbitSpeed: 0.34
   orbitOffset: 1.2
   inclination: 0.55
   geometry: "octahedron"

3. id: "mocktest365"
   label: "MockTest365"
   type: "project"
   description: "High-concurrency exam prep platform built for 10,000+ simultaneous test-takers. Engineered with RabbitMQ queues, Redis caching, and Aurora PostgreSQL under AWS Lambda."
   tech: ["AWS Lambda", "RabbitMQ", "Redis", "Aurora PostgreSQL"]
   orbitRadius: 4.9
   orbitSpeed: 0.28
   orbitOffset: 2.5
   inclination: -0.35
   geometry: "dodecahedron"

4. id: "dsa-city"
   label: "DSA City"
   type: "project"
   description: "A gamified 3D leaderboard platform for data structures and algorithms. Duolingo-style progression system with level gating and visual city building."
   tech: ["Three.js", "Next.js", "PostgreSQL"]
   orbitRadius: 3.8
   orbitSpeed: 0.46
   orbitOffset: 3.9
   inclination: 0.72
   geometry: "tetrahedron"

5. id: "dsa-tracker"
   label: "DSA Tracker Pro"
   type: "project"
   description: "A DSA problem tracker with Monaco editor integration, AI-generated hints, and a browser extension that syncs your LeetCode submissions automatically."
   tech: ["Monaco Editor", "Next.js", "Chrome Extension API", "Gemini API"]
   orbitRadius: 5.2
   orbitSpeed: 0.32
   orbitOffset: 0.8
   inclination: -0.6
   geometry: "icosahedron"

6. id: "countries-quiz"
   label: "Countries Quiz"
   type: "project"
   description: "Interactive world geography quiz built on a live SVG world map. Click countries directly on the map — no multiple choice, just pure spatial memory."
   tech: ["Leaflet.js", "D3.js", "GeoJSON", "Next.js"]
   orbitRadius: 4.5
   orbitSpeed: 0.38
   orbitOffset: 5.1
   inclination: 0.15
   geometry: "torus"

7. id: "body-planner"
   label: "Body Planner"
   type: "project"
   description: "Adaptive fitness planning app that generates personalised weekly programs with Gemini AI, visualised as a ReactFlow node graph that evolves with your progress."
   tech: ["Next.js 15", "ReactFlow", "Recharts", "Gemini AI"]
   orbitRadius: 5.8
   orbitSpeed: 0.30
   orbitOffset: 2.0
   inclination: -0.18
   geometry: "octahedron"

Export NODES as const. No comments.
```

---

## PROMPT 19 — orbitMath.ts (Kepler Position)
**File:** `lib/orbitMath.ts`
**Libraries used:** none (pure math)

```
Create the file lib/orbitMath.ts.

This file contains the math that computes where a node is in 3D space at a given time.

Export one function:

export function calcNodePosition(
  node: OrbitalNode,
  time: number
): [number, number, number] {
  // time is a continuously incrementing value from useFrame
  // angle progresses from orbitOffset
  const angle = time + node.orbitOffset

  // Elliptical orbit: x radius = orbitRadius, z radius = orbitRadius * 0.38
  const x = Math.cos(angle) * node.orbitRadius
  const z = Math.sin(angle) * node.orbitRadius * 0.38

  // Apply inclination: rotate the xz plane around the x axis
  const y = z * Math.sin(node.inclination)
  const zFinal = z * Math.cos(node.inclination)

  return [x, y, zFinal]
}

Import OrbitalNode from @/lib/nodes.

Also export a helper:

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

TypeScript. No comments.
```

---

## PROMPT 20 — useMouseParallax.ts (Mouse Tracking Hook)
**File:** `lib/useMouseParallax.ts`
**Libraries used:** React (`useEffect`, `useRef`, `useState`)

```
Create the file lib/useMouseParallax.ts.

"use client" is NOT needed here — this is a hook file, no directive.

This hook tracks the mouse position and returns a normalized { x, y } in range [-1, 1] relative to the viewport center.

Requirements:
1. Import useEffect, useRef from react.

Return type: { x: number, y: number }

Logic:
- Use a ref (not state) to store current { x, y } — avoids re-renders.
- Also return a ref object directly so CameraRig can read it each frame without subscribing.
- On mount, attach a mousemove listener to window.
- On mousemove: normalize: x = (e.clientX / window.innerWidth) * 2 - 1, y = -(e.clientY / window.innerHeight) * 2 + 1. Store in ref.
- On unmount, remove the listener.
- Return the ref (not .current) so the caller can always access the latest value inside useFrame without stale closures.

Return type: React.MutableRefObject<{ x: number, y: number }>

Export as default. TypeScript. No comments.
```

---

## Build Order

Paste prompts in this sequence. Each one builds on the previous:

```
18 → 19 → 20 → 17 → 03 → 02 → 09 → 05 → 06 → 07 → 08 → 11 → 10 → 04 → 15 → 13 → 16 → 14 → 12 → 01
```

Reason: data layer first (18, 19, 20), then state (17), then CSS (03, 02), then 3D scene bottom-up (starfield, core, rings, nodes, labels, post-processing, camera), then UI layer top-down (loading, name, contact, nav, panel), then the page shell last (01) when all imports exist.

---

## After All Prompts — Verify Checklist

Run Antigravity through this verification prompt after building all 20 files:

```
Verify the following in the codebase:

1. No file imports from `three/examples` — use @react-three/drei equivalents only.
2. Every "use client" directive is on line 1 of its file with no preceding whitespace.
3. `OrbitalScene.tsx` does NOT have "use client" — confirm it exists without it. Wait — it should have it since it imports client components. Add "use client" to OrbitalScene.tsx if missing.
4. `page.tsx` does NOT have "use client" — it must stay a Server Component.
5. `nodes.ts` and `orbitMath.ts` have no React imports — they are pure TS modules.
6. All gsap animations inside R3F components use useEffect or useFrame — never in the component body directly.
7. The NODES array has exactly 7 items.
8. PostProcessing.tsx is inside the R3F Canvas (rendered inside OrbitalScene) — NOT outside it.
9. LoadingScreen uses z-index 100 so it sits above everything else.
10. NodePanel has `backdrop-filter: blur(24px)` applied via the `panel-blur` CSS class.

Report any issues found and fix them one file at a time.
```

---

## Optional: Leva Debug Panel

Add this prompt ONLY in development to tune orbit params live:

```
Add a Leva debug panel to OrbitalScene.tsx.

Import { useControls } from 'leva'. Add controls for:
- bloomIntensity: { value: 0.6, min: 0, max: 3, step: 0.1 }
- orbitSpeedMultiplier: { value: 1, min: 0, max: 3, step: 0.05 }
- cameraZ: { value: 14, min: 8, max: 30, step: 0.5 }
- fogDensity: { value: 0.02, min: 0, max: 0.1, step: 0.005 }

Pass orbitSpeedMultiplier into each OrbitalNode as a prop so you can slow down / speed up all orbits live. Guard the entire useControls call with `process.env.NODE_ENV === 'development'` check. Never ship Leva to production.
```
