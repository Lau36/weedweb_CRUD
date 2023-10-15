import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Person = sequelize.define(
  "person",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },
    national_id: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "persons",
    timestamp: true,
  }
);
