import { Router } from "express";
import V1Router from "./v1/index.js";

const APIRouter = Router();
APIRouter.use("/v1", V1Router);

export default APIRouter;
