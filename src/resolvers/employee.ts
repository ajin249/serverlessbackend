import { DataTypes } from "sequelize";
import db from "../models/sql";
import * as Joi from "joi";

const Employee = require("../models/sql/employee")(db.sequelize, DataTypes);
const Department = require("../models/sql/department")(db.sequelize, DataTypes);

Employee.belongsTo(Department, {
  foreignKey: "departmentId",
  as: "department",
});

const schema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": `Email is a required field`,
  }),
  designation: Joi.required().messages({
    "string.empty": `Designation is a required field`,
  }),
  departmentId: Joi.required().messages({
    "string.empty": `Department is a required field`,
  }),
});

const employeeQueries = {
  employees: async (parent: any, {}: any, context: any) => {
    try {
      return await Employee.findAll({
        include: [{ model: Department, as: "department" }],
      });
    } catch (error) {
      return error;
    }
  },
  
  employeesWithPagination: async (
    parent: any,
    { limit, offset }: any,
    context: any
  ) => {
    try {
      const employees = await Employee.findAndCountAll({
        include: [{ model: Department, as: "department" }],
        limit,
        offset: limit * offset,
      });
      if (!employees) {
        throw new Error("Employees does not exist");
      }
      let response = {};
      if (employees.count === 0) {
        return (response = { totalRows: 0, employees: employees.rows });
      }
      response = { totalRows: employees.count || 0, employees: employees.rows };
      return response;
    } catch (error) {
      return error;
    }
  },
};

const employeeMutations = {
  createEmployee: async (parent: any, { employeeInput }: any, context: any) => {
    try {
      const { error, value } = schema.validate({
        ...employeeInput,
      });
      const response = { message: "", status: true, employee: {} };
      if (error) {
        let errors = error.details;
        errors.map((err) => {
          response.message = err.message;
        });
        response.status = false;
      } else {
        response.message = "New employee added..";
        response.employee = await Employee.create(employeeInput);
      }
      return response;
    } catch (error) {
      return error;
    }
  },

  updateEmployee: async (
    parent: any,
    { employeeId, employeeInput }: any,
    context: any
  ) => {
    try {
      const { error, value } = schema.validate({
        ...employeeInput,
      });
      const response = { message: "", status: true, employee: {} };
      if (error) {
        let errors = error.details;
        errors.map((err) => {
          response.message = err.message;
        });
        response.status = false;
      } 
      else {
        const data = await Employee.update(employeeInput, {
          where: { id: employeeId },
        });
        if (parseInt(data) === 1) {
          response.employee = await Employee.findOne({
            where: { id: employeeId },
            include: [{ model: Department, as: "department" }],
          });
          response.message = "Employee updated..";
        } else {
          response.message = "Employee doesnot exists";
          response.status = false;
        }
      }
      return response;
    } catch (error) {
      return error;
    }
  },

  deleteEmployee: async (parent: any, { employeeId }: any, context: any) => {
    try {
      const data = await Employee.destroy({ where: { id: employeeId } });
      if (parseInt(data) === 1) {
        return { message: "Employee deleted..", status: true };
      } else {
        return { message: "Couldn't found the employee", status: false };
      }
    } catch (error) {
      throw error;
    }
  },

};
export { employeeQueries, employeeMutations };
