"""Shared defensive helpers for text-based ML endpoints."""

import re
from typing import List, Optional

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def normalize_text(value: str) -> str:
    text = str(value or "").strip().lower()
    text = re.sub(r"\s+", " ", text)
    return text


def safe_tfidf_scores(query_text: str, candidate_texts: List[str]) -> Optional[List[float]]:
    query = normalize_text(query_text)
    candidates = [normalize_text(text) for text in candidate_texts]

    if not query or not any(candidates):
        return None

    try:
        vectorizer = TfidfVectorizer(stop_words="english")
        tfidf_matrix = vectorizer.fit_transform([query] + candidates)
        scores = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:])[0]
        return [float(score) for score in scores]
    except ValueError:
        # TfidfVectorizer raises for empty vocabularies, commonly caused by
        # blank, punctuation-only, or stop-word-only input.
        return None
