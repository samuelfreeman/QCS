import { Router } from "express";
import * as orders from "../../../controllers/orders.js";

const ManageOrderRouter = Router();

/**
 * @swagger
 * /api/v1/web/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully
 */
ManageOrderRouter.post("/", orders.createOrder);

/**
 * @swagger
 * /api/v1/web/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of all orders
 */
ManageOrderRouter.get("/", orders.getAllOrders);

/**
 * @swagger
 * /api/v1/web/orders/{code}:
 *   delete:
 *     summary: Delete order by code
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 */
ManageOrderRouter.delete("/:code", orders.deleteOrder);

/**
 * @swagger
 * /api/v1/web/orders/status/{status}/location/{location}:
 *   get:
 *     summary: Get orders by status and location
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: location
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of orders filtered by status and location
 */
ManageOrderRouter.get(
  "/status/:status/location/:location",
  orders.getOrdersByStatus,
);

/**
 * @swagger
 * /api/v1/web/orders/package/{id}:
 *   get:
 *     summary: Get package details
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Package details
 */
ManageOrderRouter.get("/package/:id/", orders.getPackage);

/**
 * @swagger
 * /api/v1/web/orders/package/{id}:
 *   delete:
 *     summary: Delete package
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Package deleted successfully
 */
ManageOrderRouter.delete("/package/:id", orders.deletePackage);

/**
 * @swagger
 * /api/v1/web/orders/package/bulk:
 *   patch:
 *     summary: Update multiple packages
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *     responses:
 *       200:
 *         description: Packages updated successfully
 */
ManageOrderRouter.patch("/package/bulk/", orders.updateMultiplePackages);

/**
 * @swagger
 * /api/v1/web/orders/package/{id}:
 *   patch:
 *     summary: Update package
 *     tags: [Orders]
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
 *         description: Package updated successfully
 */
ManageOrderRouter.patch("/package/:id/", orders.updatePackage);

/**
 * @swagger
 * /api/v1/web/orders/analytics/{location}:
 *   get:
 *     summary: Get order analytics by location
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: location
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Analytics data for orders
 */
ManageOrderRouter.get("/analytics/:location", orders.getAnalytics);

export default ManageOrderRouter;
