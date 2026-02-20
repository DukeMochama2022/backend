import { Router } from "express";

import { protect, authorize } from "../middleware/authMiddleware.js";

import {
  getAllUsers,
  promoteToAdmin,
} from "../controllers/adminDashboardController.js";

const adminRouter = Router();

adminRouter.get("/all", protect, authorize("admin"), getAllUsers);
adminRouter.put("/promote/:id", protect, authorize("admin"), promoteToAdmin);

export default adminRouter;
