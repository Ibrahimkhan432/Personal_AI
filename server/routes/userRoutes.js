import express from 'express'
import { getPublishedCreations, getUserController, toggleLikeCreation } from '../contoller/userController.js';
import { auth } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.get('/get-user-creations', auth, getUserController)
userRouter.get('/get-published-creations', auth, getPublishedCreations)
userRouter.post('/toggle-like-creation', auth, toggleLikeCreation)

export default userRouter;