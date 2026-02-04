const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//  before all prisma operations
beforeAll(async () => {
  prisma.$connect();
});

//  after all prisma operations
afterAll(async () => {
  prisma.$disconnect();
});
//  describe order operations

const prismaMock = require("../utils/prismaUtil");
const {
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
} = require("../helpers/orderHelper");


describe("Helper Functions Tests", () => {
  describe("checkReceiverExists", () => {
    it("should check if the receiver exists and return the receiver id", async () => {
      prismaMock.receivers.findFirst.mockResolvedValueOnce({
        id: "existingReceiverId",
      });

      const receiverId = await checkReceiverExists(
        "existingReceiverId",
        { telephone: "1234567890" },
        "senderId"
      );

      expect(receiverId).toBe("existingReceiverId");
      expect(prismaMock.receivers.findFirst).toHaveBeenCalledTimes(1);
    });

    it("should create a new receiver if the receiver does not exist and return the new receiver id", async () => {
      prismaMock.receivers.findFirst.mockResolvedValueOnce(null);
      prismaMock.receivers.create.mockResolvedValueOnce({
        id: "newReceiverId",
      });

      const receiverId = await checkReceiverExists(
        "nonExistingReceiverId",
        { telephone: "1234567890" },
        "senderId"
      );

      expect(receiverId).toBe("newReceiverId");
      expect(prismaMock.receivers.findFirst).toHaveBeenCalledTimes(1);
      expect(prismaMock.receivers.create).toHaveBeenCalledTimes(1);
    });

    it("should handle errors and reject with the correct message", async () => {
      prismaMock.receivers.findFirst.mockRejectedValueOnce(
        new Error("Database error")
      );

      await expect(
        checkReceiverExists(
          "existingReceiverId",
          { telephone: "1234567890" },
          "senderId"
        )
      ).rejects.toThrowError("Database error");

      expect(prismaMock.receivers.findFirst).toHaveBeenCalledTimes(1);
    });
  });

  describe("findSurbCity", () => {
    it("should find the city for a given suburb successfully", async () => {
      prismaMock.suburbs.findUnique.mockResolvedValueOnce({
        cities: { initials: "ABC" },
      });

      const city = await findSurbCity("suburbId");

      expect(city).toEqual({ cities: { initials: "ABC" } });
      expect(prismaMock.suburbs.findUnique).toHaveBeenCalledTimes(1);
    });

    it("should handle errors and reject with the correct message", async () => {
      prismaMock.suburbs.findUnique.mockRejectedValueOnce(
        new Error("Database error")
      );

      await expect(findSurbCity("suburbId")).rejects.toThrowError(
        "Database error"
      );

      expect(prismaMock.suburbs.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe("getOrderByStatus", () => {
    it("should get orders by status and location successfully", async () => {
      // Mock Prisma data for successful order retrieval
      prismaMock.orderPackages.groupBy.mockResolvedValueOnce([
        { status: "CREATED", _count: { _all: 2 } },
        { status: "PROCESSED", _count: { _all: 1 } },
      ]);

      const orders = await getOrderByStatus(
        ["CREATED", "PROCESSED"],
        "location"
      );

      expect(orders).toEqual([
        { status_name: "CREATED", count: 2 },
        { status_name: "PROCESSED", count: 1 },
      ]);
      expect(prismaMock.orderPackages.groupBy).toHaveBeenCalledTimes(1);
    });

    it("should handle errors and reject with the correct message", async () => {
      // Mock Prisma error
      prismaMock.orderPackages.groupBy.mockRejectedValueOnce(
        new Error("Database error")
      );

      await expect(
        getOrderByStatus(["CREATED"], "location")
      ).rejects.toThrowError("Database error");

      expect(prismaMock.orderPackages.groupBy).toHaveBeenCalledTimes(1);
    });
  });

  describe("getCityOrderByStatus", () => {
    it("should get city orders by status and location successfully", async () => {
      // Mock Prisma data for successful city order retrieval
      prismaMock.orderPackages.groupBy.mockResolvedValueOnce([
        { status: "DELIVERED", _count: { _all: 3 } },
        { status: "ENROUTE", _count: { _all: 1 } },
      ]);

      const cityOrders = await getCityOrderByStatus(
        ["DELIVERED", "ENROUTE"],
        "cityLocation"
      );

      expect(cityOrders).toEqual([
        { status_name: "DELIVERED", count: 3 },
        { status_name: "ENROUTE", count: 1 },
      ]);
      expect(prismaMock.orderPackages.groupBy).toHaveBeenCalledTimes(1);
    });

    it("should handle errors and reject with the correct message", async () => {
      // Mock Prisma error
      prismaMock.orderPackages.groupBy.mockRejectedValueOnce(
        new Error("Database error")
      );

      await expect(
        getCityOrderByStatus(["DELIVERED"], "cityLocation")
      ).rejects.toThrowError("Database error");

      expect(prismaMock.orderPackages.groupBy).toHaveBeenCalledTimes(1);
    });
  });

  describe("createResultLookup", () => {
    it("should create a result lookup map successfully", () => {
      const inputResult = [
        { status: "DELIVERED", _count: { _all: 2 } },
        { status: "ENROUTE", _count: { _all: 1 } },
      ];

      const resultLookup = createResultLookup(inputResult);

      expect(resultLookup).toEqual(
        new Map([
          ["DELIVERED", 2],
          ["ENROUTE", 1],
        ])
      );
    });
  });

  describe("formatResult", () => {
    it("should format results successfully based on statuses and result lookup", () => {
      const statuses = ["DELIVERED", "ENROUTE", "PENDING"];
      const resultLookup = new Map([
        ["DELIVERED", 2],
        ["ENROUTE", 1],
      ]);

      const formattedResult = formatResult(statuses, resultLookup);

      expect(formattedResult).toEqual([
        { status_name: "DELIVERED", count: 2 },
        { status_name: "ENROUTE", count: 1 },
        { status_name: "PENDING", count: 0 }, // PENDING is not in resultLookup, so count is 0
      ]);
    });
  });

  describe("getStatusOrders", () => {
    it("should load orders based on status and location successfully", async () => {
      // Mock Prisma data for successful order loading
      prismaMock.orderPackages.findMany.mockResolvedValueOnce([
        { id: "1", status: "CREATED" },
        { id: "2", status: "CREATED" },
        { id: "3", status: "PROCESSED" },
      ]);

      const orders = await getStatusOrders("CREATED", "location");

      expect(orders).toEqual([
        { id: "1", status: "CREATED" },
        { id: "2", status: "CREATED" },
      ]);
      expect(prismaMock.orderPackages.findMany).toHaveBeenCalledTimes(1);
    });

    it("should handle errors and reject with the correct message", async () => {
      // Mock Prisma error
      prismaMock.orderPackages.findMany.mockRejectedValueOnce(
        new Error("Database error")
      );

      await expect(getStatusOrders("CREATED", "location")).rejects.toThrowError(
        "Database error"
      );

      expect(prismaMock.orderPackages.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe("updatePackageStatus", () => {
    it("should update package status successfully and create history for PENDING status", async () => {
      // Mock Prisma data for successful package status update and history creation
      prismaMock.orderPackages.update.mockResolvedValueOnce({
        id: "1",
        status: "PENDING",
      });
      prismaMock.packageHistories.create.mockResolvedValueOnce({
        id: "101",
        status: "PENDING",
        packageId: "1",
      });

      const updatedPackage = await updatePackageStatus("1", "PENDING", {
        reason: "Some reason",
      });

      expect(updatedPackage).toEqual({
        updatedPackage: { id: "1", status: "PENDING" },
        history: { id: "101", status: "PENDING", packageId: "1" },
      });
      expect(prismaMock.orderPackages.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.packageHistories.create).toHaveBeenCalledTimes(1);
    });

    it("should update package status successfully and create history for non-PENDING status", async () => {
      // Mock Prisma data for successful package status update and history creation
      prismaMock.orderPackages.update.mockResolvedValueOnce({
        id: "2",
        status: "DELIVERED",
      });
      prismaMock.packageHistories.create.mockResolvedValueOnce({
        id: "102",
        status: "DELIVERED",
        packageId: "2",
      });

      const updatedPackage = await updatePackageStatus("2", "DELIVERED", {});

      expect(updatedPackage).toEqual({
        updatedPackage: { id: "2", status: "DELIVERED" },
        history: { id: "102", status: "DELIVERED", packageId: "2" },
      });
      expect(prismaMock.orderPackages.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.packageHistories.create).toHaveBeenCalledTimes(1);
    });

    it("should handle errors and reject with the correct message", async () => {
      // Mock Prisma error
      prismaMock.orderPackages.update.mockRejectedValueOnce(
        new Error("Database error")
      );

      await expect(
        updatePackageStatus("1", "PENDING", { reason: "Some reason" })
      ).rejects.toThrowError("Database error");

      expect(prismaMock.orderPackages.update).toHaveBeenCalledTimes(1);
    });
  });

  describe("getPackageDetails", () => {
    it("should get package details successfully", async () => {
      // Mock Prisma data for successful package details retrieval
      prismaMock.orderPackages.findUnique.mockResolvedValueOnce({
        id: "1",
        status: "CREATED",
      });

      const packageDetails = await getPackageDetails("1");

      expect(packageDetails).toEqual({ id: "1", status: "CREATED" });
      expect(prismaMock.orderPackages.findUnique).toHaveBeenCalledTimes(1);
    });

    it("should handle errors and reject with the correct message", async () => {
      // Mock Prisma error
      prismaMock.orderPackages.findUnique.mockRejectedValueOnce(
        new Error("Database error")
      );

      await expect(getPackageDetails("1")).rejects.toThrowError(
        "Database error"
      );

      expect(prismaMock.orderPackages.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe("updatePackages", () => {
    it("should update packages successfully and create history entries for each package", async () => {
      // Mock Prisma data for successful package updates and history entries creation
      prismaMock.orderPackages.findMany.mockResolvedValueOnce([
        { id: "1", status: "CREATED" },
        { id: "2", status: "CREATED" },
        { id: "3", status: "PROCESSED" },
      ]);
      prismaMock.orderPackages.updateMany.mockResolvedValueOnce({ count: 2 });
      prismaMock.packageHistories.create.mockResolvedValueOnce({
        id: "201",
        status: "PROCESSED",
        packageId: "1",
      });
      prismaMock.packageHistories.create.mockResolvedValueOnce({
        id: "202",
        status: "PROCESSED",
        packageId: "2",
      });

      const { updatedPackages, historyEntries } = await updatePackages(
        ["1", "2"],
        "PROCESSED"
      );

      expect(updatedPackages).toEqual({ count: 2 });
      expect(historyEntries).toEqual([
        { id: "201", status: "PROCESSED", packageId: "1" },
        { id: "202", status: "PROCESSED", packageId: "2" },
      ]);
      expect(prismaMock.orderPackages.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.orderPackages.updateMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.packageHistories.create).toHaveBeenCalledTimes(2);
    });

    it("should handle errors and reject with the correct message", async () => {
      // Mock Prisma error
      prismaMock.orderPackages.findMany.mockRejectedValueOnce(
        new Error("Database error")
      );

      await expect(
        updatePackages(["1", "2"], "PROCESSED")
      ).rejects.toThrowError("Database error");

      expect(prismaMock.orderPackages.findMany).toHaveBeenCalledTimes(1);
    });
  });
});
