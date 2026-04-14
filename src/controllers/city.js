import HttpException from "../middlewares/http-exception.js";
import loggerUtil from "../utils/loggerUtil.js";
import HttpStatus from "../utils/httpStatus.js";
import * as cityHelpers from "../helpers/cityHelper.js";

// deactivated this  function because cities will be seeded
export const createCity = async (req, res, next) => {
  try {
    const data = req.body;
    const cityExits = await cityHelpers.checkCityExits(data.city_name);
    if (cityExits) {
      loggerUtil.error("City Already Exists");
      throw new HttpException(
        HttpStatus.UNPROCESSABLE_ENTITY,
        "City Already Exists",
      );
    } else {
      const city = await cityHelpers.createCity(data);
      res.status(HttpStatus.CREATED).json({
        city,
      });
    }
  } catch (error) {
    loggerUtil.error(error.message);
    next(
      new HttpException(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      ),
    );
  }
};

//    endpoint to get cities

export const getCities = async (req, res, next) => {
  try {
    const cities = await cityHelpers.getAllCites();

    res.status(HttpStatus.OK).json({
      cities,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
};
//  get a single city

export const getSingleCity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const city = await cityHelpers.findSingleCity(id);

    res.status(HttpStatus.OK).json({
      city,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
};

//   endpoint to update a city

export const updateCity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (id) {
      const findCity = await cityHelpers.findSingleCity(id);
      if (!findCity) {
        throw new HttpException(HttpStatus.NOT_FOUND, "City not found");
      } else {
        const city = await cityHelpers.updateCity(id, data);
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
export const removeCity = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, "Invalid input");
    } else {
      await cityHelpers.deleteSuburbs(id);
      const cities = await cityHelpers.deleteCity(id);
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
        error.message,
      ),
    );
  }
};
