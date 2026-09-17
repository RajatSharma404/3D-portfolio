---
name: webgl-scene-optimizer
description: >-
  Use this skill when optimizing Three.js WebGL performance, tuning react-globe.gl camera physics,
  resolving WebGL memory leaks, or configuring shaders, textures, and atmosphere effects.
---

# WebGL Scene Optimizer Runbook (`/optimize-scene`)

This skill standardizes WebGL performance tuning, Three.js resource management, and 3D Earth globe camera control for the portfolio.

---

## ⚡ Core Performance Standards

1. **Strict 60 FPS Target**: Maintain steady 60 frames per second across standard and high-DPI displays.
2. **Device Pixel Ratio (DPR) Clamping**: Always clamp `devicePixelRatio` to $\le 1.5$ to prevent mobile or 4K GPU thermal throttling:
   ```typescript
   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
   ```
3. **Texture Memory Hygiene**: Ensure NASA Blue Marble diffuse maps, elevation bump maps, and starfield skyboxes in `public/textures/` are properly disposed of when unmounting.
4. **Context Loss Resilience**: Listen for `webglcontextlost` and gracefully handle canvas re-initialization.

---

## 📋 Optimization Procedures

### 1. Camera & Spherical Navigation Physics
- Camera flights between continents are handled via `globeRef.current.pointOfView({ lat, lng, altitude }, durationMs)`.
- Altitude settings:
  - **Overview / All Earth**: `altitude: 2.5`
  - **Continent Focus**: `altitude: 1.6`–`1.8`
  - **Project Node Focus**: `altitude: 0.8`–`1.2`
- Ensure `controls.autoRotateSpeed = 0.75` halts cleanly when user interaction starts.

### 2. Atmospheric Rayleigh Scattering Glow
- Configured in [InteractiveGlobe.tsx](file:///d:/3D%20Portfolio/components/scene/InteractiveGlobe.tsx).
- `atmosphereAltitude`: Keep between `0.14` and `0.18` for subtle halo without obscuring surface terrain.
- Dynamic atmosphere tint responds smoothly to hovered project accent colors.

### 3. Memory Cleanup in `useEffect`
Whenever modifying 3D scene components:
```typescript
useEffect(() => {
  return () => {
    // 1. Cancel requestAnimationFrame
    if (animFrameId) cancelAnimationFrame(animFrameId)
    // 2. Dispose geometries and materials
    geometry?.dispose()
    material?.dispose()
    texture?.dispose()
    // 3. Remove event listeners
    window.removeEventListener('resize', handleResize)
  }
}, [])
```

---

## 🧪 Verification Commands

```bash
# Run bug checker to detect missing cleanup hooks
npm run audit:bugs

# Run test suite to verify scene state provider stability
npm test tests/state/
```
