"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_otp_model_1 = __importDefault(require("../model/user-otp-model"));
class OtpRepositories {
    async saveUserOpt(email, otp) {
        const userOtp = new user_otp_model_1.default({
            email,
            otp,
            createdAt: Date.now(),
        });
        userOtp.save();
    }
    async checkOtpMatch(email, otp) {
        const check = await user_otp_model_1.default.findOne({ email });
        if (!check) {
            return {
                checkValue: false,
                message: "OTP has expired. Please request a new one.",
            };
        }
        else {
            if (check.otp == otp) {
                return { checkValue: true, message: "success" };
            }
            else {
                return { checkValue: false, message: "Invalid OTP. Please try again." };
            }
        }
    }
}
exports.default = new OtpRepositories();
