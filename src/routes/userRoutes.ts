import express from "express";
import authController from "../controllers/auth-controller";
import roomController from "../controllers/room-controller";
import { verifyToken } from "../middleware/auth_middleware";

const userRoute = express.Router();

//----------------------------------register user
userRoute.post("/verify", authController.VarifyNumber);
userRoute.post("/emailVerify", authController.varifyEmail);
userRoute.post("/checkOtp", authController.checkOtp);
userRoute.post("/registerUser", authController.registerUser);

//-----------------------------------login user
userRoute.post("/loginUser", authController.loginUser);

//------------------------------------room routes
userRoute.post("/createRoom", verifyToken, roomController.createRoom);
userRoute.get("/checkRoom/:roomId", roomController.checkRoomExistandRoomUsers);

export default userRoute;
