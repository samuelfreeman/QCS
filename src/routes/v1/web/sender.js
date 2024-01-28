const { Router } = require("express");
const sender = require("../../../controllers/sender");

const ManageSenderRouter = Router();
// allow senders to login
ManageSenderRouter.post("/login", sender.loginSender);
//  verify sender's otp
ManageSenderRouter.post("/verify-otp", sender.verifyTokenlogin);
// register  a sender
ManageSenderRouter.post("/", sender.createSender);
//  get senders receivers
ManageSenderRouter.get("/:senderId/receivers", sender.senderRecipients);
// get senders packages
ManageSenderRouter.get("/:senderId/packages", sender.senderPackages);
// update  a sender
ManageSenderRouter.patch("/:id", sender.updateSender);
//  read all senders
ManageSenderRouter.get("/", sender.getAllSenders);
//  delete a sender
ManageSenderRouter.delete("/:id", sender.deleteSender);
// read a single sender
ManageSenderRouter.get("/:id", sender.getSingleSender);
// authenticate a sender
ManageSenderRouter.delete("/:id", sender.getAuthSender);

module.exports = ManageSenderRouter;
