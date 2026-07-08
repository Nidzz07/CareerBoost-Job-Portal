"""
Fair Pricing Assistant
Approach: transparent formula-based estimate for now (material cost + labor + category
markup). This is deliberately simple and explainable - sellers can see WHY a price was
suggested, which matters for trust.

UPGRADE PATH: Once you have real sales data (actual product prices + their material
cost/hours/category), train a proper regression model (e.g. LinearRegression or
LightGBM from scikit-learn/lightgbm) on that data and swap out `estimate_price()` below -
the API contract (request/response shape) doesn't need to change.
"""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

# Category-specific hourly labor rate (INR/hour) and markup multiplier -
# these are starting assumptions; refine with real seller feedback over time.
CATEGORY_RATES = {
    "pottery": {"hourly_rate": 60, "markup": 1.4},
    "weaving": {"hourly_rate": 55, "markup": 1.4},
    "tailoring": {"hourly_rate": 50, "markup": 1.35},
    "baking": {"hourly_rate": 45, "markup": 1.3},
    "embroidery": {"hourly_rate": 65, "markup": 1.45},
    "default": {"hourly_rate": 50, "markup": 1.35},
}


class PricingRequest(BaseModel):
    category: str
    materialCost: float
    hoursOfWork: float
    location: str = ""


class PricingResponse(BaseModel):
    suggestedPriceMin: float
    suggestedPriceMax: float
    suggestedPrice: float


def estimate_price(category: str, material_cost: float, hours_of_work: float):
    rates = CATEGORY_RATES.get(category.lower(), CATEGORY_RATES["default"])

    material_cost = max(material_cost, 0)
    hours_of_work = max(hours_of_work, 0)

    labor_cost = hours_of_work * rates["hourly_rate"]
    base_cost = material_cost + labor_cost
    suggested = base_cost * rates["markup"]

    # Give a +/- 15% range so the seller has room to decide
    price_min = round(suggested * 0.85, -1)  # round to nearest 10
    price_max = round(suggested * 1.15, -1)
    price_mid = round(suggested, -1)

    return price_min, price_max, price_mid


@router.post("/suggest", response_model=PricingResponse)
def suggest_price(payload: PricingRequest):
    price_min, price_max, price_mid = estimate_price(
        payload.category, payload.materialCost, payload.hoursOfWork
    )
    return PricingResponse(
        suggestedPriceMin=price_min,
        suggestedPriceMax=price_max,
        suggestedPrice=price_mid,
    )
