const transporter = require("../config/nodemailer");

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, date, location, description } = req.body;
  try {
    await pool.query(
      "UPDATE events SET name = $1, date = $2, location = $3, description = $4 WHERE id = $5",
      [name, date, location, description, id]
    );
    res.send("Подія оновлена");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Помилка сервера");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM events WHERE id = $1", [id]);
    res.send("Подія видалена");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Помилка сервера");
  }
});

// Відправлення запрошення
router.post("/:id/invite", async (req, res) => {
  const { id } = req.params;
  const { email, message } = req.body;

  try {
    const event = await pool.query("SELECT * FROM events WHERE id = $1", [id]);
    if (!event.rows.length) {
      return res.status(404).json({ msg: "Подія не знайдена" });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Запрошення на подію: ${event.rows[0].name}`,
      text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ msg: "Помилка надсилання запрошення" });
      }
      res.json({ msg: "Запрошення надіслано", info });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Помилка сервера");
  }
});
