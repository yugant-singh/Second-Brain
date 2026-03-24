import express from 'express'
import {registerController,loginController,getMeController} from '../controllers/auth.controller.js'
import {authMiddleware} from '../middlewares/auth.middleware.js'
export const authRouter = express.Router()

authRouter.post('/register',registerController)
authRouter.post('/login',loginController)
authRouter.get('/get-me',authMiddleware,getMeController)