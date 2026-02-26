import { Router } from "express";

const userRouter = Router();

userRouter.get("/users");
userRouter.get("/:id");
userRouter.post("/");
userRouter.put("/update/:id");
userRouter.delete("/delete/:id");


export default userRouter