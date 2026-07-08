"""
Feature 7: Review Sentiment Analysis
Approach: lexicon-based scoring (a curated list of positive/negative words) - works fully
offline, no model download or training data needed to start.

Use case: analyze job/product reviews to compute a "trust score" for employers and sellers,
surfacing genuinely negative feedback patterns even if star ratings are inflated/gamed.

UPGRADE PATH: Once you have enough labeled reviews (positive/negative), train a real text
classifier (e.g. scikit-learn Naive Bayes or Logistic Regression on TF-IDF features).
"""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

POSITIVE_WORDS = {
    "good", "great", "excellent", "amazing", "helpful", "kind", "professional",
    "trustworthy", "reliable", "punctual", "friendly", "supportive", "fair",
    "recommend", "satisfied", "happy", "wonderful", "best", "easy", "smooth",
    "responsive", "respectful", "genuine", "honest", "quick", "efficient",
}

NEGATIVE_WORDS = {
    "bad", "poor", "terrible", "rude", "unprofessional", "late", "delayed",
    "unresponsive", "unfair", "scam", "fraud", "unsafe", "disrespectful",
    "unreliable", "worst", "disappointing", "avoid", "never", "cheated",
    "harassment", "unpaid", "exploitative", "dishonest", "difficult", "problem",
}


class ReviewInput(BaseModel):
    text: str


class SentimentRequest(BaseModel):
    reviews: List[ReviewInput]


class SentimentResult(BaseModel):
    text: str
    sentiment: str  # "positive" | "neutral" | "negative"
    score: float  # -1 (very negative) to +1 (very positive)


class SentimentSummary(BaseModel):
    overallScore: float
    trustLabel: str  # "Trusted" | "Mixed feedback" | "Concerning - needs review"
    results: List[SentimentResult]


def score_text(text: str) -> float:
    words = text.lower().split()
    if not words:
        return 0.0

    pos_count = sum(1 for w in words if w.strip(".,!?") in POSITIVE_WORDS)
    neg_count = sum(1 for w in words if w.strip(".,!?") in NEGATIVE_WORDS)

    total_signal = pos_count + neg_count
    if total_signal == 0:
        return 0.0

    return round((pos_count - neg_count) / total_signal, 4)


def label_for_score(score: float) -> str:
    if score > 0.2:
        return "positive"
    elif score < -0.2:
        return "negative"
    return "neutral"


@router.post("/reviews", response_model=SentimentSummary)
def analyze_reviews(payload: SentimentRequest):
    results = []
    for review in payload.reviews:
        s = score_text(review.text)
        results.append(SentimentResult(text=review.text, sentiment=label_for_score(s), score=s))

    overall = round(sum(r.score for r in results) / len(results), 4) if results else 0.0

    if overall > 0.15:
        trust_label = "Trusted"
    elif overall < -0.15:
        trust_label = "Concerning - needs review"
    else:
        trust_label = "Mixed feedback"

    return SentimentSummary(overallScore=overall, trustLabel=trust_label, results=results)
