const prisma = require("../utils/prismaUtil");

const HttpException = require("../middlewares/http-exception");

const loggerUtil = require("../utils/loggerUtil");

const tokenUtil = require("../utils/tokenUtil");

const {
  CREATED,
  DELIVERED,
  DISPATCHED,
  ARRIVED,
  shares,
  RETURNED,
} = require("../utils/constants");

const HttpStatus = require("../utils/httpStatus");

const {
  orderCheckPickup,
  orderCheckDeliver,
  bikerDeliveryShares,
  bikerPickupShares,
  updtBiker,
  checkBikerExists,
  saveBiker,
  getBikers,
  getOneBiker,
} = require("../helpers/bikerHelper");

exports.createBiker = async (req, res, next) => {
  try {
    const data = req.body;
    const telephone = formatGhPhoneNumber(data.telephone);
    const oldBiker = await checkBikerExists(telephone);
    if (oldBiker) {
      loggerUtil.error("Biker Already Exists");
      throw new HttpException(
        HttpStatus.UNPROCESSABLE_ENTITY,
        "Biker Already Exists"
      );
    }
    data.code = "1234";
    const password = await passwordUtil.hashPassword(data.password);
    // use data.passowrd to create a hashed password
    data.password = password;
    data.telephone = telephone;
    const biker = await saveBiker(data);
    // delete user.password;
    delete biker.password;
    res.status(HttpStatus.CREATED).json({
      biker,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, error.message));
  }
};

exports.getAllBikers = async (req, res, next) => {
  try {
    const { location } = req.params;
    const bikers = await getBikers(location);

    res.status(HttpStatus.OK).json({
      bikers,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.NOT_FOUND, error.message));
  }
};

exports.getSingleBiker = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bikers = await getOneBiker(id);
    res.status(HttpStatus.OK).json({
      bikers,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.NOT_FOUND, error.message));
  }
};

exports.updateBiker = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (data.password) {
      data.password = await passwordUtil.hashPassword(data.password);
    }
    const user = await updtBiker(id, data);

    res.status(HttpStatus.OK).json({
      user,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, error.message));
  }
};
//  deleting a bicker
exports.removeBiker = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await prisma.bikers.delete({
      where: {
        id,
      },
    });

    res.status(HttpStatus.OK).json({
      user,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, error.message));
  }
};
exports.logout = async (req, res, next) => {
  try {
    const loggedout = "loggedout";
    tokenUtil.setInvalidToken(loggedout);
    return res.status(HttpStatus.OK).json({
      status: "success",
      message: "logged out",
    });
  } catch (error) {
    loggerUtil.error(error.message);
    return next(
      new HttpException(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message
      )
    );
  }
};

// Assign  packages to pickup function
exports.packagePickup = async (req, res, next) => {
  try {
    const { pickupBikerId, packages } = req.body;
    await orderCheckPickup(packages, pickupBikerId);
    const updatePackages = await prisma.orderPackages.updateMany({
      where: {
        id: {
          in: packages,
        },
      },
      data: {
        pickupBikerId,
      },
    });
    if (updatePackages.length === 0) {
      throw new HttpException(
        HttpStatus.NOT_FOUND,
        "Package to update not found"
      );
    } else {
      res.status(HttpStatus.OK).json({
        updatePackages,
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

//   Assign packages to deliver function

exports.packageDelivery = async (req, res, next) => {
  try {
    const { deliverBikerId, packages } = req.body;

    await orderCheckDeliver(packages, deliverBikerId);
    const packageUpdate = await prisma.orderPackages.updateMany({
      where: {
        id: {
          in: packages,
        },
      },
      data: {
        deliverBikerId,
        status: DISPATCHED,
      },
    });

    for (let id of packages) {
      const history = await prisma.packageHistories.create({
        data: {
          status: DISPATCHED,
          packageId: id,
        },
      });
    }

    res.status(HttpStatus.OK).json({
      package: packageUpdate,
    });
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

// Biker pickups function
exports.packagesToPickup = async (req, res, next) => {
  try {
    const { limit } = req.body;
    const { id } = req.params;

    const packages = await prisma.orderPackages.findMany({
      where: {
        pickupBikerId: id,
        status: CREATED,
        del_flg: false,
      },
      include: {
        orders: {
          include: {
            sender: true,
          },
        },
      },
    });

    const limitedPackages = (await limit) ? packages.slice(0, limit) : packages;

    res.status(HttpStatus.OK).json({
      packages: limitedPackages,
    });
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

// Biker pickups function
exports.bikerShares = async (req, res, next) => {
  try {
    const { bikerId, type, dates } = req.body;

    const delivery_share = await bikerDeliveryShares(type, bikerId, dates);
    const pickup_share = await bikerPickupShares(type, bikerId, dates);

    res.status(HttpStatus.OK).json({
      delivery_share,
      pickup_share,
    });
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
//   Biker deliveries dispatched function

exports.packagesToDeliver = async (req, res, next) => {
  try {
    const { limit } = req.body;
    const { id } = req.params;

    const packages = await prisma.orderPackages.findMany({
      where: {
        deliverBikerId: id,
        del_flg: false,
        status: DISPATCHED,
      },
      include: {
        receiver: true,
      },
    });

    const limitedPackages = limit ? packages.slice(0, limit) : packages;

    res.status(HttpStatus.OK).json({
      packages: limitedPackages,
    });
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

//   Biker deliveries delivered function

exports.getBikerDeliveries = async (req, res, next) => {
  const { id } = req.params; // get the package Id

  try {
    const packages = await prisma.orderPackages.findMany({
      where: {
        deliverBikerId: id,
        del_flg: false,
        status: DELIVERED,
      },
    });

    res.status(HttpStatus.OK).json({
      packages,
    });
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

exports.getBikerPickups = async (req, res, next) => {
  const { id } = req.params; // get the package Id

  try {
    const packages = await prisma.orderPackages.findMany({
      where: {
        pickupBikerId: id,
        del_flg: false,
        packageHistories: {
          some: {
            status: ARRIVED,
          },
        },
      },
    });
    res.status(HttpStatus.OK).json({
      packages,
    });
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
