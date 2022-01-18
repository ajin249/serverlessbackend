import { gql } from "apollo-server-lambda";

export const department = gql`
  type Query {
    departments: [department]
    department(departmentId: Int!): department
  }

  type Mutation {
    createDepartment(departmentInput: departmentInput!): departmentResponse!
    updateDepartment(id: ID!, departmentInput: departmentInput): department!
    deleteDepartment(id: ID!): response!
  }

  type department {
    id: ID!
    name: String!
    description: String
  }

  input departmentInput {
    name: String!
    description: String
  }

  type response {
    message: String!
    status: Boolean
  }

  type departmentResponse {
    department: department
    message: String!
    status: Boolean
  }
`;
