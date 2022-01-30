"use strict";
import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const dotenv = require("dotenv");
dotenv.config();

const dbOptions: any = {
  dialect: "mysql",
  dialectModule: mysql2,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
};

const db: any = {};
let sequelize: any;
sequelize = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USER}`,
  `${process.env.DB_PASS}`,
  dbOptions
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(function (err: any) {
    console.log("DB Error: ", err);
  });

sequelize.sync().then(() => {
  console.log("tables migrated");
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
