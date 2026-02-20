import { Router } from "express";

import { protect, authorize } from "../middleware/authMiddleware.js";
import { getProfile } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/:id", protect, getProfile);


export default userRouter