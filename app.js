const express = require("express");

const monsters = require("./routes/monsters");

const app = express();

app.use(express.json());

app.use("/api/monsters", monsters);

app.use((err, req, res, next) => res.json(err));

module.exports = app;
