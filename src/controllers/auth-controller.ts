import { Request, Response } from "express";
import authService from "../services/auth-service";
import userService from "../services/user-service";
import { generateToken } from "../utils/jwt";
import { MessageEnum } from "../enum/messageEnum";
import { StatusEnum } from "../enum/statusEnum";
import { log } from "console";

class AuthController {

  // -------------------------------- Verify Email (Send OTP)
   verifyEmail = async (req: Request, res: Response): Promise<void> => {
      const { email } = req.body;
       await authService.sendVerificationOtp(email);
      res
        .status(StatusEnum.OK)
        .json({ success:true, message: MessageEnum.OTP_SEND_SUCCESS, email });
  }

  // -------------------------------- Resend OTP
    resendOtp = async (req:Request,res:Response) :Promise<void >=>{
      const {email} = req.body
      await authService.resendOpt(email)
          res
            .status(StatusEnum.OK)
            .json({success:true,message:MessageEnum.OTP_RESEND_SUCCESS,email})

      } 


  // -------------------------------- Check OTP 
  async checkOtp(req: Request, res: Response): Promise<void> {
      const { email, otp } = req.body;
      const isValid = await authService.verifyOtp(email, otp);
      if (isValid) {
         res
          .status(StatusEnum.OK)
          .json({ success:true , message: MessageEnum.OTP_MATCH_SUCCESS });
      }   
  }

  // -------------------------------- Register User
  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      await userService.registerUser(req.body);

      res
        .status(StatusEnum.OK)
        .json({ message: "User created successfully." });

    } catch (error) {
      console.error("Error in registerUser:", error);

      res
        .status(StatusEnum.SERVER_ERROR)
        .json({ message: "Internal server error. Please try again later." });
    }
  }

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

export default new AuthController();
