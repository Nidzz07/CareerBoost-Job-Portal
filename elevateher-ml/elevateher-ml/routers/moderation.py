"""
Content Moderation
Approach: rule-based keyword flagging for text (transparent, no training data needed).
Image moderation is stubbed - real image classification needs either a pretrained
vision model (download requires internet access) or a paid moderation API.

UPGRADE PATH:
- Text: replace keyword matching with a trained text classifier (e.g. scikit-learn
  Naive Bayes on labeled examples) once you have real flagged/unflagged examples.
- Image: integrate a vision moderation API (e.g. AWS Rekognition, Google Vision
  SafeSearch) - swap the stub in moderate_image() for a real API call.
"""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

# Starter red-flag keyword list for job postings - expand based on real moderation needs.
RED_FLAG_KEYWORDS = [
    "no breaks", "24/7", "unpaid", "no salary", "advance payment required",
    "send money", "registration fee", "processing fee", "guaranteed income",
    "work from home no experience high pay",
]


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
    text_lower = payload.text.lower()

    matched = [kw for kw in RED_FLAG_KEYWORDS if kw in text_lower]

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
