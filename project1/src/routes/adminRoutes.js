import { Router } from "express";

import { protect, authorize } from "../middleware/authMiddleware.js";

import { getAllUsers } from "../controllers/adminDashboardController.js";

const adminRouter = Router();

adminRouter.get("/all", protect, authorize("admin"), getAllUsers);

export default adminRouter;
