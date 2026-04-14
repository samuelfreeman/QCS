import { Router } from "express";
import WebRouter from "./web/index.js";
import mobileRouter from "./mobile/index.js";

const V1Router = Router();
V1Router.use("/web", WebRouter);
V1Router.use("/mobile", mobileRouter);

export default V1Router;
