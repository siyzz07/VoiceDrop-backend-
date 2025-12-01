"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "No token access denied" });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_ACCES_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Token expired" });
        }
        else {
            req.user = user;
            next();
        }
    });
};
exports.verifyToken = verifyToken;
