#!/usr/bin/env bash
set -euo pipefail
cd /tmp
rm -rf atlas-update
git clone https://github.com/owenwogu-ryomen/biosynex-atlas-viewer-clone.git atlas-update
cd atlas-update

if grep -q "Load 3D model" src/components/ViewerFrame.tsx; then
  echo "This update is already applied - nothing to do."
  exit 0
fi

curl -fsSL https://raw.githubusercontent.com/owenwogu-ryomen/biosynex-atlas-viewer/arena/18b632c0-biosynex-atlas-viewer/clone-update-viewer.patch -o /tmp/clone-update-viewer.patch
git apply --check /tmp/clone-update-viewer.patch
git apply /tmp/clone-update-viewer.patch

if [ -z "$(git status --porcelain)" ]; then
  echo "No changes produced - already up to date."
  exit 0
fi

git config user.name "owenwogu-ryomen"
git config user.email "228959905+owenwogu-ryomen@users.noreply.github.com"
git add -A
git commit -m "Click-to-load 3D viewer, animated self-hosted ventilator diagram, plain-language pass" -m "Poster-first Sketchfab embed (fresh iframe per load, Close/fullscreen, lazarys credit); replace Lovable-hosted SVG asset JSON with a tailored animated SVG stored in the repo; simplify MRI + ventilator explanations for lay readers while keeping all facts, values, and references."
git push origin main

echo "Done. Watch the deploy here: https://github.com/owenwogu-ryomen/biosynex-atlas-viewer-clone/actions"
echo "Live site (after the green check): https://owenwogu-ryomen.github.io/biosynex-atlas-viewer-clone/"
