"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth-controller"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userRoute = express_1.default.Router();
//----------------------------------register user
userRoute.post("/emailVerify", (0, express_async_handler_1.default)(auth_controller_1.default.verifyEmail));
userRoute.post('/otp-resend', (0, express_async_handler_1.default)(auth_controller_1.default.resendOtp));
userRoute.post("/checkOtp", auth_controller_1.default.checkOtp);
userRoute.post("/registerUser", auth_controller_1.default.registerUser);
// //-----------------------------------login user
// userRoute.post("/loginUser", authController.loginUser);
// //------------------------------------room routes
// userRoute.post("/createRoom", verifyToken, roomController.createRoom);
// userRoute.get("/checkRoom/:roomId", roomController.checkRoomExistandRoomUsers);
exports.default = userRoute;
