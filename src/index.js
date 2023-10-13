import { sequelize } from "./database/database.js";
import app from "./app.js";
// import "./models/Company.js";
// // import "./models/Persons.js";
// import "./models/User.js";

async function main() {
  try {
    await sequelize.sync({ force: true });
    console.log("todo correcto mi papá");
    app.listen(3000);
    console.log("server on port 3000");
  } catch (error) {
    console.log("the fucking error", error);
  }
}
main();
