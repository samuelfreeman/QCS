const { Router } = require('express');
const timeRouter = require('./time');

const SenderRouter = require('./sender');
const OrderRouter = require('./orders');
const cityRouter = require('./city');
const priceRouter = require('./prices');
const bikerRouter = require('./biker');
const WebRouter = Router();
WebRouter.use('/bikers', bikerRouter);
WebRouter.use('/time', timeRouter);
WebRouter.use('/senders', SenderRouter);
WebRouter.use('/orders', OrderRouter);
WebRouter.use('/cities', cityRouter);
WebRouter.use('/price', priceRouter);

module.exports = WebRouter;
