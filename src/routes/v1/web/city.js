import { Router } from "express";
import * as city from "../../../controllers/city.js";

const ManageSuburbRouter = Router();

/**
 * @swagger
 * /api/v1/web/cities:
 *   post:
 *     summary: Create a new city
 *     tags: [Cities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/City'
 *     responses:
 *       201:
 *         description: City created successfully
 */
ManageSuburbRouter.post("/", city.createCity);

/**
 * @swagger
 * /api/v1/web/cities/{id}:
 *   patch:
 *     summary: Update a city
 *     tags: [Cities]
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
 *         description: City updated successfully
 */
ManageSuburbRouter.patch("/:id", city.updateCity);

/**
 * @swagger
 * /api/v1/web/cities:
 *   get:
 *     summary: Get all cities
 *     tags: [Cities]
 *     responses:
 *       200:
 *         description: List of all cities
 */
ManageSuburbRouter.get("/", city.getCities);

/**
 * @swagger
 * /api/v1/web/cities/{id}:
 *   get:
 *     summary: Get a single city
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: City details
 */
ManageSuburbRouter.get("/:id", city.getSingleCity);

/**
 * @swagger
 * /api/v1/web/cities/city/{id}:
 *   delete:
 *     summary: Delete a city
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: City deleted successfully
 */
ManageSuburbRouter.delete("/city/:id", city.removeCity);

export default ManageSuburbRouter;
