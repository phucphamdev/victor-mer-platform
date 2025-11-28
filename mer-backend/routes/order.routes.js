const express = require("express");
const {
  paymentIntent,
  addOrder,
  getOrders,
  updateOrderStatus,
  getSingleOrder,
} = require("../controller/order.controller");
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');

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
 *     summary: Lấy danh sách đơn hàng
 *     description: Lấy tất cả đơn hàng trong hệ thống. Yêu cầu xác thực Bearer token.
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Số trang (không bắt buộc, mặc định 1)
 *         example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Số đơn hàng mỗi trang (không bắt buộc, mặc định 10)
 *         example: 10
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *           enum: [pending, processing, delivered, cancelled]
 *         description: Lọc theo trạng thái đơn hàng (không bắt buộc)
 *         example: "pending"
 *       - in: query
 *         name: startDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: Lọc từ ngày (không bắt buộc, định dạng YYYY-MM-DD)
 *         example: "2025-01-01"
 *       - in: query
 *         name: endDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: Lọc đến ngày (không bắt buộc, định dạng YYYY-MM-DD)
 *         example: "2025-12-31"
 *     responses:
 *       200:
 *         description: Lấy danh sách đơn hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 pagination:
 *                   type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/orders", verifyToken, authorization('admin'), getOrders);

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
router.get("/:id", verifyToken, getSingleOrder);

/**
 * @swagger
 * /api/order/create-payment-intent:
 *   post:
 *     summary: Tạo payment intent cho thanh toán
 *     description: Tạo payment intent với Stripe để xử lý thanh toán. Không yêu cầu xác thực.
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
 *                 description: Số tiền thanh toán (bắt buộc, đơn vị VND)
 *                 example: 1000000
 *               currency:
 *                 type: string
 *                 description: Loại tiền tệ (không bắt buộc, mặc định VND)
 *                 example: "vnd"
 *           example:
 *             amount: 1000000
 *             currency: "vnd"
 *     responses:
 *       200:
 *         description: Tạo payment intent thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientSecret:
 *                   type: string
 *                   description: Client secret để hoàn tất thanh toán
 *                   example: "pi_xxx_secret_xxx"
 *       400:
 *         description: Dữ liệu không hợp lệ
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
router.post("/saveOrder", verifyToken, addOrder);

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
router.patch("/update-status/:id", verifyToken, authorization('admin'), updateOrderStatus);

module.exports = router;
