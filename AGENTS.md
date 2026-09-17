# 🌍 Antigravity Agent Directives & Command Rules — 3D Earth Portfolio

## ⚡ Command Triggers & Skill Mapping

When the user enters any of the following slash commands or prompts, immediately activate and execute the corresponding skill runbook from `.agents/skills/`:

| Command / Trigger | Skill Name | Runbook Path | Description |
|---|---|---|---|
| `/improvement`, `review my project`, `audit this codebase`, `find bugs`, `what can I improve` | **`improvement`** | [.agents/skills/improvement/SKILL.md](file:///d:/3D%20Portfolio/.agents/skills/improvement/SKILL.md) | Comprehensive Senior Code Review & Structured Improvement Report with before/after snippets |
| `/commit`, `commit`, `atomic commit`, `commit one file at a time` | **`commit`** | [.agents/skills/commit/SKILL.md](file:///d:/3D%20Portfolio/.agents/skills/commit/SKILL.md) | Atomic Per-File Commit & Push Protocol (1 commit per modified/new/deleted file) |
| `/evolve`, `update skills`, or **Automatically on any codebase change** | **`skill-evolver`** | [.agents/skills/skill-evolver/SKILL.md](file:///d:/3D%20Portfolio/.agents/skills/skill-evolver/SKILL.md) | Autonomous self-updating engine keeping all skills synchronized with code changes |
| `/add-node`, `add project`, `new project` | **`add-project-node`** | [.agents/skills/add-project-node/SKILL.md](file:///d:/3D%20Portfolio/.agents/skills/add-project-node/SKILL.md) | Scaffolds and registers a new 3D project node, coordinates, and case study |
| `/optimize-scene`, `webgl`, `optimize globe`, `fps` | **`webgl-scene-optimizer`** | [.agents/skills/webgl-scene-optimizer/SKILL.md](file:///d:/3D%20Portfolio/.agents/skills/webgl-scene-optimizer/SKILL.md) | Three.js & WebGL 60 FPS performance, DPR limits, and memory cleanup |
| `/add-demo`, `interactive demo`, `project demo` | **`interactive-demo-builder`** | [.agents/skills/interactive-demo-builder/SKILL.md](file:///d:/3D%20Portfolio/.agents/skills/interactive-demo-builder/SKILL.md) | Client-side interactive simulation sandbox for project case studies |
| `/audio`, `sound`, `synthesizer` | **`sound-fx-synthesis`** | [.agents/skills/sound-fx-synthesis/SKILL.md](file:///d:/3D%20Portfolio/.agents/skills/sound-fx-synthesis/SKILL.md) | Web Audio API procedural oscillator synthesis and gesture resumption |
| `/qa`, `/test`, `audit`, `quality check` | **`qa-audit-test`** | [.agents/skills/qa-audit-test/SKILL.md](file:///d:/3D%20Portfolio/.agents/skills/qa-audit-test/SKILL.md) | Multi-gate QA: bug checker, orphan cleaner, TypeScript, Vitest, and build |

---

## 🔄 Autonomous Skill Auto-Update Protocol (Self-Evolving System)

**MANDATORY DIRECTIVE**: Whenever you implement, refactor, or delete any feature, component, script, dependency, or configuration in this project:
1. **Detect Changes**: Check what files and patterns were introduced or altered (`git status -s`).
2. **Auto-Update Existing Skills**: If changes affect project data schemas, Three.js shaders, audio frequencies, test commands, or review guidelines, update the respective `SKILL.md` under `.agents/skills/` immediately.
3. **Scaffold New Skills**: If a significant new domain or workflow is created (e.g., automated screenshot capture, AI model deployment, offline PWA cache), automatically scaffold `.agents/skills/<new-skill>/SKILL.md` with YAML frontmatter, step-by-step instructions, and verification commands.
4. **Zero Stale Documentation**: Never leave `.agents/skills/` out of sync with current repository code.

---

## 🛡️ Gemini Privacy & Security Policy Compliance

1. **Zero Secret Exfiltration**: Never output, hardcode, or commit real API keys, credentials, tokens, or PII. Use `.env.local` and `.gitignore`.
2. **Safe Code Execution**: Do NOT use `eval()`, unsanitized `innerHTML`, or arbitrary dynamic remote scripts.
3. **Privacy-First State**: User settings (audio mute, theme) remain in client `localStorage` with zero external tracking.
4. **Browser Audio Compliance**: Adhere strictly to browser user-gesture requirements before resuming the Web Audio `AudioContext`.
