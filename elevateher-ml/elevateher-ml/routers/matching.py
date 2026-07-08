"""
Skill-to-Job Matching
Approach: blends two signals for a score that feels more intuitive than raw TF-IDF alone:

1. Keyword overlap - does the job text actually mention words from the user's skills?
   (e.g. "english speaking" -> checks if "english" appears in the job text)
2. TF-IDF cosine similarity - captures broader topical relevance beyond exact word matches.

Raw TF-IDF cosine similarity on short skill lists tends to under-score genuinely good matches
(shared common words get down-weighted by IDF), so we combine it with a direct overlap ratio
that a human would find more intuitive, weighted 60/40 in favor of overlap.

UPGRADE PATH: For true semantic matching (understanding that "spoken English" and
"communication skills in English" mean the same thing even with zero shared words), swap this
for sentence-transformers embeddings + cosine similarity. That requires downloading a
pretrained model (needs internet access to huggingface.co), so it's not used here to keep this
service runnable fully offline for now.
"""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

router = APIRouter()


class MatchRequest(BaseModel):
    userSkills: List[str]
    jobTitle: str
    jobDescription: str = ""


class MatchResponse(BaseModel):
    matchScore: float


def keyword_overlap_ratio(skills: List[str], job_text: str) -> float:
    """What fraction of the user's skills have at least one word appearing in the job text."""
    if not skills:
        return 0.0

    job_words = set(job_text.lower().split())
    matched = 0

    for skill in skills:
        skill_words = skill.lower().split()
        if any(word in job_words for word in skill_words):
            matched += 1

    return matched / len(skills)


def tfidf_similarity(skills_text: str, job_text: str) -> float:
    if not skills_text or not job_text:
        return 0.0

    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = vectorizer.fit_transform([skills_text, job_text])
    return float(cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0])


@router.post("/job-score", response_model=MatchResponse)
def match_job_score(payload: MatchRequest):
    skills_text = " ".join(payload.userSkills)
    job_text = f"{payload.jobTitle} {payload.jobDescription}".strip()

    if not skills_text or not job_text:
        return MatchResponse(matchScore=0.0)

    overlap_score = keyword_overlap_ratio(payload.userSkills, job_text)
    tfidf_score = tfidf_similarity(skills_text, job_text)

    # Weighted blend - overlap matters more since it's the more intuitive/explainable signal
    final_score = (0.65 * overlap_score) + (0.35 * tfidf_score)

    return MatchResponse(matchScore=round(min(final_score, 1.0), 4))
