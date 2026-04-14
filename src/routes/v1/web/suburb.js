import { Router } from "express";
import * as suburb from "../../../controllers/suburb.js";

const ManageSuburbRouter = Router();

/**
 * @swagger
 * /api/v1/web/suburb/{cityId}/suburbs:
 *   get:
 *     summary: Get suburbs for a city
 *     tags: [Suburbs]
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
 * /api/v1/web/suburb/suburb:
 *   post:
 *     summary: Create a new suburb
 *     tags: [Suburbs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               cityId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Suburb created successfully
 */
ManageSuburbRouter.post("/suburb", suburb.createSuburb);

/**
 * @swagger
 * /api/v1/web/suburb/destination/{id}:
 *   patch:
 *     summary: Update suburb city ID
 *     tags: [Suburbs]
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
 *         description: Suburb updated successfully
 */
ManageSuburbRouter.patch("/destination/:id", suburb.updateSuburbCityId);

/**
 * @swagger
 * /api/v1/web/suburb/suburb/{id}:
 *   delete:
 *     summary: Delete a suburb
 *     tags: [Suburbs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Suburb deleted successfully
 */
ManageSuburbRouter.delete("/suburb/:id", suburb.removeSuburb);

/**
 * @swagger
 * /api/v1/web/suburb/suburb/{id}:
 *   patch:
 *     summary: Update a suburb
 *     tags: [Suburbs]
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
 *         description: Suburb updated successfully
 */
ManageSuburbRouter.patch("/suburb/:id", suburb.updateSuburb);

/**
 * @swagger
 * /api/v1/web/suburb/suburb/{id}:
 *   get:
 *     summary: Get a single suburb
 *     tags: [Suburbs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Suburb details
 */
ManageSuburbRouter.get("/suburb/:id", suburb.getSingleSuburb);

export default ManageSuburbRouter;
