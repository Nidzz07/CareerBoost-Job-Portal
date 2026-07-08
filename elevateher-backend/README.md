# ElevateHer Backend

Node.js/Express API for Auth/Onboarding, Learn, Jobs, Marketplace, Resume, Uploads,
and ML passthroughs. Data is stored in PostgreSQL through Prisma ORM.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create `.env` with a PostgreSQL connection string and JWT secret:
   ```
   DATABASE_URL="postgresql://elevateher:elevateher@localhost:5432/elevateher"
   JWT_SECRET="replace-me"
   JWT_EXPIRES_IN="7d"
   ```

3. Apply migrations and generate Prisma Client:
   ```
   npx prisma migrate dev
   npx prisma generate
   ```

4. Start the API:
   ```
   npm run dev
   ```

Server runs at `http://localhost:5000`. Health check: `GET /health`.

## Docker Compose

Run PostgreSQL, the Express backend, and the FastAPI ML service together:

```
docker compose up --build
```

Compose uses PostgreSQL 16, waits for the database health check, then runs
`prisma migrate deploy` before starting the backend. The backend container uses
`DATABASE_URL=postgresql://elevateher:elevateher@postgres:5432/elevateher` and
`ML_SERVICE_URL=http://ml:8000`.

## ML Service Integration

ML calls are centralized in `src/services/ml.service.js`. The wrapper applies a
shared timeout, structured error logging, response-shape validation, and safe
fallback values so database-backed API responses stay stable if the ML service is
slow, unavailable, or returns an unexpected response.

| Variable | Default | Purpose |
|---|---|---|
| `ML_SERVICE_URL` | `http://localhost:8000` | Base URL for the FastAPI ML service |
| `ML_TIMEOUT_MS` | `1500` | Request timeout before falling back |

## Authentication Flow

Users sign up or log in with phone/password and receive a JWT. Authenticated
routes require `Authorization: Bearer <token>`. Role checks are enforced by route
middleware for admin, employer, and seller workflows.

## Course Submission Workflow

Any authenticated user can submit a course. Admin-created courses are approved
and published immediately. Non-admin submissions are created as `PENDING` and
unpublished until an admin reviews them through the course review endpoint.

## API Endpoints

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | No | Create an account |
| POST | `/api/auth/login` | No | Log in and receive a JWT |
| PATCH | `/api/auth/onboarding` | Yes | Save onboarding details |
| GET | `/api/auth/me` | Yes | Get the current user |

### Learn

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/learn/courses` | No | List approved, published courses |
| GET | `/api/learn/courses/:id` | No | Get one course |
| GET | `/api/learn/courses/:id/reviews` | No | List course reviews |
| POST | `/api/learn/courses` | Yes | Submit a course |
| GET | `/api/learn/my-created-courses` | Yes | List courses created by the user |
| PATCH | `/api/learn/courses/:id` | Yes | Update an owned course, or any course as admin |
| DELETE | `/api/learn/courses/:id` | Yes | Delete an owned course, or any course as admin |
| GET | `/api/learn/courses/pending` | Admin | List pending course submissions |
| PATCH | `/api/learn/courses/:id/review` | Admin | Approve or reject a course |
| GET | `/api/learn/my-courses` | Yes | List enrollments |
| POST | `/api/learn/courses/:id/enroll` | Yes | Enroll in a course |
| POST | `/api/learn/enrollments/:id/create-payment` | Yes | Create course payment |
| POST | `/api/learn/enrollments/:id/verify-payment` | Yes | Verify course payment |
| PATCH | `/api/learn/enrollments/:id/progress` | Yes | Update enrollment progress |
| GET | `/api/learn/enrollments/:id/certificate` | Yes | Download/generate certificate |
| POST | `/api/learn/courses/:courseId/quiz` | Yes | Create a quiz for an owned/admin course |
| GET | `/api/learn/courses/:courseId/quiz` | Yes | Get a course quiz |
| POST | `/api/learn/quizzes/:id/attempt` | Yes | Submit a quiz attempt |
| GET | `/api/learn/quizzes/:id/attempts` | Yes | List user's quiz attempts |
| POST | `/api/learn/courses/:id/review` | Yes | Review a course |

### Jobs

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/jobs` | No | List active jobs |
| GET | `/api/jobs/:id` | No | Get one job |
| GET | `/api/jobs/users/:userId/reviews` | No | List reviews for a user |
| POST | `/api/jobs/:id/apply` | Yes | Apply to a job |
| GET | `/api/jobs/my/applications` | Yes | List user's applications |
| GET | `/api/jobs/my/interviews` | Yes | List user's interviews |
| POST | `/api/jobs/:id/review` | Yes | Review a user after a job interaction |
| POST | `/api/jobs` | Employer/Admin | Create a job |
| PATCH | `/api/jobs/:id` | Employer/Admin | Update a job |
| GET | `/api/jobs/my/postings` | Employer/Admin | List employer postings |
| GET | `/api/jobs/:id/applications` | Employer/Admin | List applications for a job |
| PATCH | `/api/jobs/applications/:id/status` | Employer/Admin | Update application status |
| POST | `/api/jobs/applications/:applicationId/interview` | Employer/Admin | Schedule an interview |
| GET | `/api/jobs/my/employer-interviews` | Employer/Admin | List employer interviews |
| PATCH | `/api/jobs/interviews/:id` | Employer/Admin | Update an interview |
| PATCH | `/api/jobs/employers/:userId/verify` | Admin | Verify an employer |

### Marketplace

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/marketplace/products` | No | List active products |
| GET | `/api/marketplace/products/:id` | No | Get one product |
| GET | `/api/marketplace/products/:id/reviews` | No | List product reviews |
| GET | `/api/marketplace/my-products` | Seller/Admin | List seller products |
| POST | `/api/marketplace/products` | Seller/Admin | Create a product |
| PATCH | `/api/marketplace/products/:id` | Seller/Admin | Update a product |
| GET | `/api/marketplace/seller-orders` | Seller/Admin | List seller orders |
| PATCH | `/api/marketplace/orders/:id/status` | Seller/Admin | Update order status |
| GET | `/api/marketplace/seller-analytics` | Seller/Admin | Get seller analytics |
| POST | `/api/marketplace/orders` | Yes | Create an order |
| GET | `/api/marketplace/my-orders` | Yes | List buyer orders |
| GET | `/api/marketplace/orders/:id` | Yes | Get an order |
| POST | `/api/marketplace/orders/:id/create-payment` | Yes | Create order payment |
| POST | `/api/marketplace/orders/:id/verify-payment` | Yes | Verify order payment |
| POST | `/api/marketplace/products/:id/review` | Yes | Review a purchased product |
| GET | `/api/marketplace/cart` | Yes | Get cart |
| POST | `/api/marketplace/cart/items` | Yes | Add item to cart |
| PATCH | `/api/marketplace/cart/items/:productId` | Yes | Update cart item quantity |
| DELETE | `/api/marketplace/cart/items/:productId` | Yes | Remove cart item |
| DELETE | `/api/marketplace/cart` | Yes | Clear cart |
| POST | `/api/marketplace/cart/checkout` | Yes | Checkout cart |

### Resume And Uploads

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| PUT | `/api/resume` | Yes | Create or update current user's resume |
| GET | `/api/resume/me` | Yes | Get current user's resume |
| GET | `/api/resume/:userId` | Yes | Get a user's resume |
| POST | `/api/upload` | Yes | Upload one file with form field `file` |

### ML Passthroughs

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/ml/extract/skills-from-bio` | No | Extract skills from bio text |
| POST | `/api/ml/pricing/suggest` | No | Suggest a handmade product price range |
| POST | `/api/ml/moderate/text` | No | Moderate listing/job text |
| POST | `/api/ml/moderate/image` | No | Image moderation stub, passes by default |
| POST | `/api/ml/generate/description` | No | Generate product title and description |
| POST | `/api/ml/predict/at-risk-learners` | No | Predict at-risk enrollments |
| POST | `/api/ml/sentiment/reviews` | No | Analyze review sentiment |

Recommendation, search, and job matching are also used internally by course, job,
and marketplace listing endpoints for ranking and sorting.
