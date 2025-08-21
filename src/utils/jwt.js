"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.generateToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var JWT_ACCES_SECRET_KEY = process.env.JWT_ACCES_SECRET_KEY;
var JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;
var JWT_EXPIRES_IN = '8d';
if (!JWT_ACCES_SECRET_KEY) {
    console.error("JWT_ACCESS_SECRET_KEY is not defined in the environment variables");
    throw new Error("JWT_ACCESS_SECRET_KEY is missing");
}
if (!JWT_REFRESH_SECRET_KEY) {
    console.error("JWT_REFRESH_SECRET_KEY is not defined in the environment variables");
    throw new Error("JWT_REFRESH_SECRET_KEY is missing");
}
var generateToken = function (user) {
    return jsonwebtoken_1.default.sign({ userId: user._id }, JWT_ACCES_SECRET_KEY, {
        expiresIn: JWT_EXPIRES_IN,
    });
};
exports.generateToken = generateToken;
var refreshToken = function (user) {
    return jsonwebtoken_1.default.sign({ userId: user._id }, JWT_REFRESH_SECRET_KEY, {
        expiresIn: '7d',
    });
};
exports.refreshToken = refreshToken;
