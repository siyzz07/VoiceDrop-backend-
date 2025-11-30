export  enum MessageEnum{


//----------------------------- USER
USER_ALREADY_EXIST ='User already exist',
USER_REGISTER_SUCCESS = 'User registered successfully',
USER_NOT_FOUND ='User not found' ,
USER_REGISTER_FAILED ='User registration failed',
INVALID_PASSWORD ='Invalid password',
LOGIN_SUCCESS ='Login successful',
LOGIN_FAILED = 'Login failed' ,
USER_LOGOUT_SUCCESS ='Logout successful' ,
TOKEN_EXPIRED = 'Token expired' ,
TOKEN_INVALID = 'Invalid token' ,
TOKEN_MISSING = 'Token missing' ,
REFRESH_TOKEN_EXPIRED ='Refresh token expired',

//-------------------------------server
SERVER_ERROR='Server error',


//-------------------------------otp
OTP_SEND_SUCCESS = 'OTP sent successfully',
OTP_RESEND_SUCCESS = 'OTP resent successfully',
OTP_MATCH_FAILED = 'Invalid OTP',
OTP_MATCH_SUCCESS = 'OTP matched successfully',
OTP_EXPIRED = 'OTP expired. Please request a new one'


}