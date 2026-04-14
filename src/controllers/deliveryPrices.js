import prisma from "../utils/prismaUtil.js";
import HttpException from "../middlewares/http-exception.js";
import loggerUtil from "../utils/loggerUtil.js";
import HttpStatus from "../utils/httpStatus.js";
export const createPrice = async (req, res, next) => {
  try {
    const data = req.body;
    const price = await prisma.deliveryPrices.create({
      data,
    });
    res.status(HttpStatus.CREATED).json({
      price,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(
      new HttpException(
        error.status || HttpStatus.UNPROCESSABLE_ENTITY,
        error.message,
      ),
    );
  }
};
export const createBulkPrice = async (req, res, next) => {
  try {
    const { prices } = req.body;

    if (prices.length === 0 || Object.keys(prices).length == 0) {
      throw new HttpException(HttpStatus.NOT_FOUND, "No input available");
    } else {
      const price = await prisma.deliveryPrices.createMany({
        data: prices,
      });
      res.status(HttpStatus.CREATED).json({
        price,
      });
    }
  } catch (error) {
    loggerUtil.error(error.message);
    next(
      new HttpException(
        error.status || HttpStatus.UNPROCESSABLE_ENTITY,
        error.message,
      ),
    );
  }
};

export const getSinglePriceLocation = async (req, res, next) => {
  try {
    const { location } = req.params;
    const price = await prisma.deliveryPrices.findMany({
      where: {
        destinationId: location,
      },
      include: {
        cities: true,
        destination: true,
      },
    });

    res.status(HttpStatus.OK).json({
      price,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(
      new HttpException(error.status || HttpStatus.NOT_FOUND, error.message),
    );
  }
};

export const getPrice = async (req, res, next) => {
  try {
    const { cityId, destinationId } = req.params;

    const prices = await prisma.deliveryPrices.findFirst({
      where: {
        OR: [
          {
            cityId,
            destinationId,
          },
          {
            cityId: destinationId,
            destinationId: cityId,
          },
        ],
      },
    });
    res.status(HttpStatus.OK).json({
      prices,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(
      new HttpException(error.status || HttpStatus.NOT_FOUND, error.message),
    );
  }
};
export const getPrices = async (req, res, next) => {
  try {
    const prices = await prisma.deliveryPrices.findMany({
      include: {
        cities: true,
        destination: true,
      },
    });
    res.status(HttpStatus.OK).json({
      prices,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(
      new HttpException(error.status || HttpStatus.NOT_FOUND, error.message),
    );
  }
};

export const updatePrice = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const prices = await prisma.deliveryPrices.update({
      where: {
        id,
      },
      data: data,
    });
    res.status(HttpStatus.OK).json({
      prices,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(
      new HttpException(
        error.status || HttpStatus.UNPROCESSABLE_ENTITY,
        error.message,
      ),
    );
  }
};
export const deleteprice = async (req, res, next) => {
  const { id } = req.params;
  try {
    const checkcity = await findCity(id);
    if (!checkcity) {
      throw new HttpException(HttpStatus.NOT_FOUND, "City not found!");
    } else {
      const prices = await prisma.deliveryPrices.deleteMany({
        where: {
          cityId: id,
        },
      });
      res.status(HttpStatus.OK).json({
        mssage: "deleted price",
        prices,
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
