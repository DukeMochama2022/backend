import express from "express";
const app = express();
app.use(express.json());
import userRouter from "./routes/userRoutes.js";

//api endpoints
app.use("/api/users", userRouter);
export default app;
