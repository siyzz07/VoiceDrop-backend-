import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export  const verifyToken=(req: Request, res: Response, next: NextFunction):any=> {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "No token access denied" });
    }

    jwt.verify(token, process.env.JWT_ACCES_SECRET_KEY as string, (err, user) => {
        if (err) {
            
            return res.status(403).json({ message: "Token is not valid" });
        }
        
        req.user = user;
        next();
    });
}
