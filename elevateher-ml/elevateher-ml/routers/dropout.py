"""Deterministic, rule-based learner dropout risk prediction."""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()


class EnrollmentInput(BaseModel):
    enrollmentId: str
    progress: int  # 0-100
    daysSinceLastActivity: int
    enrolledDaysAgo: int


class PredictRequest(BaseModel):
    enrollments: List[EnrollmentInput]
    riskThreshold: float = 0.6  # only return enrollments at or above this risk score


class AtRiskItem(BaseModel):
    enrollmentId: str
    riskScore: float


class PredictResponse(BaseModel):
    atRisk: List[AtRiskItem]


def calculate_risk_score(progress: int, days_inactive: int, enrolled_days_ago: int) -> float:
    progress = min(max(progress, 0), 100)
    days_inactive = max(days_inactive, 0)
    enrolled_days_ago = max(enrolled_days_ago, 0)

    if progress >= 100:
        return 0.0

    # New learners need a short opportunity to engage before risk is assigned.
    if enrolled_days_ago <= 3:
        return 0.0

    days_inactive = min(days_inactive, enrolled_days_ago)

    # Expected progress if the learner were pacing steadily (assume ~30 day avg course length)
    expected_progress = min((enrolled_days_ago / 30) * 100, 100)
    progress_gap = max(expected_progress - progress, 0) / 100

    if days_inactive <= 3:
        inactivity_signal = 0.0
    elif days_inactive <= 7:
        inactivity_signal = ((days_inactive - 3) / 4) * 0.25
    elif days_inactive <= 14:
        inactivity_signal = 0.25 + ((days_inactive - 7) / 7) * 0.40
    elif days_inactive <= 30:
        inactivity_signal = 0.65 + ((days_inactive - 14) / 16) * 0.25
    else:
        inactivity_signal = min(0.90 + ((days_inactive - 30) / 30) * 0.10, 1.0)

    interaction = progress_gap * inactivity_signal
    risk_score = (
        (0.35 * progress_gap)
        + (0.55 * inactivity_signal)
        + (0.10 * interaction)
    )

    # Learners in their first week or close to completion should not be over-escalated.
    if enrolled_days_ago <= 7:
        risk_score = min(risk_score, 0.35)
    if progress >= 90:
        risk_score = min(risk_score, 0.35)
    elif progress >= 75:
        risk_score = min(risk_score, 0.55)

    return round(min(max(risk_score, 0.0), 1.0), 4)


@router.post("/at-risk-learners", response_model=PredictResponse)
def predict_at_risk_learners(payload: PredictRequest):
    at_risk = []
    risk_threshold = min(max(payload.riskThreshold, 0), 1)

    for enrollment in payload.enrollments:
        if enrollment.progress >= 100:
            continue

        score = calculate_risk_score(
            enrollment.progress,
            enrollment.daysSinceLastActivity,
            enrollment.enrolledDaysAgo,
        )
        if score >= risk_threshold:
            at_risk.append(AtRiskItem(enrollmentId=enrollment.enrollmentId, riskScore=score))

    at_risk.sort(key=lambda item: item.riskScore, reverse=True)

    return PredictResponse(atRisk=at_risk)
