"""
ElevateHer ML Service
Run with: uvicorn main:app --reload --port 8000

Exposes 6 endpoints matching ML_API_CONTRACT.md, called by the Node.js backend.
Docs auto-generated at http://localhost:8000/docs once running.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import recommend, matching, pricing, moderation, generation, dropout, sentiment, search, skill_extractor

app = FastAPI(
    title="ElevateHer ML Service",
    description="Recommendation, matching, pricing, moderation, generation, dropout prediction, "
                "sentiment analysis, search, and skill extraction for ElevateHer",
    version="1.1.0",
)

# Allow the Node.js backend (running on a different port) to call this service
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten this to the backend's actual URL in production
    allow_methods=["*"],
    allow_headers=["*"],
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
    return {"success": True, "message": "ElevateHer ML service is running"}
