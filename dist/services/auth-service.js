"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const messageEnum_1 = require("../enum/messageEnum");
const statusEnum_1 = require("../enum/statusEnum");
const user_repositories_1 = __importDefault(require("../repositories/user-repositories"));
const appError_1 = require("../utils/appError");
const comparePassword_1 = __importDefault(require("../utils/comparePassword"));
const hashPassword_1 = __importDefault(require("../utils/hashPassword"));
const jwt_1 = require("../utils/jwt");
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
    // Register a new user
    async registerUser(data) {
        const { username, password, email } = data;
        const hashedPassword = await hashPassword_1.default.hashPasswod(password);
        const user = await user_repositories_1.default.createUser(username, email, hashedPassword);
        if (!user) {
            throw new appError_1.AppError(messageEnum_1.MessageEnum.USER_REGISTER_FAILED, statusEnum_1.StatusEnum.BAD_REQUEST);
        }
        return true;
    }
    // Login use
    async userLogin(email, password) {
        const existUser = await user_repositories_1.default.findByEmail(email);
        if (!existUser) {
            throw new appError_1.AppError(messageEnum_1.MessageEnum.USER_NOT_FOUND, statusEnum_1.StatusEnum.NOT_FOUND);
        }
        const isPasswordCorrect = await this.validatePassword(email, password);
        if (!isPasswordCorrect) {
            throw new appError_1.AppError(messageEnum_1.MessageEnum.INVALID_PASSWORD, statusEnum_1.StatusEnum.UNAUTHORIZED);
        }
        const accessToken = await (0, jwt_1.generateToken)(existUser._id);
        const refreshToken = await (0, jwt_1.generateRefreshToken)(existUser._id);
        return { accessToken, refreshToken, userName: existUser.name };
    }
    // refresh the accessToke
    async createNewAccessToken(refreshToken) {
        if (!refreshToken) {
            throw new appError_1.AppError(messageEnum_1.MessageEnum.TOKEN_MISSING, statusEnum_1.StatusEnum.BAD_REQUEST);
        }
        let decode;
        try {
            decode = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);
        }
        catch (error) {
            throw new appError_1.AppError(messageEnum_1.MessageEnum.REFRESH_TOKEN_EXPIRED, statusEnum_1.StatusEnum.UNAUTHORIZED);
        }
        if (!decode || !decode.userId) {
            throw new appError_1.AppError(messageEnum_1.MessageEnum.TOKEN_INVALID, statusEnum_1.StatusEnum.UNAUTHORIZED);
        }
        const accessToken = (0, jwt_1.generateToken)(decode.userId);
        return accessToken;
    }
    // Compare passwords
    async validatePassword(email, plainPassword) {
        const user = await user_repositories_1.default.findByEmail(email);
        if (!user)
            return false;
        return await comparePassword_1.default.passwordCompare(plainPassword, user.password);
    }
}
exports.default = new AuthService();
