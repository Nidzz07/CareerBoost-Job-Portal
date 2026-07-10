const express = require("express");
const {
  signup,
  login,
  completeOnboarding,
  getMe,
  refresh,
  logout,
  sendOtp,
  verifyOtp,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");
const { requireAuth } = require("../middleware/auth.middleware");
const { authLimiter } = require("../middleware/security.middleware");

const router = express.Router();

// Stricter rate limiting on credential/OTP endpoints to blunt brute-force and
// OTP-spam abuse. Session endpoints (/me, /refresh, /logout, /onboarding) are left on
// the general API limiter so normal app usage is never throttled.
router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.post("/send-otp", authLimiter, sendOtp);
router.post("/verify-otp", authLimiter, verifyOtp);
router.post("/forgot-password", authLimiter, forgotPassword);
router.post("/reset-password", authLimiter, resetPassword);
router.patch("/onboarding", requireAuth, completeOnboarding);
router.get("/me", requireAuth, getMe);

module.exports = router;
