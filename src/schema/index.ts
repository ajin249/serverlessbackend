import { gql } from "apollo-server-lambda";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { department } from "./department";
import resolvers from "../resolvers";
import { employee } from "./employee";
import { user } from "./user";

const types = [department, employee, user];

const Query = gql`
  type Query {
    _empty: String
  }
`;
const Mutation = gql`
  type Mutation {
    _empty: String
  }
`;
const schema = makeExecutableSchema({
  typeDefs: [Query, Mutation, ...types],
  resolvers,
});
export default schema;
