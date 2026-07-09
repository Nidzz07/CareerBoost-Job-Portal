"""
Course/Job Recommender
Approach: content-based filtering using TF-IDF + cosine similarity.
No external model download needed - works fully offline.

How it works:
- We build a "profile text" for the user from their completed course categories/skills.
- We build a "content text" for each candidate course/job from its category/title/description.
- TF-IDF converts both into vectors; cosine similarity ranks candidates by relevance.

In production, you'd swap the candidate list for a real DB query (courses/jobs from Postgres),
passed in by the backend in the request body - this stays framework-agnostic either way.
"""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

from routers.text_utils import rank_text_candidates

router = APIRouter()


class Candidate(BaseModel):
    id: str
    text: str  # e.g. "pottery beginner handmade crafts" - category + title + description combined


class RecommendRequest(BaseModel):
    userId: str
    userProfileText: str  # e.g. "english computer basics tailoring" - user's completed categories/skills
    candidates: List[Candidate]  # courses or jobs to rank
    limit: int = 5


class RecommendationItem(BaseModel):
    id: str
    score: float


class RecommendResponse(BaseModel):
    recommendations: List[RecommendationItem]


def rank_candidates(user_profile_text: str, candidates: List[Candidate], limit: int):
    return [
        RecommendationItem(id=candidates[index].id, score=round(float(score), 4))
        for index, score in rank_text_candidates(
            user_profile_text, [candidate.text for candidate in candidates], limit
        )
    ]


@router.post("/courses", response_model=RecommendResponse)
def recommend_courses(payload: RecommendRequest):
    results = rank_candidates(payload.userProfileText, payload.candidates, payload.limit)
    return RecommendResponse(recommendations=results)


@router.post("/jobs", response_model=RecommendResponse)
def recommend_jobs(payload: RecommendRequest):
    results = rank_candidates(payload.userProfileText, payload.candidates, payload.limit)
    return RecommendResponse(recommendations=results)
