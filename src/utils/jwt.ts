import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface User {
  _id: string;
}


const JWT_ACCES_SECRET_KEY = process.env.JWT_ACCES_SECRET_KEY;
const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;
const JWT_EXPIRES_IN = '8d'; 


if (!JWT_ACCES_SECRET_KEY) {
  console.error("JWT_ACCESS_SECRET_KEY is not defined in the environment variables");
  throw new Error("JWT_ACCESS_SECRET_KEY is missing");
}

if (!JWT_REFRESH_SECRET_KEY) {
  console.error("JWT_REFRESH_SECRET_KEY is not defined in the environment variables");
  throw new Error("JWT_REFRESH_SECRET_KEY is missing");
}


export const generateToken = (user: User): string => {
  return jwt.sign({ userId: user._id }, JWT_ACCES_SECRET_KEY,{
    expiresIn: JWT_EXPIRES_IN,
  });
};


export const refreshToken = (user: User): string => {
  return jwt.sign({ userId: user._id }, JWT_REFRESH_SECRET_KEY, {
    expiresIn: '7d', 
  });
};
