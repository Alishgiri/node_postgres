const { Pool } = require("pg");

const {
  host,
  port,
  user,
  database,
  password,
} = require("../secrets/db_configuration");

const pool = new Pool({ host, port, user, database, password });

// async function query() {
//   try {
//     const res = await pool.query("SELECT * FROM monsters");
//     console.log("Response", res);
//   } catch (e) {
//     console.log(e);
//   }
// }

module.exports = pool;
