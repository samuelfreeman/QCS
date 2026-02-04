const prisma = require('../utils/prismaUtil');
const {
  checkCityExits,
  createCity,
  findSingleCity,
  getAllCites,
  updateCity,
  deleteSuburbs,
  deleteCity,
} = require('../helpers/cityHelper'); // Replace with the correct path

// before all test make sure we are connecting to prisma
beforeAll(async () => {
  await prisma.$connect();
});

// after all tests make sure we are disconnecting from prisma
afterAll(async () => {
  await prisma.$disconnect();
});

describe('City operations', () => {
  // checkCityExits function test
  it('should return city data if the city exists', async () => {
    // Mocking prisma.cities.findFirst to return city data for the test case
    jest.spyOn(prisma.cities, 'findFirst').mockResolvedValueOnce({ /* Mock city data */ });

    const cityName = 'testCity';

    const result = await checkCityExits(cityName);

    // Add expectations based on the mocked data and the function logic
  });

  // createCity function test
  it('should create a new city and return the created data', async () => {
    // Mocking prisma.cities.create to return the created data for the test case
    jest.spyOn(prisma.cities, 'create').mockResolvedValueOnce({ /* Mock created data */ });

    const data = { /* City data */ };

    const result = await createCity(data);

    // Add expectations based on the mocked data and the function logic
  });

  // findSingleCity function test
  it('should return a single city based on the specified id', async () => {
    // Mocking prisma.cities.findFirst to return city data for the test case
    jest.spyOn(prisma.cities, 'findFirst').mockResolvedValueOnce({ /* Mock city data */ });

    const id = 'cityId';

    const result = await findSingleCity(id);

    // Add expectations based on the mocked data and the function logic
  });

  // getAllCites function test
  it('should return a list of cities with suburbs', async () => {
    // Mocking prisma.cities.findMany to return data for the test case
    jest.spyOn(prisma.cities, 'findMany').mockResolvedValueOnce([
      // Mock data
    ]);

    const result = await getAllCites();

    // Add expectations based on the mocked data and the function logic
  });

  // updateCity function test
  it('should update a city and return the updated data', async () => {
    // Mocking prisma.cities.update to return the updated data for the test case
    jest.spyOn(prisma.cities, 'update').mockResolvedValueOnce({ /* Mock updated data */ });

    const id = 'cityId';
    const data = { /* Updated data */ };

    const result = await updateCity(id, data);

    // Add expectations based on the mocked data and the function logic
  });

  // deleteSuburbs function test
  it('should delete suburbs associated with the specified city', async () => {
    // Mocking prisma.suburbs.deleteMany to return data for the test case
    jest.spyOn(prisma.suburbs, 'deleteMany').mockResolvedValueOnce({ /* Mock data */ });

    const id = 'cityId';

    const result = await deleteSuburbs(id);

    // Add expectations based on the mocked data and the function logic
  });

  // deleteCity function test
  it('should delete a city', async () => {
    // Mocking prisma.cities.delete to return data for the test case
    jest.spyOn(prisma.cities, 'delete').mockResolvedValueOnce({ /* Mock data */ });

    const id = 'cityId';

    const result = await deleteCity(id);

    // Add expectations based on the mocked data and the function logic
  });

  // Add more tests for other functions
});
