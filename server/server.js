
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");

const authRoutes = require("./routes/auth");
const { authMiddleware, adminMiddleware } =
require("../server/routes/middleware/authMiddleware");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// auth routes
app.use("/auth", authRoutes);

//
// PROJECTS
//

// GET all projects (public)
app.get("/projects", async (req, res) => {
  const result = await pool.query("SELECT * FROM projects");
  res.json(result.rows);
});

// ADD project (admin only)
app.post("/projects", authMiddleware, adminMiddleware, async (req, res) => {
  const { title, description } = req.body;

  const result = await pool.query(
    "INSERT INTO projects (title, description) VALUES ($1, $2) RETURNING *",
    [title, description]
  );

  res.json(result.rows[0]);
});

// DELETE project (admin only)
app.delete("/projects/:id", authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM projects WHERE id = $1", [id]);

  res.json({ message: "Deleted" });
});

//
// NOTES
//

// GET notes (public)
app.get("/notes", async (req, res) => {
  const result = await pool.query("SELECT * FROM notes ORDER BY id DESC");
  res.json(result.rows);
});

// ADD note (admin only)
app.post("/notes",async (req, res) => {
  const { content } = req.body;

  const result = await pool.query(
    "INSERT INTO notes (content) VALUES ($1) RETURNING *",
    [content]
  );

  res.json(result.rows[0]);
});

// DELETE note (admin only)
app.delete("/notes/:id", authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM notes WHERE id = $1", [id]);

  res.json({ message: "Deleted" });
});

// UPDATE note (admin only)
app.put("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const result = await pool.query(
    "UPDATE notes SET content = $1 WHERE id = $2 RETURNING *",
    [content, id]
  );

  res.json(result.rows[0]);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});