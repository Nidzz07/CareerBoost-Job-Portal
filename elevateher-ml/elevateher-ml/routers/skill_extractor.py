"""
Feature 9: Skill Extractor from Bio Text
Approach: keyword matching against a known skills dictionary - takes a free-text bio
(e.g. "I have been sewing clothes for 5 years and also know basic computer work") and
pulls out recognized skills ("tailoring", "basic computer") automatically.

Use case: onboarding - instead of asking users to pick skills from a dropdown (extra
friction for low-literacy users), let them type/speak a short bio in their own words and
auto-extract structured skills for matching against jobs/courses.

UPGRADE PATH: Expand SKILL_DICTIONARY over time based on real user bios you see, or
replace with a trained NER (Named Entity Recognition) model once you have labeled data.
"""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

# Maps a canonical skill name -> list of words/phrases that indicate it in free text.
# Expand this list as you see real bios come in.
SKILL_DICTIONARY = {
    "tailoring": ["sewing", "stitching", "tailor", "clothes making", "blouse", "embroidery"],
    "weaving": ["weaving", "handloom", "textile"],
    "pottery": ["pottery", "clay", "ceramics", "pot making"],
    "cooking": ["cooking", "baking", "food preparation", "catering", "recipes"],
    "english_speaking": ["english speaking", "spoken english", "english fluent"],
    "basic_computer": ["computer", "typing", "ms word", "ms excel", "excel", "internet"],
    "childcare": ["babysitting", "childcare", "nanny", "child care"],
    "teaching": ["teaching", "tutor", "tuition", "mentoring"],
    "beauty_wellness": ["beautician", "makeup", "salon", "mehendi", "henna"],
    "receptionist_admin": ["receptionist", "front desk", "office assistant", "data entry"],
}


class ExtractSkillsRequest(BaseModel):
    bioText: str


class ExtractSkillsResponse(BaseModel):
    extractedSkills: List[str]


@router.post("/skills-from-bio", response_model=ExtractSkillsResponse)
def extract_skills_from_bio(payload: ExtractSkillsRequest):
    text_lower = payload.bioText.lower()
    found_skills = []

    for canonical_skill, keywords in SKILL_DICTIONARY.items():
        if any(keyword in text_lower for keyword in keywords):
            found_skills.append(canonical_skill)

    return ExtractSkillsResponse(extractedSkills=found_skills)
