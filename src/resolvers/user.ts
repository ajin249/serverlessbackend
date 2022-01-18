import db from "../models/sql";
import { DataTypes } from "sequelize";
import * as Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const User = require("../models/sql/user")(db.sequelize, DataTypes);
const Employee = require("../models/sql/employee")(db.sequelize, DataTypes);

const userQueries = {};

const userMutations = {
  createUser: async (parent: any, { userInput }: any) => {
    const schema = Joi.object({
      firstName: Joi.string().trim().required().messages({
        "string.empty": `First name is a required field`,
      }),
      lastName: Joi.string().trim().required().messages({
        "string.empty": `Last name is a required field`,
      }),
      email: Joi.string().email().required().messages({
        "string.empty": `Email is a required field`,
      }),
      password: Joi.string().trim().required().messages({
        "string.empty": `Password is a required field`,
      }),
    });

    const { error, value } = schema.validate(userInput);
    const response = { message: "", status: true, employee: {} };

    if (error) {
      let errors = error.details;
      errors.map((err) => {
        response.message = err.message;
      });
      response.status = false;
    }
    console.log(JSON.stringify(response));
    try {
      const existinguser = await User.findOne({
        where: { email: userInput.email },
      });
      if (existinguser) {
        throw new Error("User already exist");
      } 
      else {
        const existingEmployee = await Employee.findOne({
          where: { email: userInput.email },
        });
        const hashedPassword = await bcrypt.hash(userInput.password, 12);
        const newUser = await User.create({
          firstName: userInput.firstName,
          lastName: userInput.lastName,
          email: userInput.email,
          password: hashedPassword,
          hashKey: hashedPassword,
          employeeId: existingEmployee ? existingEmployee.id : null,
          status: "Active",
        });
        newUser.status = true;
        return newUser;
      }
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (parent: any, { userId, userInput }: any) => {
    const schema = Joi.object({
      firstName: Joi.string().trim().required().messages({
        "string.empty": `First name is a required field`,
      }),
      lastName: Joi.string().trim().required().messages({
        "string.empty": `Last name is a required field`,
      }),
      email: Joi.string().email().required().messages({
        "string.empty": `Email is a required field`,
      }),
    });
    const { error, value } = schema.validate(userInput);

    try {
      const user = await User.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new Error("Invalid User");
      }
      const updatedUser = await User.update(userInput, {
        where: { id: userId },
      });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  },

  doLogin: async (parent: any, { email, password }: any) => {
    try {
      const schema = Joi.object({
        email: Joi.string().email().required().messages({
          "string.empty": `Email is a required field`,
        }),
        password: Joi.string().trim().required().messages({
          "string.empty": `Password is a required field`,
        }),
      });
      const { error } = schema.validate({ email: email, password: password });
      if (error) {
        console.log(error);
      } 
      else {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          throw new Error("Invalid Username");
        }
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
          throw new Error("Incorrect Password");
        }
        user.token = jwt.sign(
          { userId: user.id },
          `${process.env.JWT_SECRET}`,
          {
            expiresIn: "1h",
          }
        );
        user.message = "Successfully logged in";
        return user;
      }
    } catch (error) {
      console.log(error)
    }
  },

};

export { userQueries, userMutations };
