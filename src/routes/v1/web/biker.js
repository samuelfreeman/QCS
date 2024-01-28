const { Router } = require('express');
const biker = require('../../../controllers/biker');
const ManageBikerRouter = Router();

ManageBikerRouter.patch('/pickUp', biker.packagePickup);
ManageBikerRouter.patch('/delivery', biker.packageDelivery);
ManageBikerRouter.get('/pickUp/:id', biker.packagesToPickup);
ManageBikerRouter.post('/shares', biker.bikerShares);
module.exports = ManageBikerRouter;
