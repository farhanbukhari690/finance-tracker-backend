const cloudinary = require("../config/cloudinary");
const User = require("../models/User");
const fs = require("fs");

// ✅ Upload profile picture controller
exports.uploadProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    // 1️⃣ Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "finance_tracker/dps",
    });

    // 2️⃣ Update user's profilePic field in DB
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePic: result.secure_url },
      { new: true }
    );

    // 3️⃣ Delete temp file from local server
    fs.unlinkSync(req.file.path);

    // 4️⃣ Send success response
    res.json({
      message: "Profile picture uploaded successfully!",
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Image upload failed" });
  }
};

// ✅ Fetch current logged-in user (for DP + profile info)
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Failed to fetch user info" });
  }
};
