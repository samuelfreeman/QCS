import prisma from "../utils/prismaUtil.js";
import { hashPassword, comparePassword } from "../utils/passwordUtil.js";
import HttpException from "../middlewares/http-exception.js";
import loggerUtil from "../utils/loggerUtil.js";
import * as userHelpers from "../helpers/userHelper.js";
import moment from "moment";
import { signToken, setInvalidToken } from "../utils/tokenUtil.js";
import { formatGhPhoneNumber } from "../utils/commonUtil.js";
import HttpStatus from "../utils/httpStatus.js";

// ================== Admin auth ================>

export const RegisterUser = async (req, res, next) => {
  try {
    const data = req.body;

    const telephone = formatGhPhoneNumber(data.telephone);
    const oldUser = await userHelpers.checkUserExists(data.email);

    if (oldUser) {
      loggerUtil.error("User Already Exists");
      throw new HttpException(HttpStatus.CONFLICT, "User Already Exists");
    }
    data.code = "1234";

    const password = await hashPassword(data.password);

    // assign  proccessed values to data
    data.password = password;
    data.telephone = telephone;
    data.role_name = "BRANCH ADMIN";

    // save user data
    const user = await userHelpers.saveUser(data);

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

export const updateUser = async (req, res, next) => {
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
      if (data.password) await hashPassword(data.password);
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
        error.message,
      ),
    );
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const emailValidated = await userHelpers.validateEmail(email);
    const user = await userHelpers.validateConfirmed(emailValidated?.email);
    const valid = await userHelpers.validatePwd(password, user?.password || "");

    if (valid === true || valid === "true") {
      const token = signToken(user);
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
        error.message,
      ),
    );
  }
};
export const logout = async (req, res, next) => {
  try {
    const loggedout = "loggedout";
    setInvalidToken(loggedout);
    return res.status(HttpStatus.OK).json({
      status: "success",
      message: "logged out",
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, error.message));
  }
};

export const getAuthUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await userHelpers.findAuthUser(id);

    return res.status(HttpStatus.OK).json({ user });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.NOT_FOUND, error.message));
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const { location } = req.params;
    const users = await userHelpers.getUsers(location);
    res.status(HttpStatus.OK).json({
      users,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.NOT_FOUND, error.message));
  }
};
export const deleteUser = async (req, res, next) => {
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
export const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const exists = await userHelpers.checkUserExists(email);
    if (!exists) {
      throw new HttpException(HttpStatus.NOT_FOUND, "Invalid email");
    }
    {
      const expiration = moment().add(5, "minutes");
      const data = {
        code: userHelpers.generateVrificationToken(),
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
export const verifyToken = async (req, res, next) => {
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
export const resetPassword = async (req, res, next) => {
  try {
    const { email } = req.params;
    let { password } = req.body;
    password = await hashPassword(password);

    const exists = await userHelpers.checkUserExists(email);

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
