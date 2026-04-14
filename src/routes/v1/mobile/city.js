import { Router } from "express";
import * as suburb from "../../../controllers/suburb.js";
import * as city from "../../../controllers/city.js";
const ManageSuburbRouter = Router();

/**
 * @swagger
 * /api/v1/mobile/city/{cityId}/suburbs:
 *   get:
 *     summary: Get suburbs for a city
 *     tags: [Mobile - Cities]
 *     parameters:
 *       - in: path
 *         name: cityId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of suburbs for the city
 */
ManageSuburbRouter.get("/:cityId/suburbs", suburb.getCitySuburbs);

/**
 * @swagger
 * /api/v1/mobile/city:
 *   get:
 *     summary: Get all cities
 *     tags: [Mobile - Cities]
 *     responses:
 *       200:
 *         description: List of all cities
 */
ManageSuburbRouter.get("/", city.getCities);

export default ManageSuburbRouter;
