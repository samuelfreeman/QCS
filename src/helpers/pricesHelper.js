const prisma = require('../utils/prismaUtil');
const findCity = async id => {
    const city = await prisma.cities.findFirst({
        where: {
            id
        }
    });
    return city;
};
module.exports ={
    findCity
}