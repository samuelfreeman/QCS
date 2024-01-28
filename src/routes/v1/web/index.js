const { Router } = require("express");
const UserRouter = require("./user");
const cityRouter = require("./city");
const OrderRouter = require("./orders");
const pricesRouter = require("./prices");
const bikerRouter = require("./biker");
const suburbRouter = require("./suburb");
const senderRouter = require('./sender')
const WebRouter = Router();

WebRouter.use("/sender",senderRouter );
WebRouter.use("/suburb", suburbRouter);
WebRouter.use("/biker", bikerRouter);
WebRouter.use("/prices", pricesRouter);
WebRouter.use("/users", UserRouter);
WebRouter.use("/cities", cityRouter);
WebRouter.use("/orders", OrderRouter);
module.exports = WebRouter;
