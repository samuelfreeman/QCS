import { Router } from "express";
import UserRouter from "./user.js";
import cityRouter from "./city.js";
import OrderRouter from "./orders.js";
import pricesRouter from "./prices.js";
import bikerRouter from "./biker.js";
import suburbRouter from "./suburb.js";
import senderRouter from "./sender.js";

const WebRouter = Router();

WebRouter.use("/sender", senderRouter);
WebRouter.use("/suburb", suburbRouter);
WebRouter.use("/biker", bikerRouter);
WebRouter.use("/prices", pricesRouter);
WebRouter.use("/users", UserRouter);
WebRouter.use("/cities", cityRouter);
WebRouter.use("/orders", OrderRouter);

export default WebRouter;
