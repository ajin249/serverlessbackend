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
        const response = { departments: {} };
        try {
            response.departments = yield Department.findAll();
            return response;
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
                name: departmentInput.name,
            });
            const response = { message: "", status: false, department: {} };
            if (error) {
                let errors = error.details;
                errors.map((err) => {
                    response.message = err.message;
                });
                response.status = false;
            }
            else {
                console.log(departmentInput);
                const data = yield Department.update(departmentInput, {
                    where: { id: id },
                });
                if (parseInt(data) === 1) {
                    response.department = yield Department.findOne({ where: { id: id } });
                    response.status = true;
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
                user.status = true;
                user.message = "Successfully logged in";
                return user;
            }
        }
        catch (error) {
            console.log(error);
        }
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
    departments: deptList
    department(departmentId: Int!): department
  }

  type Mutation {
    createDepartment(departmentInput: departmentInput!): departmentResponse!
    updateDepartment(
      id: ID!
      departmentInput: departmentInput
    ): departmentResponse!
    deleteDepartment(id: ID!): response!
  }

  type deptList {
    departments: [department]
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
exports.employee = void 0;
const apollo_server_lambda_1 = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
exports.employee = (0, apollo_server_lambda_1.gql) `
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
const employee_1 = __webpack_require__(/*! ./employee */ "./src/schema/employee.ts");
const user_1 = __webpack_require__(/*! ./user */ "./src/schema/user.ts");
const types = [department_1.department, employee_1.employee, user_1.user];
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
exports.user = void 0;
const apollo_server_lambda_1 = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
exports.user = (0, apollo_server_lambda_1.gql) `
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
    status: Boolean!
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjL2Fwb2xsby1zZXJ2ZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDSEE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7QUNwQkE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7QUNyQkE7Ozs7O0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7O0FDdkNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTZFQTtBQTNFQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUdBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEyRUE7QUF6RUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUtBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3RJQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBS0E7QUFLQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQStIQTtBQTdIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUN6SUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdDQTs7Ozs7Ozs7Ozs7Ozs7QUMxQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0Q0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTs7OztBQUlBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDdkJBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJCQTs7Ozs7Ozs7Ozs7QUM3QkE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUV2QkE7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZWNoLWJhY2tlbmQvLi9zcmMvYXBvbGxvLXNlcnZlci50cyIsIndlYnBhY2s6Ly90ZWNoLWJhY2tlbmQvLi9zcmMvbW9kZWxzL3NxbC9kZXBhcnRtZW50LnRzIiwid2VicGFjazovL3RlY2gtYmFja2VuZC8uL3NyYy9tb2RlbHMvc3FsL2VtcGxveWVlLnRzIiwid2VicGFjazovL3RlY2gtYmFja2VuZC8uL3NyYy9tb2RlbHMvc3FsL2luZGV4LnRzIiwid2VicGFjazovL3RlY2gtYmFja2VuZC8uL3NyYy9tb2RlbHMvc3FsL3VzZXIudHMiLCJ3ZWJwYWNrOi8vdGVjaC1iYWNrZW5kLy4vc3JjL3Jlc29sdmVycy9kZXBhcnRtZW50LnRzIiwid2VicGFjazovL3RlY2gtYmFja2VuZC8uL3NyYy9yZXNvbHZlcnMvZW1wbG95ZWUudHMiLCJ3ZWJwYWNrOi8vdGVjaC1iYWNrZW5kLy4vc3JjL3Jlc29sdmVycy9pbmRleC50cyIsIndlYnBhY2s6Ly90ZWNoLWJhY2tlbmQvLi9zcmMvcmVzb2x2ZXJzL3VzZXIudHMiLCJ3ZWJwYWNrOi8vdGVjaC1iYWNrZW5kLy4vc3JjL3NjaGVtYS9kZXBhcnRtZW50LnRzIiwid2VicGFjazovL3RlY2gtYmFja2VuZC8uL3NyYy9zY2hlbWEvZW1wbG95ZWUudHMiLCJ3ZWJwYWNrOi8vdGVjaC1iYWNrZW5kLy4vc3JjL3NjaGVtYS9pbmRleC50cyIsIndlYnBhY2s6Ly90ZWNoLWJhY2tlbmQvLi9zcmMvc2NoZW1hL3VzZXIudHMiLCJ3ZWJwYWNrOi8vdGVjaC1iYWNrZW5kL2V4dGVybmFsIGNvbW1vbmpzIFwiQGdyYXBocWwtdG9vbHMvc2NoZW1hXCIiLCJ3ZWJwYWNrOi8vdGVjaC1iYWNrZW5kL2V4dGVybmFsIGNvbW1vbmpzIFwiYXBvbGxvLXNlcnZlci1sYW1iZGFcIiIsIndlYnBhY2s6Ly90ZWNoLWJhY2tlbmQvZXh0ZXJuYWwgY29tbW9uanMgXCJiY3J5cHRqc1wiIiwid2VicGFjazovL3RlY2gtYmFja2VuZC9leHRlcm5hbCBjb21tb25qcyBcImRvdGVudlwiIiwid2VicGFjazovL3RlY2gtYmFja2VuZC9leHRlcm5hbCBjb21tb25qcyBcImpvaVwiIiwid2VicGFjazovL3RlY2gtYmFja2VuZC9leHRlcm5hbCBjb21tb25qcyBcImpzb253ZWJ0b2tlblwiIiwid2VicGFjazovL3RlY2gtYmFja2VuZC9leHRlcm5hbCBjb21tb25qcyBcIm15c3FsMlwiIiwid2VicGFjazovL3RlY2gtYmFja2VuZC9leHRlcm5hbCBjb21tb25qcyBcInNlcXVlbGl6ZVwiIiwid2VicGFjazovL3RlY2gtYmFja2VuZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90ZWNoLWJhY2tlbmQvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90ZWNoLWJhY2tlbmQvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RlY2gtYmFja2VuZC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNjaGVtYSBmcm9tIFwiLi9zY2hlbWFcIjtcclxuY29uc3QgeyBBcG9sbG9TZXJ2ZXIgfSA9IHJlcXVpcmUoXCJhcG9sbG8tc2VydmVyLWxhbWJkYVwiKTtcclxuY29uc3QgYXBvbGxvU2VydmVyID0gbmV3IEFwb2xsb1NlcnZlcih7IHNjaGVtYSB9KTtcclxuZXhwb3J0IGNvbnN0IGdyYXBocWxIYW5kbGVyID0gYXBvbGxvU2VydmVyLmNyZWF0ZUhhbmRsZXIoKTtcclxuIiwiaW1wb3J0IHsgRGF0YVR5cGVzIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xyXG5jb25zdCBzZXF1ZWxpemUgPSByZXF1aXJlKFwiLi9pbmRleFwiKTtcclxuXHJcbmZ1bmN0aW9uIG1vZGVsKHNlcXVlbGl6ZTogYW55KSB7XHJcbiAgY29uc3QgYXR0cmlidXRlcyA9IHtcclxuICAgIGlkOiB7XHJcbiAgICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxyXG4gICAgICBhdXRvSW5jcmVtZW50OiB0cnVlLFxyXG4gICAgICBhbGxvd051bGw6IGZhbHNlLFxyXG4gICAgICBwcmltYXJ5S2V5OiB0cnVlLFxyXG4gICAgfSxcclxuICAgIG5hbWU6IHsgdHlwZTogRGF0YVR5cGVzLlNUUklORywgYWxsb3dOdWxsOiBmYWxzZSB9LFxyXG4gICAgZGVzY3JpcHRpb246IHsgdHlwZTogRGF0YVR5cGVzLlNUUklORywgYWxsb3dOdWxsOiB0cnVlIH0sXHJcbiAgICBjcmVhdGVkQXQ6IHsgdHlwZTogRGF0YVR5cGVzLkRBVEUgfSxcclxuICAgIHVwZGF0ZWRBdDogeyB0eXBlOiBEYXRhVHlwZXMuREFURSB9LFxyXG4gIH07XHJcbiAgY29uc3Qgb3B0aW9ucyA9IHt9O1xyXG4gIHJldHVybiBzZXF1ZWxpemUuZGVmaW5lKFwiZGVwYXJ0bWVudFwiLCBhdHRyaWJ1dGVzLCBvcHRpb25zKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtb2RlbDtcclxuIiwiaW1wb3J0IHsgRGF0YVR5cGVzIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xyXG5jb25zdCBzZXF1ZWxpemUgPSByZXF1aXJlKFwiLi9pbmRleFwiKTtcclxuXHJcbmZ1bmN0aW9uIG1vZGVsKHNlcXVlbGl6ZTogYW55KSB7XHJcbiAgY29uc3QgYXR0cmlidXRlcyA9IHtcclxuICAgIGlkOiB7XHJcbiAgICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxyXG4gICAgICBhdXRvSW5jcmVtZW50OiB0cnVlLFxyXG4gICAgICBhbGxvd051bGw6IGZhbHNlLFxyXG4gICAgICBwcmltYXJ5S2V5OiB0cnVlLFxyXG4gICAgfSxcclxuICAgIGVtYWlsOiB7IHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsIGFsbG93TnVsbDogZmFsc2UgfSxcclxuICAgIGRlc2lnbmF0aW9uOiB7IHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsIGFsbG93TnVsbDogZmFsc2UgfSxcclxuICAgIGRlcGFydG1lbnRJZDogeyB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUiwgYWxsb3dOdWxsOiBmYWxzZSB9LFxyXG4gICAgY3JlYXRlZEF0OiB7IHR5cGU6IERhdGFUeXBlcy5EQVRFIH0sXHJcbiAgICB1cGRhdGVkQXQ6IHsgdHlwZTogRGF0YVR5cGVzLkRBVEUgfSxcclxuICB9O1xyXG4gIGNvbnN0IG9wdGlvbnMgPSB7fTtcclxuICByZXR1cm4gc2VxdWVsaXplLmRlZmluZShcImVtcGxveWVlXCIsIGF0dHJpYnV0ZXMsIG9wdGlvbnMpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG1vZGVsO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuaW1wb3J0IHsgU2VxdWVsaXplIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xyXG5pbXBvcnQgbXlzcWwyIGZyb20gXCJteXNxbDJcIjtcclxuXHJcbmNvbnN0IGRvdGVudiA9IHJlcXVpcmUoXCJkb3RlbnZcIik7XHJcbmRvdGVudi5jb25maWcoKTtcclxuXHJcbmNvbnN0IGRiT3B0aW9uczogYW55ID0ge1xyXG4gIGRpYWxlY3Q6IFwibXlzcWxcIixcclxuICBkaWFsZWN0TW9kdWxlOiBteXNxbDIsXHJcbiAgaG9zdDogcHJvY2Vzcy5lbnYuREJfSE9TVCxcclxuICBwb3J0OiBwcm9jZXNzLmVudi5EQl9QT1JULFxyXG59O1xyXG5cclxuY29uc3QgZGI6IGFueSA9IHt9O1xyXG5sZXQgc2VxdWVsaXplOiBhbnk7XHJcbnNlcXVlbGl6ZSA9IG5ldyBTZXF1ZWxpemUoXHJcbiAgYCR7cHJvY2Vzcy5lbnYuREJfTkFNRX1gLFxyXG4gIGAke3Byb2Nlc3MuZW52LkRCX1VTRVJ9YCxcclxuICBgJHtwcm9jZXNzLmVudi5EQl9QQVNTfWAsXHJcbiAgZGJPcHRpb25zXHJcbik7XHJcblxyXG5zZXF1ZWxpemVcclxuICAuYXV0aGVudGljYXRlKClcclxuICAudGhlbigoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3RlZCB0byBEQlwiKTtcclxuICB9KVxyXG4gIC5jYXRjaChmdW5jdGlvbiAoZXJyOiBhbnkpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiREIgRXJyb3I6IFwiLCBlcnIpO1xyXG4gIH0pO1xyXG5cclxuc2VxdWVsaXplLnN5bmMoKS50aGVuKCgpID0+IHtcclxuICBjb25zb2xlLmxvZyhcInRhYmxlcyBtaWdyYXRlZFwiKTtcclxufSk7XHJcblxyXG5kYi5zZXF1ZWxpemUgPSBzZXF1ZWxpemU7XHJcbmRiLlNlcXVlbGl6ZSA9IFNlcXVlbGl6ZTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRiO1xyXG4iLCJpbXBvcnQgeyBEYXRhVHlwZXMgfSBmcm9tIFwic2VxdWVsaXplXCI7XHJcbmNvbnN0IHNlcXVlbGl6ZSA9IHJlcXVpcmUoXCIuL2luZGV4XCIpO1xyXG5cclxuZnVuY3Rpb24gbW9kZWwoc2VxdWVsaXplOiBhbnkpIHtcclxuICBjb25zdCBhdHRyaWJ1dGVzID0ge1xyXG4gICAgaWQ6IHtcclxuICAgICAgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXHJcbiAgICAgIGF1dG9JbmNyZW1lbnQ6IHRydWUsXHJcbiAgICAgIGFsbG93TnVsbDogZmFsc2UsXHJcbiAgICAgIHByaW1hcnlLZXk6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgZmlyc3ROYW1lOiB7IHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsIGFsbG93TnVsbDogZmFsc2UgfSxcclxuICAgIGxhc3ROYW1lOiB7IHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsIGFsbG93TnVsbDogdHJ1ZSB9LFxyXG4gICAgZW1haWw6IHsgdHlwZTogRGF0YVR5cGVzLlNUUklORywgYWxsb3dOdWxsOiBmYWxzZSB9LFxyXG4gICAgcGFzc3dvcmQ6IHsgdHlwZTogRGF0YVR5cGVzLlNUUklORywgYWxsb3dOdWxsOiBmYWxzZSB9LFxyXG4gICAgcm9sZToge1xyXG4gICAgICB0eXBlOiBEYXRhVHlwZXMuRU5VTShcImFkbWluXCIsIFwiZW1wbG95ZWVcIiwgXCJ1c2VyXCIpLFxyXG4gICAgICBkZWZhdWx0VmFsdWU6IFwidXNlclwiLFxyXG4gICAgfSxcclxuICAgIGhhc2hLZXk6IHsgdHlwZTogRGF0YVR5cGVzLlNUUklORywgYWxsb3dOdWxsOiBmYWxzZSB9LFxyXG4gICAgZW1wbG95ZWVJZDogeyB0eXBlOiBEYXRhVHlwZXMuSU5URUdFUiwgYWxsb3dOdWxsOiBmYWxzZSB9LFxyXG4gICAgc3RhdHVzOiB7IHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsIGFsbG93TnVsbDogZmFsc2UgfSxcclxuICAgIGNyZWF0ZWRBdDogeyB0eXBlOiBEYXRhVHlwZXMuREFURSB9LFxyXG4gICAgdXBkYXRlZEF0OiB7IHR5cGU6IERhdGFUeXBlcy5EQVRFIH0sXHJcbiAgfTtcclxuICBjb25zdCBvcHRpb25zID0ge307XHJcbiAgcmV0dXJuIHNlcXVlbGl6ZS5kZWZpbmUoXCJ1c2VyXCIsIGF0dHJpYnV0ZXMsIG9wdGlvbnMpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG1vZGVsO1xyXG4iLCJpbXBvcnQgZGIgZnJvbSBcIi4uL21vZGVscy9zcWxcIjtcclxuaW1wb3J0IHsgRGF0YVR5cGVzIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xyXG5pbXBvcnQgKiBhcyBKb2kgZnJvbSBcImpvaVwiO1xyXG5pbXBvcnQgeyByZXNwb25zZVBhdGhBc0FycmF5IH0gZnJvbSBcImdyYXBocWxcIjtcclxuXHJcbmNvbnN0IERlcGFydG1lbnQgPSByZXF1aXJlKFwiLi4vbW9kZWxzL3NxbC9kZXBhcnRtZW50XCIpKGRiLnNlcXVlbGl6ZSwgRGF0YVR5cGVzKTtcclxuXHJcbmNvbnN0IHNjaGVtYSA9IEpvaS5vYmplY3Qoe1xyXG4gIG5hbWU6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLm1lc3NhZ2VzKHtcclxuICAgIFwic3RyaW5nLmVtcHR5XCI6IGBOYW1lIGlzIGEgcmVxdWlyZWQgZmllbGRgLFxyXG4gIH0pLFxyXG59KTtcclxuXHJcbmNvbnN0IGRlcGFydG1lbnRRdWVyaWVzID0ge1xyXG4gIGRlcGFydG1lbnRzOiBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IHsgZGVwYXJ0bWVudHM6IHt9IH07XHJcbiAgICB0cnkge1xyXG4gICAgICByZXNwb25zZS5kZXBhcnRtZW50cyA9IGF3YWl0IERlcGFydG1lbnQuZmluZEFsbCgpO1xyXG4gICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZGVwYXJ0bWVudDogYXN5bmMgKHBhcmVudDogYW55LCB7IGRlcGFydG1lbnRJZCB9OiBhbnksIGNvbnRleHQ6IGFueSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgcmV0dXJuIGF3YWl0IERlcGFydG1lbnQuZmluZEJ5UGsoZGVwYXJ0bWVudElkKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiBlcnJvcjtcclxuICAgIH1cclxuICB9LFxyXG59O1xyXG5cclxuY29uc3QgZGVwYXJ0bWVudE11dGF0aW9ucyA9IHtcclxuICBjcmVhdGVEZXBhcnRtZW50OiBhc3luYyAoXHJcbiAgICBwYXJlbnQ6IGFueSxcclxuICAgIHsgZGVwYXJ0bWVudElucHV0IH06IGFueSxcclxuICAgIGNvbnRleHQ6IGFueVxyXG4gICkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBlcnJvciwgdmFsdWUgfSA9IHNjaGVtYS52YWxpZGF0ZSh7XHJcbiAgICAgICAgbmFtZTogZGVwYXJ0bWVudElucHV0Lm5hbWUsXHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IHsgbWVzc2FnZTogXCJcIiwgc3RhdHVzOiB0cnVlLCBkZXBhcnRtZW50OiB7fSB9O1xyXG4gICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICBsZXQgZXJyb3JzID0gZXJyb3IuZGV0YWlscztcclxuICAgICAgICBlcnJvcnMubWFwKChlcnIpID0+IHtcclxuICAgICAgICAgIHJlc3BvbnNlLm1lc3NhZ2UgPSBlcnIubWVzc2FnZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXNwb25zZS5zdGF0dXMgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNwb25zZS5tZXNzYWdlID0gXCJOZXcgRGVwYXJ0bWVudCBBZGRlZFwiO1xyXG4gICAgICAgIHJlc3BvbnNlLmRlcGFydG1lbnQgPSBhd2FpdCBEZXBhcnRtZW50LmNyZWF0ZShkZXBhcnRtZW50SW5wdXQpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRocm93IGVycm9yO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZURlcGFydG1lbnQ6IGFzeW5jIChcclxuICAgIHBhcmVudDogYW55LFxyXG4gICAgeyBpZCwgZGVwYXJ0bWVudElucHV0IH06IGFueSxcclxuICAgIGNvbnRleHQ6IGFueVxyXG4gICkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBlcnJvciwgdmFsdWUgfSA9IHNjaGVtYS52YWxpZGF0ZSh7XHJcbiAgICAgICAgbmFtZTogZGVwYXJ0bWVudElucHV0Lm5hbWUsXHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IHsgbWVzc2FnZTogXCJcIiwgc3RhdHVzOiBmYWxzZSwgZGVwYXJ0bWVudDoge30gfTtcclxuICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgbGV0IGVycm9ycyA9IGVycm9yLmRldGFpbHM7XHJcbiAgICAgICAgZXJyb3JzLm1hcCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICByZXNwb25zZS5tZXNzYWdlID0gZXJyLm1lc3NhZ2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmVzcG9uc2Uuc3RhdHVzID0gZmFsc2U7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGVwYXJ0bWVudElucHV0KTtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgRGVwYXJ0bWVudC51cGRhdGUoZGVwYXJ0bWVudElucHV0LCB7XHJcbiAgICAgICAgICB3aGVyZTogeyBpZDogaWQgfSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAocGFyc2VJbnQoZGF0YSkgPT09IDEpIHtcclxuICAgICAgICAgIHJlc3BvbnNlLmRlcGFydG1lbnQgPSBhd2FpdCBEZXBhcnRtZW50LmZpbmRPbmUoeyB3aGVyZTogeyBpZDogaWQgfSB9KTtcclxuICAgICAgICAgIHJlc3BvbnNlLnN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlc3BvbnNlLm1lc3NhZ2UgPSBcIkRlcGFydG1lbnQgZG9lc25vdCBleGlzdHNcIjtcclxuICAgICAgICAgIHJlc3BvbnNlLnN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZGVsZXRlRGVwYXJ0bWVudDogYXN5bmMgKHBhcmVudDogYW55LCB7IGlkIH06IGFueSwgY29udGV4dDogYW55KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgRGVwYXJ0bWVudC5kZXN0cm95KHsgd2hlcmU6IHsgaWQ6IGlkIH0gfSk7XHJcbiAgICAgIGlmIChwYXJzZUludChkYXRhKSA9PT0gMSkge1xyXG4gICAgICAgIHJldHVybiB7IG1lc3NhZ2U6IFwiRGVwYXJ0bWVudCBkZWxldGVkXCIsIHN0YXR1czogdHJ1ZSB9O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB7IG1lc3NhZ2U6IFwiSW52YWxpZCBEZXBhcnRtZW50XCIsIHN0YXR1czogZmFsc2UgfTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICB9XHJcbiAgfSxcclxufTtcclxuZXhwb3J0IHsgZGVwYXJ0bWVudFF1ZXJpZXMsIGRlcGFydG1lbnRNdXRhdGlvbnMgfTtcclxuIiwiaW1wb3J0IHsgRGF0YVR5cGVzIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xyXG5pbXBvcnQgZGIgZnJvbSBcIi4uL21vZGVscy9zcWxcIjtcclxuaW1wb3J0ICogYXMgSm9pIGZyb20gXCJqb2lcIjtcclxuXHJcbmNvbnN0IEVtcGxveWVlID0gcmVxdWlyZShcIi4uL21vZGVscy9zcWwvZW1wbG95ZWVcIikoZGIuc2VxdWVsaXplLCBEYXRhVHlwZXMpO1xyXG5jb25zdCBEZXBhcnRtZW50ID0gcmVxdWlyZShcIi4uL21vZGVscy9zcWwvZGVwYXJ0bWVudFwiKShkYi5zZXF1ZWxpemUsIERhdGFUeXBlcyk7XHJcblxyXG5FbXBsb3llZS5iZWxvbmdzVG8oRGVwYXJ0bWVudCwge1xyXG4gIGZvcmVpZ25LZXk6IFwiZGVwYXJ0bWVudElkXCIsXHJcbiAgYXM6IFwiZGVwYXJ0bWVudFwiLFxyXG59KTtcclxuXHJcbmNvbnN0IHNjaGVtYSA9IEpvaS5vYmplY3Qoe1xyXG4gIGVtYWlsOiBKb2kuc3RyaW5nKCkuZW1haWwoKS5yZXF1aXJlZCgpLm1lc3NhZ2VzKHtcclxuICAgIFwic3RyaW5nLmVtcHR5XCI6IGBFbWFpbCBpcyBhIHJlcXVpcmVkIGZpZWxkYCxcclxuICB9KSxcclxuICBkZXNpZ25hdGlvbjogSm9pLnJlcXVpcmVkKCkubWVzc2FnZXMoe1xyXG4gICAgXCJzdHJpbmcuZW1wdHlcIjogYERlc2lnbmF0aW9uIGlzIGEgcmVxdWlyZWQgZmllbGRgLFxyXG4gIH0pLFxyXG4gIGRlcGFydG1lbnRJZDogSm9pLnJlcXVpcmVkKCkubWVzc2FnZXMoe1xyXG4gICAgXCJzdHJpbmcuZW1wdHlcIjogYERlcGFydG1lbnQgaXMgYSByZXF1aXJlZCBmaWVsZGAsXHJcbiAgfSksXHJcbn0pO1xyXG5cclxuY29uc3QgZW1wbG95ZWVRdWVyaWVzID0ge1xyXG4gIGVtcGxveWVlczogYXN5bmMgKHBhcmVudDogYW55LCB7fTogYW55LCBjb250ZXh0OiBhbnkpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJldHVybiBhd2FpdCBFbXBsb3llZS5maW5kQWxsKHtcclxuICAgICAgICBpbmNsdWRlOiBbeyBtb2RlbDogRGVwYXJ0bWVudCwgYXM6IFwiZGVwYXJ0bWVudFwiIH1dLFxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiBlcnJvcjtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBlbXBsb3llZXNXaXRoUGFnaW5hdGlvbjogYXN5bmMgKFxyXG4gICAgcGFyZW50OiBhbnksXHJcbiAgICB7IGxpbWl0LCBvZmZzZXQgfTogYW55LFxyXG4gICAgY29udGV4dDogYW55XHJcbiAgKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBlbXBsb3llZXMgPSBhd2FpdCBFbXBsb3llZS5maW5kQW5kQ291bnRBbGwoe1xyXG4gICAgICAgIGluY2x1ZGU6IFt7IG1vZGVsOiBEZXBhcnRtZW50LCBhczogXCJkZXBhcnRtZW50XCIgfV0sXHJcbiAgICAgICAgbGltaXQsXHJcbiAgICAgICAgb2Zmc2V0OiBsaW1pdCAqIG9mZnNldCxcclxuICAgICAgfSk7XHJcbiAgICAgIGlmICghZW1wbG95ZWVzKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRW1wbG95ZWVzIGRvZXMgbm90IGV4aXN0XCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCByZXNwb25zZSA9IHt9O1xyXG4gICAgICBpZiAoZW1wbG95ZWVzLmNvdW50ID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIChyZXNwb25zZSA9IHsgdG90YWxSb3dzOiAwLCBlbXBsb3llZXM6IGVtcGxveWVlcy5yb3dzIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJlc3BvbnNlID0geyB0b3RhbFJvd3M6IGVtcGxveWVlcy5jb3VudCB8fCAwLCBlbXBsb3llZXM6IGVtcGxveWVlcy5yb3dzIH07XHJcbiAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiBlcnJvcjtcclxuICAgIH1cclxuICB9LFxyXG59O1xyXG5cclxuY29uc3QgZW1wbG95ZWVNdXRhdGlvbnMgPSB7XHJcbiAgY3JlYXRlRW1wbG95ZWU6IGFzeW5jIChwYXJlbnQ6IGFueSwgeyBlbXBsb3llZUlucHV0IH06IGFueSwgY29udGV4dDogYW55KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IGVycm9yLCB2YWx1ZSB9ID0gc2NoZW1hLnZhbGlkYXRlKHtcclxuICAgICAgICAuLi5lbXBsb3llZUlucHV0LFxyXG4gICAgICB9KTtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSB7IG1lc3NhZ2U6IFwiXCIsIHN0YXR1czogdHJ1ZSwgZW1wbG95ZWU6IHt9IH07XHJcbiAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgIGxldCBlcnJvcnMgPSBlcnJvci5kZXRhaWxzO1xyXG4gICAgICAgIGVycm9ycy5tYXAoKGVycikgPT4ge1xyXG4gICAgICAgICAgcmVzcG9uc2UubWVzc2FnZSA9IGVyci5tZXNzYWdlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJlc3BvbnNlLnN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3BvbnNlLm1lc3NhZ2UgPSBcIk5ldyBlbXBsb3llZSBhZGRlZC4uXCI7XHJcbiAgICAgICAgcmVzcG9uc2UuZW1wbG95ZWUgPSBhd2FpdCBFbXBsb3llZS5jcmVhdGUoZW1wbG95ZWVJbnB1dCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIGVycm9yO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZUVtcGxveWVlOiBhc3luYyAoXHJcbiAgICBwYXJlbnQ6IGFueSxcclxuICAgIHsgZW1wbG95ZWVJZCwgZW1wbG95ZWVJbnB1dCB9OiBhbnksXHJcbiAgICBjb250ZXh0OiBhbnlcclxuICApID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgZXJyb3IsIHZhbHVlIH0gPSBzY2hlbWEudmFsaWRhdGUoe1xyXG4gICAgICAgIC4uLmVtcGxveWVlSW5wdXQsXHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IHsgbWVzc2FnZTogXCJcIiwgc3RhdHVzOiB0cnVlLCBlbXBsb3llZToge30gfTtcclxuICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgbGV0IGVycm9ycyA9IGVycm9yLmRldGFpbHM7XHJcbiAgICAgICAgZXJyb3JzLm1hcCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICByZXNwb25zZS5tZXNzYWdlID0gZXJyLm1lc3NhZ2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmVzcG9uc2Uuc3RhdHVzID0gZmFsc2U7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IEVtcGxveWVlLnVwZGF0ZShlbXBsb3llZUlucHV0LCB7XHJcbiAgICAgICAgICB3aGVyZTogeyBpZDogZW1wbG95ZWVJZCB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChwYXJzZUludChkYXRhKSA9PT0gMSkge1xyXG4gICAgICAgICAgcmVzcG9uc2UuZW1wbG95ZWUgPSBhd2FpdCBFbXBsb3llZS5maW5kT25lKHtcclxuICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IGVtcGxveWVlSWQgfSxcclxuICAgICAgICAgICAgaW5jbHVkZTogW3sgbW9kZWw6IERlcGFydG1lbnQsIGFzOiBcImRlcGFydG1lbnRcIiB9XSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmVzcG9uc2UubWVzc2FnZSA9IFwiRW1wbG95ZWUgdXBkYXRlZC4uXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlc3BvbnNlLm1lc3NhZ2UgPSBcIkVtcGxveWVlIGRvZXNub3QgZXhpc3RzXCI7XHJcbiAgICAgICAgICByZXNwb25zZS5zdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIGVycm9yO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGRlbGV0ZUVtcGxveWVlOiBhc3luYyAocGFyZW50OiBhbnksIHsgZW1wbG95ZWVJZCB9OiBhbnksIGNvbnRleHQ6IGFueSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IEVtcGxveWVlLmRlc3Ryb3koeyB3aGVyZTogeyBpZDogZW1wbG95ZWVJZCB9IH0pO1xyXG4gICAgICBpZiAocGFyc2VJbnQoZGF0YSkgPT09IDEpIHtcclxuICAgICAgICByZXR1cm4geyBtZXNzYWdlOiBcIkVtcGxveWVlIGRlbGV0ZWQuLlwiLCBzdGF0dXM6IHRydWUgfTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4geyBtZXNzYWdlOiBcIkNvdWxkbid0IGZvdW5kIHRoZSBlbXBsb3llZVwiLCBzdGF0dXM6IGZhbHNlIH07XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRocm93IGVycm9yO1xyXG4gICAgfVxyXG4gIH0sXHJcbn07XHJcbmV4cG9ydCB7IGVtcGxveWVlUXVlcmllcywgZW1wbG95ZWVNdXRhdGlvbnMgfTtcclxuIiwiaW1wb3J0IHsgZGVwYXJ0bWVudE11dGF0aW9ucywgZGVwYXJ0bWVudFF1ZXJpZXMgfSBmcm9tIFwiLi9kZXBhcnRtZW50XCI7XHJcbmltcG9ydCB7IGVtcGxveWVlUXVlcmllcywgZW1wbG95ZWVNdXRhdGlvbnMgfSBmcm9tIFwiLi9lbXBsb3llZVwiO1xyXG5pbXBvcnQgeyB1c2VyTXV0YXRpb25zLCB1c2VyUXVlcmllcyB9IGZyb20gXCIuL3VzZXJcIjtcclxuXHJcbmNvbnN0IHJlc29sdmVycyA9IHtcclxuICBRdWVyeToge1xyXG4gICAgLi4uZGVwYXJ0bWVudFF1ZXJpZXMsXHJcbiAgICAuLi5lbXBsb3llZVF1ZXJpZXMsXHJcbiAgICAuLi51c2VyUXVlcmllcyxcclxuICB9LFxyXG4gIE11dGF0aW9uOiB7XHJcbiAgICAuLi5kZXBhcnRtZW50TXV0YXRpb25zLFxyXG4gICAgLi4uZW1wbG95ZWVNdXRhdGlvbnMsXHJcbiAgICAuLi51c2VyTXV0YXRpb25zLFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCByZXNvbHZlcnM7XHJcbiIsImltcG9ydCB7IGRlcGFydG1lbnQgfSBmcm9tIFwiLi8uLi9zY2hlbWEvZGVwYXJ0bWVudFwiO1xyXG5pbXBvcnQgZGIgZnJvbSBcIi4uL21vZGVscy9zcWxcIjtcclxuaW1wb3J0IHsgRGF0YVR5cGVzIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xyXG5pbXBvcnQgKiBhcyBKb2kgZnJvbSBcImpvaVwiO1xyXG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRqc1wiO1xyXG5pbXBvcnQgand0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcclxuXHJcbmNvbnN0IFVzZXIgPSByZXF1aXJlKFwiLi4vbW9kZWxzL3NxbC91c2VyXCIpKGRiLnNlcXVlbGl6ZSwgRGF0YVR5cGVzKTtcclxuY29uc3QgRW1wbG95ZWUgPSByZXF1aXJlKFwiLi4vbW9kZWxzL3NxbC9lbXBsb3llZVwiKShkYi5zZXF1ZWxpemUsIERhdGFUeXBlcyk7XHJcblxyXG5jb25zdCB1c2VyUXVlcmllcyA9IHt9O1xyXG5cclxuY29uc3QgdXNlck11dGF0aW9ucyA9IHtcclxuICBjcmVhdGVVc2VyOiBhc3luYyAocGFyZW50OiBhbnksIHsgdXNlcklucHV0IH06IGFueSkgPT4ge1xyXG4gICAgY29uc3Qgc2NoZW1hID0gSm9pLm9iamVjdCh7XHJcbiAgICAgIGZpcnN0TmFtZTogSm9pLnN0cmluZygpLnRyaW0oKS5yZXF1aXJlZCgpLm1lc3NhZ2VzKHtcclxuICAgICAgICBcInN0cmluZy5lbXB0eVwiOiBgRmlyc3QgbmFtZSBpcyBhIHJlcXVpcmVkIGZpZWxkYCxcclxuICAgICAgfSksXHJcbiAgICAgIGxhc3ROYW1lOiBKb2kuc3RyaW5nKCkudHJpbSgpLnJlcXVpcmVkKCkubWVzc2FnZXMoe1xyXG4gICAgICAgIFwic3RyaW5nLmVtcHR5XCI6IGBMYXN0IG5hbWUgaXMgYSByZXF1aXJlZCBmaWVsZGAsXHJcbiAgICAgIH0pLFxyXG4gICAgICBlbWFpbDogSm9pLnN0cmluZygpLmVtYWlsKCkucmVxdWlyZWQoKS5tZXNzYWdlcyh7XHJcbiAgICAgICAgXCJzdHJpbmcuZW1wdHlcIjogYEVtYWlsIGlzIGEgcmVxdWlyZWQgZmllbGRgLFxyXG4gICAgICB9KSxcclxuICAgICAgcGFzc3dvcmQ6IEpvaS5zdHJpbmcoKS50cmltKCkucmVxdWlyZWQoKS5tZXNzYWdlcyh7XHJcbiAgICAgICAgXCJzdHJpbmcuZW1wdHlcIjogYFBhc3N3b3JkIGlzIGEgcmVxdWlyZWQgZmllbGRgLFxyXG4gICAgICB9KSxcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHsgZXJyb3IsIHZhbHVlIH0gPSBzY2hlbWEudmFsaWRhdGUodXNlcklucHV0KTtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0geyBtZXNzYWdlOiBcIlwiLCBzdGF0dXM6IHRydWUsIGVtcGxveWVlOiB7fSB9O1xyXG5cclxuICAgIGlmIChlcnJvcikge1xyXG4gICAgICBsZXQgZXJyb3JzID0gZXJyb3IuZGV0YWlscztcclxuICAgICAgZXJyb3JzLm1hcCgoZXJyKSA9PiB7XHJcbiAgICAgICAgcmVzcG9uc2UubWVzc2FnZSA9IGVyci5tZXNzYWdlO1xyXG4gICAgICB9KTtcclxuICAgICAgcmVzcG9uc2Uuc3RhdHVzID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgZXhpc3Rpbmd1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKHtcclxuICAgICAgICB3aGVyZTogeyBlbWFpbDogdXNlcklucHV0LmVtYWlsIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoZXhpc3Rpbmd1c2VyKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVXNlciBhbHJlYWR5IGV4aXN0XCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nRW1wbG95ZWUgPSBhd2FpdCBFbXBsb3llZS5maW5kT25lKHtcclxuICAgICAgICAgIHdoZXJlOiB7IGVtYWlsOiB1c2VySW5wdXQuZW1haWwgfSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBoYXNoZWRQYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5oYXNoKHVzZXJJbnB1dC5wYXNzd29yZCwgMTIpO1xyXG4gICAgICAgIGNvbnN0IG5ld1VzZXIgPSBhd2FpdCBVc2VyLmNyZWF0ZSh7XHJcbiAgICAgICAgICBmaXJzdE5hbWU6IHVzZXJJbnB1dC5maXJzdE5hbWUsXHJcbiAgICAgICAgICBsYXN0TmFtZTogdXNlcklucHV0Lmxhc3ROYW1lLFxyXG4gICAgICAgICAgZW1haWw6IHVzZXJJbnB1dC5lbWFpbCxcclxuICAgICAgICAgIHBhc3N3b3JkOiBoYXNoZWRQYXNzd29yZCxcclxuICAgICAgICAgIGhhc2hLZXk6IGhhc2hlZFBhc3N3b3JkLFxyXG4gICAgICAgICAgZW1wbG95ZWVJZDogZXhpc3RpbmdFbXBsb3llZSA/IGV4aXN0aW5nRW1wbG95ZWUuaWQgOiBudWxsLFxyXG4gICAgICAgICAgc3RhdHVzOiBcIkFjdGl2ZVwiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG5ld1VzZXIuc3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gbmV3VXNlcjtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlVXNlcjogYXN5bmMgKHBhcmVudDogYW55LCB7IHVzZXJJZCwgdXNlcklucHV0IH06IGFueSkgPT4ge1xyXG4gICAgY29uc3Qgc2NoZW1hID0gSm9pLm9iamVjdCh7XHJcbiAgICAgIGZpcnN0TmFtZTogSm9pLnN0cmluZygpLnRyaW0oKS5yZXF1aXJlZCgpLm1lc3NhZ2VzKHtcclxuICAgICAgICBcInN0cmluZy5lbXB0eVwiOiBgRmlyc3QgbmFtZSBpcyBhIHJlcXVpcmVkIGZpZWxkYCxcclxuICAgICAgfSksXHJcbiAgICAgIGxhc3ROYW1lOiBKb2kuc3RyaW5nKCkudHJpbSgpLnJlcXVpcmVkKCkubWVzc2FnZXMoe1xyXG4gICAgICAgIFwic3RyaW5nLmVtcHR5XCI6IGBMYXN0IG5hbWUgaXMgYSByZXF1aXJlZCBmaWVsZGAsXHJcbiAgICAgIH0pLFxyXG4gICAgICBlbWFpbDogSm9pLnN0cmluZygpLmVtYWlsKCkucmVxdWlyZWQoKS5tZXNzYWdlcyh7XHJcbiAgICAgICAgXCJzdHJpbmcuZW1wdHlcIjogYEVtYWlsIGlzIGEgcmVxdWlyZWQgZmllbGRgLFxyXG4gICAgICB9KSxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgeyBlcnJvciwgdmFsdWUgfSA9IHNjaGVtYS52YWxpZGF0ZSh1c2VySW5wdXQpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoe1xyXG4gICAgICAgIHdoZXJlOiB7IGlkOiB1c2VySWQgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIGlmICghdXNlcikge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgVXNlclwiKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB1cGRhdGVkVXNlciA9IGF3YWl0IFVzZXIudXBkYXRlKHVzZXJJbnB1dCwge1xyXG4gICAgICAgIHdoZXJlOiB7IGlkOiB1c2VySWQgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB1cGRhdGVkVXNlcjtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRocm93IGVycm9yO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGRvTG9naW46IGFzeW5jIChwYXJlbnQ6IGFueSwgeyBlbWFpbCwgcGFzc3dvcmQgfTogYW55KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBzY2hlbWEgPSBKb2kub2JqZWN0KHtcclxuICAgICAgICBlbWFpbDogSm9pLnN0cmluZygpLmVtYWlsKCkucmVxdWlyZWQoKS5tZXNzYWdlcyh7XHJcbiAgICAgICAgICBcInN0cmluZy5lbXB0eVwiOiBgRW1haWwgaXMgYSByZXF1aXJlZCBmaWVsZGAsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgcGFzc3dvcmQ6IEpvaS5zdHJpbmcoKS50cmltKCkucmVxdWlyZWQoKS5tZXNzYWdlcyh7XHJcbiAgICAgICAgICBcInN0cmluZy5lbXB0eVwiOiBgUGFzc3dvcmQgaXMgYSByZXF1aXJlZCBmaWVsZGAsXHJcbiAgICAgICAgfSksXHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCB7IGVycm9yIH0gPSBzY2hlbWEudmFsaWRhdGUoeyBlbWFpbDogZW1haWwsIHBhc3N3b3JkOiBwYXNzd29yZCB9KTtcclxuICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoeyB3aGVyZTogeyBlbWFpbCB9IH0pO1xyXG4gICAgICAgIGlmICghdXNlcikge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBVc2VybmFtZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY2hlY2tQYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKTtcclxuICAgICAgICBpZiAoIWNoZWNrUGFzc3dvcmQpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkluY29ycmVjdCBQYXNzd29yZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdXNlci50b2tlbiA9IGp3dC5zaWduKFxyXG4gICAgICAgICAgeyB1c2VySWQ6IHVzZXIuaWQgfSxcclxuICAgICAgICAgIGAke3Byb2Nlc3MuZW52LkpXVF9TRUNSRVR9YCxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgZXhwaXJlc0luOiBcIjFoXCIsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICB1c2VyLnN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgdXNlci5tZXNzYWdlID0gXCJTdWNjZXNzZnVsbHkgbG9nZ2VkIGluXCI7XHJcbiAgICAgICAgcmV0dXJuIHVzZXI7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIH1cclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IHsgdXNlclF1ZXJpZXMsIHVzZXJNdXRhdGlvbnMgfTtcclxuIiwiaW1wb3J0IHsgZ3FsIH0gZnJvbSBcImFwb2xsby1zZXJ2ZXItbGFtYmRhXCI7XHJcblxyXG5leHBvcnQgY29uc3QgZGVwYXJ0bWVudCA9IGdxbGBcclxuICB0eXBlIFF1ZXJ5IHtcclxuICAgIGRlcGFydG1lbnRzOiBkZXB0TGlzdFxyXG4gICAgZGVwYXJ0bWVudChkZXBhcnRtZW50SWQ6IEludCEpOiBkZXBhcnRtZW50XHJcbiAgfVxyXG5cclxuICB0eXBlIE11dGF0aW9uIHtcclxuICAgIGNyZWF0ZURlcGFydG1lbnQoZGVwYXJ0bWVudElucHV0OiBkZXBhcnRtZW50SW5wdXQhKTogZGVwYXJ0bWVudFJlc3BvbnNlIVxyXG4gICAgdXBkYXRlRGVwYXJ0bWVudChcclxuICAgICAgaWQ6IElEIVxyXG4gICAgICBkZXBhcnRtZW50SW5wdXQ6IGRlcGFydG1lbnRJbnB1dFxyXG4gICAgKTogZGVwYXJ0bWVudFJlc3BvbnNlIVxyXG4gICAgZGVsZXRlRGVwYXJ0bWVudChpZDogSUQhKTogcmVzcG9uc2UhXHJcbiAgfVxyXG5cclxuICB0eXBlIGRlcHRMaXN0IHtcclxuICAgIGRlcGFydG1lbnRzOiBbZGVwYXJ0bWVudF1cclxuICB9XHJcblxyXG4gIHR5cGUgZGVwYXJ0bWVudCB7XHJcbiAgICBpZDogSUQhXHJcbiAgICBuYW1lOiBTdHJpbmchXHJcbiAgICBkZXNjcmlwdGlvbjogU3RyaW5nXHJcbiAgfVxyXG5cclxuICBpbnB1dCBkZXBhcnRtZW50SW5wdXQge1xyXG4gICAgbmFtZTogU3RyaW5nIVxyXG4gICAgZGVzY3JpcHRpb246IFN0cmluZ1xyXG4gIH1cclxuXHJcbiAgdHlwZSByZXNwb25zZSB7XHJcbiAgICBtZXNzYWdlOiBTdHJpbmchXHJcbiAgICBzdGF0dXM6IEJvb2xlYW5cclxuICB9XHJcblxyXG4gIHR5cGUgZGVwYXJ0bWVudFJlc3BvbnNlIHtcclxuICAgIGRlcGFydG1lbnQ6IGRlcGFydG1lbnRcclxuICAgIG1lc3NhZ2U6IFN0cmluZyFcclxuICAgIHN0YXR1czogQm9vbGVhblxyXG4gIH1cclxuYDtcclxuIiwiaW1wb3J0IHsgZ3FsIH0gZnJvbSBcImFwb2xsby1zZXJ2ZXItbGFtYmRhXCI7XHJcblxyXG5leHBvcnQgY29uc3QgZW1wbG95ZWUgPSBncWxgXHJcbiAgdHlwZSBRdWVyeSB7XHJcbiAgICBlbXBsb3llZXM6IFtlbXBsb3llZV1cclxuICAgIGVtcGxveWVlc1dpdGhQYWdpbmF0aW9uKGxpbWl0OiBJbnQsIG9mZnNldDogSW50KTogZW1wbG95ZWVEYXRhXHJcbiAgfVxyXG5cclxuICB0eXBlIE11dGF0aW9uIHtcclxuICAgIGNyZWF0ZUVtcGxveWVlKGVtcGxveWVlSW5wdXQ6IGVtcGxveWVlSW5wdXQhKTogZW1wbG95ZWVSZXNwb25zZSFcclxuICAgIHVwZGF0ZUVtcGxveWVlKFxyXG4gICAgICBlbXBsb3llZUlkOiBJRCFcclxuICAgICAgZW1wbG95ZWVJbnB1dDogZW1wbG95ZWVJbnB1dFxyXG4gICAgKTogZW1wbG95ZWVSZXNwb25zZSFcclxuICAgIGRlbGV0ZUVtcGxveWVlKGVtcGxveWVlSWQ6IElEISk6IHJlc3BvbnNlXHJcbiAgfVxyXG5cclxuICB0eXBlIGVtcGxveWVlIHtcclxuICAgIGlkOiBJRFxyXG4gICAgZW1haWw6IFN0cmluZ1xyXG4gICAgZGVzaWduYXRpb246IFN0cmluZ1xyXG4gICAgZGVwYXJ0bWVudElkOiBJbnRcclxuICAgIGRlcGFydG1lbnQ6IGRlcGFydG1lbnRcclxuICB9XHJcblxyXG4gIGlucHV0IGVtcGxveWVlSW5wdXQge1xyXG4gICAgZW1haWw6IFN0cmluZyFcclxuICAgIGRlc2lnbmF0aW9uOiBTdHJpbmdcclxuICAgIGRlcGFydG1lbnRJZDogSW50XHJcbiAgfVxyXG5cclxuICB0eXBlIHJlc3BvbnNlIHtcclxuICAgIG1lc3NhZ2U6IFN0cmluZ1xyXG4gICAgc3RhdHVzOiBCb29sZWFuXHJcbiAgfVxyXG5cclxuICB0eXBlIGVtcGxveWVlUmVzcG9uc2Uge1xyXG4gICAgZW1wbG95ZWU6IGVtcGxveWVlXHJcbiAgICBtZXNzYWdlOiBTdHJpbmchXHJcbiAgICBzdGF0dXM6IEJvb2xlYW5cclxuICB9XHJcblxyXG4gIHR5cGUgZW1wbG95ZWVEYXRhIHtcclxuICAgIGVtcGxveWVlczogW2VtcGxveWVlXVxyXG4gICAgdG90YWxSb3dzOiBJbnRcclxuICB9XHJcbmA7XHJcbiIsImltcG9ydCB7IGdxbCB9IGZyb20gXCJhcG9sbG8tc2VydmVyLWxhbWJkYVwiO1xyXG5pbXBvcnQgeyBtYWtlRXhlY3V0YWJsZVNjaGVtYSB9IGZyb20gXCJAZ3JhcGhxbC10b29scy9zY2hlbWFcIjtcclxuaW1wb3J0IHsgZGVwYXJ0bWVudCB9IGZyb20gXCIuL2RlcGFydG1lbnRcIjtcclxuaW1wb3J0IHJlc29sdmVycyBmcm9tIFwiLi4vcmVzb2x2ZXJzXCI7XHJcbmltcG9ydCB7IGVtcGxveWVlIH0gZnJvbSBcIi4vZW1wbG95ZWVcIjtcclxuaW1wb3J0IHsgdXNlciB9IGZyb20gXCIuL3VzZXJcIjtcclxuXHJcbmNvbnN0IHR5cGVzID0gW2RlcGFydG1lbnQsIGVtcGxveWVlLCB1c2VyXTtcclxuXHJcbmNvbnN0IFF1ZXJ5ID0gZ3FsYFxyXG4gIHR5cGUgUXVlcnkge1xyXG4gICAgX2VtcHR5OiBTdHJpbmdcclxuICB9XHJcbmA7XHJcbmNvbnN0IE11dGF0aW9uID0gZ3FsYFxyXG4gIHR5cGUgTXV0YXRpb24ge1xyXG4gICAgX2VtcHR5OiBTdHJpbmdcclxuICB9XHJcbmA7XHJcbmNvbnN0IHNjaGVtYSA9IG1ha2VFeGVjdXRhYmxlU2NoZW1hKHtcclxuICB0eXBlRGVmczogW1F1ZXJ5LCBNdXRhdGlvbiwgLi4udHlwZXNdLFxyXG4gIHJlc29sdmVycyxcclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IHNjaGVtYTtcclxuIiwiaW1wb3J0IHsgZ3FsIH0gZnJvbSBcImFwb2xsby1zZXJ2ZXItbGFtYmRhXCI7XHJcblxyXG5leHBvcnQgY29uc3QgdXNlciA9IGdxbGBcclxuICB0eXBlIE11dGF0aW9uIHtcclxuICAgIGNyZWF0ZVVzZXIodXNlcklucHV0OiB1c2VySW5wdXQhKTogdXNlckluZm8hXHJcbiAgICB1cGRhdGVVc2VyKGlkOiBJRCEsIHVzZXJJbnB1dDogdXNlcklucHV0ISk6IHVzZXJJbmZvIVxyXG4gICAgZG9Mb2dpbihlbWFpbDogU3RyaW5nISwgcGFzc3dvcmQ6IFN0cmluZyEpOiB1c2VySW5mb1xyXG4gIH1cclxuXHJcbiAgdHlwZSB1c2VySW5mbyB7XHJcbiAgICBpZDogSUQhXHJcbiAgICBmaXJzdE5hbWU6IFN0cmluZ1xyXG4gICAgbGFzdE5hbWU6IFN0cmluZ1xyXG4gICAgZW1haWw6IFN0cmluZyFcclxuICAgIHJvbGU6IFN0cmluZ1xyXG4gICAgc3RhdHVzOiBCb29sZWFuIVxyXG4gICAgZW1wbG95ZWVJZDogSW50XHJcbiAgICBtZXNzYWdlOiBTdHJpbmdcclxuICAgIHRva2VuOiBTdHJpbmdcclxuICB9XHJcblxyXG4gIGlucHV0IHVzZXJJbnB1dCB7XHJcbiAgICBmaXJzdE5hbWU6IFN0cmluZ1xyXG4gICAgbGFzdE5hbWU6IFN0cmluZ1xyXG4gICAgZW1haWw6IFN0cmluZyFcclxuICAgIHBhc3N3b3JkOiBTdHJpbmchXHJcbiAgICByb2xlOiBTdHJpbmdcclxuICAgIGVtcGxveWVlSWQ6IEludFxyXG4gIH1cclxuYDtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGdyYXBocWwtdG9vbHMvc2NoZW1hXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFwb2xsby1zZXJ2ZXItbGFtYmRhXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJjcnlwdGpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvdGVudlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqb2lcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianNvbndlYnRva2VuXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm15c3FsMlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2Fwb2xsby1zZXJ2ZXIudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=