const loggerUtil = require("../utils/loggerUtil");
const crypto = require("crypto");
const prisma = require("../utils/prismaUtil");
const HttpException = require("../middlewares/http-exception");
// to check  an existing user
const checkUserExists = async (email) => {
  return await prisma.users.findUnique({
    where: {
      email,
    },
  });
};
// to save a user
const saveUser = async (data) => {
  return await prisma.users.create({
    data,
  });
};
//  to validate Email
const validateEmail = async (email) => {
  const emailVal = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (emailVal === null || emailVal === "null") {
    loggerUtil.error("Incorrect email");
    throw new HttpException(
      HttpStatus.UNPROCESSABLE_ENTITY,
      "Incorrect email!"
    );
  }
  return emailVal;
};
//   to confirm email validation
const validateConfirmed = async (email) => {
  const validatedEmail = await prisma.users.findFirst({
    where: {
      OR: [
        {
          email,
          confirmed: true,
        },
      ],
    },
  });
  if (validatedEmail === null || validatedEmail === "null") {
    loggerUtil.error("User not Confirmed");
    throw new HttpException(
      HttpStatus.UNPROCESSABLE_ENTITY,
      "User not Confirmed Contact your Admin!"
    );
  }
  return validatedEmail;
};
//  to validate password
const validatePwd = async (userpwd, syspwd) => {
  const validPwd = await passwordUtil.comparePassword(userpwd, syspwd);

  if (validPwd === false || validPwd === "false") {
    loggerUtil.error(
      "Invalid Credentials , please enter the correct credentials"
    );
    throw new HttpException(
      HttpStatus.UNPROCESSABLE_ENTITY,
      "Invalid credentials,please enter the correct credentials"
    );
  } else {
    return validPwd;
  }
};
//  to  find authenticated user
const findAuthUser = async (id) => {
  const user = await prisma.users.findUnique({
    where: {
      id,
    },
    select: {
      fullname: true,
      email: true,
      location: true,
      cities: true,
      role_name: true,
    },
  });

  if (!user) {
    loggerUtil.error("User not found");
    new HttpException(HttpStatus.NOT_FOUND, error.message);
  } else {
    return user;
  }
};

// generate verification code
const generateVrificationToken = () => {
  const code = crypto.randomBytes(64).toString("hex");
  return code;
};
// to get all users
const getUsers = async (location) => {
  return await prisma.users.findMany({
    where: {
      location: location,
    },
    include: {
      cities: true,
    },
  });
};
module.exports = {
  checkUserExists,
  saveUser,
  validateEmail,
  validateConfirmed,
  validatePwd,
  findAuthUser,
  generateVrificationToken,
  getUsers,
};
