#!/usr/bin/env bash
set -euo pipefail
cd /tmp
rm -rf atlas-update
git clone https://github.com/owenwogu-ryomen/biosynex-atlas-viewer-clone.git atlas-update
cd atlas-update

if [ "$(head -n 1 README.md)" = "# Biosynex Atlas" ] && grep -q "Important limitations" README.md && grep -q "image-first 3D viewer" README.md; then
  echo "This README update is already applied - nothing to do."
  exit 0
fi

curl -fsSL https://raw.githubusercontent.com/owenwogu-ryomen/biosynex-atlas-viewer/arena/18b632c0-biosynex-atlas-viewer/clone-update-readme.patch -o /tmp/clone-update-readme.patch
git apply --check /tmp/clone-update-readme.patch
git apply /tmp/clone-update-readme.patch

if [ -z "$(git status --porcelain)" ]; then
  echo "No changes produced - already up to date."
  exit 0
fi

git config user.name "owenwogu-ryomen"
git config user.email "228959905+owenwogu-ryomen@users.noreply.github.com"
git add -A
git commit -m "Replace placeholder README with Biosynex Atlas guide" -m "Present Biosynex Atlas as the educational biomedical equipment atlas it is: audience, device profiles, image-first 3D viewer, animations, collapsible sections, glossary, categorized resources, feedback/privacy, citation approach, limitations, light technical overview, local run and deployment notes. Remove clone framing and personal contact/developer details."
git push origin main

echo "Done. README will update immediately on the repository page; the usual site deploy is not affected by README-only text."
echo "Watch actions here if you want: https://github.com/owenwogu-ryomen/biosynex-atlas-viewer-clone/actions"
