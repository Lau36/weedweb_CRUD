import pool from "../../database/keys";

async function create(name, lastName, document, email, password) {
  try {
    await pool.query(
      "INSERT INTO user (name, lastName, document, email, password) VALUES ($1, $2, $3, $4, $5)",
      [name, lastName, document, email, password]
    );
    return {
      name,
      lastName,
      document,
      email,
      password,
    };
  } catch (error) {
    console.log("This is the fucking error", error);
    throw "There was a problem with the db";
  }
}
export default create;
