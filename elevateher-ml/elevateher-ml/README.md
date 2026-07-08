# ElevateHer ML Service

Python/FastAPI service implementing 9 ML features. Runs fully offline - no API keys or
model downloads needed to get started, so it's ready to demo immediately.

## Setup

```
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Interactive API docs (auto-generated, test endpoints directly in browser): `http://localhost:8000/docs`

## What's implemented (and how, honestly)

| Feature | Approach used now | Upgrade path later |
|---|---|---|
| Course/Job Recommender | TF-IDF + cosine similarity (content-based) | Add collaborative filtering once you have real user interaction data |
| Skill-to-Job Matching | Keyword overlap (65%) + TF-IDF similarity (35%) blend | Swap for sentence-transformers embeddings (needs internet to download model) for true semantic understanding |
| Fair Pricing Assistant | Transparent formula (material + labor + category markup) | Train a real regression model once you have real sale price data |
| Content Moderation (text) | Keyword-based rule matching | Train a text classifier once you have labeled flagged/unflagged examples |
| Content Moderation (image) | Stub (always passes) | Integrate a vision moderation API (AWS Rekognition / Google Vision SafeSearch) |
| Auto-Listing Generator | Template-based text filling (English + Hindi) | Swap for a real LLM API call (commented example included in generation.py) |
| Dropout Prediction | Rule-based risk score (progress pace + inactivity) | Train a classifier once you have historical dropout data |
| **Review Sentiment Analysis** *(new)* | Lexicon-based (positive/negative word lists) | Train a classifier on real labeled reviews |
| **Natural-Language Search** *(new)* | TF-IDF + cosine similarity on a free-text query | Same upgrade path as recommender - embeddings for true semantic search |
| **Skill Extraction from Bio** *(new)* | Keyword dictionary matching | Replace with a trained NER model once you have labeled bios |

**Why this approach:** every "upgrade path" is a drop-in replacement - the request/response
shape (the API contract) doesn't change. This means the backend integration code you write now
will keep working even after the ML logic gets smarter later.

**Matching score note:** the skill-to-job matching score was tuned to blend direct keyword
overlap (65%) with TF-IDF topical similarity (35%) - pure TF-IDF cosine similarity tends to
under-score genuinely good matches on short skill lists (common words get down-weighted by
IDF), so the blend gives scores that better match human intuition about "how good is this fit".

## Endpoints

- `POST /recommend/courses` - rank candidate courses by relevance to user profile
- `POST /recommend/jobs` - rank candidate jobs by relevance to user profile
- `POST /match/job-score` - similarity score between user skills and a job
- `POST /pricing/suggest` - suggested price range for a handmade product
- `POST /moderate/text` - flags potentially exploitative/suspicious text
- `POST /moderate/image` - stub, always passes for now
- `POST /generate/description` - auto-generates a product title + description
- `POST /predict/at-risk-learners` - flags learners at risk of dropping out
- `POST /sentiment/reviews` - analyzes review text, returns sentiment + trust label *(new)*
- `POST /search` - ranks candidates (courses/jobs/products) against a free-text search query *(new)*
- `POST /extract/skills-from-bio` - extracts structured skills from a free-text bio *(new)*

## Example requests

See `test_examples.sh` for working curl commands for every endpoint (also useful for the
backend teammate to see exact request shapes).

## Note on the /recommend and /search endpoints

Both need the backend to pass a `candidates` array (id + text) in the request - content-based
ranking needs the candidate pool to rank against. The backend should query its own DB for
published/open courses, jobs, or products, build a short text per item (category + title +
description), and send that list along with the user's profile text or search query.

