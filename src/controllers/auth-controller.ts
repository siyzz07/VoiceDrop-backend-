import { Request, Response } from "express";
import otpService from "../services/otp-service";
import { log } from "console";
import emailService from "../services/email-service";
import userRoute from "../routes/userRoutes";
import userService from "../services/user-service";
import { generateToken } from "../utils/jwt";
import authService from "../services/auth-service";
import { MessageEnum } from "../enum/messageEnum";
import { StatusEnum } from "../enum/statusEnum";
import { json } from "stream/consumers";



class AuthController {


  


  //---------------------------- verify eamil -----------------------------
  // async varifyEmail(req: Request, res: Response): Promise<void> {
  //   try {


  //     const { email } = req.body;
  //     let otp = await otpService.generateOtp();










  //     await emailService.sendEmail({
  //       to: email,
  //       subject: "Welcome to Voice Drop",
  //       text: `Thank you for signing up. Your OTP is ${otp}. Keep your OTP safe.`,
        
  //     });

  //     await otpService.saveUserOtp(email, otp);

  //     return void res.json({ email: email });

  //     // res.status(200).json({ message: "OTP sent successfully" });
  //   } catch (error) {
  //     console.error("Error in varifyEmail:", error);
  //     res.status(500).json({ message: "Failed to send OTP" });
  //   }
  // }


  async varifyEmail(req:Request,res:Response) :Promise<void>{
    try{
      const { email } = req.body;
      let result  = await authService.verifyEmail(email)
      if(result){
        res
          .status(StatusEnum.OK) 
          .json({message:MessageEnum.OPT_SEND_SUCCESS,email:result})
      }
    }catch(error:unknown){
        if(error instanceof Error){
          if(error.message === MessageEnum.USER_ALREADY_EXIST){
            res 
              .status(StatusEnum.CONFLICT)
              .json({message:MessageEnum.USER_ALREADY_EXIST})
          }else{
            res 
              .status(StatusEnum.SERVER_ERROR)
              .json({message:MessageEnum.SERVER_ERROR})
          }
        }
    }
  }






























  //-------------------------- check otp is correct -----------------------
  // async checkOtp(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { email, otp } = req.body;
  //     console.log(req.body);

  // const check = await otpService.checkOtpMatch(email, otp);
  //     if (check.checkValue == true) {
  //       return void res.status(200).json({ message: check.message });
  //     } else {
  //       return void res.status(403).json({ message: check.message });
  //     }
  //   } catch (error) {
  //     console.error("Error in checkOtp:", error);
  //     res.status(500).json({ message: "Failed to checkOtp" });
  //   }
  // }


  async checkOtp (req:Request,res:Response):Promise<void>{
    try{

      let result = await  authService.checkOtpMatch(req.body)
        if(result){
          res
            .status(StatusEnum.OK)
            .json({message:MessageEnum.OTP_MATCH_SUCCESS})
        }
    }catch(error:unknown){
      if(error instanceof Error){
          res
            .status(StatusEnum.SERVER_ERROR)
            .json({message:error.message})

      }
    }
  }
















  //--------------------------------- register user
  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      let user = await userService.registerUser(req.body);
      console.log(user);

      return void res.status(200).json({ message: "Successfully created." });
    } catch (error) {
      console.error("Error in checkOtp:", error);
      res
        .status(500)
        .json({ message: "An error occurred. Please try again later." });
    }
  }

  //--------------------------------------login user
  async loginUser(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = req.body;
      const user = await userService.checkUserExist(email);
      if (!user) {
        return res
          .status(404)
          .json({
            message: "User not found. Please sign up to create an account.",
          });
      }

      const comparePassword = await userService.comparePassword(
        email,
        password
      );
      if (!comparePassword) {
        return res
          .status(404)
          .json({
            message: "The password you entered is incorrect. Please try again.",
          });
      }

      const token =await generateToken(user);

      return res.status(200).json({ token,userName:user.name, message: "Login success" });
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

export default new AuthController();
