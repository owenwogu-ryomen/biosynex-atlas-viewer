cd /tmp
rm -rf atlas-clone
mkdir atlas-clone && cd atlas-clone
curl -L https://github.com/owenwogu-ryomen/biosynex-atlas-viewer/archive/refs/heads/main.tar.gz | tar xz --strip-components=1
rm -rf .lovable AGENTS.md src/lib/lovable-error-reporting.ts
sed -i 's/import { useEffect, type ReactNode } from "react";/import { type ReactNode } from "react";/' src/routes/__root.tsx
sed -i '/lovable-error-reporting/d' src/routes/__root.tsx
sed -i '/useEffect(() => {/,/}, \[error\]);/d' src/routes/__root.tsx
sed -i '/twitter:site/d' src/routes/__root.tsx
sed -i "s|.*WE ADDED THIS BLOCK.*|  // Base path for this repository's own GitHub Pages deployment.|" vite.config.ts
sed -i "s|base: '/biosynex-atlas-viewer/'|base: '/biosynex-atlas-viewer-clone/'|" vite.config.ts
sed -i '/^      - lovable$/d' .github/workflows/deploy.yml
cat > README.md <<'README_EOF'
# Biosynex Atlas Viewer (Clone)

> **Independent clone** of [owenwogu-ryomen/biosynex-atlas-viewer](https://github.com/owenwogu-ryomen/biosynex-atlas-viewer), created on 2026-10-20.
> This is **not a fork** and shares no connection, sync, or shared history with the original repository.
> Edits made here do not affect the original, and edits to the original do not affect this copy.

Biosynex Atlas (Biosynex Signal Studio) is an educational biomedical equipment library — no login required.
Visitors can learn about a medical equipment, have a 3D viewing experience, and access materials for further studies:

- **Study Medical Equipment** — a large 3D viewport (embed per device, e.g. Spline/Sketchfab) with text descriptions underneath; the device page is duplicable for more devices by adding an entry in `src/data/equipment.ts`.
- **Resources & Materials** — a searchable list of videos, books, PDFs, articles, and journals (`/resources`).
- Footer contact on every page: owenwogu651@gmail.com

## Development

You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating) — or [Bun](https://bun.sh).

```sh
git clone https://github.com/owenwogu-ryomen/biosynex-atlas-viewer-clone.git
cd biosynex-atlas-viewer-clone
npm i
npm run dev
```

Other scripts: `npm run build`, `npm test`, `npm run lint`.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the static site and deploys it to **this repository's own** GitHub Pages site (`/biosynex-atlas-viewer-clone/`), independent of the original repository's deployment.
README_EOF
git init -b main
git config user.name "owenwogu-ryomen"
git config user.email "228959905+owenwogu-ryomen@users.noreply.github.com"
git add -A
git commit -m "Initial commit: independent clone of Biosynex Atlas Viewer" -m "Copied from owenwogu-ryomen/biosynex-atlas-viewer with no fork, sync, or shared history. Lovable link files stripped; Pages base path set to /biosynex-atlas-viewer-clone/."
git remote add origin https://github.com/owenwogu-ryomen/biosynex-atlas-viewer-clone.git
git push --force -u origin main
