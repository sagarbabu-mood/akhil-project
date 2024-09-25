const express = require("express");
const uuid = require("uuid");
const db = require("./db");
const authenticateToken = require("./middleware/auth"); // Import authentication middleware
const router = express.Router();

// Create Todo
router.post("/todos", authenticateToken, (req, res) => {
  const { title } = req.body;
  const id = uuid.v4();

  db.run(
    "INSERT INTO todos (id, user_id, title) VALUES (?, ?, ?)",
    [id, req.user.userId, title], // Access userId from the authenticated user
    () => res.json({ id, title, status: "pending" })
  );
});

// Get Todos
router.get("/todos", authenticateToken, (req, res) => {
  db.all(
    "SELECT * FROM todos WHERE user_id = ?",
    [req.user.userId], // Access userId from the authenticated user
    (err, todos) => {
      res.json(todos);
    }
  );
});

// Update Todo
router.put("/todos/:id", authenticateToken, (req, res) => {
  const { status } = req.body;
  db.run(
    "UPDATE todos SET status = ? WHERE id = ? AND user_id = ?",
    [status, req.params.id, req.user.userId], // Ensure the todo belongs to the user
    () => res.json({ message: "Todo updated" })
  );
});

// Delete Todo
router.delete("/todos/:id", authenticateToken, (req, res) => {
  db.run(
    "DELETE FROM todos WHERE id = ? AND user_id = ?",
    [req.params.id, req.user.userId], // Ensure the todo belongs to the user
    () => res.json({ message: "Todo deleted" })
  );
});

module.exports = router;
