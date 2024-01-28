const { Router } = require('express');
const sender = require('../../../controllers/sender');


const ManageSenderRouter = Router();
//  allow senders to login 
ManageSenderRouter.post('/login', sender.loginSender);
// verify sender's otp 
ManageSenderRouter.post('/verify-otp', sender.verifyTokenlogin);
// register a sender
ManageSenderRouter.post('/', sender.createSender);
// get a senders receivers
ManageSenderRouter.get('/:senderId/receivers', sender.senderRecipients);
// get a senders packages
ManageSenderRouter.get('/:senderId/packages', sender.senderPackages);
//  update a sender
ManageSenderRouter.patch('/:id', sender.updateSender);
// request an otp
ManageSenderRouter.get('/:telephone/request-otp', sender.requestOtp);
//  verify password 
ManageSenderRouter.post('/verify-password-otp', sender.verifyTokenReset);
// reset-password 
ManageSenderRouter.patch('/:telephone/reset-password', sender.resetPassword);

module.exports = ManageSenderRouter;
