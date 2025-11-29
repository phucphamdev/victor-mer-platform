const express = require('express');
const router = express.Router();
// internal
const categoryController = require('../controller/category.controller');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management
 */

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Thêm danh mục mới
 *     description: Tạo danh mục sản phẩm mới. Yêu cầu xác thực Bearer token.
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên danh mục (bắt buộc)
 *                 example: "Điện thoại"
 *               slug:
 *                 type: string
 *                 description: URL slug (không bắt buộc, tự động tạo nếu không có)
 *                 example: "dien-thoai"
 *               description:
 *                 type: string
 *                 description: Mô tả danh mục (không bắt buộc)
 *                 example: "Danh mục điện thoại di động"
 *               parent:
 *                 type: string
 *                 description: ID danh mục cha (không bắt buộc, để trống nếu là danh mục gốc)
 *                 example: "507f1f77bcf86cd799439011"
 *               image:
 *                 type: string
 *                 description: URL hình ảnh danh mục (không bắt buộc)
 *                 example: "https://example.com/category.jpg"
 *               status:
 *                 type: string
 *                 description: Trạng thái hiển thị (không bắt buộc, mặc định active)
 *                 enum: [active, inactive]
 *                 example: "active"
 *           example:
 *             name: "Điện thoại"
 *             description: "Danh mục điện thoại di động"
 *             status: "active"
 *     responses:
 *       201:
 *         description: Tạo danh mục thành công
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
 *                   example: "Category created successfully"
 *                 data:
 *                   type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *   get:
 *     summary: Lấy tất cả danh mục
 *     description: Lấy danh sách tất cả danh mục sản phẩm. Không yêu cầu xác thực.
 *     tags: [Category]
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
 *           default: 20
 *         description: Số danh mục mỗi trang (không bắt buộc, mặc định 20)
 *         example: 20
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         description: Tìm kiếm theo tên danh mục (không bắt buộc)
 *         example: "Điện thoại"
 *     responses:
 *       200:
 *         description: Lấy danh sách danh mục thành công
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
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "507f1f77bcf86cd799439011"
 *                       name:
 *                         type: string
 *                         example: "Điện thoại"
 *                       slug:
 *                         type: string
 *                         example: "dien-thoai"
 *                       description:
 *                         type: string
 *                         example: "Danh mục điện thoại di động"
 */
router.post('/', verifyToken, authorization('admin'), categoryController.addCategory);
router.get('/', categoryController.getAllCategory);

/**
 * @swagger
 * /api/category/bulk:
 *   post:
 *     summary: Add multiple categories
 *     tags: [Category]
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
 *     responses:
 *       201:
 *         description: Categories created
 */
router.post('/bulk', verifyToken, authorization('admin'), categoryController.addAllCategory);

/**
 * @swagger
 * /api/category/show/{type}:
 *   get:
 *     summary: Get categories by product type
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categories by type
 */
router.get('/show/:type', categoryController.getProductTypeCategory);

/**
 * @swagger
 * /api/category/show:
 *   get:
 *     summary: Get visible categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of visible categories
 */
router.get('/show', categoryController.getShowCategory);

/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Get single category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category details
 *   patch:
 *     summary: Update category
 *     tags: [Category]
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
 *     responses:
 *       200:
 *         description: Category updated
 *   delete:
 *     summary: Delete category
 *     tags: [Category]
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
 *         description: Category deleted
 */
router.get('/:id', categoryController.getSingleCategory);
router.patch('/:id', verifyToken, authorization('admin'), categoryController.updateCategory);
router.delete('/:id', verifyToken, authorization('admin'), categoryController.deleteCategory);

module.exports = router;