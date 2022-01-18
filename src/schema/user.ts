import { gql } from "apollo-server-lambda";

export const user = gql`
  type Mutation {
    createUser(userInput: userInput!): userInfo!
    updateUser(id: ID!, userInput: userInput!): userInfo!
    doLogin(email: String!, password: String!): userInfo
  }

  type userInfo {
    id: ID!
    firstName: String
    lastName: String
    email: String!
    role: String
    status: String!
    employeeId: Int
    message: String
    token: String
  }

  input userInput {
    firstName: String
    lastName: String
    email: String!
    password: String!
    role: String
    employeeId: Int
  }
`;