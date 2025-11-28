const express = require('express');
const router = express.Router();
const invoiceController = require('../controller/invoice.controller');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');

/**
 * @swagger
 * tags:
 *   name: Invoice
 *   description: Invoice management
 */

/**
 * @swagger
 * /api/invoice/add:
 *   post:
 *     summary: Create invoice
 *     tags: [Invoice]
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
 *               - customer
 *               - items
 *               - subtotal
 *               - total
 *             properties:
 *               order:
 *                 type: string
 *               customer:
 *                 type: string
 *               items:
 *                 type: array
 *               subtotal:
 *                 type: number
 *               tax:
 *                 type: number
 *               total:
 *                 type: number
 *               billingAddress:
 *                 type: object
 *     responses:
 *       201:
 *         description: Invoice created successfully
 */
router.post('/add', verifyToken, authorization('admin'), invoiceController.createInvoice);

/**
 * @swagger
 * /api/invoice/all:
 *   get:
 *     summary: Get all invoices
 *     tags: [Invoice]
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
 *         name: paymentStatus
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of invoices
 */
router.get('/all', verifyToken, authorization('admin'), invoiceController.getAllInvoices);

/**
 * @swagger
 * /api/invoice/number/{invoiceNumber}:
 *   get:
 *     summary: Get invoice by number
 *     tags: [Invoice]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: invoiceNumber
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invoice details
 */
router.get('/number/:invoiceNumber', verifyToken, invoiceController.getInvoiceByNumber);

/**
 * @swagger
 * /api/invoice/mark-paid/{id}:
 *   patch:
 *     summary: Mark invoice as paid
 *     tags: [Invoice]
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
 *         description: Invoice marked as paid
 */
router.patch('/mark-paid/:id', verifyToken, authorization('admin'), invoiceController.markAsPaid);

/**
 * @swagger
 * /api/invoice/{id}:
 *   patch:
 *     summary: Update invoice
 *     tags: [Invoice]
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
 *         description: Invoice updated
 */
router.patch('/:id', verifyToken, authorization('admin'), invoiceController.updateInvoice);

/**
 * @swagger
 * /api/invoice/{id}:
 *   delete:
 *     summary: Delete invoice
 *     tags: [Invoice]
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
 *         description: Invoice deleted
 */
router.delete('/:id', verifyToken, authorization('admin'), invoiceController.deleteInvoice);

module.exports = router;
