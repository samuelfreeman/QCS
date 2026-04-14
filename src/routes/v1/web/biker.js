import { Router } from "express";
import * as biker from "../../../controllers/biker.js";

const ManageBikerRouter = Router();

/**
 * @swagger
 * /api/v1/web/bikers/pickUp:
 *   patch:
 *     summary: Mark package as picked up
 *     tags: [Bikers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               packageId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Package picked up successfully
 */
ManageBikerRouter.patch("/pickUp", biker.packagePickup);

/**
 * @swagger
 * /api/v1/web/bikers/delivery:
 *   patch:
 *     summary: Mark package as delivered
 *     tags: [Bikers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               packageId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Package delivered successfully
 */
ManageBikerRouter.patch("/delivery", biker.packageDelivery);

/**
 * @swagger
 * /api/v1/web/bikers/pickUp/{id}:
 *   get:
 *     summary: Get packages to pick up for a biker
 *     tags: [Bikers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of packages to pick up
 */
ManageBikerRouter.get("/pickUp/:id", biker.packagesToPickup);

/**
 * @swagger
 * /api/v1/web/bikers/shares:
 *   post:
 *     summary: Create biker shares
 *     tags: [Bikers]
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
