# ElevateHer Backend

Auth/Onboarding + Learn module — built with Node.js, Express, PostgreSQL (Prisma ORM).

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in your real PostgreSQL connection string and a JWT secret:
   ```
   cp .env.example .env
   ```

3. Run the first migration (creates tables in your DB):
   ```
   npx prisma migrate dev --name init
   ```

4. Start the dev server:
   ```
   npm run dev
   ```

Server runs at `http://localhost:5000`. Health check: `GET /health`.

## API Endpoints

### Auth / Onboarding
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | No | Create account: `{ name, phone, password, email?, role? }` |
| POST | `/api/auth/login` | No | Login: `{ phone, password }` |
| PATCH | `/api/auth/onboarding` | Yes | Fill in `{ language, location }` after signup |
| GET | `/api/auth/me` | Yes | Get logged-in user's profile |

### Learn
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/learn/courses` | No | List published courses (filter with `?category=&language=`) |
| GET | `/api/learn/courses/:id` | No | Get one course |
| POST | `/api/learn/courses` | Admin only | Create a course |
| GET | `/api/learn/my-courses` | Yes | Get logged-in user's enrollments |
| POST | `/api/learn/courses/:id/enroll` | Yes | Enroll in a course |
| PATCH | `/api/learn/enrollments/:id/progress` | Yes | Update progress: `{ progress: 0-100 }` |

All authenticated routes need header: `Authorization: Bearer <token>` (token returned from signup/login).

## Next up
- Jobs module (Earn) and Marketplace module (Flourish) — same pattern: routes → controller → prisma model.
- Add these models to `prisma/schema.prisma` when ready to start those.
