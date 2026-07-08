"""Deterministic offline skill extraction from free-text bios."""

import re
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict, List, Sequence, Tuple

from routers.text_utils import domain_synonym_terms, normalize_ranking_text

router = APIRouter()


def _tailoring_variants() -> Tuple[str, ...]:
    # P1 groups embroidery with tailoring for recall, but extraction exposes it separately.
    shared_terms = domain_synonym_terms("tailoring")
    return tuple(term for term in shared_terms if term != "embroidery") + (
        "tailor",
        "clothes making",
    )


# Canonical display name -> phrases found in user bios. Declaration order is output order.
SKILL_DICTIONARY: Dict[str, Sequence[str]] = {
    "Computer Basics": ("computer basics", "basic computer", "computer"),
    "MS Word": ("ms word", "microsoft word", "word processing"),
    "MS Excel": ("ms excel", "microsoft excel", "excel"),
    "PowerPoint": ("powerpoint", "power point", "ms powerpoint"),
    "Typing": ("typing work", "typing"),
    "Data Entry": ("data entry", "computer operator"),
    "Digital Marketing": ("digital marketing", "online marketing", "seo"),
    "Social Media": ("social media", "social media management"),
    "Content Writing": ("content writing", "content writer", "copywriting"),
    "Customer Support": ("customer support", "customer service", "call centre", "call center"),
    "Sales": ("sales", "selling", "salesperson"),
    "Retail": ("retail", "shop assistant", "store assistant"),
    "Accounting": ("accounting", "accounts"),
    "Bookkeeping": ("bookkeeping", "book keeping", "billing"),
    "Tally": ("tally", "tally erp"),
    "Tailoring": _tailoring_variants(),
    "Embroidery": ("embroidery", "embroidering"),
    "Knitting": ("knitting", "knitwear"),
    "Crochet": ("crochet", "crocheting"),
    "Beauty": ("beauty", "beauty services", "salon"),
    "Beautician": ("beautician", "beauty therapist"),
    "Hair Styling": ("hair styling", "hair stylist", "hair cutting"),
    "Mehendi": ("mehendi", "mehndi", "henna"),
    "Makeup": ("makeup", "make up", "makeup artist"),
    "Cooking": ("cooking", "cook", "catering"),
    "Baking": ("baking", "baker", "bakery"),
    "Food Preparation": ("food preparation", "food prep", "kitchen assistant"),
    "Pottery": ("pottery", "pot making", "ceramics", "clay work"),
    "Painting": ("painting", "painter"),
    "Weaving": ("weaving", "handloom"),
    "Crafts": ("crafts", "craft making"),
    "Handicrafts": ("handicrafts", "handmade products", "artisan work"),
    "Jewellery Making": ("jewellery making", "jewelry making", "jewellery design"),
    "Teaching": ("teaching", "teacher", "mentoring"),
    "Tutor": ("home tutor", "tutor", "tuition"),
    "Childcare": ("childcare", "child care", "babysitting", "nanny"),
    "Caregiver": ("caregiver", "care giving", "elder care"),
    "Nursing Assistant": ("nursing assistant", "nurse assistant", "patient care"),
    "Machine Operator": ("machine operator", "machine operation"),
    "Electrician": ("electrician", "electrical work", "wiring"),
    "Plumbing": ("plumbing", "plumber"),
    "Driving": ("driving", "driver"),
    "Entrepreneurship": ("entrepreneurship", "entrepreneur", "self employed"),
    "Business": ("business", "small business", "business management"),
    "Communication": ("communication", "communication skills"),
    "Leadership": ("leadership", "team leader"),
    "English Speaking": ("english speaking", "spoken english", "speak english"),
    "Interview Skills": ("interview skills", "interview preparation"),
    "Problem Solving": ("problem solving", "problem-solving"),
    "Teamwork": ("teamwork", "team work"),
    "Time Management": ("time management", "manage time"),
}

_SKILL_ORDER = {skill: index for index, skill in enumerate(SKILL_DICTIONARY)}
_ALIASES = sorted(
    (
        (normalize_ranking_text(alias), canonical)
        for canonical, aliases in SKILL_DICTIONARY.items()
        for alias in aliases
    ),
    key=lambda item: (-len(item[0].split()), -len(item[0]), _SKILL_ORDER[item[1]]),
)


class ExtractSkillsRequest(BaseModel):
    bioText: str


class ExtractSkillsResponse(BaseModel):
    extractedSkills: List[str]


@router.post("/skills-from-bio", response_model=ExtractSkillsResponse)
def extract_skills_from_bio(payload: ExtractSkillsRequest):
    text = normalize_ranking_text(payload.bioText)
    matches: List[Tuple[int, int, str]] = []

    # Prefer longer phrases at an overlapping position ("computer operator" over "computer").
    for alias, canonical_skill in _ALIASES:
        for match in re.finditer(rf"(?<!\w){re.escape(alias)}(?!\w)", text):
            span = match.span()
            if any(span[0] < end and start < span[1] for start, end, _ in matches):
                continue
            matches.append((span[0], span[1], canonical_skill))

    found = {canonical_skill for _, _, canonical_skill in matches}
    extracted_skills = [
        canonical_skill for canonical_skill in SKILL_DICTIONARY if canonical_skill in found
    ]
    return ExtractSkillsResponse(extractedSkills=extracted_skills)
