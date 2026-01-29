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
      .json({ success: true, message: MessageEnum.OTP_SEND_SUCCESS, email });
  };

  // -------------------------------- Resend OTP
  resendOtp = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
    await authService.resendOpt(email);
    res
      .status(StatusEnum.OK)
      .json({ success: true, message: MessageEnum.OTP_RESEND_SUCCESS, email });
  };

  // -------------------------------- Check OTP
  async checkOtp(req: Request, res: Response): Promise<void> {
    const { email, otp } = req.body;
    const isValid = await authService.verifyOtp(email, otp);
    if (isValid) {
      res
        .status(StatusEnum.OK)
        .json({ success: true, message: MessageEnum.OTP_MATCH_SUCCESS });
    }
  }

  // -------------------------------- Register User
  async registerUser(req: Request, res: Response): Promise<void> {
    let result = await authService.registerUser(req.body);

    if (result) {
      res
        .status(StatusEnum.OK)
        .json({ success: true, message: MessageEnum.USER_REGISTER_SUCCESS });
    }
  }

  // // -------------------------------- Login User
  async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const result = await authService.userLogin(email, password);

    if (result) {
      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: Number(process.env.COOKIE_MAX_AGE),
      });


      res.status(StatusEnum.OK).json({
        success: true,
        token: result.accessToken,
        userName: result.userName,
        message: MessageEnum.LOGIN_SUCCESS,
      });

      

    }
  }

  // -------------------------------- Refresh token
  async generateNewAccessToken (req:Request,res:Response):Promise<void>{
    
    const refreshToken  = req.cookies.refreshToken
    console.log(refreshToken);
    
    const accessToken= await authService.createNewAccessToken(refreshToken)

    if(accessToken){
    res
      .status(StatusEnum.OK)
      .json({message:'token created',accessToken})
    }
  }


// logout user
   async logoutUser(req:Request,res:Response):Promise<void>{
  console.log('reached');
  
      res.clearCookie(`refreshToken`, {
        httpOnly: true,
        secure: false, // Match loginUser
      });

      res
        .status(StatusEnum.OK)
        .json({ message: 'Logout Success' });
  }
}

export default new AuthController();
