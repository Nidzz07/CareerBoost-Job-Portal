"""
Dropout Prediction
Approach: rule-based risk scoring using progress rate and days of inactivity.
Transparent and explainable - no training data needed to start.

UPGRADE PATH: Once you have historical enrollment data (which learners actually
dropped out vs completed), train a real classifier (e.g. LogisticRegression from
scikit-learn) using features like progress, daysSinceLastActivity, enrolledDaysAgo,
category, etc. Swap out calculate_risk_score() below - response shape stays the same.
"""

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
    # Expected progress if the learner were pacing steadily (assume ~30 day avg course length)
    expected_progress = min((enrolled_days_ago / 30) * 100, 100)
    progress_gap = max(expected_progress - progress, 0) / 100  # 0 to 1, higher = further behind

    # Inactivity signal: risk grows the longer they've been inactive (capped at 14 days)
    inactivity_signal = min(days_inactive / 14, 1)

    # Weighted combination - inactivity matters slightly more than pacing
    risk_score = (0.4 * progress_gap) + (0.6 * inactivity_signal)

    return round(min(risk_score, 1.0), 4)


@router.post("/at-risk-learners", response_model=PredictResponse)
def predict_at_risk_learners(payload: PredictRequest):
    at_risk = []

    for enrollment in payload.enrollments:
        score = calculate_risk_score(
            enrollment.progress,
            enrollment.daysSinceLastActivity,
            enrollment.enrolledDaysAgo,
        )
        if score >= payload.riskThreshold:
            at_risk.append(AtRiskItem(enrollmentId=enrollment.enrollmentId, riskScore=score))

    at_risk.sort(key=lambda item: item.riskScore, reverse=True)

    return PredictResponse(atRisk=at_risk)
