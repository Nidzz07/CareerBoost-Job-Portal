const express = require("express");
const { updateProfile, getSettings, updateSettings } = require("../controllers/user.controller");
const { requireAuth } = require("../middleware/auth.middleware");

const router = express.Router();

router.patch("/", requireAuth, updateProfile);
router.get("/settings", requireAuth, getSettings);
router.put("/settings", requireAuth, updateSettings);

module.exports = router;
