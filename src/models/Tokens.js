import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
export const TokenDB = sequelize.define(
  "tokens",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    tokenRefresh: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamp: true,
    tableName: "tokens",
  }
);
