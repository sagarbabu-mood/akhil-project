const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./auth");
const todoRoutes = require("./todos");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Authentication and Todo routes
app.use("/auth", authRoutes); // Authentication routes (signup, login)
app.use("/api", todoRoutes); // Todo routes (CRUD operations)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
