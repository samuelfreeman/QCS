
const prisma = require("../utils/prismaUtil");

const HttpException = require("../middlewares/http-exception");

const loggerUtil = require("../utils/loggerUtil");

const HttpStatus = require("../utils/httpStatus");

//  adding a suburb
exports.createSuburb = async (req, res, next) => {
  try {
    const data = req.body;
    const city = await prisma.suburbs.create({
      data,
    });
    res.status(HttpStatus.CREATED).json({
      city,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, error.message));
  }
};
//  get a single city suburbs
exports.getCitySuburbs = async (req, res, next) => {
  const { cityId } = req.params;
  try {
    const suburbs = await prisma.suburbs.findMany({
      where: {
        cityId,
      },
      include: {
        cities: true,
      },
    });

    res.status(HttpStatus.OK).json({
      suburbs,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.NOT_FOUND, error.message));
  }
};
//  getting a single suburb
exports.getSingleSuburb = async (req, res, next) => {
  const { id } = req.params;
  try {
    const suburbs = await prisma.suburbs.findFirst({
      where: {
        id,
      },
      include: {
        cities: true,
      },
    });

    res.status(HttpStatus.OK).json({
      suburbs,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(
      new HttpException(error.status || HttpStatus.NOT_FOUND, error.message)
    );
  }
};

//  updating a suburb by city id
exports.updateSuburbCityId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { cityId } = req.body;
    const updatedSuburb = await prisma.suburbs.update({
      where: {
        id,
      },
      data: {
        cityId: cityId,
      },
    });
    res.status(HttpStatus.OK).json({
      updatedSuburb,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(
      new HttpException(
        error.status || HttpStatus.UNPROCESSABLE_ENTITY,
        error.message
      )
    );
  }
};
exports.updateSuburb = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedSuburb = await prisma.suburbs.update({
      where: {
        id,
      },
      data,
    });
    res.status(HttpStatus.OK).json({
      updatedSuburb,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(
      new HttpException(
        error.status || HttpStatus.UNPROCESSABLE_ENTITY,
        error.message
      )
    );
  }
};
//  deleting a suburb
exports.removeSuburb = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, "Invalid input");
    } else {
      const suburb = await prisma.suburbs.delete({
        where: {
          id,
        },
      });
      res.status(HttpStatus.OK).json({
        suburb,
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

