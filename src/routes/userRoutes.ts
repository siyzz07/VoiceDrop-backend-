import express from 'express'
import authController from '../controllers/auth-controller'

const userRoute=express.Router()

userRoute.post('/verify',authController.VarifyNumber)
userRoute.post ('/emailVerify',authController.varifyEmail)
userRoute.post('/checkOtp',authController.checkOtp  )
userRoute.post('/registerUser',authController.registerUser )



export default userRoute