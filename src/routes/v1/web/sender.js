import { Router } from "express";
import * as sender from "../../../controllers/sender.js";

const ManageSenderRouter = Router();

/**
 * @swagger
 * /api/v1/web/senders/login:
 *   post:
 *     summary: Sender login
 *     tags: [Senders]
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
 * /api/v1/web/senders/verify-otp:
 *   post:
 *     summary: Verify sender OTP for login
 *     tags: [Senders]
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
 * /api/v1/web/senders:
 *   post:
 *     summary: Register a new sender
 *     tags: [Senders]
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
 * /api/v1/web/senders/{senderId}/receivers:
 *   get:
 *     summary: Get receivers for a sender
 *     tags: [Senders]
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
 * /api/v1/web/senders/{senderId}/packages:
 *   get:
 *     summary: Get packages for a sender
 *     tags: [Senders]
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
 * /api/v1/web/senders/{id}:
 *   patch:
 *     summary: Update a sender
 *     tags: [Senders]
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
 * /api/v1/web/senders:
 *   get:
 *     summary: Get all senders
 *     tags: [Senders]
 *     responses:
 *       200:
 *         description: List of all senders
 */
ManageSenderRouter.get("/", sender.getAllSenders);

/**
 * @swagger
 * /api/v1/web/senders/{id}:
 *   delete:
 *     summary: Delete a sender
 *     tags: [Senders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sender deleted successfully
 */
ManageSenderRouter.delete("/:id", sender.deleteSender);

/**
 * @swagger
 * /api/v1/web/senders/{id}:
 *   get:
 *     summary: Get a single sender
 *     tags: [Senders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sender details
 */
ManageSenderRouter.get("/:id", sender.getSingleSender);

/**
 * @swagger
 * /api/v1/web/senders/{id}:
 *   get:
 *     summary: Get authenticated sender
 *     tags: [Senders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Authenticated sender details
 */
ManageSenderRouter.delete("/:id", sender.getAuthSender);

export default ManageSenderRouter;
