import { Router } from "express";

import { getUser, getUsers } from "../controllers/userController.js";
import authorize from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", authorize, getUser);
userRouter.post("/");
userRouter.put("/update/:id");
userRouter.delete("/delete/:id");

export default userRouter;
