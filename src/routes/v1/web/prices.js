import { Router } from "express";
import * as prices from "../../../controllers/deliveryPrices.js";

const ManagePriceRouter = Router();

/**
 * @swagger
 * /api/v1/web/price:
 *   post:
 *     summary: Create a new delivery price
 *     tags: [Prices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Price'
 *     responses:
 *       201:
 *         description: Price created successfully
 */
ManagePriceRouter.post("/", prices.createPrice);

/**
 * @swagger
 * /api/v1/web/price/bulk:
 *   post:
 *     summary: Create multiple delivery prices
 *     tags: [Prices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Price'
 *     responses:
 *       201:
 *         description: Prices created successfully
 */
ManagePriceRouter.post("/bulk/", prices.createBulkPrice);

/**
 * @swagger
 * /api/v1/web/price/city/{cityId}/destination/{destinationId}:
 *   get:
 *     summary: Get price for a city and destination
 *     tags: [Prices]
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
 * /api/v1/web/price:
 *   get:
 *     summary: Get all delivery prices
 *     tags: [Prices]
 *     responses:
 *       200:
 *         description: List of all prices
 */
ManagePriceRouter.get("/", prices.getPrices);

/**
 * @swagger
 * /api/v1/web/price/{location}:
 *   get:
 *     summary: Get prices for a specific location
 *     tags: [Prices]
 *     parameters:
 *       - in: path
 *         name: location
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of prices for location
 */
ManagePriceRouter.get("/:location", prices.getSinglePriceLocation);

/**
 * @swagger
 * /api/v1/web/price/{id}:
 *   patch:
 *     summary: Update a delivery price
 *     tags: [Prices]
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
 *         description: Price updated successfully
 */
ManagePriceRouter.patch("/:id", prices.updatePrice);

/**
 * @swagger
 * /api/v1/web/price/{id}:
 *   delete:
 *     summary: Delete a delivery price
 *     tags: [Prices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Price deleted successfully
 */
ManagePriceRouter.delete("/:id", prices.deleteprice);
export default ManagePriceRouter;
