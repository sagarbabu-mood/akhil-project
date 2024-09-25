const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const db = require("./db");
const router = express.Router();

const JWT_SECRET = "supersecretkey"; // Ensure the same secret key is used here

// Signup Route
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8); // Hash the password
  const userId = uuid.v4(); // Generate unique user ID

  db.run(
    "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
    [userId, name, email, hashedPassword],
    (err) => {
      if (err) return res.status(400).json({ error: "User exists" });
      res.json({ message: "User created" });
    }
  );
});

// Login Route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    }); // Token expires in 1 hour
    res.json({ token });
  });
});

module.exports = router;
