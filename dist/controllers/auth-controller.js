"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const otp_service_1 = __importDefault(require("../services/otp-service"));
const email_service_1 = __importDefault(require("../services/email-service"));
const user_service_1 = __importDefault(require("../services/user-service"));
const jwt_1 = require("../utils/jwt");
class AuthController {
    async VarifyNumber(req, res) {
        const generateOtp = await otp_service_1.default.generateOtp();
    }
    //---------------------------- verify eamil -----------------------------
    async varifyEmail(req, res) {
        try {
            const { email } = req.body;
            let otp = await otp_service_1.default.generateOtp();
            await email_service_1.default.sendEmail({
                to: email,
                subject: "Welcome to Voice Drop",
                text: `Thank you for signing up. Your OTP is ${otp}. Keep your OTP safe.`,
            });
            await otp_service_1.default.saveUserOtp(email, otp);
            return void res.json({ email: email });
            // res.status(200).json({ message: "OTP sent successfully" });
        }
        catch (error) {
            console.error("Error in varifyEmail:", error);
            res.status(500).json({ message: "Failed to send OTP" });
        }
    }
    //-------------------------- check otp is correct -----------------------
    async checkOtp(req, res) {
        try {
            const { email, otp } = req.body;
            console.log(req.body);
            const check = await otp_service_1.default.checkOtpMatch(email, otp);
            if (check.checkValue == true) {
                return void res.status(200).json({ message: check.message });
            }
            else {
                return void res.status(403).json({ message: check.message });
            }
        }
        catch (error) {
            console.error("Error in checkOtp:", error);
            res.status(500).json({ message: "Failed to checkOtp" });
        }
    }
    //--------------------------------- register user
    async registerUser(req, res) {
        try {
            let user = await user_service_1.default.registerUser(req.body);
            console.log(user);
            return void res.status(200).json({ message: "Successfully created." });
        }
        catch (error) {
            console.error("Error in checkOtp:", error);
            res
                .status(500)
                .json({ message: "An error occurred. Please try again later." });
        }
    }
    //--------------------------------------login user
    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await user_service_1.default.checkUserExist(email);
            if (!user) {
                return res
                    .status(404)
                    .json({
                    message: "User not found. Please sign up to create an account.",
                });
            }
            const comparePassword = await user_service_1.default.comparePassword(email, password);
            if (!comparePassword) {
                return res
                    .status(404)
                    .json({
                    message: "The password you entered is incorrect. Please try again.",
                });
            }
            const token = await (0, jwt_1.generateToken)(user);
            return res.status(200).json({ token, userName: user.name, message: "Login success" });
        }
        catch (error) {
            console.log(error.message);
        }
    }
}
exports.default = new AuthController();
