import { Router } from "express";
import * as prices from "../../../controllers/deliveryPrices.js";

const ManagePriceRouter = Router();

/**
 * @swagger
 * /api/v1/mobile/prices/city/{cityId}/destination/{destinationId}:
 *   get:
 *     summary: Get price for a city and destination
 *     tags: [Mobile - Prices]
 *     parameters:
 *       - in: path
 *         name: cityId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: destinationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Price details
 */
ManagePriceRouter.get(
  "/city/:cityId/destination/:destinationId",
  prices.getPrice,
);

/**
 * @swagger
 * /api/v1/mobile/prices:
 *   get:
 *     summary: Get all delivery prices
 *     tags: [Mobile - Prices]
 *     responses:
 *       200:
 *         description: List of all prices
 */
ManagePriceRouter.get("/", prices.getPrices);
export default ManagePriceRouter;
