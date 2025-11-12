import { MessageEnum } from "../enum/messageEnum";
import userRepositories from "../repositories/user-repositories";
import emailService from "./email-service";
import otpService from "./otp-service";

class AuthService {
  //----------------------------------------------------------- verify the  user email
  async verifyEmail(email: string): Promise<string | void> {
    const userExists = await userRepositories.checkUsrExist(email);

    if (userExists) {
      throw new Error(MessageEnum.USER_ALREADY_EXIST);
    }

    const otp = otpService.generateOtp();

    await emailService.sendEmail({
      to: email,
      subject: "Welcome to Voice Drop",
      text: `Thank you for signing up. Your OTP is ${otp}. Keep your OTP safe.`,
    });

    await otpService.saveUserOtp(email, otp);
    return email;
  }

  //----------------------------------------------------------- check the otp mach or not

  async checkOtpMatch(data: {
    email: string;
    otp: string;
  }): Promise<boolean | void> {
    const { email, otp } = data;

    let result = await otpService.checkOtpMatch(email, otp);
    if (!result) {
      throw new Error(MessageEnum.SERVER_ERROR);
    }

    if (result.checkValue) {
      return true;
    }

    throw new Error(MessageEnum.OTP_MATCH_FAILED);
  }
}

export default new AuthService();
