const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./todo.db");

db.serialize(() => {
  // Create Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);

  // Create Todos table
  db.run(`
    CREATE TABLE IF NOT EXISTS todos (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      title TEXT,
      status TEXT DEFAULT 'pending',
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
});

module.exports = db;
