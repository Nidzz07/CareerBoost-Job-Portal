"""Deterministic, offline content moderation."""

import re
from fastapi import APIRouter
from pydantic import BaseModel

from routers.text_utils import normalize_ranking_text

router = APIRouter()

RED_FLAG_PHRASES = (
    "work without pay",
    "unpaid",
    "unpaid internship",
    "no salary",
    "salary nahi",
    "no breaks",
    "24 7",
    "24 7 work",
    "advance payment",
    "advance payment required",
    "pay advance",
    "send money",
    "deposit required",
    "security deposit required",
    "registration fee",
    "processing fee",
    "joining fee",
    "pay first",
    "paisa jama",
    "paise jama",
    "otp fraud",
    "share otp",
    "send otp",
    "fake job offer",
    "guaranteed job",
    "investment scam",
    "investment scheme guaranteed",
    "guaranteed income",
    "guaranteed earning",
    "fake earning",
    "free earning",
    "free money",
    "whatsapp only",
    "only whatsapp",
    "contact on whatsapp only",
    "wa me",
    "telegram job",
    "telegram earning",
    "join telegram",
    "work from home no experience high pay",
    "ghar se kaam guaranteed income",
    "ghar se kaam paisa jama",
    "mehnat ke paise nahi",
)

_OBFUSCATION_TRANSLATION = str.maketrans(
    {
        "0": "o",
        "1": "i",
        "3": "e",
        "4": "a",
        "5": "s",
        "7": "t",
        "@": "a",
        "¥": "y",
    }
)


def normalize_moderation_text(value: str) -> str:
    text = str(value or "").lower().translate(_OBFUSCATION_TRANSLATION)
    text = re.sub(r"\bwa\s*[./_-]\s*me\b", "wa me", text)
    return normalize_ranking_text(text)


def _contains_phrase(text: str, phrase: str) -> bool:
    return re.search(rf"(?<!\w){re.escape(phrase)}(?!\w)", text) is not None


class TextModerationRequest(BaseModel):
    text: str
    context: str = "general"  # "job_posting" | "product_listing" | "general"


class ImageModerationRequest(BaseModel):
    imageUrl: str


class ModerationResponse(BaseModel):
    flagged: bool
    reason: str = ""
    confidence: float = 0.0


@router.post("/text", response_model=ModerationResponse)
def moderate_text(payload: TextModerationRequest):
    text = normalize_moderation_text(payload.text)
    matched = [phrase for phrase in RED_FLAG_PHRASES if _contains_phrase(text, phrase)]

    if matched:
        return ModerationResponse(
            flagged=True,
            reason=f"Contains potentially exploitative/suspicious phrasing: {', '.join(matched)}",
            confidence=min(0.5 + 0.15 * len(matched), 0.95),
        )

    return ModerationResponse(flagged=False, reason="", confidence=0.0)


@router.post("/image", response_model=ModerationResponse)
def moderate_image(payload: ImageModerationRequest):
    # STUB: always passes for now. Replace with a real vision moderation API call
    # once available. Kept here so the backend can already wire in the call and
    # get a consistent response shape.
    return ModerationResponse(flagged=False, reason="Image moderation not yet implemented - passed by default", confidence=0.0)
