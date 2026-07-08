"""
Auto-Listing Generator
Approach: template-based generation for now - takes keywords + category and fills
a natural-sounding template. No external API key needed, works fully offline.

UPGRADE PATH: Once you have an LLM API key (OpenAI/Anthropic/etc.), replace
generate_with_template() with a real API call - see the commented example below.
The request/response shape stays identical either way, so the backend never needs
to change.
"""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()


class GenerateRequest(BaseModel):
    keywords: List[str]
    category: str
    language: str = "en"


class GenerateResponse(BaseModel):
    title: str
    description: str


TEMPLATES = {
    "en": {
        "title": "Handcrafted {keywords_joined} {category}",
        "description": (
            "A beautifully handmade {category} featuring {keywords_joined}. "
            "Every piece is uniquely crafted, showcasing traditional skill and care - "
            "perfect for home decor or gifting."
        ),
    },
    "hi": {
        "title": "हस्तनिर्मित {keywords_joined} {category}",
        "description": (
            "यह एक खूबसूरत हस्तनिर्मित {category} है जिसमें {keywords_joined} शामिल है। "
            "हर उत्पाद पारंपरिक कारीगरी से बनाया गया है - घर की सजावट या उपहार के लिए बिल्कुल सही।"
        ),
    },
}


def generate_with_template(keywords: List[str], category: str, language: str):
    template = TEMPLATES.get(language, TEMPLATES["en"])
    keywords_joined = ", ".join(keywords) if keywords else category

    title = template["title"].format(keywords_joined=keywords_joined.title(), category=category.title())
    description = template["description"].format(keywords_joined=keywords_joined, category=category)

    return title, description


# ---- Real LLM implementation would look like this (uncomment + add API key to .env): ----
# import anthropic
# client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
#
# def generate_with_llm(keywords, category, language):
#     prompt = f"Write a short, appealing product title and description in {language} for a " \
#              f"handmade {category} product with these features: {', '.join(keywords)}."
#     response = client.messages.create(
#         model="claude-sonnet-4-6", max_tokens=200,
#         messages=[{"role": "user", "content": prompt}]
#     )
#     # parse response.content[0].text into title/description
#     ...


@router.post("/description", response_model=GenerateResponse)
def generate_description(payload: GenerateRequest):
    title, description = generate_with_template(payload.keywords, payload.category, payload.language)
    return GenerateResponse(title=title, description=description)
