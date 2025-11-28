const express = require('express');
const router = express.Router();
// internal
const productController = require('../controller/product.controller');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management
 */

/**
 * @swagger
 * /api/product/add:
 *   post:
 *     summary: Thêm sản phẩm mới
 *     description: Tạo một sản phẩm mới trong hệ thống. Yêu cầu xác thực Bearer token.
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - price
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 description: Tên sản phẩm (bắt buộc)
 *                 example: "iPhone 15 Pro Max"
 *               slug:
 *                 type: string
 *                 description: URL slug (không bắt buộc, tự động tạo nếu không có)
 *                 example: "iphone-15-pro-max"
 *               price:
 *                 type: number
 *                 description: Giá sản phẩm (bắt buộc)
 *                 example: 29990000
 *               discount:
 *                 type: number
 *                 description: Giảm giá % (không bắt buộc)
 *                 example: 10
 *               category:
 *                 type: string
 *                 description: ID danh mục (bắt buộc)
 *                 example: "507f1f77bcf86cd799439011"
 *               brand:
 *                 type: string
 *                 description: ID thương hiệu (không bắt buộc)
 *                 example: "507f1f77bcf86cd799439012"
 *               description:
 *                 type: string
 *                 description: Mô tả sản phẩm (không bắt buộc)
 *                 example: "iPhone 15 Pro Max với chip A17 Pro mạnh mẽ"
 *               images:
 *                 type: array
 *                 description: Danh sách URL hình ảnh (không bắt buộc)
 *                 items:
 *                   type: string
 *                 example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *               stock:
 *                 type: number
 *                 description: Số lượng tồn kho (không bắt buộc, mặc định 0)
 *                 example: 100
 *               status:
 *                 type: string
 *                 description: Trạng thái sản phẩm (không bắt buộc)
 *                 enum: [active, inactive]
 *                 example: "active"
 *     responses:
 *       201:
 *         description: Tạo sản phẩm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Product created successfully"
 *                 data:
 *                   type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/add', verifyToken, authorization('admin'), productController.addProduct);

/**
 * @swagger
 * /api/product/add-all:
 *   post:
 *     summary: Thêm nhiều sản phẩm cùng lúc
 *     description: Tạo nhiều sản phẩm trong một request. Yêu cầu xác thực Bearer token.
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - title
 *                 - price
 *                 - category
 *               properties:
 *                 title:
 *                   type: string
 *                   example: "iPhone 15 Pro Max"
 *                 price:
 *                   type: number
 *                   example: 29990000
 *                 category:
 *                   type: string
 *                   example: "507f1f77bcf86cd799439011"
 *                 description:
 *                   type: string
 *                   example: "Mô tả sản phẩm"
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["https://example.com/image1.jpg"]
 *           example:
 *             - title: "iPhone 15 Pro Max"
 *               price: 29990000
 *               category: "507f1f77bcf86cd799439011"
 *               stock: 100
 *             - title: "Samsung Galaxy S24"
 *               price: 22990000
 *               category: "507f1f77bcf86cd799439011"
 *               stock: 50
 *     responses:
 *       201:
 *         description: Tạo sản phẩm thành công
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/add-all', verifyToken, authorization('admin'), productController.addAllProducts);

/**
 * @swagger
 * /api/product/all:
 *   get:
 *     summary: Lấy danh sách tất cả sản phẩm
 *     description: Lấy danh sách sản phẩm có phân trang. Không yêu cầu xác thực.
 *     tags: [Product]
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
 *         description: Số sản phẩm mỗi trang (không bắt buộc, mặc định 10)
 *         example: 10
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: string
 *         description: Lọc theo ID danh mục (không bắt buộc)
 *         example: "507f1f77bcf86cd799439011"
 *       - in: query
 *         name: brand
 *         required: false
 *         schema:
 *           type: string
 *         description: Lọc theo ID thương hiệu (không bắt buộc)
 *         example: "507f1f77bcf86cd799439012"
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         description: Tìm kiếm theo tên sản phẩm (không bắt buộc)
 *         example: "iPhone"
 *     responses:
 *       200:
 *         description: Lấy danh sách sản phẩm thành công
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
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     total:
 *                       type: integer
 *                       example: 100
 */
router.get('/all', productController.getAllProducts);

/**
 * @swagger
 * /api/product/offer:
 *   get:
 *     summary: Get products with active offers
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of offer products
 */
router.get('/offer', productController.getOfferTimerProducts);

/**
 * @swagger
 * /api/product/top-rated:
 *   get:
 *     summary: Get top rated products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of top rated products
 */
router.get('/top-rated', productController.getTopRatedProducts);

/**
 * @swagger
 * /api/product/review-product:
 *   get:
 *     summary: Get products with reviews
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of reviewed products
 */
router.get('/review-product', productController.reviewProducts);

/**
 * @swagger
 * /api/product/popular/{type}:
 *   get:
 *     summary: Get popular products by type
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of popular products
 */
router.get('/popular/:type', productController.getPopularProductByType);

/**
 * @swagger
 * /api/product/related-product/{id}:
 *   get:
 *     summary: Get related products
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of related products
 */
router.get('/related-product/:id', productController.getRelatedProducts);

/**
 * @swagger
 * /api/product/single-product/{id}:
 *   get:
 *     summary: Get single product details
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 */
router.get("/single-product/:id", productController.getSingleProduct);

/**
 * @swagger
 * /api/product/stock-out:
 *   get:
 *     summary: Get out of stock products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of out of stock products
 */
router.get("/stock-out", productController.stockOutProducts);

/**
 * @swagger
 * /api/product/edit-product/{id}:
 *   patch:
 *     summary: Cập nhật sản phẩm
 *     description: Cập nhật thông tin sản phẩm. Yêu cầu xác thực Bearer token.
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID sản phẩm (bắt buộc)
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Tên sản phẩm (không bắt buộc)
 *                 example: "iPhone 15 Pro Max Updated"
 *               price:
 *                 type: number
 *                 description: Giá sản phẩm (không bắt buộc)
 *                 example: 27990000
 *               discount:
 *                 type: number
 *                 description: Giảm giá % (không bắt buộc)
 *                 example: 15
 *               stock:
 *                 type: number
 *                 description: Số lượng tồn kho (không bắt buộc)
 *                 example: 150
 *               description:
 *                 type: string
 *                 description: Mô tả sản phẩm (không bắt buộc)
 *                 example: "Mô tả đã cập nhật"
 *               images:
 *                 type: array
 *                 description: Danh sách URL hình ảnh (không bắt buộc)
 *                 items:
 *                   type: string
 *                 example: ["https://example.com/new-image.jpg"]
 *               status:
 *                 type: string
 *                 description: Trạng thái sản phẩm (không bắt buộc)
 *                 enum: [active, inactive]
 *                 example: "active"
 *           example:
 *             title: "iPhone 15 Pro Max Updated"
 *             price: 27990000
 *             discount: 15
 *             stock: 150
 *     responses:
 *       200:
 *         description: Cập nhật sản phẩm thành công
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.patch("/edit-product/:id", verifyToken, authorization('admin'), productController.updateProduct);

/**
 * @swagger
 * /api/product/{type}:
 *   get:
 *     summary: Get products by type
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of products by type
 */
router.get('/:type', productController.getProductsByType);

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Product]
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
 *         description: Product deleted successfully
 */
router.delete('/:id', verifyToken, authorization('admin'), productController.deleteProduct);

module.exports = router;