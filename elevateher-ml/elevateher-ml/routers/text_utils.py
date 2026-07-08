"""Shared defensive helpers for text-based ML endpoints."""

import re
import string
from typing import List, Optional, Sequence, Tuple

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

_PUNCTUATION_TRANSLATION = str.maketrans(
    {char: " " for char in string.punctuation if char not in {"_", "-"}}
)

_DOMAIN_SYNONYM_GROUPS = (
    ("tailoring", "stitching", "sewing", "embroidery", "silai"),
    ("spoken english", "communication", "english speaking", "english conversation"),
    ("computer", "typing", "excel", "ms office", "data entry", "basic computer"),
    ("teaching", "teacher", "tutor", "tuition", "mentoring"),
    ("beauty", "beautician", "makeup", "mehendi", "mehndi", "henna"),
    ("pottery", "clay", "ceramic", "handmade pots"),
    ("weaving", "textile", "handloom"),
    ("handicrafts", "handmade", "crafts", "artisan"),
    ("cooking", "cook", "food", "baking", "catering"),
    ("childcare", "child care", "babysitting", "daycare"),
    ("bookkeeping", "accounts", "accounting", "billing"),
    ("digital marketing", "social media", "online marketing", "seo"),
)

MATCHING_GENERIC_WORDS = frozenset(
    {"good", "work", "job", "basic", "skill", "knowledge", "experience"}
)


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


def _singularize_token(token: str) -> str:
    """Conservatively normalize common English plurals without touching Hindi text."""
    if not token.isascii() or not token.isalpha() or len(token) <= 3:
        return token

    if len(token) > 4 and token.endswith("ies"):
        return f"{token[:-3]}y"

    if len(token) > 4 and token.endswith(("ches", "shes", "sses", "xes", "zes")):
        return token[:-2]

    if token.endswith("s") and not token.endswith(("ss", "us", "is")):
        return token[:-1]

    return token


def normalize_ranking_text(value: str) -> str:
    """Normalize recommendation/search text while preserving Hindi and Hinglish words."""
    text = str(value or "").strip().lower()
    text = text.replace("_", " ").replace("-", " ")
    text = text.translate(_PUNCTUATION_TRANSLATION)
    text = re.sub(r"\s+", " ", text).strip()

    tokens = [_singularize_token(token) for token in text.split()]
    return " ".join(tokens)


def expand_domain_synonyms(value: str) -> str:
    """Append deterministic ElevateHer domain synonyms to improve offline recall."""
    text = normalize_ranking_text(value)
    if not text:
        return ""

    text_tokens = set(text.split())
    expanded_terms = []

    for group in _DOMAIN_SYNONYM_GROUPS:
        normalized_terms = [normalize_ranking_text(term) for term in group]
        matched = False

        for term in normalized_terms:
            term_tokens = term.split()
            if not term_tokens:
                continue
            if len(term_tokens) == 1 and term_tokens[0] in text_tokens:
                matched = True
                break
            if len(term_tokens) > 1 and f" {term} " in f" {text} ":
                matched = True
                break

        if matched:
            expanded_terms.extend(normalized_terms)

    if not expanded_terms:
        return text

    return f"{text} {' '.join(expanded_terms)}"


def domain_synonym_terms(value: str) -> Tuple[str, ...]:
    """Return the canonical synonym group for a term, if one is configured."""
    text = normalize_ranking_text(value)
    if not text:
        return ()

    for group in _DOMAIN_SYNONYM_GROUPS:
        normalized_terms = tuple(normalize_ranking_text(term) for term in group)
        if text in normalized_terms:
            return normalized_terms

    return ()


def normalize_matching_text(value: str) -> str:
    """Normalize matching text and discard words too generic to signal a skill."""
    text = normalize_ranking_text(value)
    return " ".join(
        token for token in text.split() if token not in MATCHING_GENERIC_WORDS
    )


def ranked_tfidf_scores(
    query_text: str, candidate_texts: Sequence[str]
) -> Optional[List[float]]:
    query = expand_domain_synonyms(query_text)
    candidates = [expand_domain_synonyms(text) for text in candidate_texts]

    if not query or not any(candidates):
        return None

    try:
        vectorizer = TfidfVectorizer(
            ngram_range=(1, 2),
            stop_words="english",
            token_pattern=r"(?u)\b\w+\b",
        )
        tfidf_matrix = vectorizer.fit_transform([query] + candidates)
        scores = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:])[0]
        return [float(score) for score in scores]
    except ValueError:
        return None


def rank_text_candidates(
    query_text: str, candidate_texts: Sequence[str], limit: int
) -> List[Tuple[int, float]]:
    """Shared stable ranker for recommendation and search endpoints."""
    if not candidate_texts or not normalize_ranking_text(query_text) or limit <= 0:
        return []

    scores = ranked_tfidf_scores(query_text, candidate_texts)
    if scores is None:
        return []

    ranked = sorted(enumerate(scores), key=lambda item: (-item[1], item[0]))
    return [(index, score) for index, score in ranked[:limit] if score > 0]
