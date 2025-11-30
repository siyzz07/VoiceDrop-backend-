"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const room_controller_1 = __importDefault(require("../controllers/room-controller"));
const auth_middleware_1 = require("../middleware/auth_middleware");
const auth_controller_1 = __importDefault(require("../controllers/auth-controller"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userRoute = express_1.default.Router();
//----------------------------------register user
userRoute.post("/emailVerify", (0, express_async_handler_1.default)(auth_controller_1.default.verifyEmail));
userRoute.post('/otp-resend', (0, express_async_handler_1.default)(auth_controller_1.default.resendOtp));
userRoute.post("/checkOtp", (0, express_async_handler_1.default)(auth_controller_1.default.checkOtp));
userRoute.post("/registerUser", (0, express_async_handler_1.default)(auth_controller_1.default.registerUser));
// //-----------------------------------login user
userRoute.post("/login", (0, express_async_handler_1.default)(auth_controller_1.default.loginUser));
userRoute.post("/logout", (0, express_async_handler_1.default)(auth_controller_1.default.logoutUser));
userRoute.post('/auth/refresh-token', (0, express_async_handler_1.default)(auth_controller_1.default.generateNewAccessToken));
// //------------------------------------room routes
userRoute.post("/createRoom", auth_middleware_1.verifyToken, room_controller_1.default.createRoom);
userRoute.get("/checkRoom/:roomId", room_controller_1.default.checkRoomExistandRoomUsers);
exports.default = userRoute;
