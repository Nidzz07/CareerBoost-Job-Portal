# ElevateHer / CareerBoost — AI Livelihood Platform

An AI-powered platform that helps women **Learn** new skills, **Earn** a livelihood, and
**Flourish** by selling their crafts. It combines personalised learning, verified job
matching, and a marketplace, all backed by a deterministic offline ML service.

---

## Architecture

```
Frontend (React / TanStack Start)
        │  HTTPS (JSON)
        ▼
Express + Prisma Backend  ──►  PostgreSQL
        │  HTTP (JSON)
        ▼
FastAPI ML Service (scikit-learn / TF-IDF, offline)
```

- The **frontend never calls the ML service directly** — all ML features are exposed
  through backend routes under `/api/ml`.
- The **backend is the single gateway**: authentication, business logic, authorization,
  the database, and orchestration all live here.
- The **ML service** owns recommendations, search ranking, job matching, pricing,
  moderation, sentiment, skill extraction, description generation, and dropout prediction.

## Repository layout

```
frontend/                 React + Vite (TanStack Start) SPA
elevateher-backend/       Express + Prisma API  (docker-compose.yml lives here)
elevateher-ml/elevateher-ml/   FastAPI ML service
```

## Prerequisites

- Node.js 20+
- Python 3.12+ (ML service)
- PostgreSQL 16+ (or use Docker Compose, which provisions it)
- Docker + Docker Compose (optional, for the one-command stack)

Default ports: frontend `3000`, backend `5000`, ML `8000`, PostgreSQL `5432`.

---

## Quick start with Docker (recommended)

The Compose file lives in `elevateher-backend/` and builds all four services
(frontend, backend, ML, PostgreSQL):

```bash
cd elevateher-backend
# Provide a strong JWT secret (and optional Razorpay/CORS values) to the compose run:
JWT_SECRET="$(openssl rand -hex 32)" docker compose up --build
```

Then open the frontend at http://localhost:3000. The backend is on
http://localhost:5000 and the ML service on http://localhost:8000.

Optional environment variables understood by Compose:
`JWT_SECRET`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `CORS_ORIGIN`, `ML_ALLOWED_ORIGINS`.

Health checks: PostgreSQL, the ML service, and the backend all expose Compose
health checks, and dependent services wait for `service_healthy` before starting.

---

## Manual local development

Run each service in its own terminal.

### 1) Backend (`elevateher-backend`)

```bash
cd elevateher-backend
cp .env.example .env          # then edit DATABASE_URL and JWT_SECRET
npm install
npx prisma migrate deploy     # or: npx prisma migrate dev
npm run dev                   # http://localhost:5000  (nodemon)
```

Key env vars (see `.env.example` for the full list): `DATABASE_URL`, `JWT_SECRET`
(required); `ML_SERVICE_URL`, `CORS_ORIGIN`, `RAZORPAY_KEY_ID/SECRET`, rate-limit
settings (optional). Startup validates required vars and warns on weak/missing config.

### 2) ML service (`elevateher-ml/elevateher-ml`)

```bash
cd elevateher-ml/elevateher-ml
python -m venv .venv && source .venv/Scripts/activate   # Windows Git Bash
pip install -r requirements.txt
uvicorn main:app --reload --port 8000    # http://localhost:8000  (docs at /docs)
```

Optional env vars: `ALLOWED_ORIGINS` (CORS allowlist, default `*`), `LOG_LEVEL`.

### 3) Frontend (`frontend`)

```bash
cd frontend
cp .env.example .env          # VITE_API_BASE_URL defaults to http://localhost:5000/api
npm install
npm run dev
```

---

## Health checks

- Backend: `GET http://localhost:5000/health` → `{ success, message, uptime }`
- ML service: `GET http://localhost:8000/` (compat) and `GET /health` (detailed)

## API overview

All backend routes are mounted under `/api`:

| Group | Base path | Purpose |
|-------|-----------|---------|
| Auth | `/api/auth` | signup, login, refresh, OTP, password reset, onboarding, me |
| Learn | `/api/learn` | courses, lessons, enrolments, quizzes, certificates, reviews |
| Earn | `/api/jobs` | jobs, applications, interviews, saved jobs, match, recommendations |
| Marketplace | `/api/marketplace` | products, cart, orders, payments, reviews, seller analytics |
| Resume | `/api/resume` | resume upsert / get / view |
| User | `/api/user` | profile + settings persistence |
| Notifications | `/api/notifications` | list / mark read |
| Uploads | `/api/upload` | shared file upload |
| ML passthrough | `/api/ml` | description, pricing, moderation, skill extraction |

Interactive ML API docs are available at `http://localhost:8000/docs` when the ML
service is running.

## Testing

| Layer | Command | Notes |
|-------|---------|-------|
| Backend | `cd elevateher-backend && npm test` | Node's built-in runner (`node --test`), no extra deps |
| ML | `cd elevateher-ml/elevateher-ml && pip install -r requirements-dev.txt && pytest` | FastAPI TestClient endpoint tests |
| Frontend | `cd frontend && npm test` | Vitest (critical RBAC logic) |
| Frontend build/typecheck | `npm run build` / `npx tsc --noEmit` | |

## Production notes

- **Security headers** via Helmet; **rate limiting** on the API (stricter on auth
  endpoints); configurable **CORS** via `CORS_ORIGIN`.
- Set a strong `JWT_SECRET` (32+ random chars) and a restrictive `CORS_ORIGIN` in
  production. Missing required env vars stop the backend from starting.
- The ML integration **fails open**: if the ML service is unavailable, the backend
  falls back gracefully (e.g. unranked lists, moderation not blocking) so core flows
  keep working.
