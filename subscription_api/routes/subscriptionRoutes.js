import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.post("/subscribe");
subscriptionRouter.get("/:id");
subscriptionRouter.get("/user/:id");
subscriptionRouter.get("/");
subscriptionRouter.get("/upcoming-renewals");
subscriptionRouter.put("/update/:id");
subscriptionRouter.put("/:id/cance/");
subscriptionRouter.delete("/delete/:id");

export default subscriptionRouter;
