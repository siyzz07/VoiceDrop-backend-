import crypto from "crypto";
import otpRepository from "../repositories/otp-repositorie"
import { MessageEnum } from "../enum/messageEnum";

class OtpService {

  // Generate OTP
  generateOtp(length: number = 6): string {
    return crypto
      .randomInt(0, Math.pow(10, length))
      .toString()
      .padStart(length, "0");
  }

  // Send OTP 
  async sendOtp(phoneOrEmail: string, otp: string) {
    console.log(`Sending OTP ${otp} to ${phoneOrEmail}`);
  }

  // Save OTP into database
  async saveOtp(email: string, otp: string) {
    await otpRepository.saveOtp(email, otp);
  }

  

  // Verify OTP  check the otp is correct or not
  async verifyOtp(email: string, otp: string) {
    const record = await otpRepository.findOtpByEmail(email);
    
    if (!record) {
      return { success: false, message: MessageEnum.OTP_EXPIRED };
    }

    if (record.otp !== otp) {
      return { success: false, message: MessageEnum.OTP_MATCH_FAILED };
    }

    
    await otpRepository.deleteOtp(email);

    return { success: true, message:MessageEnum.OTP_MATCH_SUCCESS };
  }
}

export default new OtpService();
