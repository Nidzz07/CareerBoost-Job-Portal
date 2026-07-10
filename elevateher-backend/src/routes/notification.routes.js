const express = require("express");
const {
  listNotifications,
  markRead,
  markAllRead,
} = require("../controllers/notification.controller");
const { requireAuth } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", requireAuth, listNotifications);
router.post("/read-all", requireAuth, markAllRead);
router.post("/:id/read", requireAuth, markRead);

module.exports = router;
