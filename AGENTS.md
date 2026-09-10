# AGENTS.md — LEONIDA CASEFILE

## Project Overview
LEONIDA CASEFILE is a GTA VI-inspired police case investigation tool built for the Unlayer React Image Editor competition. Users upload crime scene photos, annotate evidence using React Image Editor, and generate stylized police dossier casefiles.

## Tech Stack
- **Framework**: Vite + React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Editor**: `@unlayer/react-image-editor` (manual tools only, NO AI)
- **Package Manager**: bun

## Design System

### Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `vice-bg` | `#0B0A10` | Main background |
| `vice-surface` | `#14172B` | Card backgrounds / panels |
| `vice-card` | `#1F2440` | Secondary surfaces |
| `vice-border` | `#2D335B` | Borders, dividers |
| `vice-pink` | `#FF3F8E` | Primary accent (buttons, links) |
| `vice-magenta` | `#D91B83` | Hover / active accent |
| `sunset-coral` | `#FF6B61` | Highlights, important elements |
| `sunset-orange` | `#FF9B54` | Secondary highlights / warnings |
| `vice-cyan` | `#20D9D2` | Interactive elements / focus |
| `vice-teal` | `#00AFA8` | Secondary interactive |
| `evidence-paper` | `#F3EBD0` | Casefile paper / light surface |
| `evidence-ink` | `#1A1A1A` | Text on paper |
| `police-red` | `#E54840` | Alerts, stamps, critical |
| `active-green` | `#43D17A` | Active status / success |
| `text-primary` | `#EDEFF5` | Main text |
| `text-muted` | `#A7ADC7` | Secondary text |

### Typography

| Font | Usage | Weight |
|------|-------|--------|
| JetBrains Mono | UI data, labels, scores | 400, 500, 600 |
| Special Elite | Display headings ≥28px only | 400 |
| Courier Prime | Prose, notes, casefile body | 400, 700 |

- Never use Special Elite below 28px
- Use `tabular-nums` on all numbers (scores, case numbers)

### Visual Effects
- CRT scanlines (`.crt::before`)
- Noise grain (`.noise::after` with SVG feTurbulence)
- Paper texture (`.paper-texture`)
- Stamp slam animation (`@keyframes stampSlam`)
- Flicker animation (terminal only)
- Score bar fill animation (`@keyframes fillBar`)

## Application Flow
1. **Terminal** — Boot screen with flicker + typewriter effect
2. **Case Creation** — Form with location, time, status, notes
3. **Investigate** — Editor (80% of screen) + Evidence Tools + Log + Score
4. **Casefile** — Generated dossier for download/share

## Key Rules
- **NO AI features** — React Image Editor manual tools only
- **3 font max** — JetBrains Mono, Special Elite, Courier Prime
- **No terminal green** — Use vice-cyan, vice-pink, sunset-coral
- **Stamp animation** — Only trigger on first render
- **Evidence Score** — Fictional metric (0-100), calculated from user inputs
- **Disclaimer required** — "A fan-made experience inspired by open-world crime games. Not affiliated with Rockstar Games."

## Component Structure
```
src/
├── main.tsx
├── App.tsx
├── index.css
├── types/index.ts
├── hooks/useCase.ts
├── utils/evidenceScore.ts
├── data/locations.ts
└── components/
    ├── Terminal.tsx
    ├── CaseCreation.tsx
    ├── Header.tsx
    ├── InvestigationView.tsx
    ├── EditorPanel.tsx
    ├── EvidenceTools.tsx
    ├── EvidenceLog.tsx
    ├── CaseDetails.tsx
    ├── EvidenceScore.tsx
    └── CasefileView.tsx
```

## Unlayer API Notes
- Import: `import ImageEditor from '@unlayer/react-image-editor'`
- Props: `id`, `tools` (string[]), `value` (stringified JSON), `onChange`, `onReady`
- Tool names: `text`, `image`, `draw` (pen/brush), `shape` (rectangle/ellipse/polygon/line/arrow)
- `getEditor()` returns promise with API methods
- Export: `editor.saveImage()` → `{ dataUrl, mimeType, quality, width, height }`

## Commands
- Dev: `bun run dev`
- Build: `bun run build`
- Preview: `bun run preview`
