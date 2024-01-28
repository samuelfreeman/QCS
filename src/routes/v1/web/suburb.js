const { Router } = require("express");
const suburb = require("../../../controllers/suburb");

const ManageSuburbRouter = Router();

ManageSuburbRouter.get("/:cityId/suburbs", suburb.getCitySuburbs);
ManageSuburbRouter.post("/suburb", suburb.createSuburb);
ManageSuburbRouter.patch("/destination/:id", suburb.updateSuburbCityId);
ManageSuburbRouter.delete("/suburb/:id", suburb.removeSuburb);
ManageSuburbRouter.patch("/suburb/:id", suburb.updateSuburb);
ManageSuburbRouter.get("/suburb/:id", suburb.getSingleSuburb);

module.exports = ManageSuburbRouter;
