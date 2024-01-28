const { Router } = require('express');
const orders = require('../../../controllers/orders');

const ManageOrderRouter = Router();

ManageOrderRouter.post('/', orders.createOrder);
ManageOrderRouter.get('/', orders.getAllOrders);
ManageOrderRouter.delete('/:code', orders.deleteOrder);
ManageOrderRouter.get('/status/:status/location/:location', orders.getOrdersByStatus);
ManageOrderRouter.get('/package/:id/', orders.getPackage);
ManageOrderRouter.delete('/package/:id', orders.deletePackage);
ManageOrderRouter.patch('/package/bulk/', orders.updateMultiplePackages);
ManageOrderRouter.patch('/package/:id/', orders.updatePackage);
ManageOrderRouter.get('/analytics/:location', orders.getAnalytics);
module.exports = ManageOrderRouter;
