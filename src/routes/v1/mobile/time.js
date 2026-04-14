import { Router } from "express";
import * as timer from "../../../controllers/time.js";

const ManageTimeRouter = Router();

/**
 * @swagger
 * /api/v1/mobile/time:
 *   get:
 *     summary: Get current server time
 *     tags: [Mobile - Time]
 *     responses:
 *       200:
 *         description: Current server time
 */
ManageTimeRouter.get("/", timer.time);
export default ManageTimeRouter;
