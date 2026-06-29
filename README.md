<p align="center">
  <img src="assets/aidnexus-logo.png" width="200" alt="AidNexus logo" />
</p>

# AidNexus

AidNexus is a humanitarian aid distribution platform. It combines backend APIs, a web-based campaign and administration dashboard, a field-ready mobile application, and an AI service for document OCR, anonymization, and fraud detection.

## Features

### Core
- Backend APIs for orchestration, role-based access, and operational tooling
- Frontend dashboard for campaigns, review workflows, and reporting
- Mobile app for field operations (scan, view details, submit/confirm claim flows)
- AI Service for OCR, anonymization, and fraud checking on claimant evidence

### Readiness
- Network guardrails to prevent cross-network mismatches
- Deterministic test modes for stable demos and CI
- Health probes and observability hooks for background jobs

## What’s in this repo

- Backend (NestJS): APIs, orchestration, persistence, mock on-chain adapter, observability ([backend README](app/backend/README.md))
- Frontend (Next.js): admin/donor UI, dashboards, wallet flows ([frontend README](app/frontend/README.md))
- Mobile (Expo): field operations + pilot flows ([mobile README](app/mobile/README.md))
- AI Service (FastAPI): OCR/anonymization/fraud checks for verification flows ([ai-service README](app/ai-service/README.md))

## Tech stack

- Backend: NestJS (TypeScript), Prisma
- Frontend: Next.js (App Router), React, Tailwind CSS
- Mobile: Expo (React Native), WalletConnect
- AI service: FastAPI (Python), Pydantic
- CI: GitHub Actions

## Repository structure

```text
AidNexus/
├── .github/workflows/        # CI workflows
├── app/
│   ├── backend/              # NestJS API server + on-chain adapter
│   ├── frontend/             # Next.js web app
│   ├── mobile/               # Expo mobile app
│   └── ai-service/           # FastAPI service (OCR/anonymize/fraud, etc.)
└── assets/                   # Repository assets (logo)
```

## Setup instructions

### Prerequisites
- Node.js 18+
- Python 3.11+

### Local development (by service)

#### Backend (NestJS)

```bash
cd app/backend
npm ci
cp .env.example .env
npm run prisma:migrate
npm run start:dev
```

#### Frontend (Next.js)

```bash
cd app/frontend
pnpm install
cp .env.example .env.local
pnpm dev
```

#### AI service (FastAPI)

```bash
cd app/ai-service
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

#### Mobile (Expo)

```bash
cd app/mobile
pnpm install
cp .env.example .env
pnpm start
```

## Testing

- Backend: `cd app/backend && npm test` and `npm run test:e2e`
- Frontend: `cd app/frontend && pnpm lint && pnpm type-check && pnpm test`
- Mobile: `cd app/mobile && pnpm test && pnpm lint`
- AI service: `cd app/ai-service && pytest`

