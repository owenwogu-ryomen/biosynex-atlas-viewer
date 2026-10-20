#!/usr/bin/env bash
set -euo pipefail
cd /tmp
rm -rf atlas-update
git clone https://github.com/owenwogu-ryomen/biosynex-atlas-viewer-clone.git atlas-update
cd atlas-update

if grep -q "Educational use notice" src/components/SiteShell.tsx; then
  echo "This update is already applied - nothing to do."
  exit 0
fi

curl -fsSL https://raw.githubusercontent.com/owenwogu-ryomen/biosynex-atlas-viewer/arena/18b632c0-biosynex-atlas-viewer/clone-update-disclaimer.patch -o /tmp/clone-update-disclaimer.patch
git apply --check /tmp/clone-update-disclaimer.patch
git apply /tmp/clone-update-disclaimer.patch

if [ -z "$(git status --porcelain)" ]; then
  echo "No changes produced - already up to date."
  exit 0
fi

git config user.name "owenwogu-ryomen"
git config user.email "228959905+owenwogu-ryomen@users.noreply.github.com"
git add -A
git commit -m "Add educational use and source-citation notice" -m "Site-wide footer notice on every page plus an Educational Use & Sources card on every equipment page: learning only, not medical advice or operating instructions; all resources properly cited/credited."
git push origin main

echo "Done. Watch the deploy here: https://github.com/owenwogu-ryomen/biosynex-atlas-viewer-clone/actions"
