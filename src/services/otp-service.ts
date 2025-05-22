import crypto from 'crypto';
import otpRepositorie from '../repositories/otp-repositorie';

class OtpServices {
    //-------------------------------------------generate opt
    generateOtp(length: number = 6): string {
        const otp = crypto.randomInt(0, Math.pow(10, length)).toString().padStart(length, '0');
        return otp;
    }

    //-------------------------------------------
    async sendBySms(phoneNumber: string, otp: string): Promise<void> {
        // Implement your SMS sending logic here
        // Example: using Twilio API
        console.log(`Sending OTP ${otp} to phone number ${phoneNumber}`);
    }

    //-------------------------------------------save user Otp
    async saveUserOtp(email:string,otp:string){
        return await otpRepositorie.saveUserOpt(email,otp)
    }

    // ------------------------------------------check opt match
    async checkOtpMatch(email:string,otp:string){
        return await otpRepositorie.checkOtpMatch(email,otp)
    }
}

// Export an instance of the class
export default new OtpServices();
