// TO Do : seperate orders from order  : from order packages

import prisma from "../utils/prismaUtil.js";
import moment from "moment";
import HttpException from "../middlewares/http-exception.js";
import loggerUtil from "../utils/loggerUtil.js";
import { formatGhPhoneNumber } from "../utils/commonUtil.js";
import constants from "../utils/constants.js";
import {
  checkReceiverExists,
  findSurbCity,
  getOrderByStatus,
  getCityOrderByStatus,
  createResultLookup,
  formatResult,
  getStatusOrders,
  updatePackageStatus,
  getPackageDetails,
  updatePackages,
} from "../helpers/orderHelper.js";
import HttpStatus from "../utils/httpStatus.js";
import { nanoid } from "nanoid";

// function to create an order
export const createOrder = async (req, res, next) => {
  try {
    const { packages, pickUpLocation, senderId, ...orders } = req.body;
    const orderCode = nanoid(10).toUpperCase();

    const ordered = await prisma.orders.create({
      data: {
        orderCode,
        pickUpLocation,
        senderId,
        ...orders,
      },
    });

    await Promise.all([
      packages?.map(
        async ({
          receiverId,
          receiver,
          deliveryLocation,
          ...packageDetails
        }) => {
          const receivedBy = await checkReceiverExists(
            receiverId,
            receiver,
            senderId,
          );
          const senderCity = await findSurbCity(pickUpLocation);
          const deliveryCity = await findSurbCity(deliveryLocation);
          const senderCityInitials = senderCity.cities.initials;
          const deliveryCityInitials = deliveryCity.cities.initials;
          const today = moment().format("YYYYMMDDHHmmss");
          const packageOrderCode =
            senderCityInitials + "-" + today + "-" + deliveryCityInitials;
          await prisma.orderPackages.create({
            data: {
              ...packageDetails,
              orderCode: packageOrderCode.toUpperCase(),
              suburb: {
                connect: {
                  id: deliveryLocation,
                },
              },
              receiver: {
                connect: {
                  id: receivedBy,
                },
              },
              status: "Created",
              orders: {
                connect: {
                  orderCode: ordered.orderCode,
                },
              },
              packageHistories: {
                create: {
                  status: CREATED,
                },
              },
            },
          });
        },
      ),
    ]);
    return res.status(HttpStatus.CREATED).json({
      orderCode,
      message: "Order Created Successfully!",
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

//   function to get order by  order code
export const getOrderByCode = async (req, res, next) => {
  const { orderCode } = req.params;
  try {
    const order = await prisma.orders.findUnique({
      where: {
        orderCode,
      },
      include: {
        packages: {
          where: {
            del_flg: false,
          },
          include: {
            receiver: true,
            packageHistories: true,
          },
        },

        sender: true,
      },
    });

    return res.status(HttpStatus.OK).json({
      order,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(
      new HttpException(error.status || HttpStatus.NOT_FOUND, error.message),
    );
  }
};

// function to get all present orders
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await prisma.orders.findMany({
      include: {
        packages: {
          where: {
            del_flg: false,
          },
          include: {
            receiver: true,
            packageHistories: true,
          },
        },
        sender: true,
      },
    });
    return res.status(HttpStatus.OK).json({
      orders,
      message: "orders",
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(
      new HttpException(error.status || HttpStatus.NOT_FOUND, error.message),
    );
  }
};
//  orders  by sender id
export const updateOrdersBySenderId = async (req, res, next) => {
  const { senderId } = req.params; // get the senderId from the request parameters
  const updateData = req.body; // get the new data from the request body
  try {
    // update the orders
    const updatedOrders = await prisma.orders.updateMany({
      where: { senderId: senderId },
      data: updateData,
    });

    res.status(HttpStatus.OK).json({
      message: "Orders updated",
      updatedOrders,
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
//  order packages
export const getAnalytics = async (req, res, next) => {
  try {
    const location = req.params.location; // get location from request parameters
    const orderStatuses = [CREATED, PROCESSED, ARRIVED];
    const cityStatuses = [DELIVERED, DISPATCHED, RETURNED, ENROUTE, PENDING];

    const resultOrder = await getOrderByStatus(orderStatuses, location);
    const resultCity = await getCityOrderByStatus(cityStatuses, location);

    const resultLookup = createResultLookup([...resultOrder, ...resultCity]);
    const formattedResult = formatResult(
      [...orderStatuses, ...cityStatuses],
      resultLookup,
    );

    res.status(HttpStatus.OK).json({ statuses: formattedResult });
  } catch (error) {
    loggerUtil.error(error.message);
    next(
      new HttpException(error.status || HttpStatus.NOT_FOUND, error.message),
    );
  }
};

// orders by status
export const getOrdersByStatus = async (req, res, next) => {
  const { status, location } = req.params; // get the status from the request parameters
  try {
    const orders = await getStatusOrders(status, location);

    res.status(HttpStatus.OK).json({
      orders,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(
      new HttpException(error.status || HttpStatus.NOT_FOUND, error.message),
    );
  }
};

export const getAllOrdersbySenderID = async (req, res, next) => {
  const { senderId } = req.params;
  try {
    const orders = await prisma.orders.findMany({
      where: {
        senderId: senderId,
      },
      include: {
        packages: {
          where: {
            del_flg: false,
          },
          include: {
            receiver: true,
          },
        },
      },
    });

    res.status(HttpStatus.OK).json({
      orders,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(
      new HttpException(error.status || HttpStatus.NOT_FOUND, error.message),
    );
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const code = req.params.code;

    // Then, delete the related packages

    const dependentOrderPackages = await prisma.orderPackages.findMany({
      where: {
        del_flg: false,
        orderId: code,
      },
    });

    // Delete dependent records
    for (const orderPackage of dependentOrderPackages) {
      await prisma.orderPackages.delete({
        where: {
          id: orderPackage.id,
        },
      });
    }

    // Finally, delete the order
    const deletedOrder = await prisma.orders.delete({
      where: { orderCode: code },
    });
    res.status(HttpStatus.OK).json({
      message: "Order deleted",
      deletedOrder,
    });
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

//   helper function for updating a packages status

export const processPackage = async (req, res, next) => {
  const { id } = req.params;
  const { ...rest } = req.body;
  const orderPackage = await getPackageDetails(id);

  const delivery_fee = orderPackage.deliveryFee;
  const deliveryCity = orderPackage.suburb.cityId;
  const senderCity = orderPackage.orders.suburbs.cityId;
  const shares = {
    pickup_share: 0,
    delivery_share: 0,
    transit_share: 0,
    system_share: 0,
    qcs_share: 0,
  };
  if (deliveryCity === senderCity) {
    shares.pickup_share = 6;
    shares.delivery_share = 8;
    shares.transit_share = 2;
    shares.system_share = 1;
    shares.qcs_share = delivery_fee - (6 + 8 + 2 + 1);
  } else {
    shares.pickup_share = 6;
    shares.delivery_share = 10;
    shares.transit_share = 5;
    shares.system_share = 1;
    shares.qcs_share = delivery_fee - (6 + 10 + 5 + 1);
  }
  try {
    const { updatedPackage, history } = await updatePackageStatus(
      id,
      PROCESSED,
      { ...rest, ...shares },
    );
    res.status(HttpStatus.CREATED).json({ package: updatedPackage, history });
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

export const arrivedPackage = async (req, res, next) => {
  const { id } = req.params;
  const { ...rest } = req.body;
  try {
    const findprocessedPackage = await prisma.orderPackages.findFirst({
      where: {
        id,
        status: PROCESSED,
        del_flg: false,
      },
    });
    if (!findprocessedPackage) {
      throw new HttpException(HttpStatus.NOT_FOUND, "Packages not found");
    } else {
      const { updatedPackage, history } = await updatePackageStatus(
        id,
        ARRIVED,
        rest,
      );
      res.status(HttpStatus.OK).json({ package: updatedPackage, history });
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

export const enroutePackage = async (req, res, next) => {
  const { id } = req.params;
  const { ...rest } = req.body;
  try {
    const { updatedPackage, history } = await updatePackageStatus(
      id,
      ENROUTE,
      rest,
    );
    res.status(HttpStatus.OK).json({ package: updatedPackage, history });
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
export const dispatchedPackage = async (req, res, next) => {
  const { id } = req.params;
  const { ...rest } = req.body;
  try {
    const { updatedPackage, history } = await updatePackageStatus(
      id,
      DISPATCHED,
      rest,
    );
    res.status(HttpStatus.OK).json({ package: updatedPackage, history });
  } catch (error) {
    loggerUtil.error(error.message);
    next(
      new HttpException(error.status || HttpStatus.BAD_REQUEST, error.message),
    );
  }
};

export const deliveryPackage = async (req, res, next) => {
  const { id } = req.params;
  const { ...rest } = req.body;
  if (res.secondReceipientNumber !== undefined || null)
    rest.secondReceipientNumber = formatGhPhoneNumber(
      rest.secondReceipientNumber,
    );
  try {
    const { updatedPackage, history } = await updatePackageStatus(
      id,
      DELIVERED,
      rest,
    );
    res.status(HttpStatus.OK).json({ package: updatedPackage, history });
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

export const returnPackage = async (req, res, next) => {
  const { id } = req.params;
  const { ...rest } = req.body;
  try {
    const { updatedPackage, history } = await updatePackageStatus(
      id,
      RETURNED,
      rest,
    );
    res.status(HttpStatus.OK).json({ package: updatedPackage, history });
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

export const pendingPackage = async (req, res, next) => {
  const { id } = req.params;
  const { ...rest } = req.body;
  try {
    const { updatedPackage, history } = await updatePackageStatus(
      id,
      PENDING,
      rest,
    );
    res.status(HttpStatus.OK).json({ package: updatedPackage, history });
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

export const updateMultiplePackages = async (req, res, next) => {
  const { packageIds, packageStatus } = req.body; // Assuming an array of package IDs and a status are sent in the request body
  try {
    const { updatedPackages, historyEntries } = await updatePackages(
      packageIds,
      packageStatus,
    );

    res.status(HttpStatus.OK).json({
      message: `Packages successfully updated to status: ${packageStatus}!`,
      updatedPackages,
      historyEntries,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(
      new HttpException(error.status || HttpStatus.BAD_REQUEST, error.message),
    );
  }
};

export const updatePackage = async (req, res, next) => {
  const { id } = req.params; //get package id
  const updateData = req.body; // get the new data from the request body
  try {
    // update the orders
    const packages = await prisma.orderPackages.update({
      where: { id },
      data: updateData,
    });

    res.status(HttpStatus.OK).json({
      message: "Package updated",
      packages,
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

// function for getting one package
export const getPackage = async (req, res, next) => {
  const { id } = req.params; // get the package Id

  try {
    const orderPackage = await prisma.orderPackages.findFirst({
      where: {
        id,
        del_flg: false,
      },
      include: {
        packageHistories: true,
        receiver: true,
        orders: {
          include: {
            sender: true,
          },
        },
      },
    });

    res.status(HttpStatus.OK).json({
      package: orderPackage,
    });
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
// function for deleting a package
export const deletePackage = async (req, res, next) => {
  const { id } = req.params; // get the package Id

  try {
    const findPackage = await prisma.orderPackages.findFirst({
      where: {
        AND: [
          {
            id,
            status: CREATED,
            del_flg: false,
          },
        ],
      },
    });
    if (!findPackage) {
      throw new HttpException(HttpStatus.NOT_FOUND, "Package not found!");
    } else {
      const orderPackage = await prisma.orderPackages.update({
        where: {
          id,
        },
        data: {
          del_flg: true,
        },
      });
      res.status(HttpStatus.OK).json({
        message: "Package  Deleted",
        package: orderPackage,
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
// master joe :says we wont be cancelling an order
export const cancelOrder = async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const order = await prisma.orderPackages.findMany({
      where: {
        orderId,
        del_flg: false,
      },
    });

    if (order === null || !order) {
      throw new HttpException(HttpStatus.NOT_FOUND, "order  not found");
    } else {
      const cancelOrder = await prisma.orders.update({
        where: {
          orderCode: orderId,
        },
        data: {
          del_flg: true,
        },
      });
      for (const pkg of order) {
        await prisma.orderPackages.update({
          where: {
            id: pkg.id,
          },
          data: {
            del_flg: true,
          },
        });
      }
      res.status(HttpStatus.OK).json({
        message: "Order has sucessfully been cancelled!",
        order: cancelOrder,
      });
    }
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.NOT_FOUND, error.message));
  }
};
