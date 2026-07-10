"""
Endpoint smoke tests for the ElevateHer ML service.

Covers the health endpoints and a couple of critical, deterministic endpoints
(moderation + search) so regressions in wiring/response shape are caught. Does NOT
test model internals — algorithms are unchanged.

Run with:  pip install -r requirements-dev.txt  &&  pytest
"""

from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_root_health_backwards_compatible():
    res = client.get("/")
    assert res.status_code == 200
    body = res.json()
    assert body["success"] is True
    assert "ElevateHer ML service" in body["message"]


def test_health_endpoint_reports_ok():
    res = client.get("/health")
    assert res.status_code == 200
    body = res.json()
    assert body["status"] == "ok"
    assert body["service"] == "elevateher-ml"
    assert "version" in body


def test_moderate_text_flags_suspicious_content():
    res = client.post("/moderate/text", json={"text": "Pay registration fee to get guaranteed job", "context": "job_posting"})
    assert res.status_code == 200
    body = res.json()
    assert body["flagged"] is True
    assert body["confidence"] > 0


def test_moderate_text_passes_clean_content():
    res = client.post("/moderate/text", json={"text": "Beautiful hand-woven cotton saree", "context": "product_listing"})
    assert res.status_code == 200
    assert res.json()["flagged"] is False


def test_moderate_text_validates_missing_field():
    # Pydantic should reject a body without the required `text` field.
    res = client.post("/moderate/text", json={"context": "general"})
    assert res.status_code == 422


def test_search_returns_results_list():
    payload = {
        "query": "designer",
        "candidates": [
            {"id": "a", "text": "junior graphic designer role"},
            {"id": "b", "text": "cotton saree handmade"},
        ],
        "limit": 5,
    }
    res = client.post("/search", json=payload)
    assert res.status_code == 200
    assert "results" in res.json()
