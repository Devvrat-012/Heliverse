import express from 'express';
import { createUser } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post("/create-user", createUser);

export default userRouter;   