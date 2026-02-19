import express from "express";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser())

import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import adminRouter from "./routes/adminRoutes.js"



//api endpoints
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/admin", adminRouter);
export default app;
