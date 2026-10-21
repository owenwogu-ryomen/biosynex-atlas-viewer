#!/usr/bin/env bash
set -euo pipefail
cd /tmp
rm -rf atlas-update
git clone https://github.com/owenwogu-ryomen/biosynex-atlas-viewer-clone.git atlas-update
cd atlas-update

if [ -f src/routes/glossary.tsx ] && grep -q "export const glossaryEntries" src/data/equipment.ts && grep -q "function CollapsibleSection" src/routes/equipment.\$slug.tsx; then
  echo "This glossary/collapsible-sections update is already applied - nothing to do."
  exit 0
fi

curl -fsSL https://raw.githubusercontent.com/owenwogu-ryomen/biosynex-atlas-viewer/arena/18b632c0-biosynex-atlas-viewer/clone-update-glossary.patch -o /tmp/clone-update-glossary.patch
git apply --check /tmp/clone-update-glossary.patch
git apply /tmp/clone-update-glossary.patch

if [ -z "$(git status --porcelain)" ]; then
  echo "No changes produced - already up to date."
  exit 0
fi

git config user.name "owenwogu-ryomen"
git config user.email "228959905+owenwogu-ryomen@users.noreply.github.com"
git add -A
git commit -m "Add collective glossary and collapsible equipment sections" -m "Add 47 device-tagged glossary definitions (25 MRI, 22 ventilator), render a Glossary section on each equipment page, and add a searchable/filterable collective /glossary page as the seed for a future question-and-answer bank. Convert long equipment-page cards (descriptions after Overview, Key Components, Glossary, References and Further Study) to collapsible sections while keeping the educational notice visible. This keeps the atlas model intact without turning it into a course or quiz."
git push origin main

echo "Done. Watch the deploy here: https://github.com/owenwogu-ryomen/biosynex-atlas-viewer-clone/actions"
echo "Glossary page after the green check: https://owenwogu-ryomen.github.io/biosynex-atlas-viewer-clone/glossary"
