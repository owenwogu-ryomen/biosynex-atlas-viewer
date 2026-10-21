#!/usr/bin/env bash
set -euo pipefail
cd /tmp
rm -rf atlas-update
git clone https://github.com/owenwogu-ryomen/biosynex-atlas-viewer-clone.git atlas-update
cd atlas-update

if grep -q "308304dd1771433fb5f37fe9132bb1e7" src/data/equipment.ts && grep -q "Essential parts of a modern MRI machine" src/data/equipment.ts && [ -f src/assets/mri-working-principle.svg ] && [ -f src/assets/mri-scanner-cutaway.jpg ] && [ -f src/assets/mri-machines-animation.gif ]; then
  echo "This MRI update is already applied - nothing to do."
  exit 0
fi

curl -fsSL https://raw.githubusercontent.com/owenwogu-ryomen/biosynex-atlas-viewer/arena/18b632c0-biosynex-atlas-viewer/clone-update-mri.patch -o /tmp/clone-update-mri.patch
git apply --check /tmp/clone-update-mri.patch
git apply /tmp/clone-update-mri.patch

if [ -z "$(git status --porcelain)" ]; then
  echo "No changes produced - already up to date."
  exit 0
fi

git config user.name "owenwogu-ryomen"
git config user.email "228959905+owenwogu-ryomen@users.noreply.github.com"
git add -A
git commit -m "Overhaul MRI Scanner educational page" -m "Replace the old MRI entry with the supplied master-template content: SmartTek Solutions Sketchfab model behind the supplied ResearchGate cutaway JPG in the click-to-load viewer, supplied NIST HDYMI MRI animation above the viewport, enriched working principles from NIST/Radiology Cafe/Medical Imaging Source/Cleveland Clinic, six-step scan pathway, magnet types, patient preparation/safety, innovations, 16 components and cited references. Add an improved self-hosted animated MRI SVG with verified XML namespace, flowing cryogenic/RF/gradient/signal/data paths, inline hover highlights and reduced-motion support."
git push origin main

echo "Done. Watch the deploy here: https://github.com/owenwogu-ryomen/biosynex-atlas-viewer-clone/actions"
echo "MRI page after the green check: https://owenwogu-ryomen.github.io/biosynex-atlas-viewer-clone/equipment/mri-scanner"
