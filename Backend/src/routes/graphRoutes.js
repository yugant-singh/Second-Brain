import express from "express";
const graphRouter = express.Router();
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getGraphData } from "../controllers/graphController.js";

graphRouter.get("/", authMiddleware, getGraphData);

export default graphRouter;