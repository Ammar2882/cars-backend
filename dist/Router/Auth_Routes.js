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
exports.authRouter = void 0;
const User_1 = require("../DB_Models/User");
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const joi_1 = __importDefault(require("joi"));
exports.authRouter = (0, express_1.Router)();
const maxAge = 6 * 60 * 60;
const createToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: maxAge,
    });
};
exports.authRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('got hit');
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });
        const user = yield User_1.User.findOne({ email: req.body.email });
        if (!user)
            return res.status(401).send({ message: 'Invalid Email or Password' });
        const validPassword = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(401).send({ message: 'Invalid Email or Password' });
        const token = createToken(user._id);
        // res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true });
        res.status(200).send({ message: 'logged in successfully', data: { token, role: user.role } });
    }
    catch (error) {
        console.log(error);
    }
}));
const validate = (data) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required().label('Email'),
        password: joi_1.default.string().required().label('Password'),
    });
    return schema.validate(data);
};
