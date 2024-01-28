const { Router } = require("express");
const biker = require("../../../controllers/biker");
const ManageBikerRouter = Router();
// register biker
ManageBikerRouter.post("/register", biker.createBiker);
//  get all bikers
ManageBikerRouter.get("/", biker.getAllBikers);
// get a single biker
ManageBikerRouter.get("/:id", biker.getSingleBiker);
// update a single bker
ManageBikerRouter.patch("/:id", biker.updateBiker);
// delete a single  biker
ManageBikerRouter.delete("/:id", biker.removeBiker);
// get a biker's pickup packages
ManageBikerRouter.get("/:id/pickups", biker.packagesToPickup);
// get a biker's pickup deliveries
ManageBikerRouter.get("/:id/deliveries", biker.packagesToDeliver);
// get a biker's  completed deliveries
ManageBikerRouter.get("/:id/completed-deliveries", biker.getBikerDeliveries);
// get a biker's  completed pick ups
ManageBikerRouter.get("/:id/completed-pickups", biker.getBikerPickups);
//  git a biker's shares
ManageBikerRouter.post("/shares", biker.bikerShares);

module.exports = ManageBikerRouter;
