#!/usr/bin/env bash
set -euo pipefail
cd /tmp
rm -rf atlas-update
git clone https://github.com/owenwogu-ryomen/biosynex-atlas-viewer-clone.git atlas-update
cd atlas-update

if grep -q "HDYMI MRI animation (GIF source)" src/data/equipment.ts && grep -q "https://www.britannica.com/science/mechanical-ventilation" src/data/equipment.ts; then
  echo "This resources update is already applied - nothing to do."
  exit 0
fi

curl -fsSL https://raw.githubusercontent.com/owenwogu-ryomen/biosynex-atlas-viewer/arena/18b632c0-biosynex-atlas-viewer/clone-update-resources.patch -o /tmp/clone-update-resources.patch
git apply --check /tmp/clone-update-resources.patch
git apply /tmp/clone-update-resources.patch

if [ -z "$(git status --porcelain)" ]; then
  echo "No changes produced - already up to date."
  exit 0
fi

git config user.name "owenwogu-ryomen"
git config user.email "228959905+owenwogu-ryomen@users.noreply.github.com"
git add -A
git commit -m "Add every cited source to categorized resources" -m "Audit device references and media/model credits against the Resources data. The 12 article references were already present in the correct equipment categories; add the missing cited media/model sources: ResearchGate MRI poster figure, NIST HDYMI GIF, both Sketchfab 3D models, and the Britannica mechanical-ventilation article/illustration source, each tagged to Diagnostic Imaging or Life Support & Critical Care as appropriate."
git push origin main

echo "Done. Watch the deploy here: https://github.com/owenwogu-ryomen/biosynex-atlas-viewer-clone/actions"
echo "Resources page after the green check: https://owenwogu-ryomen.github.io/biosynex-atlas-viewer-clone/resources"
