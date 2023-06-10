"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const DB_Connection_1 = require("./utils/DB_Connection");
const dotenv = __importStar(require("dotenv"));
const Car_Routes_1 = require("./Router/Car_Routes");
const cors_1 = __importDefault(require("cors"));
const User_Routes_1 = require("./Router/User_Routes");
const Auth_Routes_1 = require("./Router/Auth_Routes");
const Categories_Routes_1 = require("./Router/Categories_Routes");
dotenv.config();
let app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, DB_Connection_1.connectDb)(process.env.MONGO_URI);
app.use((0, cors_1.default)());
// routes
app.use('/api/cars', Car_Routes_1.carRouter);
app.use('/api/users', User_Routes_1.userRouter);
app.use('/api/auth', Auth_Routes_1.authRouter);
app.use('/api/category', Categories_Routes_1.categoryRouter);
exports.httpServer = (0, http_1.createServer)(app);
exports.httpServer.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
