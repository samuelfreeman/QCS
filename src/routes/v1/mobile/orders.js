import { Router } from "express";
import * as orders from "../../../controllers/orders.js";

const ManageOrderRouter = Router();

/**
 * @swagger
 * /api/v1/mobile/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Mobile - Orders]
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
 * /api/v1/mobile/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Mobile - Orders]
 *     responses:
 *       200:
 *         description: List of all orders
 */
ManageOrderRouter.get("/", orders.getAllOrders);

/**
 * @swagger
 * /api/v1/mobile/orders/{senderId}:
 *   patch:
 *     summary: Update orders by sender ID
 *     tags: [Mobile - Orders]
 *     parameters:
 *       - in: path
 *         name: senderId
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
 *         description: Orders updated successfully
 */
ManageOrderRouter.patch("/:senderId", orders.updateOrdersBySenderId);

/**
 * @swagger
 * /api/v1/mobile/orders/{code}:
 *   delete:
 *     summary: Delete order by code
 *     tags: [Mobile - Orders]
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
 * /api/v1/mobile/orders/{orderCode}:
 *   get:
 *     summary: Get order by code
 *     tags: [Mobile - Orders]
 *     parameters:
 *       - in: path
 *         name: orderCode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 */
ManageOrderRouter.get("/:orderCode/", orders.getOrderByCode);

/**
 * @swagger
 * /api/v1/mobile/orders/{senderId}/order:
 *   get:
 *     summary: Get all orders by sender ID
 *     tags: [Mobile - Orders]
 *     parameters:
 *       - in: path
 *         name: senderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of sender's orders
 */
ManageOrderRouter.get("/:senderId/order", orders.getAllOrdersbySenderID);

/**
 * @swagger
 * /api/v1/mobile/orders/package/{id}/processing:
 *   patch:
 *     summary: Mark package as processing
 *     tags: [Mobile - Orders]
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
 *         description: Package marked as processing
 */
ManageOrderRouter.patch("/package/:id/processing", orders.processPackage);

/**
 * @swagger
 * /api/v1/mobile/orders/package/{id}/receiving:
 *   patch:
 *     summary: Mark package as receiving/delivery
 *     tags: [Mobile - Orders]
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
 *         description: Package marked as receiving
 */
ManageOrderRouter.patch("/package/:id/receiving", orders.deliveryPackage);

/**
 * @swagger
 * /api/v1/mobile/orders/package/{id}:
 *   patch:
 *     summary: Update package details
 *     tags: [Mobile - Orders]
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
 * /api/v1/mobile/orders/package/{id}:
 *   get:
 *     summary: Get package details
 *     tags: [Mobile - Orders]
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
 * /api/v1/mobile/orders/package/{id}/returning:
 *   patch:
 *     summary: Mark package as returning
 *     tags: [Mobile - Orders]
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
 *         description: Package marked as returning
 */
ManageOrderRouter.patch("/package/:id/returning", orders.returnPackage);

/**
 * @swagger
 * /api/v1/mobile/orders/status/{status}:
 *   get:
 *     summary: Get orders by status
 *     tags: [Mobile - Orders]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of orders with specific status
 */
ManageOrderRouter.get("/status/:status", orders.getOrdersByStatus);

/**
 * @swagger
 * /api/v1/mobile/orders/package/{id}/cancelling:
 *   patch:
 *     summary: Mark package as cancelled/deleted
 *     tags: [Mobile - Orders]
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
 *         description: Package marked as cancelled
 */
ManageOrderRouter.patch("/package/:id/cancelling", orders.deletePackage);

export default ManageOrderRouter;
