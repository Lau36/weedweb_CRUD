import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Company } from "./Company.js";
import { Person } from "./Persons.js";

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
      type: DataTypes.INTEGER,
      unique: true,
    },
  },
  {
    timestamp: true,
    tableName: "users",
  }
);

//ForeingKey
User.hasOne(Company, {
  foreingKey: "userID",
  sourceKey: "id",
});

Company.belongsTo(User, {
  foreingKey: "userID",
  sourceKey: "id",
});

User.hasOne(Person, {
  foreingKey: "userID",
  sourceKey: "id",
});

Person.belongsTo(User, {
  foreingKey: "userID",
  sourceKey: "id",
});
