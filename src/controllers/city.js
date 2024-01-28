const HttpException = require("../middlewares/http-exception");

const loggerUtil = require("../utils/loggerUtil");

const HttpStatus = require("../utils/httpStatus");

const {
  checkCityExits,
  createCity,
  findSingleCity,
  getAllCites,
  updateCity,
  deleteSuburbs,
  deleteCity,
} = require("../helpers/cityHelper");

// deactivated this  function because cities will be seeded
exports.createCity = async (req, res, next) => {
  try {
    const data = req.body;
    const cityExits = await checkCityExits(data.city_name);
    if (cityExits) {
      loggerUtil.error("City Already Exists");
      throw new HttpException(
        HttpStatus.UNPROCESSABLE_ENTITY,
        "City Already Exists"
      );
    } else {
      const city = await createCity(data);
      res.status(HttpStatus.CREATED).json({
        city,
      });
    }
  } catch (error) {
    loggerUtil.error(error.message);
    next(
      new HttpException(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message
      )
    );
  }
};

//    endpoint to get cities

exports.getCities = async (req, res, next) => {
  try {
    const cities = await getAllCites();

    res.status(HttpStatus.OK).json({
      cities,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
};
//  get a single city

exports.getSingleCity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const city = await findSingleCity(id);

    res.status(HttpStatus.OK).json({
      city,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
};

//   endpoint to update a city

exports.updateCity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (id) {
      const findCity = await findSingleCity(id);
      if (!findCity) {
        throw new HttpException(HttpStatus.NOT_FOUND, "City not found");
      } else {
        const city = await updateCity(id, data);
        res.status(HttpStatus.OK).json({
          city,
        });
      }
    } else {
      throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, "Invalid input");
    }
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
};

//  deleting a city
exports.removeCity = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, "Invalid input");
    } else {
      await deleteSuburbs(id);
      const cities = await deleteCity(id);
      res.status(HttpStatus.OK).json({
        status: "successful",
        message: "city deleted",
        cities,
      });
    }
  } catch (error) {
    loggerUtil.error(error.message);
    next(
      new HttpException(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message
      )
    );
  }
};
