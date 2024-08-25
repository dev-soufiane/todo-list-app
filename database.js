const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./todo.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the todo database.');
});

db.run(`CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL
)`);

module.exports = db;