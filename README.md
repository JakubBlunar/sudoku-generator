# Sudoku

An online sudoku game and a printable A4 sheet generator, in React.

- **Play in the browser** — classic numbers, or letters instead of digits.
- **Print for real** — generate A4 sheets with 9 large-print puzzles per page,
  tear them out along the grid, and solve on paper.
- **No sign-up, no tracking, no ads.** Runs entirely in the browser.

Live: https://sudoku.jablu.sk/ (previously https://sudoku-gtr.vercel.app/)

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

## Project structure

```
src/
  pages/            # Next pages (router, game, generator, …)
  components/       # layout, game, generator, home, common
  containers/       # Game.tsx — the game state machine
  context/          # SudokuContext (board state)
  solver/           # sudoku.js (vendored) + UniqueSudoku.tsx (puzzle builder)
  theme/            # styled-components ThemeProvider + tokens + @media print
public/             # favicon (png/ico/svg), og-image.png
scripts/            # Python helpers that regenerate brand assets
  make_favicon.py   #   -> public/favicon.png + favicon.ico
  make_og_image.py  #   -> public/og-image.png (1200×630 share card)
```

The brand assets in `public/` are **generated**, not hand-drawn — run the
matching script in `scripts/` (needs Pillow) if you change the brand, then
commit the output.

---

## ⚠️ The print output is sacred

The A4 sheet geometry is **tuned to be pixel-perfect for the end user**
(large-print sheets, 9 puzzles per A4 portrait page). **Print output must stay
pixel-identical** — do not change sizes, margins, or line weights in:

- `src/components/generator/SudokuBoard.tsx` — `@media print` block
- `src/pages/generator.tsx` — `.Sheet` print rules
- `src/theme/index.ts` — global `@page` / `@media print`
- `src/containers/Game.tsx` — print reset

The board is `9 × 9.46mm` + borders = `89.6mm`; a sheet is
`3 × 89.6 + 2 × 6mm + 2 × 8mm = 296.8mm ≤ 297mm` (A4). Keep the print CSS
**pure `#000` / `#fff`** — recoloring the on-screen theme must never leak into
print.

**Verify print with the real pipeline, never a screenshot:**

```js
// Playwright, on a freshly-navigated tab:
await page.pdf({ path: 'out.pdf', format: 'A4', preferCSSPageSize: true, printBackground: true })
```

Then extract text per page with `pypdf` — every page must contain **only
digits + whitespace**. Any letter/label means the header or control bar leaked
in. (`emulateMedia('print')` screenshots are unreliable here and should not be
trusted.)

---

## Deployment

The app is deployed two ways; keep them in sync when you change the public
origin or add env vars.

### 1. Self-hosted (VPS + Docker, behind Traefik) — primary

This is the current live deployment (https://sudoku.jablu.sk/). It runs as a
single Docker container on the shared VPS, on the Traefik `web` network, with
no public ports. Traefik routes `Host(sudoku.jablu.sk)` to the container and
auto-issues the Let's Encrypt cert.

Files:

- `Dockerfile` — 3-stage `node:24-alpine` build. Produces a standalone Next.js
  image (~340 MB) that runs `node server.js`.
- `docker-compose.yml` — joins the external `web` network; Traefik labels are
  driven by `SUDOKU_HOST`. Build arg `NEXT_PUBLIC_SITE_URL` is derived from it.
- `.env` (gitignored) / `.env.example` — set `SUDOKU_HOST` (must match DNS).
- `deploy.sh` — `git pull` → `docker compose up -d --build` → healthcheck →
  prune. Run on the VPS, or it's run by the GitHub Action.

**Deploy from your machine:**

```bash
ssh jablu@<VPS-IP> "cd /opt/sudoku && bash deploy.sh"
```

> Healthcheck gotcha: it targets `http://127.0.0.1:3000`, **not**
> `localhost` — inside the container `localhost` resolves to IPv6 `::1` but
> the Next server only listens on IPv4, so `localhost` gives a false
> "not healthy".

### 2. Automated (GitHub Actions → VPS over SSH)

`.github/workflows/deploy.yml` runs on **push to `main`** and SSHes into the
VPS to run the same `bash deploy.sh`. This is the "push → live" path.

Required repo secrets (Settings → Secrets and variables → Actions):

| Secret | Value |
| --- | --- |
| `VPS_HOST` | the VPS IP (or hostname) |
| `VPS_USER` | `jablu` |
| `VPS_SSH_KEY` | a **deploy-only** private SSH key (see below) |

**Setting up the deploy key** (do this once, with a *dedicated* key — not your
personal key — so a leak only exposes one VPS):

```bash
# 1. generate
ssh-keygen -t ed25519 -f ~/.ssh/sudoku-deploy -N ""

# 2. install the PUBLIC key on the VPS (prompts for your password once)
cat ~/.ssh/sudoku-deploy.pub | ssh jablu@<VPS-IP> \
  'mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys'

# 3. verify passwordless login
ssh -i ~/.ssh/sudoku-deploy jablu@<VPS-IP>
```

Then paste the **full private key** (`~/.ssh/sudoku-deploy` — including the
`-----BEGIN/END OPENSSH PRIVATE KEY-----` lines) into the `VPS_SSH_KEY` secret.

### Vercel (legacy)

The app still builds and runs on Vercel as before (https://sudoku-gtr.vercel.app/).
The public origin is read from `NEXT_PUBLIC_SITE_URL` at build time, falling
back to the Vercel URL — so neither deployment needs code changes when the
other's host differs. `@vercel/analytics` is present but only reports on
Vercel (harmless elsewhere).

---

## One-off gotchas (learned the hard way)

- **Config file is `next.config.js`** (no leading dot). An earlier
  `.next.config.js` was **silently ignored** by Next.js, so `output: 'standalone'`
  and the styled-components compiler never applied. If build output looks
  "stock" again, check the filename first.
- **`deploy.sh` must be executable in git** (`100755`). On a Windows machine
  (`core.fileMode=false`) the `+x` bit isn't recorded, so a Linux VPS checks it
  out non-executable and `./deploy.sh` fails with exit 126. It's now recorded
  as `100755` and the CI invokes it as `bash deploy.sh` as a belt-and-suspenders.
- **Builds happen on the VPS** (no external image registry) — the first deploy
  runs a full `npm ci` + `next build` there, so it takes a few minutes.
