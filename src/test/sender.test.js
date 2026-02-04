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
// describe sender operations 
describe("sender operations ", () => {
  it("should ", () => {});
});
