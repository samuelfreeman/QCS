const { Router } = require('express');
const WebRouter = require('./web');
const mobileRouter = require('./mobile');
const V1Router = Router();
V1Router.use('/web', WebRouter);
V1Router.use('/mobile', mobileRouter);
module.exports = V1Router;
