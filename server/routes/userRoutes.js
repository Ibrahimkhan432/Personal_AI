import express from 'express'
import { getUserController } from '../contoller/userController';
import { auth } from '../middleware/auth';

const userRouter = express.Router();

userRouter.get('get-user-creations',auth, getUserController)