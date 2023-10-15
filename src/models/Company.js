import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Company = sequelize.define(
  "company",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },
    nit: {
      type: DataTypes.STRING,
      unique: true,
    },
    company_name: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamp: true,
  }
);
