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
// describe prices operations
describe("prices operations ", () => {
  it("should ", () => {});
});
