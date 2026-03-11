import { Router } from "express";
import {
  createSubscription,
  getUserSubscription,
  updateSubscription,
  cancelSubscription,
} from "../controllers/subscriptionController.js";
import authorize from "../middlewares/authMiddleware.js";

const subscriptionRouter = Router();

subscriptionRouter.post("/create", authorize, createSubscription);
subscriptionRouter.get("/my-subscriptions", authorize, getUserSubscription);
subscriptionRouter.put("/update/:id", authorize, updateSubscription);
subscriptionRouter.put("/:id/cancel", authorize, cancelSubscription);

export default subscriptionRouter;
