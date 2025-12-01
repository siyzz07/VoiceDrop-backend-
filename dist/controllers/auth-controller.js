"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../services/auth-service"));
const messageEnum_1 = require("../enum/messageEnum");
const statusEnum_1 = require("../enum/statusEnum");
class AuthController {
    constructor() {
        // -------------------------------- Verify Email (Send OTP)
        this.verifyEmail = async (req, res) => {
            const { email } = req.body;
            await auth_service_1.default.sendVerificationOtp(email);
            res
                .status(statusEnum_1.StatusEnum.OK)
                .json({ success: true, message: messageEnum_1.MessageEnum.OTP_SEND_SUCCESS, email });
        };
        // -------------------------------- Resend OTP
        this.resendOtp = async (req, res) => {
            const { email } = req.body;
            await auth_service_1.default.resendOpt(email);
            res
                .status(statusEnum_1.StatusEnum.OK)
                .json({ success: true, message: messageEnum_1.MessageEnum.OTP_RESEND_SUCCESS, email });
        };
    }
    // -------------------------------- Check OTP
    async checkOtp(req, res) {
        const { email, otp } = req.body;
        const isValid = await auth_service_1.default.verifyOtp(email, otp);
        if (isValid) {
            res
                .status(statusEnum_1.StatusEnum.OK)
                .json({ success: true, message: messageEnum_1.MessageEnum.OTP_MATCH_SUCCESS });
        }
    }
    // -------------------------------- Register User
    async registerUser(req, res) {
        let result = await auth_service_1.default.registerUser(req.body);
        if (result) {
            res
                .status(statusEnum_1.StatusEnum.OK)
                .json({ success: true, message: messageEnum_1.MessageEnum.USER_REGISTER_SUCCESS });
        }
    }
    // // -------------------------------- Login User
    async loginUser(req, res) {
        const { email, password } = req.body;
        const result = await auth_service_1.default.userLogin(email, password);
        if (result) {
            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: false,
                maxAge: Number(process.env.COOKIE_MAX_AGE),
            });
            res.status(statusEnum_1.StatusEnum.OK).json({
                success: true,
                token: result.accessToken,
                userName: result.userName,
                message: messageEnum_1.MessageEnum.LOGIN_SUCCESS,
            });
        }
    }
    // -------------------------------- Refresh token
    async generateNewAccessToken(req, res) {
        const refreshToken = req.cookies.refreshToken;
        console.log(refreshToken);
        const accessToken = await auth_service_1.default.createNewAccessToken(refreshToken);
        if (accessToken) {
            res
                .status(statusEnum_1.StatusEnum.OK)
                .json({ message: 'token created', accessToken });
        }
    }
    // logout user
    async logoutUser(req, res) {
        console.log('reached');
        res.clearCookie(`refreshToken`, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        res
            .status(statusEnum_1.StatusEnum.OK)
            .json({ message: 'Logout Success' });
    }
}
exports.default = new AuthController();
