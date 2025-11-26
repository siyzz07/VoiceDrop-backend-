"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const appError_1 = require("../utils/appError");
const statusEnum_1 = require("../enum/statusEnum");
const messageEnum_1 = require("../enum/messageEnum");
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || statusEnum_1.StatusEnum.SERVER_ERROR;
    let message = err.message || messageEnum_1.MessageEnum.SERVER_ERROR;
    console.error(`error --- ${message} ------ ${statusCode}`);
    if (err instanceof appError_1.AppError) {
        res.status(statusCode).json({
            success: false,
            message: message,
        });
        return;
    }
};
exports.globalErrorHandler = globalErrorHandler;
