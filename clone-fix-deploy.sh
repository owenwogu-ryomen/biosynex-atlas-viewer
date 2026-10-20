#!/usr/bin/env bash
set -euo pipefail
cd /tmp
rm -rf atlas-fix
git clone https://github.com/owenwogu-ryomen/biosynex-atlas-viewer-clone.git atlas-fix
cd atlas-fix

cat > vite.config.ts <<'VITE_EOF'
// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
    // Static-site generation for GitHub Pages: prerender every route to plain HTML.
    prerender: {
      enabled: true,
      crawlLinks: true,
    },
    pages: [{ path: "/", prerender: { enabled: true } }],
  },
  // Base path for this repository's own GitHub Pages deployment.
  vite: {
    base: '/biosynex-atlas-viewer-clone/',
  },
  // No server runtime on GitHub Pages — Start's prerendered output is the deployable site.
  nitro: false
});
VITE_EOF

cat > .github/workflows/deploy.yml <<'YML_EOF'
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
      - master

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Bun
        uses: oven-sh/setup-bun@v2

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Build Project
        run: bun run build

      - name: Add SPA fallback (404.html)
        run: cp dist/client/index.html dist/client/404.html

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist/client

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
YML_EOF

if git diff --quiet; then
  echo "Already fixed - nothing to change."
  exit 0
fi

git config user.name "owenwogu-ryomen"
git config user.email "228959905+owenwogu-ryomen@users.noreply.github.com"
git add vite.config.ts .github/workflows/deploy.yml
git commit -m "Fix GitHub Pages deploy: prerender static site with TanStack Start" -m "Replace the broken Nitro static build (failed on the original repo too) with TanStack Start prerendering to dist/client, upload dist/client to Pages, and add a 404.html fallback."
git push origin main

gh api -X POST repos/owenwogu-ryomen/biosynex-atlas-viewer-clone/pages -f build_type=workflow >/dev/null 2>&1 \
  && echo "GitHub Pages enabled (source: GitHub Actions)." \
  || echo "NOTE: If Pages is not enabled yet, turn it on once: repo Settings -> Pages -> Build and deployment -> Source: GitHub Actions. Then re-run the workflow from the Actions tab if needed."

echo "Done. Watch the deploy here: https://github.com/owenwogu-ryomen/biosynex-atlas-viewer-clone/actions"
