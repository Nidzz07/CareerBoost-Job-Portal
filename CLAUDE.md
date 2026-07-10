# CLAUDE.md

# Current Working Context

You are working on the `frontend` branch.

This branch contains:
- React frontend
- Node.js/Express backend
- FastAPI ML service

Treat this branch as the single source of truth.

Do NOT spend time comparing or switching Git branches unless explicitly instructed.

Your task is to integrate the existing frontend, backend, and ML service into one fully working application.

Assume all work should remain on this branch.

---

# CareerBoost-Job-Portal

This repository implements the CareerBoost platform, an employability ecosystem consisting of:

- Frontend (React)
- Backend (Node.js + Express + Prisma + PostgreSQL)
- ML Service (FastAPI + scikit-learn)

The backend is the single gateway used by the frontend.

The frontend must never call the ML service directly.

All ML functionality is exposed through backend APIs.

---

# Current Architecture

Frontend
    ↓
Express Backend
    ↓
FastAPI ML Service

Backend owns:

- authentication
- business logic
- authorization
- database
- API contracts
- orchestration

ML owns:

- recommendations
- job matching
- search ranking
- pricing
- moderation
- sentiment
- skill extraction
- description generation
- dropout prediction

---

# Tech Stack

Frontend
- React
- Vite

Backend
- Node.js
- Express
- Prisma
- PostgreSQL

ML
- FastAPI
- scikit-learn
- TF-IDF
- deterministic offline models

---

# Current ML Capabilities

The ML service currently exposes these endpoints.

Recommendations

POST /recommend/courses

POST /recommend/jobs

Search

POST /search

Matching

POST /match/job-score

Skill Extraction

POST /extract/skills-from-bio

Pricing

POST /pricing/suggest

Moderation

POST /moderate/text

POST /moderate/image

Description Generation

POST /generate/description

Dropout Prediction

POST /predict/at-risk-learners

Sentiment Analysis

POST /sentiment/reviews

---

# Architecture Rules

Always preserve these rules.

1.
Frontend never communicates directly with ML.

2.
Backend communicates with ML.

3.
Frontend communicates only with backend.

4.
Do not change ML request or response schemas unless absolutely required.

5.
Keep existing APIs backward compatible.

6.
Prefer extending existing controllers and services over rewriting them.

7.
Reuse existing utilities wherever possible.

---

# Current State

The ML service has already been implemented.

The backend already contains an ML service wrapper.

Most ML endpoints are already exposed through backend routes.

The project has not yet been fully verified end-to-end.

There may still be missing integrations between:

- frontend
- backend
- ML

Some frontend features may still use placeholders or mock data.

Some backend endpoints may not yet be consumed by the frontend.

Some ML endpoints may be exposed but unused.

---

# Primary Goal

Whenever asked to audit the repository:

Trace every feature end-to-end.

For every user-visible feature:

Frontend
↓

Backend Route

↓

Backend Controller

↓

Backend Service

↓

ML Endpoint (if applicable)

↓

Database (if applicable)

Verify that every layer is connected correctly.

If any layer is missing, identify it.

Implement the missing integration while preserving existing architecture.

---

# What To Check

When auditing the project, verify:

✓ frontend routes

✓ frontend API calls

✓ backend routes

✓ backend controllers

✓ backend services

✓ Prisma usage

✓ ML service wrapper

✓ ML endpoint wiring

✓ environment variables

✓ Docker configuration

✓ API request/response compatibility

✓ error handling

✓ loading states

✓ fallback behavior

✓ README consistency

---

# Preferred Development Style

Prefer small, localized changes.

Avoid unnecessary refactors.

Do not rewrite working code.

Keep APIs stable.

Explain every architectural decision before making large changes.

Always verify functionality after implementation.

---

# Definition of Done

A feature is considered complete only if:

Frontend UI exists.

Frontend calls backend.

Backend route exists.

Backend controller exists.

Backend service exists.

Database integration works (if required).

ML integration works (if required).

The feature can be exercised end-to-end.

No mock data remains unless explicitly intended.

No placeholder API calls remain.

No broken navigation remains.

All request/response schemas remain compatible.

## Integration Complete When

The project is considered complete only if:

- Every frontend feature calls the real backend API.
- Every backend endpoint calls the correct ML endpoint where applicable.
- No frontend screen uses mock or hardcoded data.
- Authentication flows correctly across frontend and backend.
- Learn, Earn, and Flourish modules are fully connected end-to-end.
- Request/response schemas match exactly across frontend, backend, and ML.
- Error handling is implemented across all layers.
- Loading states are implemented.
- Docker setup starts all required services.
- README instructions accurately reflect the implementation.

---

# Audit Priority

When asked to review or complete the project, prioritize work in this order:

1. Broken integrations between frontend, backend, and ML.
2. Missing backend routes for existing frontend features.
3. Frontend features using mock data instead of real APIs.
4. Missing ML integration where backend should call the ML service.
5. Broken environment configuration.
6. Docker/runtime issues.
7. API consistency.
8. Documentation.

Do not replace implemented features with placeholders.

Do not downgrade existing functionality.

Preserve all completed ML capabilities unless explicitly instructed otherwise.