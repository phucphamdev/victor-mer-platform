const express = require('express');
const router = express.Router();
const collectionController = require('../controller/collection.controller');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');

/**
 * @swagger
 * tags:
 *   name: Collection
 *   description: Product collection management
 */

/**
 * @swagger
 * /api/collection:
 *   post:
 *     summary: Create a new collection
 *     description: Create a new product collection. Requires Bearer token authentication.
 *     tags: [Collection]
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
 *                 description: Collection name (required)
 *                 example: "Summer Collection"
 *               slug:
 *                 type: string
 *                 description: URL slug (optional, auto-generated if not provided)
 *                 example: "summer-collection"
 *               description:
 *                 type: string
 *                 description: Collection description (optional)
 *                 example: "Hot summer products"
 *               image:
 *                 type: string
 *                 description: Collection image URL (optional)
 *                 example: "https://example.com/collection.jpg"
 *               products:
 *                 type: array
 *                 description: Array of product IDs (optional)
 *                 items:
 *                   type: string
 *                 example: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"]
 *               status:
 *                 type: string
 *                 description: Collection status (optional, default active)
 *                 enum: [active, inactive]
 *                 example: "active"
 *     responses:
 *       201:
 *         description: Collection created successfully
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
 *                   example: "Collection created successfully"
 *                 data:
 *                   type: object
 *       401:
 *         description: Unauthorized
 *   get:
 *     summary: Get all collections
 *     description: Retrieve all product collections. No authentication required.
 *     tags: [Collection]
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
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         description: Search by collection name (optional)
 *         example: "Summer"
 *     responses:
 *       200:
 *         description: Collections retrieved successfully
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
 *                       example: 20
 *                     total:
 *                       type: integer
 *                       example: 50
 */
router.post('/', verifyToken, authorization('admin'), collectionController.createCollection);
router.get('/', collectionController.getAllCollections);

/**
 * @swagger
 * /api/collection/slug/{slug}:
 *   get:
 *     summary: Get collection by slug
 *     description: Retrieve a collection by its URL slug. No authentication required.
 *     tags: [Collection]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Collection slug
 *         example: "summer-collection"
 *     responses:
 *       200:
 *         description: Collection retrieved successfully
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
 *         description: Collection not found
 */
router.get('/slug/:slug', collectionController.getCollectionBySlug);

/**
 * @swagger
 * /api/collection/{id}:
 *   get:
 *     summary: Get collection by ID
 *     description: Retrieve a collection by its ID. No authentication required.
 *     tags: [Collection]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Collection ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Collection retrieved successfully
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
 *         description: Collection not found
 *   patch:
 *     summary: Update collection
 *     description: Update collection information. Requires Bearer token authentication.
 *     tags: [Collection]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Collection ID
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
 *                 description: Collection name (optional)
 *                 example: "Updated Summer Collection"
 *               description:
 *                 type: string
 *                 description: Collection description (optional)
 *                 example: "Updated description"
 *               image:
 *                 type: string
 *                 description: Collection image URL (optional)
 *                 example: "https://example.com/new-image.jpg"
 *               products:
 *                 type: array
 *                 description: Array of product IDs (optional)
 *                 items:
 *                   type: string
 *                 example: ["507f1f77bcf86cd799439011"]
 *               status:
 *                 type: string
 *                 description: Collection status (optional)
 *                 enum: [active, inactive]
 *                 example: "active"
 *     responses:
 *       200:
 *         description: Collection updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Collection not found
 *   delete:
 *     summary: Delete collection
 *     description: Delete a collection. Requires Bearer token authentication.
 *     tags: [Collection]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Collection ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Collection deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Collection not found
 */
router.get('/:id', collectionController.getCollectionById);
router.patch('/:id', verifyToken, authorization('admin'), collectionController.updateCollection);
router.delete('/:id', verifyToken, authorization('admin'), collectionController.deleteCollection);

module.exports = router;
