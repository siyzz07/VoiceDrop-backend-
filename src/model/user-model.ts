import mongoose, { Document, Schema, model } from 'mongoose';


export interface IUser extends Document {
  name: string;
  password: string;
  email: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  password: { type: String, required: true }, 
  email: { type: String, required: true },
});


const User = model<IUser>('User', userSchema);

export default User;
