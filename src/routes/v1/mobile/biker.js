import { Router } from "express";
import * as biker from "../../../controllers/biker.js";
const ManageBikerRouter = Router();

/**
 * @swagger
 * /api/v1/mobile/biker/register:
 *   post:
 *     summary: Register a new biker
 *     tags: [Mobile - Bikers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Biker'
 *     responses:
 *       201:
 *         description: Biker registered successfully
 */
ManageBikerRouter.post("/register", biker.createBiker);

/**
 * @swagger
 * /api/v1/mobile/biker:
 *   get:
 *     summary: Get all bikers
 *     tags: [Mobile - Bikers]
 *     responses:
 *       200:
 *         description: List of all bikers
 */
ManageBikerRouter.get("/", biker.getAllBikers);

/**
 * @swagger
 * /api/v1/mobile/biker/{id}:
 *   get:
 *     summary: Get a single biker
 *     tags: [Mobile - Bikers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Biker details
 */
ManageBikerRouter.get("/:id", biker.getSingleBiker);

/**
 * @swagger
 * /api/v1/mobile/biker/{id}:
 *   patch:
 *     summary: Update a biker
 *     tags: [Mobile - Bikers]
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
 *         description: Biker updated successfully
 */
ManageBikerRouter.patch("/:id", biker.updateBiker);

/**
 * @swagger
 * /api/v1/mobile/biker/{id}:
 *   delete:
 *     summary: Delete a biker
 *     tags: [Mobile - Bikers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Biker deleted successfully
 */
ManageBikerRouter.delete("/:id", biker.removeBiker);

/**
 * @swagger
 * /api/v1/mobile/biker/{id}/pickups:
 *   get:
 *     summary: Get a biker's pickup packages
 *     tags: [Mobile - Bikers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of pickup packages
 */
ManageBikerRouter.get("/:id/pickups", biker.packagesToPickup);

/**
 * @swagger
 * /api/v1/mobile/biker/{id}/deliveries:
 *   get:
 *     summary: Get a biker's delivery packages
 *     tags: [Mobile - Bikers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of delivery packages
 */
ManageBikerRouter.get("/:id/deliveries", biker.packagesToDeliver);

/**
 * @swagger
 * /api/v1/mobile/biker/{id}/completed-deliveries:
 *   get:
 *     summary: Get a biker's completed deliveries
 *     tags: [Mobile - Bikers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of completed deliveries
 */
ManageBikerRouter.get("/:id/completed-deliveries", biker.getBikerDeliveries);

/**
 * @swagger
 * /api/v1/mobile/biker/{id}/completed-pickups:
 *   get:
 *     summary: Get a biker's completed pickups
 *     tags: [Mobile - Bikers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of completed pickups
 */
ManageBikerRouter.get("/:id/completed-pickups", biker.getBikerPickups);

/**
 * @swagger
 * /api/v1/mobile/biker/shares:
 *   post:
 *     summary: Create biker shares
 *     tags: [Mobile - Bikers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Biker shares created successfully
 */
ManageBikerRouter.post("/shares", biker.bikerShares);

export default ManageBikerRouter;
