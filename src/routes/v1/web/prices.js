const { Router } = require('express');
const ManagePriceRouter = Router();
const prices = require('../../../controllers/deliveryPrices');

ManagePriceRouter.post('/', prices.createPrice);
ManagePriceRouter.post('/bulk/', prices.createBulkPrice);
ManagePriceRouter.get('/city/:cityId/destination/:destinationId', prices.getPrice);
ManagePriceRouter.get('/', prices.getPrices);
ManagePriceRouter.get('/:location', prices.getSinglePriceLocation);
ManagePriceRouter.patch('/:id', prices.updatePrice);
ManagePriceRouter.delete('/:id', prices.deleteprice);
module.exports = ManagePriceRouter;
