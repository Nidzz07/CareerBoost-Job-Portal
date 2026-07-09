"""Deterministic, offline skill-to-job matching."""

import re
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

from routers.text_utils import (
    domain_synonym_terms,
    normalize_matching_text,
    ranked_tfidf_scores,
)

router = APIRouter()


class MatchRequest(BaseModel):
    userSkills: List[str]
    jobTitle: str
    jobDescription: str = ""


class MatchResponse(BaseModel):
    matchScore: float


def _contains_phrase(text: str, phrase: str) -> bool:
    if not text or not phrase:
        return False
    return re.search(rf"(?<!\w){re.escape(phrase)}(?!\w)", text) is not None


def phrase_match_score(skills: List[str], job_text: str) -> float:
    """Average exact/synonym phrase strength across meaningful user skills."""
    normalized_skills = [normalize_matching_text(skill) for skill in skills]
    normalized_skills = [skill for skill in normalized_skills if skill]
    if not normalized_skills or not job_text:
        return 0.0

    strengths = []
    for skill in normalized_skills:
        if _contains_phrase(job_text, skill):
            strengths.append(1.0)
            continue

        synonyms = domain_synonym_terms(skill)
        synonym_match = any(
            synonym != skill and _contains_phrase(job_text, synonym)
            for synonym in synonyms
        )
        strengths.append(0.78 if synonym_match else 0.0)

    return sum(strengths) / len(strengths)


def tfidf_similarity(skills_text: str, job_text: str) -> float:
    scores = ranked_tfidf_scores(skills_text, [job_text])
    return scores[0] if scores is not None else 0.0


def title_match_boost(skills: List[str], job_title: str) -> float:
    title = normalize_matching_text(job_title)
    if not title:
        return 0.0

    for skill in skills:
        normalized_skill = normalize_matching_text(skill)
        if _contains_phrase(title, normalized_skill):
            return 0.08
        if any(_contains_phrase(title, term) for term in domain_synonym_terms(normalized_skill)):
            return 0.05

    return 0.0


@router.post("/job-score", response_model=MatchResponse)
def match_job_score(payload: MatchRequest):
    normalized_skills = [
        normalize_matching_text(skill) for skill in payload.userSkills
    ]
    normalized_skills = [skill for skill in normalized_skills if skill]
    skills_text = " ".join(normalized_skills)
    job_title = normalize_matching_text(payload.jobTitle)
    job_text = normalize_matching_text(
        f"{payload.jobTitle} {payload.jobDescription}"
    )

    if not skills_text or not job_text:
        return MatchResponse(matchScore=0.0)

    phrase_score = phrase_match_score(normalized_skills, job_text)
    tfidf_score = tfidf_similarity(skills_text, job_text)
    title_boost = title_match_boost(normalized_skills, job_title)

    final_score = (0.72 * phrase_score) + (0.28 * tfidf_score) + title_boost

    return MatchResponse(matchScore=round(min(final_score, 1.0), 4))
