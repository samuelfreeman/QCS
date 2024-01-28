const {
  CREATED,
  DELIVERED,
  DISPATCHED,
  ARRIVED,
  shares,
  RETURNED,
} = require("../utils/constants");

const HttpException = require("../middlewares/http-exception");

const HttpStatus = require("../utils/httpStatus");

const prisma = require("../utils/prismaUtil");

// helper function for package pickup
const orderCheckPickup = async (packages, pickupBikerId) => {
  const orderPackage = await prisma.orderPackages.findMany({
    where: {
      id: {
        in: packages,
      },
      del_flg: false,
    },
    include: {
      pickupBiker: {
        select: {
          id: true,
        },
      },
    },
  });

  const bikerId = orderPackage.map((pkg) =>
    pkg.pickupBiker ? pkg.pickupBiker.id : null
  );

  if (bikerId.some((id) => id === pickupBikerId)) {
    throw new HttpException(
      HttpStatus.NOT_FOUND,
      `OrderPackage has already been picked up by the same biker`
    );
  }
};
//   Helper function  for  package delivery
const orderCheckDeliver = async (packages, deliverBikerId) => {
  const orderPackage = await prisma.orderPackages.findMany({
    where: {
      id: {
        in: packages,
      },
      del_flg: false,
    },
    include: {
      deliverBiker: {
        select: {
          id: true,
        },
      },
    },
  });

  const bikerId = orderPackage.map((pkg) =>
    pkg.deliverBiker ? pkg.deliverBiker.id : null
  );

  // checks if its the same biker
  if (bikerId.some((id) => id === deliverBikerId)) {
    throw new HttpException(
      HttpStatus.UNPROCESSABLE_ENTITY,
      `OrderPackage has already been assigned to the same biker`
    );
  }
};

// biker Delivery shares
const bikerDeliveryShares = async (type, bikerId, dates) => {
  switch (type) {
    case shares.ALL:
      return await prisma.orderPackages.findMany({
        where: {
          pickupBikerId: bikerId,
          status: DELIVERED,
          del_flg: false,
        },
        select: {
          orderCode: true,
          delivery_share: true,
          createdAt: true,
          receiver: {
            select: {
              fullname: true,
              telephone: true,
            },
          },
          suburb: {
            select: {
              suburb_name: true,
              cities: {
                select: {
                  city_name: true,
                },
              },
            },
          },
        },
      });
    case shares.DAILY:
      const single = new Date(dates.date);

      const startOfDay = new Date(single);
      startOfDay.setUTCHours(0, 0, 0, 0);

      const endOfDay = new Date(single);
      endOfDay.setUTCHours(23, 59, 59, 999);
      return await prisma.orderPackages.findMany({
        where: {
          pickupBikerId: bikerId,
          status: DELIVERED,
          del_flg: false,
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
        select: {
          orderCode: true,
          delivery_share: true,
          createdAt: true,
          receiver: {
            select: {
              fullname: true,
              telephone: true,
            },
          },
          suburb: {
            select: {
              suburb_name: true,
              cities: {
                select: {
                  city_name: true,
                },
              },
            },
          },
        },
      });
    case shares.WEEKLY:
      const date = new Date(dates.year, 0, 1 + (dates.week - 1) * 7); // Calculate the date of the first day of the week
      const startOfWeek = new Date(
        date.setDate(date.getDate() - date.getDay())
      ); // Get the start of the week
      const endOfWeek = new Date(
        startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000
      ); // Add 6 days to get the end of the week

      return await prisma.orderPackages.findMany({
        where: {
          pickupBikerId: bikerId,
          status: DELIVERED,
          del_flg: false,
          createdAt: {
            gte: startOfWeek,
            lte: endOfWeek,
          },
        },
        select: {
          orderCode: true,
          delivery_share: true,
          createdAt: true,
          receiver: {
            select: {
              fullname: true,
              telephone: true,
            },
          },
          suburb: {
            select: {
              suburb_name: true,
              cities: {
                select: {
                  city_name: true,
                },
              },
            },
          },
        },
      });
    case shares.MONTHLY:
      const startOfMonth = new Date(dates.year, dates.month - 1, 1); // First day of the month
      const endOfMonth = new Date(dates.year, dates.month, 0); // Last day of the month

      return await prisma.orderPackages.findMany({
        where: {
          pickupBikerId: bikerId,
          status: DELIVERED,
          del_flg: false,
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
        select: {
          orderCode: true,
          delivery_share: true,
          createdAt: true,
          receiver: {
            select: {
              fullname: true,
              telephone: true,
            },
          },
          suburb: {
            select: {
              suburb_name: true,
              cities: {
                select: {
                  city_name: true,
                },
              },
            },
          },
        },
      });
    case shares.YEARLY:
      const startOfYear = new Date(dates.year, 0, 1); // January 1st
      const endOfYear = new Date(dates.year, 11, 31); // December 31st

      return await prisma.orderPackages.findMany({
        where: {
          pickupBikerId: bikerId,
          status: DELIVERED,
          del_flg: false,
          createdAt: {
            gte: startOfYear,
            lte: endOfYear,
          },
        },
        select: {
          orderCode: true,
          delivery_share: true,
          createdAt: true,
          receiver: {
            select: {
              fullname: true,
              telephone: true,
            },
          },
          suburb: {
            select: {
              suburb_name: true,
              cities: {
                select: {
                  city_name: true,
                },
              },
            },
          },
        },
      });

    default:
      const adhocStart = new Date(dates.startDate);
      const startOfDayAdhoc = new Date(adhocStart);
      startOfDayAdhoc.setUTCHours(0, 0, 0, 0);

      const adhocEnd = new Date(dates.endDate);
      const endOfDayAdhoc = new Date(adhocEnd);
      endOfDayAdhoc.setUTCHours(23, 59, 59, 999);
      return await prisma.orderPackages.findMany({
        where: {
          pickupBikerId: bikerId,
          status: DELIVERED,
          del_flg: false,
          createdAt: {
            gte: startOfDayAdhoc,
            lte: endOfDayAdhoc,
          },
        },
        select: {
          orderCode: true,
          delivery_share: true,
          createdAt: true,
          receiver: {
            select: {
              fullname: true,
              telephone: true,
            },
          },
          suburb: {
            select: {
              suburb_name: true,
              cities: {
                select: {
                  city_name: true,
                },
              },
            },
          },
        },
      });
  }
};

// biker pickup shares
const bikerPickupShares = async (type, bikerId, dates) => {
  switch (type) {
    case shares.ALL:
      return await prisma.orderPackages.findMany({
        where: {
          pickupBikerId: bikerId,
          del_flg: false,
          status: {
            not: CREATED,
          },
        },
        select: {
          orderCode: true,
          pickup_share: true,
          createdAt: true,
          orders: {
            select: {
              suburbs: {
                select: {
                  suburb_name: true,
                  cities: {
                    select: {
                      city_name: true,
                    },
                  },
                },
              },
              sender: {
                select: {
                  fullname: true,
                  telephone: true,
                },
              },
            },
          },
        },
      });
    case shares.DAILY:
      const single = new Date(dates.date);

      const startOfDay = new Date(single);
      startOfDay.setUTCHours(0, 0, 0, 0);

      const endOfDay = new Date(single);
      endOfDay.setUTCHours(23, 59, 59, 999);

      return await prisma.orderPackages.findMany({
        where: {
          pickupBikerId: bikerId,
          del_flg: false,
          status: {
            not: CREATED,
          },
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
        select: {
          orderCode: true,
          pickup_share: true,
          createdAt: true,
          orders: {
            select: {
              suburbs: {
                select: {
                  suburb_name: true,
                  cities: {
                    select: {
                      city_name: true,
                    },
                  },
                },
              },
              sender: {
                select: {
                  fullname: true,
                  telephone: true,
                },
              },
            },
          },
        },
      });
    case shares.WEEKLY:
      const date = new Date(dates.year, 0, 1 + (dates.week - 1) * 7); // Calculate the date of the first day of the week
      const startOfWeek = new Date(
        date.setDate(date.getDate() - date.getDay())
      ); // Get the start of the week
      const endOfWeek = new Date(
        startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000
      ); // Add 6 days to get the end of the week

      return await prisma.orderPackages.findMany({
        where: {
          pickupBikerId: bikerId,
          del_flg: false,
          status: {
            not: CREATED,
          },
          createdAt: {
            gte: startOfWeek,
            lte: endOfWeek,
          },
        },
        select: {
          orderCode: true,
          pickup_share: true,
          createdAt: true,
          orders: {
            select: {
              suburbs: {
                select: {
                  suburb_name: true,
                  cities: {
                    select: {
                      city_name: true,
                    },
                  },
                },
              },
              sender: {
                select: {
                  fullname: true,
                  telephone: true,
                },
              },
            },
          },
        },
      });
    case shares.MONTHLY:
      const startOfMonth = new Date(dates.year, dates.month - 1, 1); // First day of the month
      const endOfMonth = new Date(dates.year, dates.month, 0); // Last day of the month

      return await prisma.orderPackages.findMany({
        where: {
          pickupBikerId: bikerId,
          del_flg: false,
          status: {
            not: CREATED,
          },
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
        select: {
          orderCode: true,
          pickup_share: true,
          createdAt: true,
          orders: {
            select: {
              suburbs: {
                select: {
                  suburb_name: true,
                  cities: {
                    select: {
                      city_name: true,
                    },
                  },
                },
              },
              sender: {
                select: {
                  fullname: true,
                  telephone: true,
                },
              },
            },
          },
        },
      });
    case shares.YEARLY:
      const startOfYear = new Date(dates.year, 0, 1); // January 1st
      const endOfYear = new Date(dates.year, 11, 31); // December 31st

      return await prisma.orderPackages.findMany({
        where: {
          pickupBikerId: bikerId,
          del_flg: false,
          status: {
            not: CREATED,
          },
          createdAt: {
            gte: startOfYear,
            lte: endOfYear,
          },
        },
        select: {
          orderCode: true,
          pickup_share: true,
          createdAt: true,
          orders: {
            select: {
              suburbs: {
                select: {
                  suburb_name: true,
                  cities: {
                    select: {
                      city_name: true,
                    },
                  },
                },
              },
              sender: {
                select: {
                  fullname: true,
                  telephone: true,
                },
              },
            },
          },
        },
      });

    default:
      const adhocStart = new Date(dates.startDate);
      const startOfDayAdhoc = new Date(adhocStart);
      startOfDayAdhoc.setUTCHours(0, 0, 0, 0);

      const adhocEnd = new Date(dates.endDate);
      const endOfDayAdhoc = new Date(adhocEnd);
      endOfDayAdhoc.setUTCHours(23, 59, 59, 999);
      return await prisma.orderPackages.findMany({
        where: {
          pickupBikerId: bikerId,
          del_flg: false,
          status: {
            not: CREATED,
          },
          createdAt: {
            gte: startOfDayAdhoc,
            lte: endOfDayAdhoc,
          },
        },
        select: {
          orderCode: true,
          pickup_share: true,
          createdAt: true,
          orders: {
            select: {
              suburbs: {
                select: {
                  suburb_name: true,
                  cities: {
                    select: {
                      city_name: true,
                    },
                  },
                },
              },
              sender: {
                select: {
                  fullname: true,
                  telephone: true,
                },
              },
            },
          },
        },
      });
  }
};
//  editing a biker
const updtBiker = async (id, data) => {
  const user = await prisma.bikers.update({
    where: {
      id,
    },
    data,
  });
  if (!user) {
    loggerUtil.error("UNPROCESSABLE_ENTITY");
    throw new HttpException(
      HttpStatus.UNPROCESSABLE_ENTITY,
      "Could not update biker"
    );
  } else {
    return user;
  }
};

// check biker if biker exists
const checkBikerExists = async (telephone) => {
  return await prisma.bikers.findUnique({
    where: {
      telephone,
    },
  });
};

// save a biker
const saveBiker = async (data) => {
  const biker = await prisma.bikers.create({
    data,
  });
  if (!biker) {
    loggerUtil.error("Could not create biker");
    throw new HttpException(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Could not create biker"
    );
  } else {
    return biker;
  }
};
//  get bikers
const getBikers = async (location) => {
  return await prisma.bikers.findMany({
    where: {
      location: location,
    },
    include: {
      cities: true,
      packagesDeliveryBikers: true,
      packagesPickupBikers: true,
    },
  });
};
//  loading a single biker
const getOneBiker = async (id) => {
  const biker = await prisma.bikers.findFirst({
    where: {
      id,
    },
    include: {
      cities: true,
    },
  });
  if (!biker) {
    loggerUtil.error("Could not find biker");
    throw new HttpException(HttpStatus.NOT_FOUND, "Could not find biker");
  } else {
    return biker;
  }
};
module.exports = {
  orderCheckPickup,
  orderCheckDeliver,
  bikerDeliveryShares,
  bikerPickupShares,
  updtBiker,
  checkBikerExists,
  saveBiker,
  getBikers,
  getOneBiker,
};
