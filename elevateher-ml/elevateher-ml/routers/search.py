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

from routers.text_utils import rank_text_candidates

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
    results = [
        SearchResultItem(id=payload.candidates[index].id, score=round(float(score), 4))
        for index, score in rank_text_candidates(
            payload.query, [candidate.text for candidate in payload.candidates], payload.limit
        )
    ]

    return SearchResponse(results=results)
