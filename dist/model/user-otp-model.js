"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userOtpSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 90 }
});
const UserOtp = (0, mongoose_1.model)('UserOtp', userOtpSchema);
exports.default = UserOtp;
