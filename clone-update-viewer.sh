#!/usr/bin/env bash
set -euo pipefail
cd /tmp
rm -rf atlas-update
git clone https://github.com/owenwogu-ryomen/biosynex-atlas-viewer-clone.git atlas-update
cd atlas-update

if grep -q "mechanical-ventilator-illustration" src/data/equipment.ts; then
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
git commit -m "Illustrated click-to-load 3D viewer, animated self-hosted ventilator diagram, plain-language pass" -m "Britannica ventilator illustration as the viewport poster (self-hosted, contain fit), hover-revealed View 3D button plus an always-visible button below the viewport for touch devices; fresh Sketchfab iframe per load with Close/fullscreen and model credit. Replace Lovable-hosted SVG asset JSON with a tailored animated SVG stored in the repo. Simplify MRI + ventilator explanations for lay readers while keeping all facts, values, and references."
git push origin main

echo "Done. Watch the deploy here: https://github.com/owenwogu-ryomen/biosynex-atlas-viewer-clone/actions"
echo "Live site (after the green check): https://owenwogu-ryomen.github.io/biosynex-atlas-viewer-clone/"
