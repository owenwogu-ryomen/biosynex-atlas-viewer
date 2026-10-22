#!/usr/bin/env bash
set -euo pipefail
cd /tmp
rm -rf atlas-update
git clone https://github.com/owenwogu-ryomen/biosynex-atlas-viewer-clone.git atlas-update
cd atlas-update

if [ -f src/components/FeedbackWidget.tsx ] && grep -q "biosynex-feedback-submitted-at" src/components/FeedbackWidget.tsx; then
  echo "This feedback update is already applied - nothing to do."
  exit 0
fi

curl -fsSL https://raw.githubusercontent.com/owenwogu-ryomen/biosynex-atlas-viewer/arena/18b632c0-biosynex-atlas-viewer/clone-update-feedback.patch -o /tmp/clone-update-feedback.patch
git apply --check /tmp/clone-update-feedback.patch
git apply /tmp/clone-update-feedback.patch

if [ -z "$(git status --porcelain)" ]; then
  echo "No changes produced - already up to date."
  exit 0
fi

git config user.name "owenwogu-ryomen"
git config user.email "228959905+owenwogu-ryomen@users.noreply.github.com"
git add -A
git commit -m "Add optional star-rating feedback prompt" -m "Add a dismissible feedback card that appears after a visitor scrolls about 70% of a page (or anytime via the footer Give feedback button). Visitors choose 1–5 stars, then answer a rating-aware improvement question with an optional comment and optional reply email. Submission opens a prefilled email to the site contact. Dismissal or submission suppresses the automatic prompt for at most 2 days on that browser, after which it may appear again."
git push origin main

echo "Done. Watch the deploy here: https://github.com/owenwogu-ryomen/biosynex-atlas-viewer-clone/actions"
echo "Live site after the green check: https://owenwogu-ryomen.github.io/biosynex-atlas-viewer-clone/"
