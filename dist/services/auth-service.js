"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messageEnum_1 = require("../enum/messageEnum");
const statusEnum_1 = require("../enum/statusEnum");
const user_repositories_1 = __importDefault(require("../repositories/user-repositories"));
const appError_1 = require("../utils/appError");
const email_service_1 = __importDefault(require("./email-service"));
const otp_service_1 = __importDefault(require("./otp-service"));
class AuthService {
    constructor() {
        //----------------- verify email 
        this.sendVerificationOtp = async (email) => {
            const user = await user_repositories_1.default.findByEmail(email);
            if (user) {
                throw new appError_1.AppError(messageEnum_1.MessageEnum.USER_ALREADY_EXIST, statusEnum_1.StatusEnum.CONFLICT);
            }
            const otp = otp_service_1.default.generateOtp();
            await email_service_1.default.sendEmail({
                to: email,
                subject: "Welcome to Voice Drop",
                text: `Thank you for signing up. Your OTP is ${otp}. Keep your OTP safe.`
            });
            await otp_service_1.default.saveOtp(email, otp);
        };
        //----------------- resendOtp 
        this.resendOpt = async (email) => {
            const user = await user_repositories_1.default.findByEmail(email);
            if (user) {
                throw new appError_1.AppError(messageEnum_1.MessageEnum.USER_ALREADY_EXIST, statusEnum_1.StatusEnum.CONFLICT);
            }
            const otp = otp_service_1.default.generateOtp();
            await email_service_1.default.sendEmail({
                to: email,
                subject: "Welcome to Voice Drop",
                text: `You have requested to resend your OTP. Your new OTP is ${otp}. Please keep it secure`
            });
            await otp_service_1.default.saveOtp(email, otp);
        };
    }
    //----------------- Check OTP validity
    async verifyOtp(email, otp) {
        const result = await otp_service_1.default.verifyOtp(email, otp);
        if (!result.success) {
            throw new appError_1.AppError(result.message, statusEnum_1.StatusEnum.BAD_REQUEST);
        }
        return true;
    }
}
exports.default = new AuthService();
