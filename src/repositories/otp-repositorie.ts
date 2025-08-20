import UserOtp from "../model/user-otp-model";
import otpService from "../services/otp-service";

class OtpRepositories {
  async saveUserOpt(email: string, otp: string): Promise<any> {
    const userOtp = new UserOtp({
      email,
      otp,
      createdAt: Date.now(),
    });
    userOtp.save();
  }

  async checkOtpMatch(email: string, otp: string): Promise<any> {
    const check = await UserOtp.findOne({ email });
    if (!check) {
      return {
        checkValue: false,
        message: "OTP has expired. Please request a new one.",
      };
    } else {
      if (check.otp == otp) {
        return { checkValue: true, message: "success" };
      } else {
        return { checkValue: false, message: "Invalid OTP. Please try again." };
      }
    }
  }
}

export default new OtpRepositories();
