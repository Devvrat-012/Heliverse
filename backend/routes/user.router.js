import express from "express";
import { createUser, getUsers } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/create-user", createUser);
userRouter.get("/get-users", getUsers);

export default userRouter;
