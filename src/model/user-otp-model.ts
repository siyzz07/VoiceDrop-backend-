import mongoose, { Document, Schema, model } from 'mongoose';


export interface IUserOtp extends Document {
  email: string;
  otp: string;
  createdAt: Date; 
}


const userOtpSchema = new Schema<IUserOtp>({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 } 
});


const UserOtp = model<IUserOtp>('UserOtp', userOtpSchema);

export default UserOtp;
