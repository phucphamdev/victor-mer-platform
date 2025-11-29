const express = require('express');
const router = express.Router();
const orderReturnController = require('../controller/orderReturn.controller');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');

/**
 * @swagger
 * tags:
 *   name: OrderReturn
 *   description: Order return management
 */

/**
 * @swagger
 * /api/order-return:
 *   post:
 *     summary: Create return request
 *     tags: [OrderReturn]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Return request created
 *   get:
 *     summary: Get all returns
 *     tags: [OrderReturn]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of returns
 */
router.post('/', verifyToken, orderReturnController.createReturnRequest);
router.get('/', verifyToken, authorization('admin'), orderReturnController.getAllReturns);

/**
 * @swagger
 * /api/order-return/number/{returnNumber}:
 *   get:
 *     summary: Get return by number
 *     tags: [OrderReturn]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: returnNumber
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Return details
 */
router.get('/number/:returnNumber', verifyToken, orderReturnController.getReturnByNumber);

/**
 * @swagger
 * /api/order-return/{id}/approve:
 *   patch:
 *     summary: Approve return
 *     tags: [OrderReturn]
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
 *         description: Return approved
 */
router.patch('/:id/approve', verifyToken, authorization('admin'), orderReturnController.approveReturn);

/**
 * @swagger
 * /api/order-return/{id}:
 *   get:
 *     summary: Get return by ID
 *     tags: [OrderReturn]
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
 *         description: Return details
 *   patch:
 *     summary: Update return status
 *     tags: [OrderReturn]
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
 *         description: Return status updated
 *   delete:
 *     summary: Delete return
 *     tags: [OrderReturn]
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
 *         description: Return deleted
 */
router.get('/:id', verifyToken, orderReturnController.getReturnById);
router.patch('/:id', verifyToken, authorization('admin'), orderReturnController.updateReturnStatus);
router.delete('/:id', verifyToken, authorization('admin'), orderReturnController.deleteReturn);

module.exports = router;
