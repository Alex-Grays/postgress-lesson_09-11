router.put("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await pool.query("UPDATE invitations SET status = $1 WHERE id = $2", [
      status,
      id,
    ]);
    res.json({ msg: "Статус запрошення оновлено" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Помилка сервера");
  }
});
