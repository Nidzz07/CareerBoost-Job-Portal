const {
  analyzeReviewSentiment,
  extractSkillsFromBio,
  generateDescription,
  moderateImage,
  moderateText,
  predictAtRiskLearners,
  suggestPrice,
} = require("../services/ml.service");

async function extractSkills(req, res) {
  const result = await extractSkillsFromBio(req.body);
  return res.status(200).json(result);
}

async function pricingSuggestion(req, res) {
  const result = await suggestPrice(req.body);
  return res.status(200).json(result);
}

async function textModeration(req, res) {
  const result = await moderateText(req.body);
  return res.status(200).json(result);
}

async function imageModeration(req, res) {
  const result = await moderateImage(req.body);
  return res.status(200).json(result);
}

async function descriptionGeneration(req, res) {
  const result = await generateDescription(req.body);
  return res.status(200).json(result);
}

async function dropoutPrediction(req, res) {
  const result = await predictAtRiskLearners(req.body);
  return res.status(200).json(result);
}

async function sentimentAnalysis(req, res) {
  const result = await analyzeReviewSentiment(req.body);
  return res.status(200).json(result);
}

module.exports = {
  descriptionGeneration,
  dropoutPrediction,
  extractSkills,
  imageModeration,
  pricingSuggestion,
  sentimentAnalysis,
  textModeration,
};
