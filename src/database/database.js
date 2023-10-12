import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  "weedwebcrud",
  "postgres",
  "l1109660212j",
  {
    host: "localhost",
    dialect: "postgres",
  }
);
