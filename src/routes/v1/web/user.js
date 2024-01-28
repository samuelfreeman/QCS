const { Router } = require('express');

const user = require('../../../controllers/user');

const auth = require('../../../utils/tokenUtil');

// const sender = require('../../../controllers/sender');

// const biker = require('../../../controllers/biker')

const ManageUserRouter = Router();

const authenticate = [auth.verifyToken];

ManageUserRouter.post('/login', user.loginUser);
ManageUserRouter.post('/signUp', user.saveUser);
ManageUserRouter.patch('/:id', user.updateUser);
ManageUserRouter.get('/logout', user.logout);
ManageUserRouter.get('/auth/:id', authenticate, user.getAuthUser);
ManageUserRouter.delete('/:id', user.deleteUser);
ManageUserRouter.get('/:location', user.getAllUsers);
ManageUserRouter.post('/forget-password', user.forgetPassword);
ManageUserRouter.get('/:token/verify/:email', user.verifyToken);
ManageUserRouter.patch('/:email/reset-password', user.resetPassword);

// ======================================================================
// ManageUserRouter.get('/bikers/:location', authenticate, user.getAllBikers);
// ManageUserRouter.post('/register', user.createBiker);
// ManageUserRouter.get('/biker/:id', authenticate, user.getSingleBiker);
// ManageUserRouter.patch('/biker/:id', authenticate, user.updateBiker);
// ManageUserRouter.delete('/biker/:id', authenticate, user.removeBiker);
// ManageUserRouter.get('/sender/:location', authenticate, user.getAllSenders);
// ManageUserRouter.get('/sender/:id', authenticate, user.getSingleSender);
// ManageUserRouter.delete('/sender/:id', authenticate, user.deleteSender);
// ManageUserRouter.patch('/sender/:id', authenticate, user.updateSender);
// ManageUserRouter.get('/:senderId/packages', authenticate, sender.senderPackages);
// ManageUserRouter.post('/sender/register', sender.createSender);
module.exports = ManageUserRouter;
