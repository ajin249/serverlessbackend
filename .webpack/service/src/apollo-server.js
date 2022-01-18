/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/apollo-server.ts":
/*!******************************!*\
  !*** ./src/apollo-server.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.graphqlHandler = void 0;
const schema_1 = __importDefault(__webpack_require__(/*! ./schema */ "./src/schema/index.ts"));
const { ApolloServer } = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
const apolloServer = new ApolloServer({ schema: schema_1.default });
exports.graphqlHandler = apolloServer.createHandler();


/***/ }),

/***/ "./src/models/sql/department.ts":
/*!**************************************!*\
  !*** ./src/models/sql/department.ts ***!
  \**************************************/
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const sequelize = __webpack_require__(/*! ./index */ "./src/models/sql/index.ts");
function model(sequelize) {
    const attributes = {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        description: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        createdAt: { type: sequelize_1.DataTypes.DATE },
        updatedAt: { type: sequelize_1.DataTypes.DATE },
    };
    const options = {};
    return sequelize.define("department", attributes, options);
}
module.exports = model;


/***/ }),

/***/ "./src/models/sql/employee.ts":
/*!************************************!*\
  !*** ./src/models/sql/employee.ts ***!
  \************************************/
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const sequelize = __webpack_require__(/*! ./index */ "./src/models/sql/index.ts");
function model(sequelize) {
    const attributes = {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        email: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        designation: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        departmentId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
        createdAt: { type: sequelize_1.DataTypes.DATE },
        updatedAt: { type: sequelize_1.DataTypes.DATE },
    };
    const options = {};
    return sequelize.define("employee", attributes, options);
}
module.exports = model;


/***/ }),

/***/ "./src/models/sql/index.ts":
/*!*********************************!*\
  !*** ./src/models/sql/index.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const mysql2_1 = __importDefault(__webpack_require__(/*! mysql2 */ "mysql2"));
const dotenv = __webpack_require__(/*! dotenv */ "dotenv");
dotenv.config();
const dbOptions = {
    dialect: "mysql",
    dialectModule: mysql2_1.default,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
};
const db = {};
let sequelize;
sequelize = new sequelize_1.Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASS}`, dbOptions);
sequelize
    .authenticate()
    .then(() => {
    console.log("Connected to DB");
})
    .catch(function (err) {
    console.log("DB Error: ", err);
});
sequelize.sync().then(() => {
    console.log("tables migrated");
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports["default"] = db;


/***/ }),

/***/ "./src/models/sql/user.ts":
/*!********************************!*\
  !*** ./src/models/sql/user.ts ***!
  \********************************/
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const sequelize = __webpack_require__(/*! ./index */ "./src/models/sql/index.ts");
function model(sequelize) {
    const attributes = {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        firstName: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        lastName: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        email: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        password: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        role: {
            type: sequelize_1.DataTypes.ENUM("admin", "employee", "user"),
            defaultValue: "user",
        },
        hashKey: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        employeeId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
        status: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        createdAt: { type: sequelize_1.DataTypes.DATE },
        updatedAt: { type: sequelize_1.DataTypes.DATE },
    };
    const options = {};
    return sequelize.define("user", attributes, options);
}
module.exports = model;


/***/ }),

/***/ "./src/resolvers/department.ts":
/*!*************************************!*\
  !*** ./src/resolvers/department.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.departmentMutations = exports.departmentQueries = void 0;
const sql_1 = __importDefault(__webpack_require__(/*! ../models/sql */ "./src/models/sql/index.ts"));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const Joi = __importStar(__webpack_require__(/*! joi */ "joi"));
const Department = __webpack_require__(/*! ../models/sql/department */ "./src/models/sql/department.ts")(sql_1.default.sequelize, sequelize_1.DataTypes);
const schema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": `Name is a required field`,
    }),
});
const departmentQueries = {
    departments: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield Department.findAll();
        }
        catch (error) {
            return error;
        }
    }),
    department: (parent, { departmentId }, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield Department.findByPk(departmentId);
        }
        catch (error) {
            return error;
        }
    }),
};
exports.departmentQueries = departmentQueries;
const departmentMutations = {
    createDepartment: (parent, { departmentInput }, context) => __awaiter(void 0, void 0, void 0, function* () {
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
                response.department = yield Department.create(departmentInput);
            }
            return response;
        }
        catch (error) {
            throw error;
        }
    }),
    updateDepartment: (parent, { id, departmentInput }, context) => __awaiter(void 0, void 0, void 0, function* () {
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
                const data = yield Department.update(departmentInput, {
                    where: { id: id },
                });
                if (parseInt(data) === 1) {
                    response.department = yield Department.findOne({ where: { id: id } });
                }
                else {
                    response.message = "Department doesnot exists";
                    response.status = false;
                }
            }
            return response;
        }
        catch (error) {
            return error;
        }
    }),
    deleteDepartment: (parent, { id }, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield Department.destroy({ where: { id: id } });
            if (parseInt(data) === 1) {
                return { message: "Department deleted", status: true };
            }
            else {
                return { message: "Invalid Department", status: false };
            }
        }
        catch (error) {
            throw error;
        }
    }),
};
exports.departmentMutations = departmentMutations;


/***/ }),

/***/ "./src/resolvers/employee.ts":
/*!***********************************!*\
  !*** ./src/resolvers/employee.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.employeeMutations = exports.employeeQueries = void 0;
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const sql_1 = __importDefault(__webpack_require__(/*! ../models/sql */ "./src/models/sql/index.ts"));
const Joi = __importStar(__webpack_require__(/*! joi */ "joi"));
const Employee = __webpack_require__(/*! ../models/sql/employee */ "./src/models/sql/employee.ts")(sql_1.default.sequelize, sequelize_1.DataTypes);
const Department = __webpack_require__(/*! ../models/sql/department */ "./src/models/sql/department.ts")(sql_1.default.sequelize, sequelize_1.DataTypes);
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
    employees: (parent, {}, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield Employee.findAll({
                include: [{ model: Department, as: "department" }],
            });
        }
        catch (error) {
            return error;
        }
    }),
    employeesWithPagination: (parent, { limit, offset }, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const employees = yield Employee.findAndCountAll({
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
        }
        catch (error) {
            return error;
        }
    }),
};
exports.employeeQueries = employeeQueries;
const employeeMutations = {
    createEmployee: (parent, { employeeInput }, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { error, value } = schema.validate(Object.assign({}, employeeInput));
            const response = { message: "", status: true, employee: {} };
            if (error) {
                let errors = error.details;
                errors.map((err) => {
                    response.message = err.message;
                });
                response.status = false;
            }
            else {
                response.message = "New employee added..";
                response.employee = yield Employee.create(employeeInput);
            }
            return response;
        }
        catch (error) {
            return error;
        }
    }),
    updateEmployee: (parent, { employeeId, employeeInput }, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { error, value } = schema.validate(Object.assign({}, employeeInput));
            const response = { message: "", status: true, employee: {} };
            if (error) {
                let errors = error.details;
                errors.map((err) => {
                    response.message = err.message;
                });
                response.status = false;
            }
            else {
                const data = yield Employee.update(employeeInput, {
                    where: { id: employeeId },
                });
                if (parseInt(data) === 1) {
                    response.employee = yield Employee.findOne({
                        where: { id: employeeId },
                        include: [{ model: Department, as: "department" }],
                    });
                    response.message = "Employee updated..";
                }
                else {
                    response.message = "Employee doesnot exists";
                    response.status = false;
                }
            }
            return response;
        }
        catch (error) {
            return error;
        }
    }),
    deleteEmployee: (parent, { employeeId }, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield Employee.destroy({ where: { id: employeeId } });
            if (parseInt(data) === 1) {
                return { message: "Employee deleted..", status: true };
            }
            else {
                return { message: "Couldn't found the employee", status: false };
            }
        }
        catch (error) {
            throw error;
        }
    }),
};
exports.employeeMutations = employeeMutations;


/***/ }),

/***/ "./src/resolvers/index.ts":
/*!********************************!*\
  !*** ./src/resolvers/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const department_1 = __webpack_require__(/*! ./department */ "./src/resolvers/department.ts");
const employee_1 = __webpack_require__(/*! ./employee */ "./src/resolvers/employee.ts");
const user_1 = __webpack_require__(/*! ./user */ "./src/resolvers/user.ts");
const resolvers = {
    Query: Object.assign(Object.assign(Object.assign({}, department_1.departmentQueries), employee_1.employeeQueries), user_1.userQueries),
    Mutation: Object.assign(Object.assign(Object.assign({}, department_1.departmentMutations), employee_1.employeeMutations), user_1.userMutations),
};
exports["default"] = resolvers;


/***/ }),

/***/ "./src/resolvers/user.ts":
/*!*******************************!*\
  !*** ./src/resolvers/user.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.userMutations = exports.userQueries = void 0;
const sql_1 = __importDefault(__webpack_require__(/*! ../models/sql */ "./src/models/sql/index.ts"));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const Joi = __importStar(__webpack_require__(/*! joi */ "joi"));
const bcryptjs_1 = __importDefault(__webpack_require__(/*! bcryptjs */ "bcryptjs"));
const jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ "jsonwebtoken"));
const User = __webpack_require__(/*! ../models/sql/user */ "./src/models/sql/user.ts")(sql_1.default.sequelize, sequelize_1.DataTypes);
const Employee = __webpack_require__(/*! ../models/sql/employee */ "./src/models/sql/employee.ts")(sql_1.default.sequelize, sequelize_1.DataTypes);
const userQueries = {};
exports.userQueries = userQueries;
const userMutations = {
    createUser: (parent, { userInput }) => __awaiter(void 0, void 0, void 0, function* () {
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
            const existinguser = yield User.findOne({
                where: { email: userInput.email },
            });
            if (existinguser) {
                throw new Error("User already exist");
            }
            else {
                const existingEmployee = yield Employee.findOne({
                    where: { email: userInput.email },
                });
                const hashedPassword = yield bcryptjs_1.default.hash(userInput.password, 12);
                const newUser = yield User.create({
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
        }
        catch (error) {
            throw error;
        }
    }),
    updateUser: (parent, { userId, userInput }) => __awaiter(void 0, void 0, void 0, function* () {
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
            const user = yield User.findOne({
                where: { id: userId },
            });
            if (!user) {
                throw new Error("Invalid User");
            }
            const updatedUser = yield User.update(userInput, {
                where: { id: userId },
            });
            return updatedUser;
        }
        catch (error) {
            throw error;
        }
    }),
    doLogin: (parent, { email, password }) => __awaiter(void 0, void 0, void 0, function* () {
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
                const user = yield User.findOne({ where: { email } });
                if (!user) {
                    throw new Error("Invalid Username");
                }
                const checkPassword = yield bcryptjs_1.default.compare(password, user.password);
                if (!checkPassword) {
                    throw new Error("Incorrect Password");
                }
                user.token = jsonwebtoken_1.default.sign({ userId: user.id }, `${process.env.JWT_SECRET}`, {
                    expiresIn: "1h",
                });
                user.message = "Successfully logged in";
                return user;
            }
        }
        catch (error) { }
    }),
};
exports.userMutations = userMutations;


/***/ }),

/***/ "./src/schema/department.ts":
/*!**********************************!*\
  !*** ./src/schema/department.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.department = void 0;
const apollo_server_lambda_1 = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
exports.department = (0, apollo_server_lambda_1.gql) `
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


/***/ }),

/***/ "./src/schema/employee.ts":
/*!********************************!*\
  !*** ./src/schema/employee.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const apollo_server_lambda_1 = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
const employee = (0, apollo_server_lambda_1.gql) `
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
exports["default"] = employee;


/***/ }),

/***/ "./src/schema/index.ts":
/*!*****************************!*\
  !*** ./src/schema/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const apollo_server_lambda_1 = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
const schema_1 = __webpack_require__(/*! @graphql-tools/schema */ "@graphql-tools/schema");
const department_1 = __webpack_require__(/*! ./department */ "./src/schema/department.ts");
const resolvers_1 = __importDefault(__webpack_require__(/*! ../resolvers */ "./src/resolvers/index.ts"));
const employee_1 = __importDefault(__webpack_require__(/*! ./employee */ "./src/schema/employee.ts"));
const user_1 = __importDefault(__webpack_require__(/*! ./user */ "./src/schema/user.ts"));
const types = [department_1.department, employee_1.default, user_1.default];
const Query = (0, apollo_server_lambda_1.gql) `
  type Query {
    _empty: String
  }
`;
const Mutation = (0, apollo_server_lambda_1.gql) `
  type Mutation {
    _empty: String
  }
`;
const schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: [Query, Mutation, ...types],
    resolvers: resolvers_1.default,
});
exports["default"] = schema;


/***/ }),

/***/ "./src/schema/user.ts":
/*!****************************!*\
  !*** ./src/schema/user.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const apollo_server_lambda_1 = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
const user = (0, apollo_server_lambda_1.gql) `
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
exports["default"] = user;


/***/ }),

/***/ "@graphql-tools/schema":
/*!****************************************!*\
  !*** external "@graphql-tools/schema" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@graphql-tools/schema");

/***/ }),

/***/ "apollo-server-lambda":
/*!***************************************!*\
  !*** external "apollo-server-lambda" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("apollo-server-lambda");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("joi");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mysql2":
/*!*************************!*\
  !*** external "mysql2" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("mysql2");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("sequelize");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/apollo-server.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjL2Fwb2xsby1zZXJ2ZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDSEE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7QUNwQkE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7QUNyQkE7Ozs7O0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7O0FDdkNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBeUVBO0FBdkVBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BHQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBeUVBO0FBdkVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuSUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUtBO0FBS0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUE0SEE7QUExSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDcklBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlDQTs7Ozs7Ozs7Ozs7OztBQ25DQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7Ozs7QUFJQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdkJBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJCQTtBQUVBOzs7Ozs7Ozs7OztBQy9CQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBRXZCQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RlY2gtYmFja2VuZC8uL3NyYy9hcG9sbG8tc2VydmVyLnRzIiwid2VicGFjazovL3RlY2gtYmFja2VuZC8uL3NyYy9tb2RlbHMvc3FsL2RlcGFydG1lbnQudHMiLCJ3ZWJwYWNrOi8vdGVjaC1iYWNrZW5kLy4vc3JjL21vZGVscy9zcWwvZW1wbG95ZWUudHMiLCJ3ZWJwYWNrOi8vdGVjaC1iYWNrZW5kLy4vc3JjL21vZGVscy9zcWwvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdGVjaC1iYWNrZW5kLy4vc3JjL21vZGVscy9zcWwvdXNlci50cyIsIndlYnBhY2s6Ly90ZWNoLWJhY2tlbmQvLi9zcmMvcmVzb2x2ZXJzL2RlcGFydG1lbnQudHMiLCJ3ZWJwYWNrOi8vdGVjaC1iYWNrZW5kLy4vc3JjL3Jlc29sdmVycy9lbXBsb3llZS50cyIsIndlYnBhY2s6Ly90ZWNoLWJhY2tlbmQvLi9zcmMvcmVzb2x2ZXJzL2luZGV4LnRzIiwid2VicGFjazovL3RlY2gtYmFja2VuZC8uL3NyYy9yZXNvbHZlcnMvdXNlci50cyIsIndlYnBhY2s6Ly90ZWNoLWJhY2tlbmQvLi9zcmMvc2NoZW1hL2RlcGFydG1lbnQudHMiLCJ3ZWJwYWNrOi8vdGVjaC1iYWNrZW5kLy4vc3JjL3NjaGVtYS9lbXBsb3llZS50cyIsIndlYnBhY2s6Ly90ZWNoLWJhY2tlbmQvLi9zcmMvc2NoZW1hL2luZGV4LnRzIiwid2VicGFjazovL3RlY2gtYmFja2VuZC8uL3NyYy9zY2hlbWEvdXNlci50cyIsIndlYnBhY2s6Ly90ZWNoLWJhY2tlbmQvZXh0ZXJuYWwgY29tbW9uanMgXCJAZ3JhcGhxbC10b29scy9zY2hlbWFcIiIsIndlYnBhY2s6Ly90ZWNoLWJhY2tlbmQvZXh0ZXJuYWwgY29tbW9uanMgXCJhcG9sbG8tc2VydmVyLWxhbWJkYVwiIiwid2VicGFjazovL3RlY2gtYmFja2VuZC9leHRlcm5hbCBjb21tb25qcyBcImJjcnlwdGpzXCIiLCJ3ZWJwYWNrOi8vdGVjaC1iYWNrZW5kL2V4dGVybmFsIGNvbW1vbmpzIFwiZG90ZW52XCIiLCJ3ZWJwYWNrOi8vdGVjaC1iYWNrZW5kL2V4dGVybmFsIGNvbW1vbmpzIFwiam9pXCIiLCJ3ZWJwYWNrOi8vdGVjaC1iYWNrZW5kL2V4dGVybmFsIGNvbW1vbmpzIFwianNvbndlYnRva2VuXCIiLCJ3ZWJwYWNrOi8vdGVjaC1iYWNrZW5kL2V4dGVybmFsIGNvbW1vbmpzIFwibXlzcWwyXCIiLCJ3ZWJwYWNrOi8vdGVjaC1iYWNrZW5kL2V4dGVybmFsIGNvbW1vbmpzIFwic2VxdWVsaXplXCIiLCJ3ZWJwYWNrOi8vdGVjaC1iYWNrZW5kL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RlY2gtYmFja2VuZC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3RlY2gtYmFja2VuZC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdGVjaC1iYWNrZW5kL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2NoZW1hIGZyb20gXCIuL3NjaGVtYVwiO1xyXG5jb25zdCB7IEFwb2xsb1NlcnZlciB9ID0gcmVxdWlyZShcImFwb2xsby1zZXJ2ZXItbGFtYmRhXCIpO1xyXG5jb25zdCBhcG9sbG9TZXJ2ZXIgPSBuZXcgQXBvbGxvU2VydmVyKHsgc2NoZW1hIH0pO1xyXG5leHBvcnQgY29uc3QgZ3JhcGhxbEhhbmRsZXIgPSBhcG9sbG9TZXJ2ZXIuY3JlYXRlSGFuZGxlcigpO1xyXG4iLCJpbXBvcnQgeyBEYXRhVHlwZXMgfSBmcm9tIFwic2VxdWVsaXplXCI7XHJcbmNvbnN0IHNlcXVlbGl6ZSA9IHJlcXVpcmUoXCIuL2luZGV4XCIpO1xyXG5cclxuZnVuY3Rpb24gbW9kZWwoc2VxdWVsaXplOiBhbnkpIHtcclxuICBjb25zdCBhdHRyaWJ1dGVzID0ge1xyXG4gICAgaWQ6IHtcclxuICAgICAgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXHJcbiAgICAgIGF1dG9JbmNyZW1lbnQ6IHRydWUsXHJcbiAgICAgIGFsbG93TnVsbDogZmFsc2UsXHJcbiAgICAgIHByaW1hcnlLZXk6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgbmFtZTogeyB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLCBhbGxvd051bGw6IGZhbHNlIH0sXHJcbiAgICBkZXNjcmlwdGlvbjogeyB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLCBhbGxvd051bGw6IHRydWUgfSxcclxuICAgIGNyZWF0ZWRBdDogeyB0eXBlOiBEYXRhVHlwZXMuREFURSB9LFxyXG4gICAgdXBkYXRlZEF0OiB7IHR5cGU6IERhdGFUeXBlcy5EQVRFIH0sXHJcbiAgfTtcclxuICBjb25zdCBvcHRpb25zID0ge307XHJcbiAgcmV0dXJuIHNlcXVlbGl6ZS5kZWZpbmUoXCJkZXBhcnRtZW50XCIsIGF0dHJpYnV0ZXMsIG9wdGlvbnMpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG1vZGVsOyIsImltcG9ydCB7IERhdGFUeXBlcyB9IGZyb20gXCJzZXF1ZWxpemVcIjtcclxuY29uc3Qgc2VxdWVsaXplID0gcmVxdWlyZShcIi4vaW5kZXhcIik7XHJcblxyXG5mdW5jdGlvbiBtb2RlbChzZXF1ZWxpemU6IGFueSkge1xyXG4gIGNvbnN0IGF0dHJpYnV0ZXMgPSB7XHJcbiAgICBpZDoge1xyXG4gICAgICB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUixcclxuICAgICAgYXV0b0luY3JlbWVudDogdHJ1ZSxcclxuICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcclxuICAgICAgcHJpbWFyeUtleTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBlbWFpbDogeyB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLCBhbGxvd051bGw6IGZhbHNlIH0sXHJcbiAgICBkZXNpZ25hdGlvbjogeyB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLCBhbGxvd051bGw6IGZhbHNlIH0sXHJcbiAgICBkZXBhcnRtZW50SWQ6IHsgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsIGFsbG93TnVsbDogZmFsc2UgfSxcclxuICAgIGNyZWF0ZWRBdDogeyB0eXBlOiBEYXRhVHlwZXMuREFURSB9LFxyXG4gICAgdXBkYXRlZEF0OiB7IHR5cGU6IERhdGFUeXBlcy5EQVRFIH0sXHJcbiAgfTtcclxuICBjb25zdCBvcHRpb25zID0ge307XHJcbiAgcmV0dXJuIHNlcXVlbGl6ZS5kZWZpbmUoXCJlbXBsb3llZVwiLCBhdHRyaWJ1dGVzLCBvcHRpb25zKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtb2RlbDsiLCJcInVzZSBzdHJpY3RcIjtcclxuaW1wb3J0IHsgU2VxdWVsaXplIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xyXG5pbXBvcnQgbXlzcWwyIGZyb20gXCJteXNxbDJcIjtcclxuXHJcbmNvbnN0IGRvdGVudiA9IHJlcXVpcmUoXCJkb3RlbnZcIik7XHJcbmRvdGVudi5jb25maWcoKTtcclxuXHJcbmNvbnN0IGRiT3B0aW9uczogYW55ID0ge1xyXG4gIGRpYWxlY3Q6IFwibXlzcWxcIixcclxuICBkaWFsZWN0TW9kdWxlOiBteXNxbDIsXHJcbiAgaG9zdDogcHJvY2Vzcy5lbnYuREJfSE9TVCxcclxuICBwb3J0OiBwcm9jZXNzLmVudi5EQl9QT1JULFxyXG59O1xyXG5cclxuY29uc3QgZGI6IGFueSA9IHt9O1xyXG5sZXQgc2VxdWVsaXplOiBhbnk7XHJcbnNlcXVlbGl6ZSA9IG5ldyBTZXF1ZWxpemUoXHJcbiAgYCR7cHJvY2Vzcy5lbnYuREJfTkFNRX1gLFxyXG4gIGAke3Byb2Nlc3MuZW52LkRCX1VTRVJ9YCxcclxuICBgJHtwcm9jZXNzLmVudi5EQl9QQVNTfWAsXHJcbiAgZGJPcHRpb25zXHJcbik7XHJcblxyXG5zZXF1ZWxpemVcclxuICAuYXV0aGVudGljYXRlKClcclxuICAudGhlbigoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3RlZCB0byBEQlwiKTtcclxuICB9KVxyXG4gIC5jYXRjaChmdW5jdGlvbiAoZXJyOiBhbnkpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiREIgRXJyb3I6IFwiLCBlcnIpO1xyXG4gIH0pO1xyXG4gIFxyXG5zZXF1ZWxpemUuc3luYygpLnRoZW4oKCkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKFwidGFibGVzIG1pZ3JhdGVkXCIpO1xyXG59KTtcclxuXHJcbmRiLnNlcXVlbGl6ZSA9IHNlcXVlbGl6ZTtcclxuZGIuU2VxdWVsaXplID0gU2VxdWVsaXplO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGI7IiwiaW1wb3J0IHsgRGF0YVR5cGVzIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xyXG5jb25zdCBzZXF1ZWxpemUgPSByZXF1aXJlKFwiLi9pbmRleFwiKTtcclxuXHJcbmZ1bmN0aW9uIG1vZGVsKHNlcXVlbGl6ZTogYW55KSB7XHJcbiAgY29uc3QgYXR0cmlidXRlcyA9IHtcclxuICAgIGlkOiB7XHJcbiAgICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxyXG4gICAgICBhdXRvSW5jcmVtZW50OiB0cnVlLFxyXG4gICAgICBhbGxvd051bGw6IGZhbHNlLFxyXG4gICAgICBwcmltYXJ5S2V5OiB0cnVlLFxyXG4gICAgfSxcclxuICAgIGZpcnN0TmFtZTogeyB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLCBhbGxvd051bGw6IGZhbHNlIH0sXHJcbiAgICBsYXN0TmFtZTogeyB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLCBhbGxvd051bGw6IHRydWUgfSxcclxuICAgIGVtYWlsOiB7IHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsIGFsbG93TnVsbDogZmFsc2UgfSxcclxuICAgIHBhc3N3b3JkOiB7IHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsIGFsbG93TnVsbDogZmFsc2UgfSxcclxuICAgIHJvbGU6IHtcclxuICAgICAgdHlwZTogRGF0YVR5cGVzLkVOVU0oXCJhZG1pblwiLCBcImVtcGxveWVlXCIsIFwidXNlclwiKSxcclxuICAgICAgZGVmYXVsdFZhbHVlOiBcInVzZXJcIixcclxuICAgIH0sXHJcbiAgICBoYXNoS2V5OiB7IHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsIGFsbG93TnVsbDogZmFsc2UgfSxcclxuICAgIGVtcGxveWVlSWQ6IHsgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsIGFsbG93TnVsbDogZmFsc2UgfSxcclxuICAgIHN0YXR1czogeyB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLCBhbGxvd051bGw6IGZhbHNlIH0sXHJcbiAgICBjcmVhdGVkQXQ6IHsgdHlwZTogRGF0YVR5cGVzLkRBVEUgfSxcclxuICAgIHVwZGF0ZWRBdDogeyB0eXBlOiBEYXRhVHlwZXMuREFURSB9LFxyXG4gIH07XHJcbiAgY29uc3Qgb3B0aW9ucyA9IHt9O1xyXG4gIHJldHVybiBzZXF1ZWxpemUuZGVmaW5lKFwidXNlclwiLCBhdHRyaWJ1dGVzLCBvcHRpb25zKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtb2RlbDsiLCJpbXBvcnQgZGIgZnJvbSBcIi4uL21vZGVscy9zcWxcIjtcclxuaW1wb3J0IHsgRGF0YVR5cGVzIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xyXG5pbXBvcnQgKiBhcyBKb2kgZnJvbSBcImpvaVwiO1xyXG5cclxuY29uc3QgRGVwYXJ0bWVudCA9IHJlcXVpcmUoXCIuLi9tb2RlbHMvc3FsL2RlcGFydG1lbnRcIikoZGIuc2VxdWVsaXplLCBEYXRhVHlwZXMpO1xyXG5cclxuY29uc3Qgc2NoZW1hID0gSm9pLm9iamVjdCh7XHJcbiAgbmFtZTogSm9pLnN0cmluZygpLnJlcXVpcmVkKCkubWVzc2FnZXMoe1xyXG4gICAgXCJzdHJpbmcuZW1wdHlcIjogYE5hbWUgaXMgYSByZXF1aXJlZCBmaWVsZGAsXHJcbiAgfSksXHJcbn0pO1xyXG5cclxuY29uc3QgZGVwYXJ0bWVudFF1ZXJpZXMgPSB7XHJcbiAgZGVwYXJ0bWVudHM6IGFzeW5jICgpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJldHVybiBhd2FpdCBEZXBhcnRtZW50LmZpbmRBbGwoKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiBlcnJvcjtcclxuICAgIH1cclxuICB9LFxyXG4gIGRlcGFydG1lbnQ6IGFzeW5jIChwYXJlbnQ6IGFueSwgeyBkZXBhcnRtZW50SWQgfTogYW55LCBjb250ZXh0OiBhbnkpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJldHVybiBhd2FpdCBEZXBhcnRtZW50LmZpbmRCeVBrKGRlcGFydG1lbnRJZCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICB9XHJcbiAgfSxcclxufTtcclxuXHJcbmNvbnN0IGRlcGFydG1lbnRNdXRhdGlvbnMgPSB7XHJcbiAgY3JlYXRlRGVwYXJ0bWVudDogYXN5bmMgKFxyXG4gICAgcGFyZW50OiBhbnksXHJcbiAgICB7IGRlcGFydG1lbnRJbnB1dCB9OiBhbnksXHJcbiAgICBjb250ZXh0OiBhbnlcclxuICApID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgZXJyb3IsIHZhbHVlIH0gPSBzY2hlbWEudmFsaWRhdGUoe1xyXG4gICAgICAgIG5hbWU6IGRlcGFydG1lbnRJbnB1dC5uYW1lLFxyXG4gICAgICB9KTtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSB7IG1lc3NhZ2U6IFwiXCIsIHN0YXR1czogdHJ1ZSwgZGVwYXJ0bWVudDoge30gfTtcclxuICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgbGV0IGVycm9ycyA9IGVycm9yLmRldGFpbHM7XHJcbiAgICAgICAgZXJyb3JzLm1hcCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICByZXNwb25zZS5tZXNzYWdlID0gZXJyLm1lc3NhZ2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmVzcG9uc2Uuc3RhdHVzID0gZmFsc2U7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcG9uc2UubWVzc2FnZSA9IFwiTmV3IERlcGFydG1lbnQgQWRkZWRcIjtcclxuICAgICAgICByZXNwb25zZS5kZXBhcnRtZW50ID0gYXdhaXQgRGVwYXJ0bWVudC5jcmVhdGUoZGVwYXJ0bWVudElucHV0KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuICB9LFxyXG4gIHVwZGF0ZURlcGFydG1lbnQ6IGFzeW5jIChcclxuICAgIHBhcmVudDogYW55LFxyXG4gICAgeyBpZCwgZGVwYXJ0bWVudElucHV0IH06IGFueSxcclxuICAgIGNvbnRleHQ6IGFueVxyXG4gICkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBlcnJvciwgdmFsdWUgfSA9IHNjaGVtYS52YWxpZGF0ZSh7XHJcbiAgICAgICAgZGVwYXJ0bWVudElucHV0LFxyXG4gICAgICB9KTtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSB7IG1lc3NhZ2U6IFwiXCIsIHN0YXR1czogZmFsc2UsIGRlcGFydG1lbnQ6IHt9IH07XHJcbiAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgIGxldCBlcnJvcnMgPSBlcnJvci5kZXRhaWxzO1xyXG4gICAgICAgIGVycm9ycy5tYXAoKGVycikgPT4ge1xyXG4gICAgICAgICAgcmVzcG9uc2UubWVzc2FnZSA9IGVyci5tZXNzYWdlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJlc3BvbnNlLnN0YXR1cyA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IERlcGFydG1lbnQudXBkYXRlKGRlcGFydG1lbnRJbnB1dCwge1xyXG4gICAgICAgICAgd2hlcmU6IHsgaWQ6IGlkIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHBhcnNlSW50KGRhdGEpID09PSAxKSB7XHJcbiAgICAgICAgICByZXNwb25zZS5kZXBhcnRtZW50ID0gYXdhaXQgRGVwYXJ0bWVudC5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IGlkIH0gfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlc3BvbnNlLm1lc3NhZ2UgPSBcIkRlcGFydG1lbnQgZG9lc25vdCBleGlzdHNcIjtcclxuICAgICAgICAgIHJlc3BvbnNlLnN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICB9XHJcbiAgfSxcclxuICBkZWxldGVEZXBhcnRtZW50OiBhc3luYyAocGFyZW50OiBhbnksIHsgaWQgfTogYW55LCBjb250ZXh0OiBhbnkpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBEZXBhcnRtZW50LmRlc3Ryb3koeyB3aGVyZTogeyBpZDogaWQgfSB9KTtcclxuICAgICAgaWYgKHBhcnNlSW50KGRhdGEpID09PSAxKSB7XHJcbiAgICAgICAgcmV0dXJuIHsgbWVzc2FnZTogXCJEZXBhcnRtZW50IGRlbGV0ZWRcIiwgc3RhdHVzOiB0cnVlIH07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHsgbWVzc2FnZTogXCJJbnZhbGlkIERlcGFydG1lbnRcIiwgc3RhdHVzOiBmYWxzZSB9O1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuICB9LFxyXG59O1xyXG5leHBvcnQgeyBkZXBhcnRtZW50UXVlcmllcywgZGVwYXJ0bWVudE11dGF0aW9ucyB9O1xyXG4iLCJpbXBvcnQgeyBEYXRhVHlwZXMgfSBmcm9tIFwic2VxdWVsaXplXCI7XHJcbmltcG9ydCBkYiBmcm9tIFwiLi4vbW9kZWxzL3NxbFwiO1xyXG5pbXBvcnQgKiBhcyBKb2kgZnJvbSBcImpvaVwiO1xyXG5cclxuY29uc3QgRW1wbG95ZWUgPSByZXF1aXJlKFwiLi4vbW9kZWxzL3NxbC9lbXBsb3llZVwiKShkYi5zZXF1ZWxpemUsIERhdGFUeXBlcyk7XHJcbmNvbnN0IERlcGFydG1lbnQgPSByZXF1aXJlKFwiLi4vbW9kZWxzL3NxbC9kZXBhcnRtZW50XCIpKGRiLnNlcXVlbGl6ZSwgRGF0YVR5cGVzKTtcclxuXHJcbkVtcGxveWVlLmJlbG9uZ3NUbyhEZXBhcnRtZW50LCB7XHJcbiAgZm9yZWlnbktleTogXCJkZXBhcnRtZW50SWRcIixcclxuICBhczogXCJkZXBhcnRtZW50XCIsXHJcbn0pO1xyXG5cclxuY29uc3Qgc2NoZW1hID0gSm9pLm9iamVjdCh7XHJcbiAgZW1haWw6IEpvaS5zdHJpbmcoKS5lbWFpbCgpLnJlcXVpcmVkKCkubWVzc2FnZXMoe1xyXG4gICAgXCJzdHJpbmcuZW1wdHlcIjogYEVtYWlsIGlzIGEgcmVxdWlyZWQgZmllbGRgLFxyXG4gIH0pLFxyXG4gIGRlc2lnbmF0aW9uOiBKb2kucmVxdWlyZWQoKS5tZXNzYWdlcyh7XHJcbiAgICBcInN0cmluZy5lbXB0eVwiOiBgRGVzaWduYXRpb24gaXMgYSByZXF1aXJlZCBmaWVsZGAsXHJcbiAgfSksXHJcbiAgZGVwYXJ0bWVudElkOiBKb2kucmVxdWlyZWQoKS5tZXNzYWdlcyh7XHJcbiAgICBcInN0cmluZy5lbXB0eVwiOiBgRGVwYXJ0bWVudCBpcyBhIHJlcXVpcmVkIGZpZWxkYCxcclxuICB9KSxcclxufSk7XHJcblxyXG5jb25zdCBlbXBsb3llZVF1ZXJpZXMgPSB7XHJcbiAgZW1wbG95ZWVzOiBhc3luYyAocGFyZW50OiBhbnksIHt9OiBhbnksIGNvbnRleHQ6IGFueSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgcmV0dXJuIGF3YWl0IEVtcGxveWVlLmZpbmRBbGwoe1xyXG4gICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBEZXBhcnRtZW50LCBhczogXCJkZXBhcnRtZW50XCIgfV0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIGVycm9yO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZW1wbG95ZWVzV2l0aFBhZ2luYXRpb246IGFzeW5jIChcclxuICAgIHBhcmVudDogYW55LFxyXG4gICAgeyBsaW1pdCwgb2Zmc2V0IH06IGFueSxcclxuICAgIGNvbnRleHQ6IGFueVxyXG4gICkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgZW1wbG95ZWVzID0gYXdhaXQgRW1wbG95ZWUuZmluZEFuZENvdW50QWxsKHtcclxuICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogRGVwYXJ0bWVudCwgYXM6IFwiZGVwYXJ0bWVudFwiIH1dLFxyXG4gICAgICAgIGxpbWl0LFxyXG4gICAgICAgIG9mZnNldDogbGltaXQgKiBvZmZzZXQsXHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoIWVtcGxveWVlcykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVtcGxveWVlcyBkb2VzIG5vdCBleGlzdFwiKTtcclxuICAgICAgfVxyXG4gICAgICBsZXQgcmVzcG9uc2UgPSB7fTtcclxuICAgICAgaWYgKGVtcGxveWVlcy5jb3VudCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiAocmVzcG9uc2UgPSB7IHRvdGFsUm93czogMCwgZW1wbG95ZWVzOiBlbXBsb3llZXMucm93cyB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXNwb25zZSA9IHsgdG90YWxSb3dzOiBlbXBsb3llZXMuY291bnQgfHwgMCwgZW1wbG95ZWVzOiBlbXBsb3llZXMucm93cyB9O1xyXG4gICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICB9XHJcbiAgfSxcclxufTtcclxuXHJcbmNvbnN0IGVtcGxveWVlTXV0YXRpb25zID0ge1xyXG4gIGNyZWF0ZUVtcGxveWVlOiBhc3luYyAocGFyZW50OiBhbnksIHsgZW1wbG95ZWVJbnB1dCB9OiBhbnksIGNvbnRleHQ6IGFueSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBlcnJvciwgdmFsdWUgfSA9IHNjaGVtYS52YWxpZGF0ZSh7XHJcbiAgICAgICAgLi4uZW1wbG95ZWVJbnB1dCxcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0geyBtZXNzYWdlOiBcIlwiLCBzdGF0dXM6IHRydWUsIGVtcGxveWVlOiB7fSB9O1xyXG4gICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICBsZXQgZXJyb3JzID0gZXJyb3IuZGV0YWlscztcclxuICAgICAgICBlcnJvcnMubWFwKChlcnIpID0+IHtcclxuICAgICAgICAgIHJlc3BvbnNlLm1lc3NhZ2UgPSBlcnIubWVzc2FnZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXNwb25zZS5zdGF0dXMgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNwb25zZS5tZXNzYWdlID0gXCJOZXcgZW1wbG95ZWUgYWRkZWQuLlwiO1xyXG4gICAgICAgIHJlc3BvbnNlLmVtcGxveWVlID0gYXdhaXQgRW1wbG95ZWUuY3JlYXRlKGVtcGxveWVlSW5wdXQpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiBlcnJvcjtcclxuICAgIH1cclxuICB9LFxyXG4gIHVwZGF0ZUVtcGxveWVlOiBhc3luYyAoXHJcbiAgICBwYXJlbnQ6IGFueSxcclxuICAgIHsgZW1wbG95ZWVJZCwgZW1wbG95ZWVJbnB1dCB9OiBhbnksXHJcbiAgICBjb250ZXh0OiBhbnlcclxuICApID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgZXJyb3IsIHZhbHVlIH0gPSBzY2hlbWEudmFsaWRhdGUoe1xyXG4gICAgICAgIC4uLmVtcGxveWVlSW5wdXQsXHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IHsgbWVzc2FnZTogXCJcIiwgc3RhdHVzOiB0cnVlLCBlbXBsb3llZToge30gfTtcclxuICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgbGV0IGVycm9ycyA9IGVycm9yLmRldGFpbHM7XHJcbiAgICAgICAgZXJyb3JzLm1hcCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICByZXNwb25zZS5tZXNzYWdlID0gZXJyLm1lc3NhZ2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmVzcG9uc2Uuc3RhdHVzID0gZmFsc2U7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IEVtcGxveWVlLnVwZGF0ZShlbXBsb3llZUlucHV0LCB7XHJcbiAgICAgICAgICB3aGVyZTogeyBpZDogZW1wbG95ZWVJZCB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChwYXJzZUludChkYXRhKSA9PT0gMSkge1xyXG4gICAgICAgICAgcmVzcG9uc2UuZW1wbG95ZWUgPSBhd2FpdCBFbXBsb3llZS5maW5kT25lKHtcclxuICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGVtcGxveWVlSWQgfSxcclxuICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IERlcGFydG1lbnQsIGFzOiBcImRlcGFydG1lbnRcIiB9XSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmVzcG9uc2UubWVzc2FnZSA9IFwiRW1wbG95ZWUgdXBkYXRlZC4uXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlc3BvbnNlLm1lc3NhZ2UgPSBcIkVtcGxveWVlIGRvZXNub3QgZXhpc3RzXCI7XHJcbiAgICAgICAgICByZXNwb25zZS5zdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIGVycm9yO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZGVsZXRlRW1wbG95ZWU6IGFzeW5jIChwYXJlbnQ6IGFueSwgeyBlbXBsb3llZUlkIH06IGFueSwgY29udGV4dDogYW55KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgRW1wbG95ZWUuZGVzdHJveSh7IHdoZXJlOiB7IGlkOiBlbXBsb3llZUlkIH0gfSk7XHJcbiAgICAgIGlmIChwYXJzZUludChkYXRhKSA9PT0gMSkge1xyXG4gICAgICAgIHJldHVybiB7IG1lc3NhZ2U6IFwiRW1wbG95ZWUgZGVsZXRlZC4uXCIsIHN0YXR1czogdHJ1ZSB9O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB7IG1lc3NhZ2U6IFwiQ291bGRuJ3QgZm91bmQgdGhlIGVtcGxveWVlXCIsIHN0YXR1czogZmFsc2UgfTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICB9XHJcbiAgfSxcclxufTtcclxuZXhwb3J0IHsgZW1wbG95ZWVRdWVyaWVzLCBlbXBsb3llZU11dGF0aW9ucyB9O1xyXG4iLCJpbXBvcnQgeyBkZXBhcnRtZW50TXV0YXRpb25zLCBkZXBhcnRtZW50UXVlcmllcyB9IGZyb20gXCIuL2RlcGFydG1lbnRcIjtcclxuaW1wb3J0IHsgZW1wbG95ZWVRdWVyaWVzLCBlbXBsb3llZU11dGF0aW9ucyB9IGZyb20gXCIuL2VtcGxveWVlXCI7XHJcbmltcG9ydCB7IHVzZXJNdXRhdGlvbnMsIHVzZXJRdWVyaWVzIH0gZnJvbSBcIi4vdXNlclwiO1xyXG5cclxuY29uc3QgcmVzb2x2ZXJzID0ge1xyXG4gIFF1ZXJ5OiB7XHJcbiAgICAuLi5kZXBhcnRtZW50UXVlcmllcyxcclxuICAgIC4uLmVtcGxveWVlUXVlcmllcyxcclxuICAgIC4uLnVzZXJRdWVyaWVzLFxyXG4gIH0sXHJcbiAgTXV0YXRpb246IHtcclxuICAgIC4uLmRlcGFydG1lbnRNdXRhdGlvbnMsXHJcbiAgICAuLi5lbXBsb3llZU11dGF0aW9ucyxcclxuICAgIC4uLnVzZXJNdXRhdGlvbnMsXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJlc29sdmVycztcclxuIiwiaW1wb3J0IGRiIGZyb20gXCIuLi9tb2RlbHMvc3FsXCI7XHJcbmltcG9ydCB7IERhdGFUeXBlcyB9IGZyb20gXCJzZXF1ZWxpemVcIjtcclxuaW1wb3J0ICogYXMgSm9pIGZyb20gXCJqb2lcIjtcclxuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIjtcclxuaW1wb3J0IGp3dCBmcm9tIFwianNvbndlYnRva2VuXCI7XHJcblxyXG5jb25zdCBVc2VyID0gcmVxdWlyZShcIi4uL21vZGVscy9zcWwvdXNlclwiKShkYi5zZXF1ZWxpemUsIERhdGFUeXBlcyk7XHJcbmNvbnN0IEVtcGxveWVlID0gcmVxdWlyZShcIi4uL21vZGVscy9zcWwvZW1wbG95ZWVcIikoZGIuc2VxdWVsaXplLCBEYXRhVHlwZXMpO1xyXG5cclxuY29uc3QgdXNlclF1ZXJpZXMgPSB7fTtcclxuXHJcbmNvbnN0IHVzZXJNdXRhdGlvbnMgPSB7XHJcbiAgY3JlYXRlVXNlcjogYXN5bmMgKHBhcmVudDogYW55LCB7IHVzZXJJbnB1dCB9OiBhbnkpID0+IHtcclxuICAgIGNvbnN0IHNjaGVtYSA9IEpvaS5vYmplY3Qoe1xyXG4gICAgICBmaXJzdE5hbWU6IEpvaS5zdHJpbmcoKS50cmltKCkucmVxdWlyZWQoKS5tZXNzYWdlcyh7XHJcbiAgICAgICAgXCJzdHJpbmcuZW1wdHlcIjogYEZpcnN0IG5hbWUgaXMgYSByZXF1aXJlZCBmaWVsZGAsXHJcbiAgICAgIH0pLFxyXG4gICAgICBsYXN0TmFtZTogSm9pLnN0cmluZygpLnRyaW0oKS5yZXF1aXJlZCgpLm1lc3NhZ2VzKHtcclxuICAgICAgICBcInN0cmluZy5lbXB0eVwiOiBgTGFzdCBuYW1lIGlzIGEgcmVxdWlyZWQgZmllbGRgLFxyXG4gICAgICB9KSxcclxuICAgICAgZW1haWw6IEpvaS5zdHJpbmcoKS5lbWFpbCgpLnJlcXVpcmVkKCkubWVzc2FnZXMoe1xyXG4gICAgICAgIFwic3RyaW5nLmVtcHR5XCI6IGBFbWFpbCBpcyBhIHJlcXVpcmVkIGZpZWxkYCxcclxuICAgICAgfSksXHJcbiAgICAgIHBhc3N3b3JkOiBKb2kuc3RyaW5nKCkudHJpbSgpLnJlcXVpcmVkKCkubWVzc2FnZXMoe1xyXG4gICAgICAgIFwic3RyaW5nLmVtcHR5XCI6IGBQYXNzd29yZCBpcyBhIHJlcXVpcmVkIGZpZWxkYCxcclxuICAgICAgfSksXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB7IGVycm9yLCB2YWx1ZSB9ID0gc2NoZW1hLnZhbGlkYXRlKHVzZXJJbnB1dCk7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IHsgbWVzc2FnZTogXCJcIiwgc3RhdHVzOiB0cnVlLCBlbXBsb3llZToge30gfTtcclxuXHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgbGV0IGVycm9ycyA9IGVycm9yLmRldGFpbHM7XHJcbiAgICAgIGVycm9ycy5tYXAoKGVycikgPT4ge1xyXG4gICAgICAgIHJlc3BvbnNlLm1lc3NhZ2UgPSBlcnIubWVzc2FnZTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJlc3BvbnNlLnN0YXR1cyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGV4aXN0aW5ndXNlciA9IGF3YWl0IFVzZXIuZmluZE9uZSh7XHJcbiAgICAgICAgd2hlcmU6IHsgZW1haWw6IHVzZXJJbnB1dC5lbWFpbCB9LFxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKGV4aXN0aW5ndXNlcikge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVzZXIgYWxyZWFkeSBleGlzdFwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBleGlzdGluZ0VtcGxveWVlID0gYXdhaXQgRW1wbG95ZWUuZmluZE9uZSh7XHJcbiAgICAgICAgICB3aGVyZTogeyBlbWFpbDogdXNlcklucHV0LmVtYWlsIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgaGFzaGVkUGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuaGFzaCh1c2VySW5wdXQucGFzc3dvcmQsIDEyKTtcclxuICAgICAgICBjb25zdCBuZXdVc2VyID0gYXdhaXQgVXNlci5jcmVhdGUoe1xyXG4gICAgICAgICAgZmlyc3ROYW1lOiB1c2VySW5wdXQuZmlyc3ROYW1lLFxyXG4gICAgICAgICAgbGFzdE5hbWU6IHVzZXJJbnB1dC5sYXN0TmFtZSxcclxuICAgICAgICAgIGVtYWlsOiB1c2VySW5wdXQuZW1haWwsXHJcbiAgICAgICAgICBwYXNzd29yZDogaGFzaGVkUGFzc3dvcmQsXHJcbiAgICAgICAgICBoYXNoS2V5OiBoYXNoZWRQYXNzd29yZCxcclxuICAgICAgICAgIGVtcGxveWVlSWQ6IGV4aXN0aW5nRW1wbG95ZWUgPyBleGlzdGluZ0VtcGxveWVlLmlkIDogbnVsbCxcclxuICAgICAgICAgIHN0YXR1czogXCJBY3RpdmVcIixcclxuICAgICAgICB9KTtcclxuICAgICAgICBuZXdVc2VyLnN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIG5ld1VzZXI7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRocm93IGVycm9yO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZVVzZXI6IGFzeW5jIChwYXJlbnQ6IGFueSwgeyB1c2VySWQsIHVzZXJJbnB1dCB9OiBhbnkpID0+IHtcclxuICAgIGNvbnN0IHNjaGVtYSA9IEpvaS5vYmplY3Qoe1xyXG4gICAgICBmaXJzdE5hbWU6IEpvaS5zdHJpbmcoKS50cmltKCkucmVxdWlyZWQoKS5tZXNzYWdlcyh7XHJcbiAgICAgICAgXCJzdHJpbmcuZW1wdHlcIjogYEZpcnN0IG5hbWUgaXMgYSByZXF1aXJlZCBmaWVsZGAsXHJcbiAgICAgIH0pLFxyXG4gICAgICBsYXN0TmFtZTogSm9pLnN0cmluZygpLnRyaW0oKS5yZXF1aXJlZCgpLm1lc3NhZ2VzKHtcclxuICAgICAgICBcInN0cmluZy5lbXB0eVwiOiBgTGFzdCBuYW1lIGlzIGEgcmVxdWlyZWQgZmllbGRgLFxyXG4gICAgICB9KSxcclxuICAgICAgZW1haWw6IEpvaS5zdHJpbmcoKS5lbWFpbCgpLnJlcXVpcmVkKCkubWVzc2FnZXMoe1xyXG4gICAgICAgIFwic3RyaW5nLmVtcHR5XCI6IGBFbWFpbCBpcyBhIHJlcXVpcmVkIGZpZWxkYCxcclxuICAgICAgfSksXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHsgZXJyb3IsIHZhbHVlIH0gPSBzY2hlbWEudmFsaWRhdGUodXNlcklucHV0KTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKHtcclxuICAgICAgICB3aGVyZTogeyBpZDogdXNlcklkIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIFVzZXJcIik7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgdXBkYXRlZFVzZXIgPSBhd2FpdCBVc2VyLnVwZGF0ZSh1c2VySW5wdXQsIHtcclxuICAgICAgICB3aGVyZTogeyBpZDogdXNlcklkIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdXBkYXRlZFVzZXI7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBkb0xvZ2luOiBhc3luYyAocGFyZW50OiBhbnksIHsgZW1haWwsIHBhc3N3b3JkIH06IGFueSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3Qgc2NoZW1hID0gSm9pLm9iamVjdCh7XHJcbiAgICAgICAgZW1haWw6IEpvaS5zdHJpbmcoKS5lbWFpbCgpLnJlcXVpcmVkKCkubWVzc2FnZXMoe1xyXG4gICAgICAgICAgXCJzdHJpbmcuZW1wdHlcIjogYEVtYWlsIGlzIGEgcmVxdWlyZWQgZmllbGRgLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHBhc3N3b3JkOiBKb2kuc3RyaW5nKCkudHJpbSgpLnJlcXVpcmVkKCkubWVzc2FnZXMoe1xyXG4gICAgICAgICAgXCJzdHJpbmcuZW1wdHlcIjogYFBhc3N3b3JkIGlzIGEgcmVxdWlyZWQgZmllbGRgLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICB9KTtcclxuICAgICAgY29uc3QgeyBlcnJvciB9ID0gc2NoZW1hLnZhbGlkYXRlKHsgZW1haWw6IGVtYWlsLCBwYXNzd29yZDogcGFzc3dvcmQgfSk7XHJcbiAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKHsgd2hlcmU6IHsgZW1haWwgfSB9KTtcclxuICAgICAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgVXNlcm5hbWVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNoZWNrUGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShwYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XHJcbiAgICAgICAgaWYgKCFjaGVja1Bhc3N3b3JkKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbmNvcnJlY3QgUGFzc3dvcmRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVzZXIudG9rZW4gPSBqd3Quc2lnbihcclxuICAgICAgICAgIHsgdXNlcklkOiB1c2VyLmlkIH0sXHJcbiAgICAgICAgICBgJHtwcm9jZXNzLmVudi5KV1RfU0VDUkVUfWAsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGV4cGlyZXNJbjogXCIxaFwiLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdXNlci5tZXNzYWdlID0gXCJTdWNjZXNzZnVsbHkgbG9nZ2VkIGluXCI7XHJcbiAgICAgICAgcmV0dXJuIHVzZXI7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgeyB1c2VyUXVlcmllcywgdXNlck11dGF0aW9ucyB9O1xyXG4iLCJpbXBvcnQgeyBncWwgfSBmcm9tIFwiYXBvbGxvLXNlcnZlci1sYW1iZGFcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBkZXBhcnRtZW50ID0gZ3FsYFxyXG4gIHR5cGUgUXVlcnkge1xyXG4gICAgZGVwYXJ0bWVudHM6IFtkZXBhcnRtZW50XVxyXG4gICAgZGVwYXJ0bWVudChkZXBhcnRtZW50SWQ6IEludCEpOiBkZXBhcnRtZW50XHJcbiAgfVxyXG5cclxuICB0eXBlIE11dGF0aW9uIHtcclxuICAgIGNyZWF0ZURlcGFydG1lbnQoZGVwYXJ0bWVudElucHV0OiBkZXBhcnRtZW50SW5wdXQhKTogZGVwYXJ0bWVudFJlc3BvbnNlIVxyXG4gICAgdXBkYXRlRGVwYXJ0bWVudChpZDogSUQhLCBkZXBhcnRtZW50SW5wdXQ6IGRlcGFydG1lbnRJbnB1dCk6IGRlcGFydG1lbnQhXHJcbiAgICBkZWxldGVEZXBhcnRtZW50KGlkOiBJRCEpOiByZXNwb25zZSFcclxuICB9XHJcblxyXG4gIHR5cGUgZGVwYXJ0bWVudCB7XHJcbiAgICBpZDogSUQhXHJcbiAgICBuYW1lOiBTdHJpbmchXHJcbiAgICBkZXNjcmlwdGlvbjogU3RyaW5nXHJcbiAgfVxyXG5cclxuICBpbnB1dCBkZXBhcnRtZW50SW5wdXQge1xyXG4gICAgbmFtZTogU3RyaW5nIVxyXG4gICAgZGVzY3JpcHRpb246IFN0cmluZ1xyXG4gIH1cclxuXHJcbiAgdHlwZSByZXNwb25zZSB7XHJcbiAgICBtZXNzYWdlOiBTdHJpbmchXHJcbiAgICBzdGF0dXM6IEJvb2xlYW5cclxuICB9XHJcblxyXG4gIHR5cGUgZGVwYXJ0bWVudFJlc3BvbnNlIHtcclxuICAgIGRlcGFydG1lbnQ6IGRlcGFydG1lbnRcclxuICAgIG1lc3NhZ2U6IFN0cmluZyFcclxuICAgIHN0YXR1czogQm9vbGVhblxyXG4gIH1cclxuYDtcclxuIiwiaW1wb3J0IHsgZ3FsIH0gZnJvbSBcImFwb2xsby1zZXJ2ZXItbGFtYmRhXCI7XHJcblxyXG5jb25zdCBlbXBsb3llZSA9IGdxbGBcclxuICB0eXBlIFF1ZXJ5IHtcclxuICAgIGVtcGxveWVlczogW2VtcGxveWVlXVxyXG4gICAgZW1wbG95ZWVzV2l0aFBhZ2luYXRpb24obGltaXQ6IEludCwgb2Zmc2V0OiBJbnQpOiBlbXBsb3llZURhdGFcclxuICB9XHJcblxyXG4gIHR5cGUgTXV0YXRpb24ge1xyXG4gICAgY3JlYXRlRW1wbG95ZWUoZW1wbG95ZWVJbnB1dDogZW1wbG95ZWVJbnB1dCEpOiBlbXBsb3llZVJlc3BvbnNlIVxyXG4gICAgdXBkYXRlRW1wbG95ZWUoXHJcbiAgICAgIGVtcGxveWVlSWQ6IElEIVxyXG4gICAgICBlbXBsb3llZUlucHV0OiBlbXBsb3llZUlucHV0XHJcbiAgICApOiBlbXBsb3llZVJlc3BvbnNlIVxyXG4gICAgZGVsZXRlRW1wbG95ZWUoZW1wbG95ZWVJZDogSUQhKTogcmVzcG9uc2VcclxuICB9XHJcblxyXG4gIHR5cGUgZW1wbG95ZWUge1xyXG4gICAgaWQ6IElEXHJcbiAgICBlbWFpbDogU3RyaW5nXHJcbiAgICBkZXNpZ25hdGlvbjogU3RyaW5nXHJcbiAgICBkZXBhcnRtZW50SWQ6IEludFxyXG4gICAgZGVwYXJ0bWVudDogZGVwYXJ0bWVudFxyXG4gIH1cclxuXHJcbiAgaW5wdXQgZW1wbG95ZWVJbnB1dCB7XHJcbiAgICBlbWFpbDogU3RyaW5nIVxyXG4gICAgZGVzaWduYXRpb246IFN0cmluZ1xyXG4gICAgZGVwYXJ0bWVudElkOiBJbnRcclxuICB9XHJcblxyXG4gIHR5cGUgcmVzcG9uc2Uge1xyXG4gICAgbWVzc2FnZTogU3RyaW5nXHJcbiAgICBzdGF0dXM6IEJvb2xlYW5cclxuICB9XHJcblxyXG4gIHR5cGUgZW1wbG95ZWVSZXNwb25zZSB7XHJcbiAgICBlbXBsb3llZTogZW1wbG95ZWVcclxuICAgIG1lc3NhZ2U6IFN0cmluZyFcclxuICAgIHN0YXR1czogQm9vbGVhblxyXG4gIH1cclxuXHJcbiAgdHlwZSBlbXBsb3llZURhdGEge1xyXG4gICAgZW1wbG95ZWVzOiBbZW1wbG95ZWVdXHJcbiAgICB0b3RhbFJvd3M6IEludFxyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGVtcGxveWVlO1xyXG4iLCJpbXBvcnQgeyBncWwgfSBmcm9tIFwiYXBvbGxvLXNlcnZlci1sYW1iZGFcIjtcclxuaW1wb3J0IHsgbWFrZUV4ZWN1dGFibGVTY2hlbWEgfSBmcm9tIFwiQGdyYXBocWwtdG9vbHMvc2NoZW1hXCI7XHJcbmltcG9ydCB7IGRlcGFydG1lbnQgfSBmcm9tIFwiLi9kZXBhcnRtZW50XCI7XHJcbmltcG9ydCByZXNvbHZlcnMgZnJvbSBcIi4uL3Jlc29sdmVyc1wiO1xyXG5pbXBvcnQgZW1wbG95ZWUgZnJvbSBcIi4vZW1wbG95ZWVcIjtcclxuaW1wb3J0IHVzZXIgZnJvbSBcIi4vdXNlclwiO1xyXG5cclxuY29uc3QgdHlwZXMgPSBbZGVwYXJ0bWVudCwgZW1wbG95ZWUsIHVzZXJdO1xyXG5cclxuY29uc3QgUXVlcnkgPSBncWxgXHJcbiAgdHlwZSBRdWVyeSB7XHJcbiAgICBfZW1wdHk6IFN0cmluZ1xyXG4gIH1cclxuYDtcclxuY29uc3QgTXV0YXRpb24gPSBncWxgXHJcbiAgdHlwZSBNdXRhdGlvbiB7XHJcbiAgICBfZW1wdHk6IFN0cmluZ1xyXG4gIH1cclxuYDtcclxuY29uc3Qgc2NoZW1hID0gbWFrZUV4ZWN1dGFibGVTY2hlbWEoe1xyXG4gIHR5cGVEZWZzOiBbUXVlcnksIE11dGF0aW9uLCAuLi50eXBlc10sXHJcbiAgcmVzb2x2ZXJzLFxyXG59KTtcclxuZXhwb3J0IGRlZmF1bHQgc2NoZW1hO1xyXG4iLCJpbXBvcnQgeyBncWwgfSBmcm9tIFwiYXBvbGxvLXNlcnZlci1sYW1iZGFcIjtcclxuXHJcbmNvbnN0IHVzZXIgPSBncWxgXHJcbiAgdHlwZSBNdXRhdGlvbiB7XHJcbiAgICBjcmVhdGVVc2VyKHVzZXJJbnB1dDogdXNlcklucHV0ISk6IHVzZXJJbmZvIVxyXG4gICAgdXBkYXRlVXNlcihpZDogSUQhLCB1c2VySW5wdXQ6IHVzZXJJbnB1dCEpOiB1c2VySW5mbyFcclxuICAgIGRvTG9naW4oZW1haWw6IFN0cmluZyEsIHBhc3N3b3JkOiBTdHJpbmchKTogdXNlckluZm9cclxuICB9XHJcblxyXG4gIHR5cGUgdXNlckluZm8ge1xyXG4gICAgaWQ6IElEIVxyXG4gICAgZmlyc3ROYW1lOiBTdHJpbmdcclxuICAgIGxhc3ROYW1lOiBTdHJpbmdcclxuICAgIGVtYWlsOiBTdHJpbmchXHJcbiAgICByb2xlOiBTdHJpbmdcclxuICAgIHN0YXR1czogU3RyaW5nIVxyXG4gICAgZW1wbG95ZWVJZDogSW50XHJcbiAgICBtZXNzYWdlOiBTdHJpbmdcclxuICAgIHRva2VuOiBTdHJpbmdcclxuICB9XHJcblxyXG4gIGlucHV0IHVzZXJJbnB1dCB7XHJcbiAgICBmaXJzdE5hbWU6IFN0cmluZ1xyXG4gICAgbGFzdE5hbWU6IFN0cmluZ1xyXG4gICAgZW1haWw6IFN0cmluZyFcclxuICAgIHBhc3N3b3JkOiBTdHJpbmchXHJcbiAgICByb2xlOiBTdHJpbmdcclxuICAgIGVtcGxveWVlSWQ6IEludFxyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVzZXI7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBncmFwaHFsLXRvb2xzL3NjaGVtYVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhcG9sbG8tc2VydmVyLWxhbWJkYVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRqc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiam9pXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJteXNxbDJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VxdWVsaXplXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcG9sbG8tc2VydmVyLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9