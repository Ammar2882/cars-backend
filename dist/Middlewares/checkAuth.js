"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkAuth = (req, res, next) => {
    const token = req.headers.authorization;
    // check jwt exists and is verified
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.status(403).json({ message: 'forbidden' });
            }
            else {
                req.user = decodedToken;
                next();
            }
        });
    }
    else {
        res.status(403).json({ message: 'forbidden' });
    }
};
exports.checkAuth = checkAuth;
