const express = require('express');
const router = express.Router();
const productTagController = require('../controller/productTag.controller');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');

/**
 * @swagger
 * tags:
 *   name: ProductTag
 *   description: Product tag management
 */

/**
 * @swagger
 * /api/product-tag:
 *   post:
 *     summary: Create product tag
 *     tags: [ProductTag]
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
 *               - slug
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *               color:
 *                 type: string
 *               seo:
 *                 type: object
 *     responses:
 *       201:
 *         description: Tag created successfully
 *   get:
 *     summary: Get all product tags
 *     tags: [ProductTag]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of tags
 */
router.post('/', verifyToken, authorization('admin'), productTagController.createTag);
router.get('/', productTagController.getAllTags);

/**
 * @swagger
 * /api/product-tag/slug/{slug}:
 *   get:
 *     summary: Get tag by slug
 *     tags: [ProductTag]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tag details
 */
router.get('/slug/:slug', productTagController.getTagBySlug);

/**
 * @swagger
 * /api/product-tag/{id}:
 *   patch:
 *     summary: Update tag
 *     tags: [ProductTag]
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
 *         description: Tag updated
 */
router.patch('/:id', verifyToken, authorization('admin'), productTagController.updateTag);

/**
 * @swagger
 * /api/product-tag/{id}:
 *   delete:
 *     summary: Delete tag
 *     tags: [ProductTag]
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
 *         description: Tag deleted
 */
router.delete('/:id', verifyToken, authorization('admin'), productTagController.deleteTag);

module.exports = router;
