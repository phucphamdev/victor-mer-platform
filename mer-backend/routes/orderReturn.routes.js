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

router.post('/add', verifyToken, orderReturnController.createReturnRequest);
router.get('/all', verifyToken, authorization('admin'), orderReturnController.getAllReturns);
router.get('/number/:returnNumber', verifyToken, orderReturnController.getReturnByNumber);
router.patch('/approve/:id', verifyToken, authorization('admin'), orderReturnController.approveReturn);
router.patch('/status/:id', verifyToken, authorization('admin'), orderReturnController.updateReturnStatus);
router.delete('/:id', verifyToken, authorization('admin'), orderReturnController.deleteReturn);

module.exports = router;
