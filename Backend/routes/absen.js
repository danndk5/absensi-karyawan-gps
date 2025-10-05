const express = require("express");
const { checkIn, checkOut, getHistory } = require("../controllers/absensiController");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware cek token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token tidak valid" });
    }
    req.user = user;
    next();
  });
}

router.post("/checkin", authenticateToken, checkIn);
router.post("/checkout", authenticateToken, checkOut);
router.get("/history", authenticateToken, getHistory);

module.exports = router;