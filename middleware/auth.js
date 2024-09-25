const jwt = require("jsonwebtoken");
const JWT_SECRET = "supersecretkey"; // Make sure to use the same secret here

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(403); // Forbidden

  jwt.verify(token, JWT_SECRET, (err, user) => {
    // Use the same secret here
    if (err) {
      console.error("JWT Error:", err); // Log any JWT errors
      return res.sendStatus(403); // Forbidden
    }
    req.user = user; // If token is valid, assign user to request
    next();
  });
};

module.exports = authenticateToken;
