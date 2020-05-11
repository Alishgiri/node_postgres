const router = require("express").Router();

const pool = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM monsters ORDER BY id ASC");
    res.json(result.rows);
  } catch (e) {
    return next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM monsters WHERE id = $1", [
      id,
    ]);
    res.json(result.rows);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
