import { Router } from "express";
import * as user from "../../../controllers/user.js";
import * as auth from "../../../utils/tokenUtil.js";

const ManageUserRouter = Router();

const authenticate = [auth.verifyToken];

/**
 * @swagger
 * /api/v1/web/users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
ManageUserRouter.post("/login", user.loginUser);

/**
 * @swagger
 * /api/v1/web/users/signUp:
 *   post:
 *     summary: User sign up
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
ManageUserRouter.post("/signUp", user.saveUser);

/**
 * @swagger
 * /api/v1/web/users/{id}:
 *   patch:
 *     summary: Update user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: User updated successfully
 */
ManageUserRouter.patch("/:id", user.updateUser);

/**
 * @swagger
 * /api/v1/web/users/logout:
 *   get:
 *     summary: User logout
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
ManageUserRouter.get("/logout", user.logout);

/**
 * @swagger
 * /api/v1/web/users/auth/{id}:
 *   get:
 *     summary: Get authenticated user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details
 *       401:
 *         description: Unauthorized
 */
ManageUserRouter.get("/auth/:id", authenticate, user.getAuthUser);

/**
 * @swagger
 * /api/v1/web/users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
ManageUserRouter.delete("/:id", user.deleteUser);

/**
 * @swagger
 * /api/v1/web/users/{location}:
 *   get:
 *     summary: Get all users by location
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: location
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of users
 */
ManageUserRouter.get("/:location", user.getAllUsers);

/**
 * @swagger
 * /api/v1/web/users/forget-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset email sent
 */
ManageUserRouter.post("/forget-password", user.forgetPassword);

/**
 * @swagger
 * /api/v1/web/users/{token}/verify/{email}:
 *   get:
 *     summary: Verify token for password reset
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Token verified
 */
ManageUserRouter.get("/:token/verify/:email", user.verifyToken);

/**
 * @swagger
 * /api/v1/web/users/{email}/reset-password:
 *   patch:
 *     summary: Reset password
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 */
ManageUserRouter.patch("/:email/reset-password", user.resetPassword);

export default ManageUserRouter;
