import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import subscriptionRouter from "./routes/subscriptionRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import arcjetMiddleware from "./middlewares/arcjetMiddleware.js";
import workFlowRouter from "./routes/workflowRoutes.js"

console.log("SMTP USER:", process.env.EMAIL_USER);
console.log("EMAIL PASS:", process.env.EMAIL_PASS);

const app = express();

app.use(express.json());
app.use(cookieParser());
//app.use(arcjetMiddleware);

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to subscription tracker api");
});

//routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/subscriptions", subscriptionRouter);
app.use("/api/workflows", workFlowRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
