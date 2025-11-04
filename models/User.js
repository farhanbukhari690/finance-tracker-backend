const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    profilePic: {
    type: String,
    default: "",
  },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
