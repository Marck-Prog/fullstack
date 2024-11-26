import express from "express";
import {
  adminLogin,
  loginUser,
  registerUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/register", loginUser);
userRouter.post("/register", adminLogin);

export default userRouter;
