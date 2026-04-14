import { Router } from "express";
import * as sender from "../../../controllers/sender.js";

const ManageSenderRouter = Router();

/**
 * @swagger
 * /api/v1/mobile/sender/login:
 *   post:
 *     summary: Sender login
 *     tags: [Mobile - Senders]
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
 */
ManageSenderRouter.post("/login", sender.loginSender);

/**
 * @swagger
 * /api/v1/mobile/sender/verify-otp:
 *   post:
 *     summary: Verify sender OTP for login
 *     tags: [Mobile - Senders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified successfully
 */
ManageSenderRouter.post("/verify-otp", sender.verifyTokenlogin);

/**
 * @swagger
 * /api/v1/mobile/sender:
 *   post:
 *     summary: Register a new sender
 *     tags: [Mobile - Senders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sender'
 *     responses:
 *       201:
 *         description: Sender registered successfully
 */
ManageSenderRouter.post("/", sender.createSender);

/**
 * @swagger
 * /api/v1/mobile/sender/{senderId}/receivers:
 *   get:
 *     summary: Get receivers for a sender
 *     tags: [Mobile - Senders]
 *     parameters:
 *       - in: path
 *         name: senderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of sender's receivers
 */
ManageSenderRouter.get("/:senderId/receivers", sender.senderRecipients);

/**
 * @swagger
 * /api/v1/mobile/sender/{senderId}/packages:
 *   get:
 *     summary: Get packages for a sender
 *     tags: [Mobile - Senders]
 *     parameters:
 *       - in: path
 *         name: senderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of sender's packages
 */
ManageSenderRouter.get("/:senderId/packages", sender.senderPackages);

/**
 * @swagger
 * /api/v1/mobile/sender/{id}:
 *   patch:
 *     summary: Update a sender
 *     tags: [Mobile - Senders]
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
 *         description: Sender updated successfully
 */
ManageSenderRouter.patch("/:id", sender.updateSender);

/**
 * @swagger
 * /api/v1/mobile/sender/{telephone}/request-otp:
 *   get:
 *     summary: Request OTP for sender
 *     tags: [Mobile - Senders]
 *     parameters:
 *       - in: path
 *         name: telephone
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OTP sent successfully
 */
ManageSenderRouter.get("/:telephone/request-otp", sender.requestOtp);

/**
 * @swagger
 * /api/v1/mobile/sender/verify-password-otp:
 *   post:
 *     summary: Verify OTP for password reset
 *     tags: [Mobile - Senders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified successfully
 */
ManageSenderRouter.post("/verify-password-otp", sender.verifyTokenReset);

/**
 * @swagger
 * /api/v1/mobile/sender/{telephone}/reset-password:
 *   patch:
 *     summary: Reset sender password
 *     tags: [Mobile - Senders]
 *     parameters:
 *       - in: path
 *         name: telephone
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
ManageSenderRouter.patch("/:telephone/reset-password", sender.resetPassword);

export default ManageSenderRouter;
