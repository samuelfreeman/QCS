const prisma = require("../utils/prismaUtil");
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
} = require("../helpers/bikerHelper"); // Replace with the correct path

// before all test make sure we are connecting to prisma
beforeAll(async () => {
  await prisma.$connect();
});

// after all tests make sure we are disconnecting from prisma
afterAll(async () => {
  await prisma.$disconnect();
});

describe("Order Package operations", () => {
  // orderCheckPickup function test
  it("should throw HttpException with 404 status if the package has already been picked up by the same biker", async () => {
    // Mocking prisma.orderPackages.findMany to return a package with the same pickupBikerId
    jest
      .spyOn(prisma.orderPackages, "findMany")
      .mockResolvedValueOnce([{ pickupBiker: { id: "sameBikerId" } }]);

    const pickupBikerId = "sameBikerId";
    const packages = ["packageId"];

    await expect(
      orderCheckPickup(packages, pickupBikerId)
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  // orderCheckDeliver function test
  it("should throw HttpException with 422 status if the package has already been assigned to the same biker", async () => {
    // Mocking prisma.orderPackages.findMany to return a package with the same deliverBikerId
    jest
      .spyOn(prisma.orderPackages, "findMany")
      .mockResolvedValueOnce([{ deliverBiker: { id: "sameBikerId" } }]);

    const deliverBikerId = "sameBikerId";
    const packages = ["packageId"];

    await expect(
      orderCheckDeliver(packages, deliverBikerId)
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  // Add more tests for other functions
});

describe("Biker operations", () => {
  // updtBiker function test
  it("should update a biker and return the updated data", async () => {
    // Mocking prisma.bikers.update to return the updated data for the test case
    jest.spyOn(prisma.bikers, "update").mockResolvedValueOnce({
      /* Mock updated data */
    });

    const id = "bikerId";
    const data = {
      /* Updated data */
    };

    const result = await updtBiker(id, data);

    // Add expectations based on the mocked data and the function logic
  });

  // checkBikerExists function test
  it("should return biker data if the biker exists", async () => {
    // Mocking prisma.bikers.findUnique to return biker data for the test case
    jest.spyOn(prisma.bikers, "findUnique").mockResolvedValueOnce({
      /* Mock biker data */
    });

    const telephone = "bikerTelephone";

    const result = await checkBikerExists(telephone);

    // Add expectations based on the mocked data and the function logic
  });

  // saveBiker function test
  it("should create a new biker and return the created data", async () => {
    // Mocking prisma.bikers.create to return the created data for the test case
    jest.spyOn(prisma.bikers, "create").mockResolvedValueOnce({
      /* Mock created data */
    });

    const data = {
      /* Biker data */
    };

    const result = await saveBiker(data);

    // Add expectations based on the mocked data and the function logic
  });

  // getBikers function test
  it("should return a list of bikers based on the specified location", async () => {
    // Mocking prisma.bikers.findMany to return data for the test case
    jest.spyOn(prisma.bikers, "findMany").mockResolvedValueOnce([
      // Mock data
    ]);

    const location = "bikerLocation";

    const result = await getBikers(location);

    // Add expectations based on the mocked data and the function logic
  });

  // getOneBiker function test
  it("should return a single biker based on the specified id", async () => {
    // Mocking prisma.bikers.findFirst to return data for the test case
    jest.spyOn(prisma.bikers, "findFirst").mockResolvedValueOnce({
      /* Mock data */
    });

    const id = "bikerId";

    const result = await getOneBiker(id);

    // Add expectations based on the mocked data and the function logic
  });

  // Add more tests for other functions
});
