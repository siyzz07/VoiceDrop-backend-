import express from "express";

// import roomController from "../controllers/room-controller";
import { verifyToken } from "../middleware/auth_middleware";
import authController from "../controllers/auth-controller";
import expressAsyncHandler from "express-async-handler";

const userRoute = express.Router();

//----------------------------------register user
userRoute.post("/emailVerify", expressAsyncHandler( authController.verifyEmail));
userRoute.post('/otp-resend',expressAsyncHandler(authController.resendOtp))
userRoute.post("/checkOtp", authController.checkOtp);
userRoute.post("/registerUser", authController.registerUser);

// //-----------------------------------login user
// userRoute.post("/loginUser", authController.loginUser);

// //------------------------------------room routes
// userRoute.post("/createRoom", verifyToken, roomController.createRoom);
// userRoute.get("/checkRoom/:roomId", roomController.checkRoomExistandRoomUsers);

export default userRoute;
