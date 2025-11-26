import { MessageEnum } from "../enum/messageEnum";
import { StatusEnum } from "../enum/statusEnum";
import userRepository from "../repositories/user-repositories";
import { AppError } from "../utils/appError";
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

    await emailService.sendEmail({
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

    await emailService.sendEmail({
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
}

export default new AuthService();
