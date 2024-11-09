// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const router = express.Router();

// Реєстрація
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await hashPassword(password);
  // Запит для додавання користувача в БД
});

// Вхід
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // Перевірка користувача та пароля
});

module.exports = router;
