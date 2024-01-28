const { validationResult } = require('express-validator');
const HttpException = require('../http-exception');
const { validationHandler } = require('../validationHandler');
exports.validateRequestSchema = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors?.isEmpty()) {
        const errorFields = await validationHandler(errors.array());
        if (errorFields.length > 0) {
            let message = '';
            errorFields.map(error => {
                message += error.message + ', ';
            });

            next(new HttpException(422, message));
        } else {
            next();
        }
    }
    next();
};
