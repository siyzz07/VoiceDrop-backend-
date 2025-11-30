import express from "express";

import roomController from "../controllers/room-controller";
import { verifyToken } from "../middleware/auth_middleware";
import authController from "../controllers/auth-controller";
import expressAsyncHandler from "express-async-handler";
import { send } from "process";

const userRoute = express.Router();

//----------------------------------register user
userRoute.post("/emailVerify", expressAsyncHandler( authController.verifyEmail));
userRoute.post('/otp-resend',expressAsyncHandler(authController.resendOtp))
userRoute.post("/checkOtp", expressAsyncHandler( authController.checkOtp))
userRoute.post("/registerUser",expressAsyncHandler( authController.registerUser));

// //-----------------------------------login user
userRoute.post("/login",expressAsyncHandler( authController.loginUser));
userRoute.post("/logout",  expressAsyncHandler(authController.logoutUser));

userRoute.post('/auth/refresh-token',expressAsyncHandler(authController.generateNewAccessToken))

// //------------------------------------room routes
userRoute.post("/createRoom", verifyToken, roomController.createRoom);
userRoute.get("/checkRoom/:roomId", roomController.checkRoomExistandRoomUsers);

export default userRoute;
