import { Request, Response } from "express";
import otpService from "../services/otp-service";
import { log } from "console";
import emailService from "../services/email-service";
import userRoute from "../routes/userRoutes";
import userService from "../services/user-service";
class AuthController {


  async VarifyNumber(req: Request, res: Response) {
       const generateOtp=await otpService.generateOtp()
       console.log(generateOtp);
       

  }

//---------------------------- verify eamil -----------------------------
  async varifyEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      let otp = await otpService.generateOtp();

      
      await emailService.sendEmail({
        to: email, 
        subject: "Welcome to Voice Drop",
        text: `Thank you for signing up. Your OTP is ${otp}. Keep your OTP safe.`,
        // html: `<h1>Welcome!</h1><p>Your OTP is <strong>${otp}</strong></p>`, // optional HTML email
      });

      await otpService.saveUserOtp(email,otp)

      return void res.json({email:email})
      
      // res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
      console.error("Error in varifyEmail:", error);
      res.status(500).json({ message: "Failed to send OTP" });
    }
  }

  //-------------------------- check otp is correct -----------------------
  async checkOtp(req:Request,res:Response):Promise<void>{
    try{
      const {email,otp}=req.body
        console.log(req.body);
        
        const check=await otpService.checkOtpMatch(email,otp)
        if(check.checkValue==true){
          return void res.status(200).json({message:check.message})
        }else{
          return void res.status(403).json({message:check.message})

        }
        
      } catch (error) {
      console.error("Error in checkOtp:", error);
      res.status(500).json({ message: "Failed to checkOtp" });
    }
  }

  //--------------------------------- register user
  async registerUser(req:Request,res:Response):Promise<void>{
      try{

        let user=await userService.registerUser(req.body)   
        console.log(user);
        
        return void res.status(200).json({message:"Successfully created."})

      }catch (error) {
      console.error("Error in checkOtp:", error);
      res.status(500).json({ message: "An error occurred. Please try again later." });
    }
  }
}

export default new AuthController()