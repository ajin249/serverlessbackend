import schema from "./schema";
const { ApolloServer } = require("apollo-server-lambda");
const apolloServer = new ApolloServer({ schema });
export const graphqlHandler = apolloServer.createHandler();
