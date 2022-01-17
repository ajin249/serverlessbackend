import { departmentMutations, departmentQueries } from "./department";
import { employeeQueries, employeeMutations } from "./employee";
import { userMutations, userQueries } from "./user";
const resolvers = {
  Query: {
    ...departmentQueries,
    ...employeeQueries,
    ...userQueries,
  },
  Mutation: {
    ...departmentMutations,
    ...employeeMutations,
    ...userMutations,
  },
};

export default resolvers;
