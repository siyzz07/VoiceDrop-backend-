"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEnum = void 0;
var MessageEnum;
(function (MessageEnum) {
    //----------------------------- USER
    MessageEnum["USER_ALREADY_EXIST"] = "User already exist";
    MessageEnum["USER_REGISTER_SUCCESS"] = "User registered successfully";
    //-------------------------------server
    MessageEnum["SERVER_ERROR"] = "Server error";
    //-------------------------------otp
    MessageEnum["OTP_SEND_SUCCESS"] = "OTP sent successfully";
    MessageEnum["OTP_RESEND_SUCCESS"] = "OTP resent successfully";
    MessageEnum["OTP_MATCH_FAILED"] = "Invalid OTP";
    MessageEnum["OTP_MATCH_SUCCESS"] = "OTP matched successfully";
    MessageEnum["OTP_EXPIRED"] = "OTP expired. Please request a new one";
})(MessageEnum || (exports.MessageEnum = MessageEnum = {}));
