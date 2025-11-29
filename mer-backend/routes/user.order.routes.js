const express = require('express');
const router = express.Router();
const userOrderController = require('../controller/user.order.controller');
const verifyToken = require('../middleware/verifyToken');

/**
 * @swagger
 * tags:
 *   name: UserOrder
 *   description: User order and dashboard management
 */

/**
 * @swagger
 * /api/user-order/dashboard-amount:
 *   get:
 *     summary: Get dashboard amount statistics
 *     tags: [UserOrder]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard amount data
 */
router.get('/dashboard-amount', userOrderController.getDashboardAmount);

/**
 * @swagger
 * /api/user-order/sales-report:
 *   get:
 *     summary: Get sales report
 *     tags: [UserOrder]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sales report data
 */
router.get('/sales-report', userOrderController.getSalesReport);

/**
 * @swagger
 * /api/user-order/most-selling-category:
 *   get:
 *     summary: Get most selling categories
 *     tags: [UserOrder]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Most selling category data
 */
router.get('/most-selling-category', userOrderController.mostSellingCategory);

/**
 * @swagger
 * /api/user-order/dashboard-recent-order:
 *   get:
 *     summary: Get recent orders for dashboard
 *     tags: [UserOrder]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent orders data
 */
router.get('/dashboard-recent-order', userOrderController.getDashboardRecentOrder);

/**
 * @swagger
 * /api/user-order/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [UserOrder]
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
 *       404:
 *         description: Order not found
 */
router.get('/:id', userOrderController.getOrderById);

/**
 * @swagger
 * /api/user-order:
 *   get:
 *     summary: Get all orders by current user
 *     tags: [UserOrder]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user orders
 */
router.get('/',verifyToken, userOrderController.getOrderByUser);

module.exports = router;
