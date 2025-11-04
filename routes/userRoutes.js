const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { uploadProfilePic, getUserProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Upload profile picture route
router.post("/upload-dp", authMiddleware, upload.single("photo"), uploadProfilePic);

// ✅ Get current logged-in user info (for showing DP etc.)
router.get("/me", authMiddleware, getUserProfile);

module.exports = router;
