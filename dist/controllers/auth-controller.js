"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../services/auth-service"));
const user_service_1 = __importDefault(require("../services/user-service"));
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
        // // -------------------------------- Login User
        // async loginUser(req: Request, res: Response): Promise<void> {
        //   try {
        //     const { email, password } = req.body;
        //     const user = await userService.checkUserExist(email);
        //     if (!user) {
        //        res
        //         .status(StatusEnum.NOT_FOUND)
        //         .json({
        //           message: "User not found. Please create an account first.",
        //         });
        //     }
        //     const isPasswordCorrect = await userService.validatePassword(email, password);
        //     if (!isPasswordCorrect) {
        //        res
        //         .status(StatusEnum.UNAUTHORIZED)
        //         .json({
        //           message: "Incorrect password. Please try again.",
        //         });
        //     }
        //     const token = await generateToken(user);
        //     res
        //       .status(StatusEnum.OK)
        //       .json({
        //         token,
        //         userName: user.name,
        //         message: "Login successful",
        //       });
        //   } catch (error) {
        //     console.error("Error in loginUser:", error);
        //     res
        //       .status(StatusEnum.SERVER_ERROR)
        //       .json({ message: "Internal server error" });
        //   }
        // }
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
        try {
            await user_service_1.default.registerUser(req.body);
            res
                .status(statusEnum_1.StatusEnum.OK)
                .json({ message: "User created successfully." });
        }
        catch (error) {
            console.error("Error in registerUser:", error);
            res
                .status(statusEnum_1.StatusEnum.SERVER_ERROR)
                .json({ message: "Internal server error. Please try again later." });
        }
    }
}
exports.default = new AuthController();
