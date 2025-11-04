// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization; // "Bearer <token>"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Make both available
    req.user = decoded;       // so you can use req.user.id anywhere
    req.userId = decoded.id;  // backward compatibility for old code

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is invalid or expired" });
  }
};
