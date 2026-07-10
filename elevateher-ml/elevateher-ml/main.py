"""
ElevateHer ML Service
Run with: uvicorn main:app --reload --port 8000

Exposes the endpoints matching ML_API_CONTRACT.md, called by the Node.js backend.
Docs auto-generated at http://localhost:8000/docs once running.

Production configuration (all optional, sensible defaults):
  ALLOWED_ORIGINS   Comma-separated CORS allowlist (default "*").
  LOG_LEVEL         Python logging level (default "INFO").
"""

import logging
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from routers import recommend, matching, pricing, moderation, generation, dropout, sentiment, search, skill_extractor

VERSION = "1.1.0"

logging.basicConfig(
    level=getattr(logging, os.getenv("LOG_LEVEL", "INFO").upper(), logging.INFO),
    format="%(asctime)s %(levelname)s %(name)s %(message)s",
)
logger = logging.getLogger("elevateher-ml")

# Configurable CORS. Defaults to "*" (dev); set ALLOWED_ORIGINS in production to the
# backend origin(s), e.g. ALLOWED_ORIGINS=http://backend:5000
_origins_env = os.getenv("ALLOWED_ORIGINS", "*").strip()
_allow_origins = ["*"] if _origins_env in ("", "*") else [o.strip() for o in _origins_env.split(",") if o.strip()]


@asynccontextmanager
async def lifespan(_app: FastAPI):
    logger.info("ElevateHer ML service v%s started (CORS origins: %s)", VERSION, _allow_origins)
    yield


app = FastAPI(
    title="ElevateHer ML Service",
    description="Recommendation, matching, pricing, moderation, generation, dropout prediction, "
                "sentiment analysis, search, and skill extraction for ElevateHer",
    version=VERSION,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=_allow_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Graceful failure: never leak stack traces to the caller — return a consistent JSON
# envelope and log the details server-side. The Node backend already treats non-2xx
# ML responses as a fallback, so this keeps the whole system degrading gracefully.
@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    logger.exception("Unhandled ML error on %s %s", request.method, request.url.path)
    return JSONResponse(
        status_code=500,
        content={"success": False, "message": "Internal ML service error"},
    )


app.include_router(recommend.router, prefix="/recommend", tags=["Recommendation"])
app.include_router(matching.router, prefix="/match", tags=["Skill-Job Matching"])
app.include_router(pricing.router, prefix="/pricing", tags=["Pricing Assistant"])
app.include_router(moderation.router, prefix="/moderate", tags=["Content Moderation"])
app.include_router(generation.router, prefix="/generate", tags=["Listing Generation"])
app.include_router(dropout.router, prefix="/predict", tags=["Dropout Prediction"])
app.include_router(sentiment.router, prefix="/sentiment", tags=["Sentiment Analysis"])
app.include_router(search.router, prefix="/search", tags=["Search"])
app.include_router(skill_extractor.router, prefix="/extract", tags=["Skill Extraction"])


@app.get("/")
def health_check():
    # Kept for backwards compatibility — the backend's health probe hits "/".
    return {"success": True, "message": "ElevateHer ML service is running"}


@app.get("/health")
def health():
    # Richer health payload for orchestrators / dashboards.
    return {"success": True, "status": "ok", "service": "elevateher-ml", "version": VERSION}
