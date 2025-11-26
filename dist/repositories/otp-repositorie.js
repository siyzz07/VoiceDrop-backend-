"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_otp_model_1 = __importDefault(require("../model/user-otp-model"));
class OtpRepository {
    // Save or update OTP
    async saveOtp(email, otp) {
        await user_otp_model_1.default.updateOne({ email }, {
            $set: {
                otp,
                createdAt: new Date(),
            },
        }, { upsert: true });
    }
    // Fetch OTP by email
    async findOtpByEmail(email) {
        return await user_otp_model_1.default.findOne({ email });
    }
    // Delete OTP
    async deleteOtp(email) {
        return await user_otp_model_1.default.deleteOne({ email });
    }
}
exports.default = new OtpRepository();
