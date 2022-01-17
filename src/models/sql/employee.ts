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
    email: { type: DataTypes.STRING, allowNull: false },
    designation: { type: DataTypes.STRING, allowNull: false },
    departmentId: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  };
  const options = {};
  return sequelize.define("employee", attributes, options);
}
module.exports = model;
