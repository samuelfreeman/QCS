const prisma = require("../utils/prismaUtil");

const { formatGhPhoneNumber } = require("../utils/commonUtil");

// Helper function  for  creating an order
const checkReceiverExists = async (id, receiver, senderId) => {
  const telephone = formatGhPhoneNumber(receiver.telephone);
  const res = await prisma.receivers.findFirst({
    where: {
      OR: [{ id }, { telephone }],
    },
  });
  if (res) {
    return res.id;
  }
  const rev = await prisma.receivers.create({
    data: { ...receiver, senderId, telephone },
  });
  return rev.id;
};

const findSurbCity = async (suburbId) => {
  return await prisma.suburbs.findUnique({
    where: {
      id: suburbId,
    },
    select: {
      cities: {
        select: {
          initials: true,
        },
      },
    },
  });
};
const getOrderByStatus = async (statuses, location) => {
  return await prisma.orderPackages.groupBy({
    by: ["status"],
    where: {
      del_flg: false,
      AND: [
        {
          status: {
            in: statuses,
          },
          orders: {
            is: {
              suburbs: {
                is: {
                  cityId: location,
                },
              },
            },
          },
        },
      ],
    },
    _count: {
      _all: true,
    },
  });
};
const getCityOrderByStatus = async (cityStatuses, location) => {
  return await prisma.orderPackages.groupBy({
    by: ["status"],
    where: {
      del_flg: false,
      OR: [
        {
          status: {
            in: cityStatuses,
          },
          suburb: {
            is: {
              cityId: location,
            },
          },
        },
      ],
    },
    _count: {
      _all: true,
    },
  });
};

const createResultLookup = (result) => {
  const resultLookup = new Map();
  result.forEach((item) => {
    resultLookup.set(item.status, item._count._all);
  });
  return resultLookup;
};

const formatResult = (statuses, resultLookup) => {
  const formattedResult = [];
  statuses.forEach((status) => {
    const count = resultLookup.has(status) ? resultLookup.get(status) : 0;
    formattedResult.push({
      status_name: status,
      count: count,
    });
  });
  return formattedResult;
};
const loadOrders = async (status, location) => {
  return await prisma.orderPackages.findMany({
    where: {
      del_flg: false,
      AND: [
        {
          status,
          orders: {
            is: {
              suburbs: {
                is: {
                  cityId: location,
                },
              },
            },
          },
        },
      ],
    },

    include: {
      deliverBiker: true,
      pickupBiker: true,
      receiver: true,
      suburb: {
        include: {
          cities: true,
        },
      },
      orders: {
        include: {
          sender: true,
          suburbs: {
            include: {
              cities: true,
            },
          },
        },
      },
    },
  });
};

const loadCityOrders = async (status, location) => {
  return await prisma.orderPackages.findMany({
    where: {
      del_flg: false,
      OR: [
        {
          status,
          suburb: {
            is: {
              cityId: location,
            },
          },
        },
      ],
    },

    include: {
      deliverBiker: true,
      pickupBiker: true,
      receiver: true,
      suburb: {
        include: {
          cities: true,
        },
      },
      orders: {
        include: {
          sender: true,
          suburbs: {
            include: {
              cities: true,
            },
          },
        },
      },
    },
  });
};
const getStatusOrders = async (status, location) => {
  switch (status) {
    case CREATED:
      return await loadOrders(status, location);
    case PROCESSED:
      return await loadOrders(status, location);
    case ARRIVED:
      return await loadOrders(status, location);
    case ENROUTE:
      return await loadCityOrders(status, location);
    case DISPATCHED:
      return await loadCityOrders(status, location);
    case DELIVERED:
      return await loadCityOrders(status, location);
    case PENDING:
      return await loadCityOrders(status, location);
    case RETURNED:
      return await loadCityOrders(status, location);
    default:
      return [];
  }
};
const updatePackageStatus = async (id, status, additionalData) => {
  const updatedPackage = await prisma.orderPackages.update({
    where: { id },
    data: { ...additionalData, status },
  });

  if (status === RETURNED || status === PENDING) {
    const { reason } = additionalData;
    const history = await prisma.packageHistories.create({
      data: {
        status,
        packageId: id,
        reason,
      },
    });
    return { updatedPackage, history };
  } else {
    const history = await prisma.packageHistories.create({
      data: {
        status,
        packageId: id,
      },
    });

    return { updatedPackage, history };
  }
};
const getPackageDetails = async (id) => {
  return await prisma.orderPackages.findUnique({
    where: {
      id,
      del_flg: false,
    },
    include: {
      suburb: {
        select: {
          cityId: true,
        },
      },
      orders: {
        select: {
          suburbs: {
            select: {
              cityId: true,
            },
          },
        },
      },
    },
  });
};

const updatePackages = async (packageIds, packageStatus) => {
  // Find all packages based on the provided IDs

  const package = await prisma.orderPackages.findMany({
    where: {
      id: { in: packageIds },
      del_flg: false, // Filter packages by the given packageIds
    },
  });

  // Update status to the provided status for all found packages
  const updatedPackages = await prisma.orderPackages.updateMany({
    where: {
      id: { in: packageIds },
      // Filter packages by the given packageIds
    },
    data: {
      status: packageStatus,
    },
  });

  // Create history entries for each package being updated
  const historyEntries = await Promise.all(
    package.map(async (pkg) => {
      return await prisma.packageHistories.create({
        data: {
          status: packageStatus,
          packageId: pkg.id,
        },
      });
    })
  );

  return { updatedPackages, historyEntries };
};
module.exports = {
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
};
