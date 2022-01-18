import { DataTypes } from "sequelize";
const sequelize = require("./index");

function model(sequelize: any) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM("admin", "employee", "user"),
      defaultValue: "user",
    },
    hashKey: { type: DataTypes.STRING, allowNull: false },
    employeeId: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  };
  const options = {};
  return sequelize.define("user", attributes, options);
}

module.exports = model;