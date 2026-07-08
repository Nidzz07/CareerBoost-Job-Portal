"""
Feature 8: Natural-Language Search
Approach: TF-IDF + cosine similarity between a free-text search query and a list of
candidate items (courses, jobs, or products) - generalized version of the recommender,
but driven by what the user TYPES rather than their profile history.

Use case: a learner searches "sewing classes near me in hindi" or "part time tutor job" -
this ranks the backend's candidate list by relevance instead of requiring exact keyword
matches, so typos/phrasing differences still surface good results.
"""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

from routers.text_utils import safe_tfidf_scores

router = APIRouter()


class SearchCandidate(BaseModel):
    id: str
    text: str  # combined title + category + description for this course/job/product


class SearchRequest(BaseModel):
    query: str
    candidates: List[SearchCandidate]
    limit: int = 10


class SearchResultItem(BaseModel):
    id: str
    score: float


class SearchResponse(BaseModel):
    results: List[SearchResultItem]


@router.post("", response_model=SearchResponse)
def search(payload: SearchRequest):
    if not payload.candidates or not payload.query.strip() or payload.limit <= 0:
        return SearchResponse(results=[])

    scores = safe_tfidf_scores(payload.query, [c.text for c in payload.candidates])
    if scores is None:
        return SearchResponse(results=[])

    ranked = sorted(zip(payload.candidates, scores), key=lambda pair: pair[1], reverse=True)

    results = [
        SearchResultItem(id=c.id, score=round(float(s), 4))
        for c, s in ranked[: payload.limit]
        if s > 0
    ]

    return SearchResponse(results=results)
