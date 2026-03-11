import { WorkflowError } from "@upstash/workflow";
import { Router } from "express";
import { sendReminders } from "../controllers/workflowController.js";

const workFlowRouter = Router();

workFlowRouter.post("/subscription/reminder", sendReminders);
export default workFlowRouter;
