import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
export const TokenDB = sequelize.define(
  "tokens",
  {
    tokenRefresh: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },
  },
  {
    timestamp: true,
    tableName: "tokens",
  }
);
