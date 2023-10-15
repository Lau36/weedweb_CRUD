import { sequelize } from "./database/database.js";
import app from "./app.js";
// import "./models/Company.js";
// // import "./models/Persons.js";
// import "./models/User.js";

async function main() {
  try {
    await sequelize.sync({ force: false });
    console.log("todo correcto mi papá");
    app.listen(4000);
    console.log("server on port 4000");
  } catch (error) {
    console.log("You have an error", error);
  }
}

main();
