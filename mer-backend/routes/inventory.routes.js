const express = require('express');
const router = express.Router();
const inventoryController = require('../controller/inventory.controller');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Product inventory management
 */

/**
 * @swagger
 * /api/inventory/add:
 *   post:
 *     summary: Create inventory record
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *               - sku
 *               - quantity
 *             properties:
 *               product:
 *                 type: string
 *               sku:
 *                 type: string
 *               quantity:
 *                 type: number
 *               warehouse:
 *                 type: string
 *               lowStockThreshold:
 *                 type: number
 *     responses:
 *       201:
 *         description: Inventory created successfully
 */
router.post('/add', verifyToken, authorization('admin'), inventoryController.createInventory);

/**
 * @swagger
 * /api/inventory/all:
 *   get:
 *     summary: Get all inventory
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
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
 *         name: warehouse
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of inventory
 */
router.get('/all', verifyToken, authorization('admin'), inventoryController.getAllInventory);

/**
 * @swagger
 * /api/inventory/low-stock:
 *   get:
 *     summary: Get low stock items
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of low stock items
 */
router.get('/low-stock', verifyToken, authorization('admin'), inventoryController.getLowStockItems);

/**
 * @swagger
 * /api/inventory/{id}:
 *   get:
 *     summary: Get inventory by ID
 *     tags: [Inventory]
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
 *         description: Inventory details
 */
router.get('/:id', verifyToken, authorization('admin'), inventoryController.getInventoryById);

/**
 * @swagger
 * /api/inventory/{id}:
 *   patch:
 *     summary: Update inventory
 *     tags: [Inventory]
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
 *               quantity:
 *                 type: number
 *               type:
 *                 type: string
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inventory updated
 */
router.patch('/:id', verifyToken, authorization('admin'), inventoryController.updateInventory);

/**
 * @swagger
 * /api/inventory/{id}:
 *   delete:
 *     summary: Delete inventory
 *     tags: [Inventory]
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
 *         description: Inventory deleted
 */
router.delete('/:id', verifyToken, authorization('admin'), inventoryController.deleteInventory);

module.exports = router;
