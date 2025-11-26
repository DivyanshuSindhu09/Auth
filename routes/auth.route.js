import express from "express";
import { login, logout, sendverificationOTP, signUp, verifyOTP } from "../controllers/user.controller.js";
import { userAuth } from "../middlewares/auth.js";

const authRouter = express.Router();

authRouter.post('/signup', signUp)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/send-verification-otp', userAuth, sendverificationOTP)
authRouter.post('/verify-otp', userAuth, verifyOTP)

export default authRouter;