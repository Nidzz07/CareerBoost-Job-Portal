const express = require("express");
const { upload } = require("../config/upload");
const { requireAuth } = require("../middleware/auth.middleware");

const router = express.Router();

/**
 * POST /api/upload
 * Requires auth. Generic single-file upload used across modules
 * (course media, product photos, profile pictures).
 * Form field name must be "file".
 * Returns a URL - save it into Product.imageUrl, Course.mediaUrl, etc.
 */
router.post("/", requireAuth, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  const fileUrl = `/uploads/${req.file.filename}`;

  return res.status(201).json({
    success: true,
    message: "File uploaded successfully",
    data: {
      url: fileUrl,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      sizeBytes: req.file.size,
    },
  });
});

router.use((err, req, res, next) => {
  if (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
  next();
});

module.exports = router;
