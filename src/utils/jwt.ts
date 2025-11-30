import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();




const JWT_ACCES_SECRET_KEY = process.env.JWT_ACCES_SECRET_KEY;
const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;
const JWT_EXPIRES_IN = '1m'; 


if (!JWT_ACCES_SECRET_KEY) {
  console.error("JWT_ACCESS_SECRET_KEY is not defined in the environment variables");
  throw new Error("JWT_ACCESS_SECRET_KEY is missing");
}

if (!JWT_REFRESH_SECRET_KEY) {
  console.error("JWT_REFRESH_SECRET_KEY is not defined in the environment variables");
  throw new Error("JWT_REFRESH_SECRET_KEY is missing");
}


export const generateToken = (userId:string): string => {
  return jwt.sign({ userId: userId}, JWT_ACCES_SECRET_KEY,{
    expiresIn: JWT_EXPIRES_IN,
  });
};


export const generateRefreshToken = (userId:string): string => {
  return jwt.sign({ userId: userId}, JWT_REFRESH_SECRET_KEY, {
    expiresIn: '7d', 
  });
};
