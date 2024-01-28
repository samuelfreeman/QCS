const prisma = require("../utils/prismaUtil");

const passwordUtil = require("../utils/passwordUtil");

const HttpException = require("../middlewares/http-exception");

const loggerUtil = require("../utils/loggerUtil");

const {
  checkUserExists,
  saveUser,
  validateEmail,
  validateConfirmed,
  validatePwd,
  findAuthUser,
  generateVrificationToken,
  getUsers,
} = require("../helpers/userHelper");

const moment = require("moment");

const tokenUtil = require("../utils/tokenUtil");

const { formatGhPhoneNumber } = require("../utils/commonUtil");

const HttpStatus = require("../utils/httpStatus");

// ================== Admin auth ================>

exports.saveUser = async (req, res, next) => {
  try {
    const data = req.body;

    const telephone = formatGhPhoneNumber(data.telephone);
    const oldUser = await checkUserExists(data.email);

    if (oldUser) {
      loggerUtil.error("User Already Exists");
      throw new HttpException(HttpStatus.CONFLICT, "User Already Exists");
    }
    data.code = "1234";

    const password = await passwordUtil.hashPassword(data.password);

    // assign  proccessed values to data
    data.password = password;
    data.telephone = telephone;
    data.role_name = "BRANCH ADMIN";

    // save user data
    const user = await saveUser(data);

    delete user.password;
    res.status(HttpStatus.CREATED).json({
      message: "User Created",
      user,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, error.message));
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      loggerUtil.error("User not found!");
      throw new HttpException(HttpStatus.NOT_FOUND, "User not found!");
    } else {
      if (data.password) await passwordUtil.hashPassword(data.password);
      const updateUser = await prisma.users.update({
        where: {
          id,
        },
        data,
      });
      res.status(HttpStatus.OK).json({
        message: "User Updated",
        updateUser,
      });
    }
  } catch (error) {
    loggerUtil.error(error.message);
    next(
      new HttpException(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message
      )
    );
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const emailValidated = await validateEmail(email);
    const user = await validateConfirmed(emailValidated?.email);
    const valid = await validatePwd(password, user?.password || "");

    if (valid === true || valid === "true") {
      const token = tokenUtil.signToken(user);
      res.header("Authorization", token);
      res.status(HttpStatus.OK).json({
        status: "success",
        token,
        userId: user.id,
      });
    }
  } catch (error) {
    loggerUtil.error(error.message);
    next(
      new HttpException(
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.message
      )
    );
  }
};
exports.logout = async (req, res, next) => {
  try {
    const loggedout = "loggedout";
    tokenUtil.setInvalidToken(loggedout);
    return res.status(HttpStatus.OK).json({
      status: "success",
      message: "logged out",
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, error.message));
  }
};

exports.getAuthUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await findAuthUser(id);

    return res.status(HttpStatus.OK).json({ user });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.NOT_FOUND, error.message));
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const { location } = req.params;
    const users = await getUsers(location);
    res.status(HttpStatus.OK).json({
      users,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.NOT_FOUND, error.message));
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await prisma.users.delete({
      where: {
        id,
      },
    });

    res.status(HttpStatus.OK).json({
      user,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, error.message));
  }
};

// forget password controllers
exports.forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const exists = await checkUserExists(email);
    if (!exists) {
      throw new HttpException(HttpStatus.NOT_FOUND, "Invalid email");
    }
    {
      const expiration = moment().add(5, "minutes");
      const data = {
        code: generateVrificationToken(),
        expiration,
      };
      const user = await prisma.users.update({
        where: {
          email: exists.email,
        },
        data,
      });
      res.status(HttpStatus.ACCEPTED).json({
        status: "succesful",
        message: "Email sent",
        user,
      });
    }
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, error.message));
  }
};
// verifyToken controller
exports.verifyToken = async (req, res, next) => {
  const { token, email } = req.params;

  try {
    const user = await prisma.users.findFirst({
      where: {
        OR: [
          {
            code: token,
            email,
            expiration: {
              gte: moment().format(),
            },
          },
        ],
      },
    });
    if (!user) {
      throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, "Invalid token");
    } else {
      res.status(200).json({
        status: "Success",
        message: "User verified",
        user,
      });
    }
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, error.message));
  }
};
// reset password controller
exports.resetPassword = async (req, res, next) => {
  try {
    const { email } = req.params;
    let { password } = req.body;
    password = await passwordUtil.hashPassword(password);

    const exists = await checkUserExists(email);

    if (!exists) {
      throw new HttpException(HttpStatus.NOT_FOUND, "User not found");
    } else {
      const expiration = moment().add(2, "minutes");
      const data = {
        code: "1234",
        password,
        expiration,
      };
      const user = await prisma.users.update({
        where: {
          email,
        },
        data,
      });
      res.status(HttpStatus.OK).json({
        status: "success",
        user,
      });
    }
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, error.message));
  }
};
