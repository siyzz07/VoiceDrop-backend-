"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const otp_repositorie_1 = __importDefault(require("../repositories/otp-repositorie"));
const messageEnum_1 = require("../enum/messageEnum");
class OtpService {
    // Generate OTP
    generateOtp(length = 6) {
        return crypto_1.default
            .randomInt(0, Math.pow(10, length))
            .toString()
            .padStart(length, "0");
    }
    // Send OTP 
    async sendOtp(phoneOrEmail, otp) {
        console.log(`Sending OTP ${otp} to ${phoneOrEmail}`);
    }
    // Save OTP into database
    async saveOtp(email, otp) {
        await otp_repositorie_1.default.saveOtp(email, otp);
    }
    // Verify OTP  check the otp is correct or not
    async verifyOtp(email, otp) {
        const record = await otp_repositorie_1.default.findOtpByEmail(email);
        if (!record) {
            return { success: false, message: messageEnum_1.MessageEnum.OTP_EXPIRED };
        }
        if (record.otp !== otp) {
            return { success: false, message: messageEnum_1.MessageEnum.OTP_MATCH_FAILED };
        }
        await otp_repositorie_1.default.deleteOtp(email);
        return { success: true, message: messageEnum_1.MessageEnum.OTP_MATCH_SUCCESS };
    }
}
exports.default = new OtpService();
