const passwordUtil = require("../utils/passwordUtil");
const HttpException = require("../middlewares/http-exception");
const loggerUtil = require("../utils/loggerUtil");
const tokenUtil = require("../utils/tokenUtil");
const { formatGhPhoneNumber } = require("../utils/commonUtil");
const moment = require("moment");
const HttpStatus = require("../utils/httpStatus");

const {
  checkSenderExists,
  checkSuburbExists,
  checkUserExists,
  updateUserTotp,
  findToken,
  createSender,
  getSendersReceivers,
  sendersPackages,
  authSender,
  getSendersByLocation,
  getSingleSender,
  editSender,
  removeSender,
} = require("../helpers/senderHelper");
// register a  sender
exports.createSender = async (req, res, next) => {
  try {
    user .dt
    const data = req.body;
    const telephone = formatGhPhoneNumber(data.telephone);
    const oldSender = await checkSenderExists(telephone);
    if (oldSender) {
      loggerUtil.error("Sender Already Exists");
      throw new HttpException(
        HttpStatus.UNPROCESSABLE_ENTITY,
        "Sender Already Exists"
      );
    }
    const suburb = await checkSuburbExists(data.pickUpLocation);
    if (!suburb) {
      throw new HttpException(
        HttpStatus.UNPROCESSABLE_ENTITY,
        "Suburb Id is not Valid"
      );
    }
    data.code = "1234";
    const password = await passwordUtil.hashPassword(data.password);
    // use data.passowrd to create a hashed password
    data.password = password;
    data.telephone = telephone;
    const sender = await createSender(data);
    res.status(HttpStatus.CREATED).json({
      sender,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(
      new HttpException(
        error.status || HttpStatus.UNPROCESSABLE_ENTITY,
        error.message
      )
    );
  }
};
// get sender's receipents
exports.senderRecipients = async (req, res, next) => {
  const { senderId } = req.params;

  try {
    const receivers = await getSendersReceivers(senderId);
    return res
      .status(HttpStatus.OK)
      .json({ receivers, Timestamp: new Date().toISOString() }); //
  } catch (error) {
    loggerUtil.error(error.message);
    return next(
      new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
    );
  }
};
// get senders packages
exports.senderPackages = async (req, res, next) => {
  const { senderId } = req.params;

  try {
    const packages = await sendersPackages(senderId);

    return res
      .status(HttpStatus.OK)
      .json({ packages, Timestamp: new Date().toISOString() }); //
  } catch (error) {
    loggerUtil.error(error.message);
    return next(
      new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
    );
  }
};
// login a sender into the database
exports.loginSender = async (req, res, next) => {
  // this function takes in an email and password and compares it //
  let { password, telephone } = req.body;
  telephone = formatGhPhoneNumber(telephone);

  try {
    const exists = await checkUserExists(telephone);
    if (exists.user === null || exists.user === "null") {
      throw new HttpException(
        HttpStatus.UNPROCESSABLE_ENTITY,
        "Account not  found!"
      );
    }
    const validPwd = await passwordUtil.comparePassword(
      password,
      exists.user?.password
    );
    if (validPwd === false || validPwd === "false") {
      throw new HttpException(
        HttpStatus.UNPROCESSABLE_ENTITY,
        "Invalid credentials!"
      );
    }
    const expiration = moment().add(5, "minutes");
    const data = {
      code: "1234",
      expiration,
    };
    const user = await updateUserTotp(exists.isBiker, exists.user.id, data);
    delete user.password;
    res.status(HttpStatus.OK).json({
      status: "success",
      user,
      isBiker: exists.isBiker,
    });
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

// verify sender's token login

exports.verifyTokenlogin = async (req, res, next) => {
  try {
    let { otp, telephone } = req.body;
    telephone = formatGhPhoneNumber(telephone);
    const find = await findToken(otp, telephone);
    if (find.user === null || find.user === "null") {
      throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, "invalid otp");
    }

    const token = tokenUtil.signToken(find.user);
    res.header("Authorization", token);

    const data = {
      confirmed: true,
    };
    const user = await updateUserTotp(find.isBiker, find.user.id, data);

    delete user.password;
    res.status(HttpStatus.OK).json({
      status: "success",
      token,
      user,
      isBiker: find.isBiker,
      Timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.log(error);
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
};
// request login otp
exports.requestOtp = async (req, res, next) => {
  try {
    let { telephone } = req.params;
    telephone = formatGhPhoneNumber(telephone);
    const find = await checkUserExists(telephone);
    if (find.user === null || find.user === "null") {
      throw new HttpException(
        HttpStatus.UNPROCESSABLE_ENTITY,
        "Account not  found!"
      );
    }
    const expiration = moment().add(5, "minutes");
    const data = {
      code: "1234",
      expiration,
    };

    const user = await updateUserTotp(find.isBiker, find.user.id, data);
    delete user.password;
    res.status(HttpStatus.OK).json({
      status: "success",
      message: "Otp Sent to user's phone!",
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
};
// request a verification token for resetting password
exports.verifyTokenReset = async (req, res, next) => {
  try {
    let { otp, telephone } = req.body;
    telephone = formatGhPhoneNumber(telephone);
    const find = await findToken(otp, telephone);
    if (find.user === null || find.user === "null") {
      throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, "invalid otp");
    }

    res.status(HttpStatus.OK).json({
      status: "success",
      user: find.user,
      isBiker: find.isBiker,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
};
// function for resetting a user's password
exports.resetPassword = async (req, res, next) => {
  try {
    let { telephone } = req.params;
    let { password } = req.body;
    telephone = formatGhPhoneNumber(telephone);
    const exists = await checkUserExists(telephone);

    if (exists.user === null || exists.user === "null") {
      throw new HttpException(
        HttpStatus.UNPROCESSABLE_ENTITY,
        "Account not  found!"
      );
    }
    password = await passwordUtil.hashPassword(password);
    if (!password) {
      throw new HttpException(
        HttpStatus.UNPROCESSABLE_ENTITY,
        " Password not hashed"
      );
    }
    const expiration = moment().add(1, "minutes");
    const data = {
      code: "1234",
      expiration,
      password,
    };
    const user = await updateUserTotp(exists.isBiker, exists.user.id, data);
    delete user.password;
    res.status(HttpStatus.OK).json({
      status: "success",
      user,
      isBiker: exists.isBiker,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
};
// function to logout a user
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
    next(new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
};
// get the authenticated user
exports.getAuthSender = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sender = await authSender(id);
    return res.status(HttpStatus.OK).json({ sender });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.NOT_FOUND, error.message));
  }
};

//  loading all senders
exports.getAllSenders = async (req, res, next) => {
  try {
    const { location } = req.params;
    const user = await getSendersByLocation(location);
    res.status(HttpStatus.OK).json({
      user,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, error.message));
  }
};
//  loading a single user
exports.getSingleSender = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await getSingleSender(id);
    res.status(HttpStatus.OK).json({
      user,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, error.message));
  }
};
//  editing a sender
exports.updateSender = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (data.password) {
      data.password = await passwordUtil.hashPassword(data.password);
    }
    const sender = await editSender(id);
    res.status(HttpStatus.OK).json({
      message: "Sender info updated",
      sender,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
};

//  deleting a customer
exports.deleteSender = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await removeSender(id);
    res.status(HttpStatus.OK).json({
      user,
    });
  } catch (error) {
    loggerUtil.error(error.message);
    next(new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, error.message));
  }
};
