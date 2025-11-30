"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEnum = void 0;
var MessageEnum;
(function (MessageEnum) {
    //----------------------------- USER
    MessageEnum["USER_ALREADY_EXIST"] = "User already exist";
    MessageEnum["USER_REGISTER_SUCCESS"] = "User registered successfully";
    MessageEnum["USER_NOT_FOUND"] = "User not found";
    MessageEnum["USER_REGISTER_FAILED"] = "User registration failed";
    MessageEnum["INVALID_PASSWORD"] = "Invalid password";
    MessageEnum["LOGIN_SUCCESS"] = "Login successful";
    MessageEnum["LOGIN_FAILED"] = "Login failed";
    MessageEnum["USER_LOGOUT_SUCCESS"] = "Logout successful";
    MessageEnum["TOKEN_EXPIRED"] = "Token expired";
    MessageEnum["TOKEN_INVALID"] = "Invalid token";
    MessageEnum["TOKEN_MISSING"] = "Token missing";
    MessageEnum["REFRESH_TOKEN_EXPIRED"] = "Refresh token expired";
    //-------------------------------server
    MessageEnum["SERVER_ERROR"] = "Server error";
    //-------------------------------otp
    MessageEnum["OTP_SEND_SUCCESS"] = "OTP sent successfully";
    MessageEnum["OTP_RESEND_SUCCESS"] = "OTP resent successfully";
    MessageEnum["OTP_MATCH_FAILED"] = "Invalid OTP";
    MessageEnum["OTP_MATCH_SUCCESS"] = "OTP matched successfully";
    MessageEnum["OTP_EXPIRED"] = "OTP expired. Please request a new one";
})(MessageEnum || (exports.MessageEnum = MessageEnum = {}));
