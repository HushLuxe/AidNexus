#!/bin/bash
set -e

# Set local git config
git config user.name "HushLuxe Dev"
git config user.email "dev@hushluxe.com"

echo "Creating commit 1/10: project files and structure..."
git add .gitignore .prettierrc .prettierignore .eslintrc.js package.json pnpm-workspace.yaml pnpm-lock.yaml README.md
git commit -m "feat: initialize project configuration and workspace structure"

echo "Creating commit 2/10: CI/CD workflows..."
git add .github/
git commit -m "feat(workflows): add github actions workflows for continuous integration"

echo "Creating commit 3/10: brand assets..."
git add assets/
git commit -m "feat(assets): add branding assets including logo"

echo "Creating commit 4/10: documentation..."
git add docs/
git commit -m "feat(docs): add platform documentation and architectural spec"

echo "Creating commit 5/10: text scrubber utility..."
git add scrubber.py
git commit -m "feat(scrubber): add regex-based PII scrubber for OCR evidence"

echo "Creating commit 6/10: backend service..."
git add app/backend/
git commit -m "feat(backend): add NestJS API backend orchestrator and adapters"

echo "Creating commit 7/10: frontend dashboard..."
git add app/frontend/
git commit -m "feat(frontend): add Next.js admin campaign management dashboard"

echo "Creating commit 8/10: AI service..."
git add app/ai-service/
git commit -m "feat(ai-service): add FastAPI OCR, anonymization, and fraud service"

echo "Creating commit 9/10: mobile app..."
git add app/mobile/
git commit -m "feat(mobile): add Expo mobile field application for scanning and claims"

echo "Creating commit 10/10: repository tooling and configuration..."
git add .
git commit -m "chore: add root repository testing setup, vercel configs and tooling"

echo "All 10 commits created successfully!"
