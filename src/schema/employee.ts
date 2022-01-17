import { gql } from "apollo-server-lambda";

const employee = gql`
  type Query {
    employees: [employee]
    employeesWithPagination(limit: Int, offset: Int): employeeData
  }

  type Mutation {
    createEmployee(employeeInput: employeeInput!): employeeResponse!
    updateEmployee(
      employeeId: ID!
      employeeInput: employeeInput
    ): employeeResponse!
    deleteEmployee(employeeId: ID!): response
  }

  type employee {
    id: ID
    email: String
    designation: String
    departmentId: Int
    department: department
  }

  input employeeInput {
    email: String!
    designation: String
    departmentId: Int
  }

  type response {
    message: String
    status: Boolean
  }

  type employeeResponse {
    employee: employee
    message: String!
    status: Boolean
  }

  type employeeData {
    employees: [employee]
    totalRows: Int
  }
`;

export default employee;
