import prisma from "../utils/prismaUtil.js";
const findCity = async (id) => {
  const city = await prisma.cities.findFirst({
    where: {
      id,
    },
  });
  return city;
};
export { findCity };
