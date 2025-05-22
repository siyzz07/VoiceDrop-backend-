import mongoose, { Document, Schema, model } from 'mongoose';

// Interface for User Document
export interface IUser extends Document {
  name: string;
  password: string;
  email: string;
}

// Define User Schema
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  password: { type: String, required: true }, 
  email: { type: String, required: true },
});

// Create User Model
const User = model<IUser>('User', userSchema);

export default User;
