const { Router } = require('express');
const timer = require('../../../controllers/time');

const ManageTimeRouter = Router();
ManageTimeRouter.get('/', timer.time);
module.exports = ManageTimeRouter;
