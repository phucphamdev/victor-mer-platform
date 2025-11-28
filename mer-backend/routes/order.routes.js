const express = require("express");
const {
  paymentIntent,
  addOrder,
  getOrders,
  updateOrderStatus,
  getSingleOrder,
} = require("../controller/order.controller");

// router
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order management
 */

/**
 * @swagger
 * /api/order/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get("/orders", getOrders);

/**
 * @swagger
 * /api/order/{id}:
 *   get:
 *     summary: Get single order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 */
router.get("/:id", getSingleOrder);

/**
 * @swagger
 * /api/order/create-payment-intent:
 *   post:
 *     summary: Create payment intent
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Payment intent created
 */
router.post("/create-payment-intent", paymentIntent);

/**
 * @swagger
 * /api/order/saveOrder:
 *   post:
 *     summary: Save new order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cart
 *               - user
 *             properties:
 *               cart:
 *                 type: array
 *               user:
 *                 type: string
 *               shippingAddress:
 *                 type: object
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post("/saveOrder", addOrder);

/**
 * @swagger
 * /api/order/update-status/{id}:
 *   patch:
 *     summary: Update order status
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
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
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, processing, delivered, cancelled]
 *     responses:
 *       200:
 *         description: Order status updated
 */
router.patch("/update-status/:id", updateOrderStatus);

module.exports = router;
