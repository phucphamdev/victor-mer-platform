const express = require('express');
const router = express.Router();
const shipmentController = require('../controller/shipment.controller');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');

/**
 * @swagger
 * tags:
 *   name: Shipment
 *   description: Shipment tracking and management
 */

/**
 * @swagger
 * /api/shipment:
 *   post:
 *     summary: Create shipment
 *     tags: [Shipment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order
 *               - trackingNumber
 *               - carrier
 *             properties:
 *               order:
 *                 type: string
 *               trackingNumber:
 *                 type: string
 *               carrier:
 *                 type: string
 *               shippingAddress:
 *                 type: object
 *               estimatedDelivery:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Shipment created successfully
 *   get:
 *     summary: Get all shipments
 *     tags: [Shipment]
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
 *         name: carrier
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of shipments
 */
router.post('/', verifyToken, authorization('admin'), shipmentController.createShipment);
router.get('/', verifyToken, authorization('admin'), shipmentController.getAllShipments);

/**
 * @swagger
 * /api/shipment/track/{trackingNumber}:
 *   get:
 *     summary: Track shipment by tracking number
 *     tags: [Shipment]
 *     parameters:
 *       - in: path
 *         name: trackingNumber
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shipment tracking details
 */
router.get('/track/:trackingNumber', shipmentController.getShipmentByTracking);

/**
 * @swagger
 * /api/shipment/{id}:
 *   get:
 *     summary: Get shipment by ID
 *     tags: [Shipment]
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
 *         description: Shipment details
 *   patch:
 *     summary: Update shipment status
 *     tags: [Shipment]
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
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Shipment status updated
 *   delete:
 *     summary: Delete shipment
 *     tags: [Shipment]
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
 *         description: Shipment deleted
 */
router.get('/:id', verifyToken, authorization('admin'), shipmentController.getShipmentById);
router.patch('/:id', verifyToken, authorization('admin'), shipmentController.updateShipmentStatus);

router.delete('/:id', verifyToken, authorization('admin'), shipmentController.deleteShipment);

module.exports = router;
