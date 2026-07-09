const express = require("express");
const {
  descriptionGeneration,
  dropoutPrediction,
  extractSkills,
  imageModeration,
  pricingSuggestion,
  sentimentAnalysis,
  textModeration,
} = require("../controllers/ml.controller");

const router = express.Router();

router.post("/extract/skills-from-bio", extractSkills);
router.post("/pricing/suggest", pricingSuggestion);
router.post("/moderate/text", textModeration);
router.post("/moderate/image", imageModeration);
router.post("/generate/description", descriptionGeneration);
router.post("/predict/at-risk-learners", dropoutPrediction);
router.post("/sentiment/reviews", sentimentAnalysis);

module.exports = router;
