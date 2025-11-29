const express = require('express');
const router = express.Router();
const productLabelController = require('../controller/productLabel.controller');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');

/**
 * @swagger
 * tags:
 *   name: ProductLabel
 *   description: Product label management
 */

/**
 * @swagger
 * /api/product-label:
 *   post:
 *     summary: Create product label
 *     tags: [ProductLabel]
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
 *               backgroundColor:
 *                 type: string
 *     responses:
 *       201:
 *         description: Label created successfully
 *   get:
 *     summary: Get all product labels
 *     tags: [ProductLabel]
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
 *     responses:
 *       200:
 *         description: List of labels
 */
router.post('/', verifyToken, authorization('admin'), productLabelController.createLabel);
router.get('/', productLabelController.getAllLabels);

/**
 * @swagger
 * /api/product-label/slug/{slug}:
 *   get:
 *     summary: Get label by slug
 *     tags: [ProductLabel]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Label details
 */
router.get('/slug/:slug', productLabelController.getLabelBySlug);

/**
 * @swagger
 * /api/product-label/{id}:
 *   patch:
 *     summary: Update label
 *     tags: [ProductLabel]
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
 *         description: Label updated
 */
router.patch('/:id', verifyToken, authorization('admin'), productLabelController.updateLabel);

/**
 * @swagger
 * /api/product-label/{id}:
 *   delete:
 *     summary: Delete label
 *     tags: [ProductLabel]
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
 *         description: Label deleted
 */
router.delete('/:id', verifyToken, authorization('admin'), productLabelController.deleteLabel);

module.exports = router;
