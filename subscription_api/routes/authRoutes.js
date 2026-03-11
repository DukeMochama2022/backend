import { Router } from "express";
import { signUp,signIn,logout } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signup",signUp);
authRouter.post("/signin",signIn);
authRouter.post("/logout",logout);

export default authRouter;


