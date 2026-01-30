import jwt,{ JsonWebTokenError,JwtPayload } from "jsonwebtoken";
import { MessageEnum } from "../enum/messageEnum";
import { StatusEnum } from "../enum/statusEnum";
import userRepository from "../repositories/user-repositories";
import { AppError } from "../utils/appError";
import comparePassword from "../utils/comparePassword";
import hashPassword from "../utils/hashPassword";
import { generateRefreshToken, generateToken } from "../utils/jwt";
import emailService from "./email-service";
import otpService from "./otp-service";

class AuthService {

  //----------------- verify email 
   sendVerificationOtp = async (email: string): Promise<void> => {

    const user = await userRepository.findByEmail(email);
    if (user) {
      throw new AppError(MessageEnum.USER_ALREADY_EXIST,StatusEnum.CONFLICT)
    }

    const otp = otpService.generateOtp();

    emailService.sendEmail({
      to: email,
      subject: "Welcome to Voice Drop",
      text: `Thank you for signing up. Your OTP is ${otp}. Keep your OTP safe.`
    });
    await otpService.saveOtp(email, otp);
  
  }


  //----------------- resendOtp 
   resendOpt = async (email:string):Promise<void> =>{

  const user = await userRepository.findByEmail(email);
    if (user) {
      throw new AppError(MessageEnum.USER_ALREADY_EXIST,StatusEnum.CONFLICT)
    }


 const otp = otpService.generateOtp();

    emailService.sendEmail({
      to: email,
      subject: "Welcome to Voice Drop",
      text: `You have requested to resend your OTP. Your new OTP is ${otp}. Please keep it secure`
    });


    await otpService.saveOtp(email, otp);
  

   }



    //----------------- Check OTP validity
  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const result = await otpService.verifyOtp(email, otp);

    if (!result.success) {
       throw new AppError(result.message,StatusEnum.BAD_REQUEST)
    }
    
    return true;
  }



  
  
    // Register a new user
    async registerUser(data: any):Promise<void|boolean> {
      const { username, password, email } = data;
  
      const hashedPassword = await hashPassword.hashPasswod(password);
  
      const user = await userRepository.createUser(
        username,
        email,
        hashedPassword
      );
      if(!user){
          throw new AppError(MessageEnum.USER_REGISTER_FAILED,StatusEnum.BAD_REQUEST)
      }
      return true
      
    }



  // Login use
  async userLogin (email:string,password:string):Promise<{accessToken:string,refreshToken:string ,userName:string| void}>{

    const existUser = await userRepository.findByEmail(email)
    if(!existUser){
      throw new AppError(MessageEnum.USER_NOT_FOUND,StatusEnum.NOT_FOUND)
    }
    const isPasswordCorrect = await this.validatePassword(email,password)
    if(!isPasswordCorrect){
      throw new AppError(MessageEnum.INVALID_PASSWORD,StatusEnum.UNAUTHORIZED)
    }
    const accessToken = await generateToken(existUser._id) 
    const refreshToken = await generateRefreshToken(existUser._id)
    return {accessToken,refreshToken,userName:existUser.name}

  }

  // refresh the accessToke
  async createNewAccessToken(refreshToken: any): Promise<string> {

    if (!refreshToken) {
      throw new AppError(MessageEnum.TOKEN_MISSING, StatusEnum.BAD_REQUEST);
    }
    let decode: JwtPayload;
    
    try {
      decode = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET_KEY as string
      ) as JwtPayload;
    } catch (error) {

      throw new AppError(
        MessageEnum.REFRESH_TOKEN_EXPIRED,
        StatusEnum.UNAUTHORIZED
      );
     
  }


  if (!decode || !decode.userId) {
    throw new AppError(MessageEnum.TOKEN_INVALID, StatusEnum.UNAUTHORIZED);
  }

 
  const accessToken = generateToken(decode.userId);

  return accessToken;
}


  
    // Compare passwords
    private async validatePassword(email: string, plainPassword: string) {
      const user = await userRepository.findByEmail(email);
      if (!user) return false;
  
      return await comparePassword.passwordCompare(
        plainPassword,
        user.password
      );
    }



}

export default new AuthService();
