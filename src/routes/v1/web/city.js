const { Router } = require("express");
const city = require("../../../controllers/city");

const ManageSuburbRouter = Router();

ManageSuburbRouter.post("/", city.createCity);
ManageSuburbRouter.patch("/:id", city.updateCity);
ManageSuburbRouter.get("/", city.getCities);
ManageSuburbRouter.get("/:id", city.getSingleCity);
ManageSuburbRouter.delete("/city/:id", city.removeCity);

module.exports = ManageSuburbRouter;
