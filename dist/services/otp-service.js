"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const otp_repositorie_1 = __importDefault(require("../repositories/otp-repositorie"));
class OtpServices {
    //-------------------------------------------generate opt
    generateOtp(length = 6) {
        const otp = crypto_1.default
            .randomInt(0, Math.pow(10, length))
            .toString()
            .padStart(length, "0");
        return otp;
    }
    //-------------------------------------------
    async sendBySms(phoneNumber, otp) {
        // Implement your SMS sending logic here
        // Example: using Twilio API
        console.log(`Sending OTP ${otp} to phone number ${phoneNumber}`);
    }
    //-------------------------------------------save user Otp
    async saveUserOtp(email, otp) {
        return await otp_repositorie_1.default.saveUserOpt(email, otp);
    }
    // ------------------------------------------check opt match
    async checkOtpMatch(email, otp) {
        return await otp_repositorie_1.default.checkOtpMatch(email, otp);
    }
}
// Export an instance of the class
exports.default = new OtpServices();
