const { Router } = require('express');
const ManagePriceRouter = Router();
const prices = require('../../../controllers/deliveryPrices');

ManagePriceRouter.get('/city/:cityId/destination/:destinationId', prices.getPrice);
ManagePriceRouter.get('/', prices.getPrices);
module.exports = ManagePriceRouter;
