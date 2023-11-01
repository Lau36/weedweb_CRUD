import { Person } from "./Persons.js";
import { Company } from "./Company.js";
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
export const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    phone_number: {
      type: DataTypes.CHAR,
      unique: true,
    },
  },
  {
    timestamp: true,
    tableName: "users",
  }
);

User.hasOne(Person, {
  foreingKey: "userId",
  sourceKey: "id",
});

Person.belongsTo(User, {
  foreingKey: "userId",
  sourceKey: "id",
});

User.hasOne(Company, {
  foreingKey: "userId",
  sourceKey: "id",
});

Company.belongsTo(User, {
  foreingKey: "userId",
  sourceKey: "id",
});
