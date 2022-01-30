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
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  };
  const options = {};
  return sequelize.define("department", attributes, options);
}

module.exports = model;
