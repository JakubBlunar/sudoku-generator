# Sudoku

An online sudoku game and a printable A4 sheet generator, in React.

- **Play in the browser** — classic numbers, or letters instead of digits.
- **Print for real** — generate A4 sheets with 9 large-print puzzles per page,
  tear them out along the grid, and solve on paper.
- **No sign-up, no tracking, no ads.** Runs entirely in the browser.

Live: https://sudoku.jablu.sk/

---

## Features

| Page | Path | What it does |
| --- | --- | --- |
| Home | `/` | Hero (auto-solving board), how-to, CTA to play or print |
| Game (numbers) | `/game` | Classic 9×9 sudoku, mistakes mode, hints, timer, win overlay |
| Game (letters) | `/alphabet-game` | Same game with A–I letters instead of digits |
| Generator | `/generator` | Printable A4 sheet builder — pick page count + seed, preview, print |
| Legacy redirect | `/generate` | Redirects to `/generator` |

Puzzles are **guaranteed unique-solution** (the solver picks givens per
difficulty — Easy 45 / Medium 40 / Hard 30 total cells). Don't "improve" the
solver without re-verifying uniqueness.

---

## Tech

- **Next.js 16** (pages router) + **React 19**
- **styled-components 6** (CSS-in-JS, no Tailwind, no icon library)
- Self-hosted **Fontsource** fonts (no Google Fonts):
  - *Space Grotesk* (variable) — wordmark + headlines
  - *Figtree* (variable) — body
  - *Noto Sans* 400/700 — board digits + print preview
- **Node ≥ 24** (`.nvmrc` / `.node-version` → `24.14.1`)
- `npm` (lockfile: `package-lock.json`)

There is **no test runner and no linter** in this repo — `npm run build`
is the only gate.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm run start      # serve the production build
```

---