import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: "5432",
  user: "postgres",
  password: "l1109660212j",
  database: "weedwebcrud",
});

module.exports = pool;
