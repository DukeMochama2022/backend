import { Router } from "express";

import {
  createPost,
  getPosts,
  deletePost,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const postRouter = Router();

postRouter.post("/create", protect, createPost);
postRouter.get("/", getPosts);
postRouter.delete("/delete/:id", protect, deletePost);

export default postRouter;
