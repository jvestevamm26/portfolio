const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "2gatosverdes",
  host: "localhost",
  port: 5432,
  database: "portfolio",
});

module.exports = pool;