const express = require('express');
const router = express.Router();
const collectionCategoryController = require('../controller/collectionCategory.controller');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');

/**
 * @swagger
 * tags:
 *   name: Collection Category
 *   description: Collection category management
 */

/**
 * @swagger
 * /api/collection-category:
 *   post:
 *     summary: Create a new collection category
 *     description: Create a new collection category. Requires admin authentication.
 *     tags: [Collection Category]
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
 *                 description: Category name (required)
 *                 example: "Seasonal Collections"
 *               slug:
 *                 type: string
 *                 description: URL slug (optional, auto-generated if not provided)
 *                 example: "seasonal-collections"
 *               description:
 *                 type: string
 *                 description: Category description (optional)
 *                 example: "Collections that change with seasons"
 *               icon:
 *                 type: string
 *                 description: Category icon emoji (optional)
 *                 example: "🌸"
 *               status:
 *                 type: string
 *                 description: Category status (optional, default active)
 *                 enum: [active, inactive]
 *                 example: "active"
 *               priority:
 *                 type: number
 *                 description: Display priority (optional, default 0)
 *                 example: 10
 *     responses:
 *       201:
 *         description: Collection category created successfully
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
 *                   example: "Collection category created successfully"
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad request - validation error
 *       401:
 *         description: Unauthorized
 *   get:
 *     summary: Get all collection categories
 *     description: Retrieve all collection categories with optional filtering. No authentication required.
 *     tags: [Collection Category]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number (optional, default 1)
 *         example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Items per page (optional, default 20)
 *         example: 20
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *           enum: [active, inactive]
 *         description: Filter by status (optional)
 *         example: "active"
 *     responses:
 *       200:
 *         description: Collection categories retrieved successfully
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
 *                         example: "Seasonal Collections"
 *                       slug:
 *                         type: string
 *                         example: "seasonal-collections"
 *                       description:
 *                         type: string
 *                         example: "Collections that change with seasons"
 *                       icon:
 *                         type: string
 *                         example: "🌸"
 *                       status:
 *                         type: string
 *                         example: "active"
 *                       priority:
 *                         type: number
 *                         example: 10
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 20
 *                     total:
 *                       type: integer
 *                       example: 50
 */
router.post('/', verifyToken, authorization('admin'), collectionCategoryController.createCollectionCategory);
router.get('/', collectionCategoryController.getAllCollectionCategories);

/**
 * @swagger
 * /api/collection-category/{id}:
 *   get:
 *     summary: Get collection category by ID
 *     description: Retrieve a collection category by its ID. No authentication required.
 *     tags: [Collection Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Collection category ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Collection category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *       404:
 *         description: Collection category not found
 *   patch:
 *     summary: Update collection category
 *     description: Update collection category information. Requires admin authentication.
 *     tags: [Collection Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Collection category ID
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Category name (optional)
 *                 example: "Updated Seasonal Collections"
 *               description:
 *                 type: string
 *                 description: Category description (optional)
 *                 example: "Updated description"
 *               icon:
 *                 type: string
 *                 description: Category icon emoji (optional)
 *                 example: "🌺"
 *               status:
 *                 type: string
 *                 description: Category status (optional)
 *                 enum: [active, inactive]
 *                 example: "active"
 *               priority:
 *                 type: number
 *                 description: Display priority (optional)
 *                 example: 15
 *     responses:
 *       200:
 *         description: Collection category updated successfully
 *       400:
 *         description: Bad request - validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Collection category not found
 *   delete:
 *     summary: Delete collection category
 *     description: Delete a collection category. Requires admin authentication.
 *     tags: [Collection Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Collection category ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Collection category deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Collection category not found
 */
router.get('/:id', collectionCategoryController.getCollectionCategoryById);
router.patch('/:id', verifyToken, authorization('admin'), collectionCategoryController.updateCollectionCategory);
router.delete('/:id', verifyToken, authorization('admin'), collectionCategoryController.deleteCollectionCategory);

module.exports = router;
