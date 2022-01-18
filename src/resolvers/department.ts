import db from "../models/sql";
import { DataTypes } from "sequelize";
import * as Joi from "joi";

const Department = require("../models/sql/department")(db.sequelize, DataTypes);

const schema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": `Name is a required field`,
  }),
});

const departmentQueries = {
  departments: async () => {
    try {
      return await Department.findAll();
    } catch (error) {
      return error;
    }
  },
  department: async (parent: any, { departmentId }: any, context: any) => {
    try {
      return await Department.findByPk(departmentId);
    } catch (error) {
      return error;
    }
  },
};

const departmentMutations = {
  createDepartment: async (
    parent: any,
    { departmentInput }: any,
    context: any
  ) => {
    try {
      const { error, value } = schema.validate({
        name: departmentInput.name,
      });
      const response = { message: "", status: true, department: {} };
      if (error) {
        let errors = error.details;
        errors.map((err) => {
          response.message = err.message;
        });
        response.status = false;
      } 
      else {
        response.message = "New Department Added";
        response.department = await Department.create(departmentInput);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateDepartment: async (
    parent: any,
    { id, departmentInput }: any,
    context: any
  ) => {
    try {
      const { error, value } = schema.validate({
        departmentInput,
      });
      const response = { message: "", status: false, department: {} };
      if (error) {
        let errors = error.details;
        errors.map((err) => {
          response.message = err.message;
        });
        response.status = true;
      } 
      else {
        const data = await Department.update(departmentInput, {
          where: { id: id },
        });
        if (parseInt(data) === 1) {
          response.department = await Department.findOne({ where: { id: id } });
        } 
        else {
          response.message = "Department doesnot exists";
          response.status = false;
        }
      }
      return response;
    } catch (error) {
      return error;
    }
  },

  deleteDepartment: async (parent: any, { id }: any, context: any) => {
    try {
      const data = await Department.destroy({ where: { id: id } });
      if (parseInt(data) === 1) {
        return { message: "Department deleted", status: true };
      } 
      else {
        return { message: "Invalid Department", status: false };
      }
    } catch (error) {
      throw error;
    }
  },

};
export { departmentQueries, departmentMutations };
