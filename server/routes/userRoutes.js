import express from 'express'
import { getPublishedCreations, getUserController, toggleLikeCreation } from '../contoller/userController';
import { auth } from '../middleware/auth';

const userRouter = express.Router();

userRouter.get('/get-user-creations', auth, getUserController)
userRouter.get('/get-published-creations', auth, getPublishedCreations)
userRouter.get('/get-like-creations', auth, toggleLikeCreation)