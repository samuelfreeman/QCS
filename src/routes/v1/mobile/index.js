import { Router } from "express";
import timeRouter from "./time.js";
import SenderRouter from "./sender.js";
import OrderRouter from "./orders.js";
import cityRouter from "./city.js";
import priceRouter from "./prices.js";
import bikerRouter from "./biker.js";

const WebRouter = Router();
WebRouter.use("/bikers", bikerRouter);
WebRouter.use("/time", timeRouter);
WebRouter.use("/senders", SenderRouter);
WebRouter.use("/orders", OrderRouter);
WebRouter.use("/cities", cityRouter);
WebRouter.use("/price", priceRouter);

export default WebRouter;
