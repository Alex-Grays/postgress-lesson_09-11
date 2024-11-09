const express = require("express");
const db = require("./db");
const cors = require("cors");
require("dotenv").config();
const router = express.Router();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/create-test-table", async (req, res) => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS test_table (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50)
      )
    `;
    await db.query(createTableQuery);
    res.status(200).json({ message: "Table created successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create table" });
  }
});

app.post("/insert-test-row", async (req, res) => {
  try {
    const { name } = req.body;
    const insertQuery = `INSERT INTO test_table (name) VALUES ($1) RETURNING *`;
    const result = await db.query(insertQuery, [name]);
    res
      .status(200)
      .json({ message: "Row inserted successfully!", data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to insert row" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Створення нової події
router.post("/create", async (req, res) => {
  const { name, date, location, description, organizer_id } = req.body;
  try {
    const newEvent = await pool.query(
      "INSERT INTO events (name, date, location, description, organizer_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, date, location, description, organizer_id]
    );
    res.json(newEvent.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Помилка сервера");
  }
});

// Отримання всіх подій
router.get("/", async (req, res) => {
  try {
    const events = await pool.query("SELECT * FROM events");
    res.json(events.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Помилка сервера");
  }
});

module.exports = router;
