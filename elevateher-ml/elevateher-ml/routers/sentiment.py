"""Deterministic, offline review sentiment analysis."""

import re
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

from routers.text_utils import normalize_ranking_text

router = APIRouter()

POSITIVE_WORDS = {
    "good", "great", "excellent", "amazing", "helpful", "kind", "professional",
    "trustworthy", "reliable", "punctual", "friendly", "supportive", "fair",
    "recommend", "satisfied", "happy", "wonderful", "best", "easy", "smooth",
    "responsive", "respectful", "genuine", "honest", "quick", "efficient",
    "quality", "useful", "accha", "acha", "mast",
}

NEGATIVE_WORDS = {
    "bad", "poor", "terrible", "rude", "unprofessional", "late", "delayed",
    "unresponsive", "unfair", "scam", "fraud", "unsafe", "disrespectful",
    "unreliable", "worst", "disappointing", "avoid", "never", "cheated",
    "harassment", "unpaid", "exploitative", "dishonest", "difficult", "problem",
    "fake", "waste", "broken", "slow", "useless", "bekar", "bekaar", "kharab",
    "dhokha",
}

POSITIVE_PHRASES = {
    "highly recommend": 3.0,
    "worth it": 2.5,
    "easy to learn": 2.5,
    "bahut accha": 3.0,
    "bahut acha": 3.0,
    "paisa vasool": 3.0,
    "very helpful": 2.5,
    "great quality": 2.5,
}

NEGATIVE_PHRASES = {
    "not good": -2.5,
    "not helpful": -2.5,
    "not useful": -2.5,
    "never buying again": -3.0,
    "not buying again": -3.0,
    "not like": -2.5,
    "not satisfied": -2.5,
    "bad support": -2.5,
    "waste of money": -3.0,
    "very poor": -2.5,
    "bahut kharab": -3.0,
}

NEGATORS = {"not", "never", "no", "hardly"}

_CONTRACTIONS = (
    (re.compile(r"\bdidn['’]?t\b", re.IGNORECASE), "not"),
    (re.compile(r"\bwasn['’]?t\b", re.IGNORECASE), "not"),
    (re.compile(r"\bisn['’]?t\b", re.IGNORECASE), "not"),
    (re.compile(r"\baren['’]?t\b", re.IGNORECASE), "not"),
    (re.compile(r"\bdoesn['’]?t\b", re.IGNORECASE), "not"),
    (re.compile(r"\bdon['’]?t\b", re.IGNORECASE), "not"),
    (re.compile(r"\bcan['’]?t\b", re.IGNORECASE), "not"),
    (re.compile(r"\bcouldn['’]?t\b", re.IGNORECASE), "not"),
    (re.compile(r"\bwouldn['’]?t\b", re.IGNORECASE), "not"),
)


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


def normalize_sentiment_text(value: str) -> str:
    text = str(value or "")
    for pattern, replacement in _CONTRACTIONS:
        text = pattern.sub(replacement, text)
    return normalize_ranking_text(text)


def score_text(text: str) -> float:
    normalized = normalize_sentiment_text(text)
    if not normalized:
        return 0.0

    weighted_score = 0.0
    total_weight = 0.0
    remaining = normalized

    phrase_rules = sorted(
        {**POSITIVE_PHRASES, **NEGATIVE_PHRASES}.items(),
        key=lambda item: (-len(item[0].split()), -len(item[0])),
    )
    for phrase, weight in phrase_rules:
        pattern = rf"(?<!\w){re.escape(normalize_ranking_text(phrase))}(?!\w)"
        remaining, count = re.subn(pattern, " ", remaining)
        if count:
            weighted_score += weight * count
            total_weight += abs(weight) * count

    words = remaining.split()
    if not words:
        return round(weighted_score / total_weight, 4) if total_weight else 0.0

    negation_scope = 0
    for word in words:
        if word in NEGATORS:
            negation_scope = 3
            continue

        signal = 1.0 if word in POSITIVE_WORDS else -1.0 if word in NEGATIVE_WORDS else 0.0
        if signal:
            if negation_scope > 0:
                signal *= -1
                negation_scope = 0
            weighted_score += signal
            total_weight += abs(signal)
        elif negation_scope > 0:
            negation_scope -= 1

    return round(weighted_score / total_weight, 4) if total_weight else 0.0


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
