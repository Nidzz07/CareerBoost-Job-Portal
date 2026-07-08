"""Transparent, deterministic pricing estimates for handmade products."""

import re
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

# Category-specific hourly labor rate (INR/hour) and markup multiplier -
# these are starting assumptions; refine with real seller feedback over time.
CATEGORY_RATES = {
    "tailoring": {"hourly_rate": 55, "labor_markup": 1.30},
    "embroidery": {"hourly_rate": 70, "labor_markup": 1.40},
    "pottery": {"hourly_rate": 65, "labor_markup": 1.30},
    "jewellery": {"hourly_rate": 80, "labor_markup": 1.45},
    "jewelry": {"hourly_rate": 80, "labor_markup": 1.45},
    "painting": {"hourly_rate": 60, "labor_markup": 1.35},
    "knitting": {"hourly_rate": 55, "labor_markup": 1.30},
    "crochet": {"hourly_rate": 60, "labor_markup": 1.35},
    "food": {"hourly_rate": 50, "labor_markup": 1.25},
    "cooking": {"hourly_rate": 50, "labor_markup": 1.25},
    "baking": {"hourly_rate": 55, "labor_markup": 1.30},
    "beauty": {"hourly_rate": 60, "labor_markup": 1.35},
    "beauty products": {"hourly_rate": 60, "labor_markup": 1.35},
    "weaving": {"hourly_rate": 60, "labor_markup": 1.35},
    "default": {"hourly_rate": 50, "labor_markup": 1.30},
}

TIER_1_CITIES = {"mumbai", "delhi", "bengaluru", "bangalore", "hyderabad", "pune", "chennai"}
TIER_2_CITIES = {"jaipur", "lucknow", "nagpur", "indore", "bhopal", "surat"}


class PricingRequest(BaseModel):
    category: str
    materialCost: float
    hoursOfWork: float
    location: str = ""


class PricingResponse(BaseModel):
    suggestedPriceMin: float
    suggestedPriceMax: float
    suggestedPrice: float


def _location_multiplier(location: str) -> float:
    normalized = str(location or "").strip().lower()
    if any(re.search(rf"(?<!\w){re.escape(city)}(?!\w)", normalized) for city in TIER_1_CITIES):
        return 1.08
    if any(re.search(rf"(?<!\w){re.escape(city)}(?!\w)", normalized) for city in TIER_2_CITIES):
        return 1.04
    return 1.0


def _weighted_labor_hours(hours: float) -> float:
    """Apply smooth, diminishing rates to unusually long production runs."""
    regular = min(hours, 8)
    extended = min(max(hours - 8, 0), 16) * 0.90
    long_run = max(hours - 24, 0) * 0.80
    return regular + extended + long_run


def estimate_price(
    category: str, material_cost: float, hours_of_work: float, location: str = ""
):
    rates = CATEGORY_RATES.get(str(category or "").strip().lower(), CATEGORY_RATES["default"])
    material_cost = max(material_cost, 0)
    hours_of_work = max(hours_of_work, 0)

    labor_cost = (
        _weighted_labor_hours(hours_of_work)
        * rates["hourly_rate"]
        * _location_multiplier(location)
    )
    suggested = material_cost + (labor_cost * rates["labor_markup"])

    # Give a +/- 15% range so the seller has room to decide
    price_min = max(round(suggested * 0.85, -1), material_cost)
    price_mid = max(round(suggested, -1), price_min)
    price_max = max(round(suggested * 1.15, -1), price_mid)

    return price_min, price_max, price_mid


@router.post("/suggest", response_model=PricingResponse)
def suggest_price(payload: PricingRequest):
    price_min, price_max, price_mid = estimate_price(
        payload.category, payload.materialCost, payload.hoursOfWork, payload.location
    )
    return PricingResponse(
        suggestedPriceMin=price_min,
        suggestedPriceMax=price_max,
        suggestedPrice=price_mid,
    )
