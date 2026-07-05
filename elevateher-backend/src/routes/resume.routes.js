const express = require("express");
const { upsertResume, getMyResume, getUserResume } = require("../controllers/resume.controller");
const { requireAuth } = require("../middleware/auth.middleware");

const router = express.Router();

router.put("/", requireAuth, upsertResume);
router.get("/me", requireAuth, getMyResume);
router.get("/:userId", requireAuth, getUserResume);

module.exports = router;
