const prisma = require("../utils/prismaUtil");

const moment = require("moment");

const checkSenderExists = async (telephone) => {
  const sender = await prisma.senders.findUnique({
    where: {
      telephone,
    },
  });
  return sender;
};
const checkSuburbExists = async (id) => {
  const res = await prisma.suburbs.findUnique({
    where: {
      id,
    },
  });
  return res;
};

const checkUserExists = async (telephone) => {
  const sender = await prisma.senders.findUnique({
    where: {
      telephone,
    },
    include: { suburbs: true },
  });
  if (sender) {
    return { user: sender, isBiker: false };
  } else {
    const biker = await prisma.bikers.findUnique({
      where: {
        telephone,
      },
    });
    return { user: biker, isBiker: true };
  }
};
const updateUserTotp = async (isBiker, id, data) => {
  if (isBiker) {
    const biker = await prisma.bikers.update({
      where: {
        id,
      },
      data,
    });

    return biker;
  } else {
    const sender = await prisma.senders.update({
      where: {
        id,
      },
      data,
    });
    return sender;
  }
};
const findToken = async (otp, telephone) => {

  const sender = await prisma.senders.findFirst({
    where: {
      OR: [
        {
          code: otp,
          telephone,
          expiration: {
            gte: moment().format(),
          },
        },
      ],
    },
    include: { suburbs: true },
  });
console.log(sender)
  if (sender) {
    return { user: sender, isBiker: false };
  } else {
    const biker = await prisma.bikers.findFirst({
      where: {
        OR: [
          {
            code: otp,
            telephone,
            expiration: {
              gte: moment().format(),
            },
          },
        ],
      },
    });
    return { user: biker, isBiker: true };
  }
};
const createSender = async (data) => {
  const sender = await prisma.senders.create({
    data,
  });
  return sender;
};
const getSendersReceivers = async (senderId) => {
  const receivers = await prisma.receivers.findMany({
    where: {
      senderId,
    },
  });
  return receivers;
};
const sendersPackages = async (senderId) => {
  const packages = await prisma.orderPackages.findMany({
    where: {
      del_flg: false,
      receiver: {
        senderId,
      },
    },
  });
  return packages;
};
const authSender = async (id) => {
  const sender = await prisma.senders.findUnique({
    where: {
      id,
    },
  });
  return sender;
};
const getSendersByLocation = async (location) => {
  const senders = await prisma.senders.findMany({
    where: {
      suburbs: {
        cityId: location,
      },
    },
    include: {
      suburbs: {
        include: {
          cities: true,
        },
      },
    },
  });
  return senders;
};
const getSingleSender = async (id) => {
  const sender = await prisma.senders.findFirst({
    where: {
      id,
    },
    include: {
      suburbs: {
        include: {
          cities: true,
        },
      },
    },
  });
  return sender;
};
const editSender = async (id) => {
  const sender = await prisma.senders.update({
    where: {
      id,
    },
    data,
  });
  return sender;
};
const removeSender = async (id) => {
  const sender = await prisma.senders.delete({
    where: {
      id,
    },
  });
  return sender;
};
module.exports = {
  checkSenderExists,
  checkSuburbExists,
  checkUserExists,
  updateUserTotp,
  findToken,
  createSender,
  getSendersReceivers,
  sendersPackages,
  authSender,
  getSendersByLocation,
  getSingleSender,
  editSender,
  removeSender,
};
