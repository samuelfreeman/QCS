const prisma = require('./prismaUtil');
const loggerUtil = require('./loggerUtil');
const passwordUtil = require('./passwordUtil');
const getCity = async () => {
    const city = await prisma.cities.findFirst({
        orderBy: {
            city_name: 'asc'
        }
    });
    return city.id;
};
const data = {
    fullname: 'super user',
    email: 'super@super.com',
    telephone: '0248111128',
    password: 'Pass123$1',
    role_name: 'SUPER ADMIN'
};

exports.run = async () => {
    try {
        const users = await prisma.users.findMany();

        if (users.length === 0) {
            const password = await passwordUtil.hashPassword(data.password);
            data.password = password;
            data.confirmed = true;
            data.location = await getCity();
            await prisma.users.create({
                data
            });
        }
    } catch (error) {
        loggerUtil.error(error.message);
    }
};
