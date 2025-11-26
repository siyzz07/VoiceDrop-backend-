import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import { StatusEnum } from "../enum/statusEnum";
import { MessageEnum } from "../enum/messageEnum";

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {


    
    let statusCode = err.statusCode || StatusEnum.SERVER_ERROR
    let message = err.message || MessageEnum.SERVER_ERROR
    

    console.error(`error --- ${message} ------ ${statusCode }`)
  
    if (err instanceof AppError) {
     res.status(statusCode).json({
      success: false,
      message: message,
    });
    return 
  }

  
};
