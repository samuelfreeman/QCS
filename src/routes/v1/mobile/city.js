const { Router } = require('express');
const suburb = require('../../../controllers/suburb');
const city = require('../../../controllers/city')
const ManageSuburbRouter = Router();

ManageSuburbRouter.get('/:cityId/suburbs', suburb.getCitySuburbs);
ManageSuburbRouter.get('/', city.getCities);

module.exports = ManageSuburbRouter;
