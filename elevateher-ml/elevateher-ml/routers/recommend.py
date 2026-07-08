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
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

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
    if not candidates:
        return []

    corpus = [user_profile_text] + [c.text for c in candidates]

    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = vectorizer.fit_transform(corpus)

    # First row = user profile, rest = candidates
    user_vector = tfidf_matrix[0:1]
    candidate_vectors = tfidf_matrix[1:]

    scores = cosine_similarity(user_vector, candidate_vectors)[0]

    ranked = sorted(
        zip(candidates, scores), key=lambda pair: pair[1], reverse=True
    )

    return [
        RecommendationItem(id=c.id, score=round(float(s), 4))
        for c, s in ranked[:limit]
        if s > 0  # don't recommend completely irrelevant items
    ]


@router.post("/courses", response_model=RecommendResponse)
def recommend_courses(payload: RecommendRequest):
    results = rank_candidates(payload.userProfileText, payload.candidates, payload.limit)
    return RecommendResponse(recommendations=results)


@router.post("/jobs", response_model=RecommendResponse)
def recommend_jobs(payload: RecommendRequest):
    results = rank_candidates(payload.userProfileText, payload.candidates, payload.limit)
    return RecommendResponse(recommendations=results)
