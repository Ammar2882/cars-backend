"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.User = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});
exports.User = (0, mongoose_1.model)('User', userSchema);
const validate = (data) => {
    const schema = joi_1.default.object({
        firstName: joi_1.default.string().required().label("First Name"),
        lastName: joi_1.default.string().required().label("Last Name"),
        role: joi_1.default.string().required().label("Role"),
        email: joi_1.default.string().email().required().label("Email"),
    });
    return schema.validate(data);
};
exports.validate = validate;
