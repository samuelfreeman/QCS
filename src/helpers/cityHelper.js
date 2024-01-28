const prisma = require("../utils/prismaUtil");

//  checks a city to see whether it exits
const checkCityExits = async (cityName) => {
  const city = await prisma.cities.findFirst({
    where: {
      city_name: cityName,
    },
  });

  return city;
};
//  creates a city
const createCity = async (data) => {
  const city = await prisma.cities.create({
    data,
    include:{
        suburbs:true
    }
  });
  return city;
};
//  looks for a single city
const findSingleCity = async (id) => {
  const cities = await prisma.cities.findFirst({
    where: {
      id,
      del_flg: false,
    },
    include: {
      suburbs: true,
    },
  });
  return cities;
};
//  gets all cities
const getAllCites = async () => {
  const cities = await prisma.cities.findMany({
    where: {
      del_flg: false,
    },
    include: {
      suburbs: true,
    },
  });
  return cities;
};
// edits a cities information
const updateCity = async (id, data) => {
  const city = await prisma.cities.update({
    where: {
      id,
    },
    data,
  });
  return city;
};
// deletes  suburbs  before we think about deleting the city
const deleteSuburbs = async (id) => {
  const suburb = await prisma.suburbs.deleteMany({
    where: {
      cityId: id,
    },
  });
  return suburb;
};
// deletes a city
const deleteCity = async (id) => {
  const city = await prisma.cities.delete({
    where: {
      id,
    },
  });
  return city;
};

module.exports = {
  checkCityExits,
  createCity,
  findSingleCity,
  getAllCites,
  updateCity,
  deleteSuburbs,
  deleteCity,
};
