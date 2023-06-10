"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const User_1 = require("../DB_Models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Send_Emails_1 = require("../utils/Send_Emails");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, User_1.validate)(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });
        let user = yield User_1.User.findOne({ email: req.body.email });
        if (user)
            return res
                .status(409)
                .send({ message: 'User with given email already Exist!' });
        const password = Math.random() // Generate random number, eg: 0.123456
            .toString(36) // Convert  to base-36 : "0.4fzyo82mvyr"
            .slice(-8);
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashPassword = yield bcrypt_1.default.hash(password, salt);
        user = yield new User_1.User(Object.assign(Object.assign({}, req.body), { password: hashPassword, role: req.body.role.toLowerCase() })).save();
        console.log(password);
        yield (0, Send_Emails_1.sendEmail)(user.email, user.lastName, `Your password: ${password}`);
        res.status(201).send({ message: 'Password Sent to Mail' });
    }
    catch (error) {
        console.log(error);
    }
}));
