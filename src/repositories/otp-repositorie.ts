import UserOtp from "../model/user-otp-model";

class OtpRepository {

  // Save or update OTP
  async saveOtp(email: string, otp: string): Promise<void> {
    await UserOtp.updateOne(
      { email },
      {
        $set: {
          otp,
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );
  }

  // Fetch OTP by email
  async findOtpByEmail(email: string) {
    return await UserOtp.findOne({ email });
  }

  // Delete OTP
  async deleteOtp(email: string) {
    return await UserOtp.deleteOne({ email });
  }
}

export default new OtpRepository();
