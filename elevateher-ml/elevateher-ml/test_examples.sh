#!/bin/bash
# Working examples for every endpoint. Run the server first:
#   uvicorn main:app --reload --port 8000
# Then run this script (or copy individual curl commands) to see live responses.

echo "--- Health check ---"
curl -s http://localhost:8000/
echo -e "\n"

echo "--- 1. Recommend courses ---"
curl -s -X POST http://localhost:8000/recommend/courses -H "Content-Type: application/json" -d '{
  "userId": "u1",
  "userProfileText": "pottery weaving handmade crafts",
  "candidates": [
    {"id": "c1", "text": "pottery basics handmade clay crafts"},
    {"id": "c2", "text": "excel computer basics office skills"},
    {"id": "c3", "text": "weaving textile handmade crafts"}
  ],
  "limit": 2
}'
echo -e "\n"

echo "--- 2. Skill-to-job match score ---"
curl -s -X POST http://localhost:8000/match/job-score -H "Content-Type: application/json" -d '{
  "userSkills": ["english speaking", "basic computer", "tailoring"],
  "jobTitle": "Home Tutor - English and Computer Basics",
  "jobDescription": "Looking for a home tutor to teach spoken English to children"
}'
echo -e "\n"

echo "--- 3. Pricing suggestion ---"
curl -s -X POST http://localhost:8000/pricing/suggest -H "Content-Type: application/json" -d '{
  "category": "pottery",
  "materialCost": 150,
  "hoursOfWork": 4
}'
echo -e "\n"

echo "--- 4. Content moderation (text - flagged example) ---"
curl -s -X POST http://localhost:8000/moderate/text -H "Content-Type: application/json" -d '{
  "text": "Looking for a receptionist, must work 24/7, no breaks allowed.",
  "context": "job_posting"
}'
echo -e "\n"

echo "--- 5. Auto-generate listing description ---"
curl -s -X POST http://localhost:8000/generate/description -H "Content-Type: application/json" -d '{
  "keywords": ["blue glaze", "medium size", "clay pot"],
  "category": "pottery",
  "language": "en"
}'
echo -e "\n"

echo "--- 6. Dropout risk prediction ---"
curl -s -X POST http://localhost:8000/predict/at-risk-learners -H "Content-Type: application/json" -d '{
  "enrollments": [
    {"enrollmentId": "e1", "progress": 10, "daysSinceLastActivity": 12, "enrolledDaysAgo": 20},
    {"enrollmentId": "e2", "progress": 90, "daysSinceLastActivity": 1, "enrolledDaysAgo": 20}
  ]
}'
echo -e "\n"

echo "--- 7. Sentiment analysis on reviews ---"
curl -s -X POST http://localhost:8000/sentiment/reviews -H "Content-Type: application/json" -d '{
  "reviews": [
    {"text": "She was very professional, punctual and helpful. Highly recommend!"},
    {"text": "Unprofessional and rude, payment was delayed, would avoid."},
    {"text": "It was okay, nothing special."}
  ]
}'
echo -e "\n"

echo "--- 8. Natural-language search ---"
curl -s -X POST http://localhost:8000/search -H "Content-Type: application/json" -d '{
  "query": "part time english tutor job",
  "candidates": [
    {"id": "j1", "text": "Home Tutor English Speaking Part Time"},
    {"id": "j2", "text": "Full Time Receptionist Office Admin"},
    {"id": "j3", "text": "English Language Teacher Weekend Classes"}
  ]
}'
echo -e "\n"

echo "--- 9. Skill extraction from bio ---"
curl -s -X POST http://localhost:8000/extract/skills-from-bio -H "Content-Type: application/json" -d '{
  "bioText": "I have been sewing clothes and doing embroidery for 5 years, also know basic Excel and typing."
}'
echo -e "\n"
