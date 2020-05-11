const router = require("express").Router();

const pool = require("../db");
const { request } = require("express");

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
    return next(e);
  }
});

router.post("/", async (req, res, next) => {
  const { name, personality } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO monsters(name, personality) VALUES($1, $2)",
      [name, personality]
    );
    res.json(result);
  } catch (e) {
    return next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  const fields = [];
  const { id } = req.params;
  const keys = ["name", "personality"];

  keys.forEach((key) => {
    if (req.body[key]) fields.push(key);
  });

  fields.forEach(async (field, index) => {
    try {
      await pool.query(`UPDATE monsters SET ${field}=($1) WHERE id=($2)`, [
        req.body[field],
        id,
      ]);
      if (fields.length === index + 1) res.redirect("/api/monsters");
    } catch (e) {
      console.log(e);
      return next(e);
    }
  });
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM monsters WHERE id=($1)", [id]);
    res.send(result);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
