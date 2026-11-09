#!/usr/bin/env bash
set -euo pipefail
REPO=owenwogu-ryomen/biosynex-atlas-viewer-clone

echo "Step 1/3: Point GitHub Pages at the GitHub Actions build (not the branch/README)..."
if ! gh api --method PUT "repos/$REPO/pages" -f build_type=workflow >/dev/null 2>&1; then
  echo "Could not switch the Pages source automatically."
  echo "Do it once by hand: open https://github.com/$REPO/settings/pages"
  echo "Under 'Build and deployment' set Source to: GitHub Actions. Then run this one-liner again."
  exit 1
fi
BT=$(gh api "repos/$REPO/pages" --jq .build_type)
echo "Pages build type is now: $BT"
[ "$BT" = "workflow" ] || { echo "Unexpected build type '$BT' - stopping."; exit 1; }

echo "Step 2/3: Push the manual-redeploy workflow tweak (also triggers a fresh deploy)..."
cd /tmp
rm -rf atlas-pages-fix
git clone "https://github.com/$REPO.git" atlas-pages-fix
cd atlas-pages-fix
if grep -q "workflow_dispatch" .github/workflows/deploy.yml; then
  echo "Workflow tweak already present - making an empty redeploy commit instead."
  git config user.name "owenwogu-ryomen"
  git config user.email "228959905+owenwogu-ryomen@users.noreply.github.com"
  git commit --allow-empty -m "Redeploy GitHub Pages site"
else
  curl -fsSL https://raw.githubusercontent.com/owenwogu-ryomen/biosynex-atlas-viewer/arena/18b632c0-biosynex-atlas-viewer/clone-fix-pages.patch -o /tmp/clone-fix-pages.patch
  git apply --check /tmp/clone-fix-pages.patch
  git apply /tmp/clone-fix-pages.patch
  git config user.name "owenwogu-ryomen"
  git config user.email "228959905+owenwogu-ryomen@users.noreply.github.com"
  git add -A
  git commit -m "Allow manual GitHub Pages redeploy" -m "Add workflow_dispatch so the site can be redeployed from the Actions tab without a code change. Publishing must stay on the GitHub Actions source; the branch/Jekyll source renders the README instead of the app."
fi
git push origin main
HEAD_SHA=$(git rev-parse HEAD)

echo "Step 3/3: Waiting for the Deploy to GitHub Pages run to finish..."
RUN_ID=""
for i in $(seq 1 30); do
  RUN_ID=$(gh run list --repo "$REPO" --workflow "Deploy to GitHub Pages" --limit 5 --json databaseId,headSha --jq "[.[] | select(.headSha==\"$HEAD_SHA\")][0].databaseId" 2>/dev/null || true)
  [ -n "$RUN_ID" ] && [ "$RUN_ID" != "null" ] && break
  sleep 5
done
if [ -z "$RUN_ID" ] || [ "$RUN_ID" = "null" ]; then
  echo "Push done. The deploy run did not appear yet - watch: https://github.com/$REPO/actions"
  exit 0
fi
gh run watch "$RUN_ID" --repo "$REPO" --exit-status --interval 10 || {
  echo "Deploy run did not succeed. See: https://github.com/$REPO/actions/runs/$RUN_ID"
  exit 1
}
echo "Done. Open the site (hard-refresh if needed): https://owenwogu-ryomen.github.io/biosynex-atlas-viewer-clone/"
