# LEONIDA CASEFILE

A GTA VI-inspired police case investigation tool. Upload crime scene photos, annotate evidence using React Image Editor, and generate stylized police dossier casefiles.



## Features

- **Terminal Boot Sequence** — CRT scanlines, noise grain, typewriter animation
- **Case Creation** — Upload crime scene photo, set location, time, status, notes
- **Evidence Annotation** — Mark evidence, crop details, enhance images, add annotations, redact sensitive info
- **Dossier Generation** — Download a styled police casefile as PDF
- **Image Compression** — Auto-compresses uploads for fast PDF rendering

## Tech Stack

- [Vite](https://vite.dev/) + [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [@unlayer/react-image-editor](https://unlayer.com/react-image-editor)

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server
bun run dev
```

## Project Structure

```
src/
├── App.tsx                    # Screen router + navigation
├── index.css                  # Design tokens, effects, print styles
├── types/index.ts             # TypeScript types
├── hooks/useCase.ts           # Case state + localStorage persistence
├── utils/compressImage.ts     # Image compression utility
├── data/
│   ├── evidenceActions.ts     # Evidence tool configurations
│   └── locations.ts           # Location presets
└── components/
    ├── Terminal.tsx            # Boot screen
    ├── CaseCreation.tsx        # New case form
    ├── Header.tsx              # Navigation bar
    ├── InvestigationView.tsx   # Main investigation layout
    ├── EditorModal.tsx         # Unlayer image editor
    ├── EvidenceActions.tsx     # Evidence tool buttons
    ├── EvidenceList.tsx        # Evidence items list
    ├── CaseDetails.tsx         # Case metadata display
    └── CasefileView.tsx        # Dossier PDF view
```

## Disclaimer

A fan-made experience inspired by open-world crime games. Not affiliated with Rockstar Games.
