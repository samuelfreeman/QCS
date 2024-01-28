const { Router } = require("express");
const orders = require("../../../controllers/orders");

const ManageOrderRouter = Router();

// Importing the orders controller for managing orders
const orders = require("./path-to-your-orders-controller");
// POST route to create a new order
ManageOrderRouter.post("/", orders.createOrder);
// GET route to retrieve all orders
ManageOrderRouter.get("/", orders.getAllOrders);
// PATCH route to update orders by senderId
ManageOrderRouter.patch("/:senderId", orders.updateOrdersBySenderId);
// DELETE route to delete an order by its code
ManageOrderRouter.delete("/:code", orders.deleteOrder);
// GET route to retrieve an order by its order code
ManageOrderRouter.get("/:orderCode/", orders.getOrderByCode);
// GET route to retrieve all orders by senderId
ManageOrderRouter.get("/:senderId/order", orders.getAllOrdersbySenderID);
// PATCH route to mark a package as processing
ManageOrderRouter.patch("/package/:id/processing", orders.processPackage);
// PATCH route to mark a package as receiving/delivery
ManageOrderRouter.patch("/package/:id/receiving", orders.deliveryPackage);

// PATCH route to update package details
ManageOrderRouter.patch("/package/:id/", orders.updatePackage);

// GET route to retrieve details of a specific package
ManageOrderRouter.get("/package/:id/", orders.getPackage);

// PATCH route to mark a package as returning
ManageOrderRouter.patch("/package/:id/returning", orders.returnPackage);

// GET route to retrieve orders by a specific status
ManageOrderRouter.get("/status/:status", orders.getOrdersByStatus);

// PATCH route to mark a package as cancelling/deleting
ManageOrderRouter.patch("/package/:id/cancelling", orders.deletePackage);

module.exports = ManageOrderRouter;
