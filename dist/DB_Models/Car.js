"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = exports.carValidationSchema = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
// 2. Create a Schema corresponding to the document interface.
const carSchema = new mongoose_1.Schema({
    model: {
        type: String,
        required: true,
    },
    manufacturer: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    color: {
        type: Array,
        required: true,
    },
    make: {
        type: String,
        required: true,
    },
    power: {
        type: String,
        required: true,
    },
    registrationNumber: {
        type: String,
        unique: true,
        required: true,
    },
    desc: {
        type: String,
    },
});
// Joi validation schema
exports.carValidationSchema = joi_1.default.object({
    model: joi_1.default.string().required(),
    manufacturer: joi_1.default.string().required(),
    color: joi_1.default.array().required(),
    make: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
    power: joi_1.default.string().required(),
    registrationNumber: joi_1.default.string().required(),
    desc: joi_1.default.string().optional(),
});
// 3. Create a Model.
exports.Car = (0, mongoose_1.model)('Car', carSchema);
