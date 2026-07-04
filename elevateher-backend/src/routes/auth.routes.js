const express = require("express");
const { signup, login, completeOnboarding, getMe } = require("../controllers/auth.controller");
const { requireAuth } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.patch("/onboarding", requireAuth, completeOnboarding);
router.get("/me", requireAuth, getMe);

module.exports = router;
