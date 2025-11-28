const express = require('express');
const router = express.Router();
const flashSaleController = require('../controller/flashSale.controller');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');

/**
 * @swagger
 * tags:
 *   name: FlashSale
 *   description: Flash sale management
 */

/**
 * @swagger
 * /api/flash-sale/add:
 *   post:
 *     summary: Create flash sale
 *     tags: [FlashSale]
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
 *               - startDate
 *               - endDate
 *               - products
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               products:
 *                 type: array
 *               banner:
 *                 type: string
 *               seo:
 *                 type: object
 *     responses:
 *       201:
 *         description: Flash sale created successfully
 */
router.post('/add', verifyToken, authorization('admin'), flashSaleController.createFlashSale);

/**
 * @swagger
 * /api/flash-sale/all:
 *   get:
 *     summary: Get all flash sales
 *     tags: [FlashSale]
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
 *         description: List of flash sales
 */
router.get('/all', flashSaleController.getAllFlashSales);

/**
 * @swagger
 * /api/flash-sale/active:
 *   get:
 *     summary: Get active flash sales
 *     tags: [FlashSale]
 *     responses:
 *       200:
 *         description: List of active flash sales
 */
router.get('/active', flashSaleController.getActiveFlashSales);

/**
 * @swagger
 * /api/flash-sale/slug/{slug}:
 *   get:
 *     summary: Get flash sale by slug
 *     tags: [FlashSale]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Flash sale details
 */
router.get('/slug/:slug', flashSaleController.getFlashSaleBySlug);

/**
 * @swagger
 * /api/flash-sale/{id}:
 *   patch:
 *     summary: Update flash sale
 *     tags: [FlashSale]
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
 *         description: Flash sale updated
 */
router.patch('/:id', verifyToken, authorization('admin'), flashSaleController.updateFlashSale);

/**
 * @swagger
 * /api/flash-sale/{id}:
 *   delete:
 *     summary: Delete flash sale
 *     tags: [FlashSale]
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
 *         description: Flash sale deleted
 */
router.delete('/:id', verifyToken, authorization('admin'), flashSaleController.deleteFlashSale);

module.exports = router;
