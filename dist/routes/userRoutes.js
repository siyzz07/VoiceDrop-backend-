"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth-controller"));
const room_controller_1 = __importDefault(require("../controllers/room-controller"));
const auth_middleware_1 = require("../middleware/auth_middleware");
const userRoute = express_1.default.Router();
//----------------------------------register user
userRoute.post("/verify", auth_controller_1.default.VarifyNumber);
userRoute.post("/emailVerify", auth_controller_1.default.varifyEmail);
userRoute.post("/checkOtp", auth_controller_1.default.checkOtp);
userRoute.post("/registerUser", auth_controller_1.default.registerUser);
//-----------------------------------login user
userRoute.post("/loginUser", auth_controller_1.default.loginUser);
//------------------------------------room routes
userRoute.post("/createRoom", auth_middleware_1.verifyToken, room_controller_1.default.createRoom);
userRoute.get("/checkRoom/:roomId", room_controller_1.default.checkRoomExistandRoomUsers);
exports.default = userRoute;
