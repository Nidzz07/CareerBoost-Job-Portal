# ElevateHer ML Service

Python/FastAPI service for the CareerBoost/ElevateHer backend. It runs fully
offline by default: no API keys, online models, or model downloads are required
for local development or demos.

## Setup

```
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Interactive API docs: `http://localhost:8000/docs`

## Implemented Capabilities

| Capability | Current approach | Upgrade path later |
|---|---|---|
| Course Recommendation | TF-IDF + cosine similarity over backend-provided candidates | Add collaborative filtering when interaction data exists |
| Job Recommendation | TF-IDF + cosine similarity over backend-provided candidates | Add collaborative filtering or embeddings later |
| Natural-Language Search | TF-IDF + cosine similarity over backend-provided candidates | Replace ranker with embeddings if online/model hosting is added |
| Skill-to-Job Matching | 72% phrase/synonym matching + 28% TF-IDF, plus title boost | Replace scoring internals while keeping the API contract |
| Skill Extraction | Keyword dictionary matching from bio text | Train NER/classifier once labeled bios exist |
| Fair Pricing Assistant | Deterministic material + labor + category markup formula | Train a regression model once real sales data exists |
| Text Moderation | Keyword/rule-based suspicious phrase detection | Train a classifier with labeled moderation examples |
| Image Moderation | Stub that always passes | Integrate a real vision moderation provider if required |
| Product Description Generation | Offline English/Hindi templates | Swap internals for an LLM while keeping the same schema |
| Review Sentiment Analysis | Lexicon and phrase based review scoring | Train a classifier on labeled reviews |
| Dropout Prediction | Rule-based progress/inactivity risk scoring | Train a classifier with historical learner data |

## Offline-First Architecture

Every endpoint is deterministic and local-first. The service accepts all data it
needs in the request body, usually candidate lists assembled by the backend from
PostgreSQL. This keeps the ML service stateless and lets the backend stay the
source of truth for users, courses, jobs, products, and enrollments.

The intended upgrade path is to replace internals behind the same request and
response models. Backend contracts should not need to change when smarter models
are introduced.

## Backend Integration

The Express backend calls this service through `src/services/ml.service.js`.
That wrapper centralizes timeouts, logging, response-shape checks, and fallback
values. In Docker Compose, the backend uses `ML_SERVICE_URL=http://ml:8000`.

Recommendation, search, and job matching are used inside existing backend
listing flows. Skill extraction, pricing, moderation, generation, sentiment, and
dropout prediction are exposed through backend `/api/ml/...` passthrough routes.

## Matching Algorithm

`POST /match/job-score` combines:

- 72% direct phrase and domain synonym matching across user skills.
- 28% TF-IDF topical similarity between user skills and job text.
- A small title boost when a skill or synonym appears in the job title.

This avoids pure TF-IDF under-scoring short skill lists while still preserving a
topical similarity signal.

## Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/recommend/courses` | Rank candidate courses by relevance to a user profile |
| POST | `/recommend/jobs` | Rank candidate jobs by relevance to a user profile |
| POST | `/search` | Rank candidate courses/jobs/products against a free-text query |
| POST | `/match/job-score` | Score fit between user skills and one job |
| POST | `/extract/skills-from-bio` | Extract structured skills from bio text |
| POST | `/pricing/suggest` | Suggest a handmade product price range |
| POST | `/moderate/text` | Flag suspicious or exploitative text |
| POST | `/moderate/image` | Stub image moderation, passes by default |
| POST | `/generate/description` | Generate product title and description |
| POST | `/sentiment/reviews` | Analyze review sentiment and trust label |
| POST | `/predict/at-risk-learners` | Return enrollments at or above a dropout risk threshold |

See `test_examples.sh` for curl examples using the current request and response
schemas.
