"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_ACCES_SECRET_KEY = process.env.JWT_ACCES_SECRET_KEY;
const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;
const JWT_EXPIRES_IN = '1m';
if (!JWT_ACCES_SECRET_KEY) {
    console.error("JWT_ACCESS_SECRET_KEY is not defined in the environment variables");
    throw new Error("JWT_ACCESS_SECRET_KEY is missing");
}
if (!JWT_REFRESH_SECRET_KEY) {
    console.error("JWT_REFRESH_SECRET_KEY is not defined in the environment variables");
    throw new Error("JWT_REFRESH_SECRET_KEY is missing");
}
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId: userId }, JWT_ACCES_SECRET_KEY, {
        expiresIn: JWT_EXPIRES_IN,
    });
};
exports.generateToken = generateToken;
const generateRefreshToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId: userId }, JWT_REFRESH_SECRET_KEY, {
        expiresIn: '7d',
    });
};
exports.generateRefreshToken = generateRefreshToken;
