const express = require('express');
const router = express.Router();
const affiliateController = require('../controller/affiliate.controller');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');

/**
 * @swagger
 * tags:
 *   name: Affiliate
 *   description: Affiliate management and tracking
 */

/**
 * @swagger
 * /api/affiliate/register:
 *   post:
 *     summary: Register new affiliate
 *     tags: [Affiliate]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *             properties:
 *               user:
 *                 type: string
 *               commissionRate:
 *                 type: number
 *               paymentInfo:
 *                 type: object
 *     responses:
 *       201:
 *         description: Affiliate registered successfully
 */
router.post('/register', verifyToken, affiliateController.registerAffiliate);

/**
 * @swagger
 * /api/affiliate/all:
 *   get:
 *     summary: Get all affiliates
 *     tags: [Affiliate]
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
 *     responses:
 *       200:
 *         description: List of affiliates
 */
router.get('/all', verifyToken, authorization('admin'), affiliateController.getAllAffiliates);

/**
 * @swagger
 * /api/affiliate/code/{code}:
 *   get:
 *     summary: Get affiliate by code
 *     tags: [Affiliate]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Affiliate details
 */
router.get('/code/:code', affiliateController.getAffiliateByCode);

/**
 * @swagger
 * /api/affiliate/track/{affiliateCode}:
 *   post:
 *     summary: Track affiliate click
 *     tags: [Affiliate]
 *     parameters:
 *       - in: path
 *         name: affiliateCode
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
 *               ipAddress:
 *                 type: string
 *               userAgent:
 *                 type: string
 *               referrer:
 *                 type: string
 *               landingPage:
 *                 type: string
 *     responses:
 *       200:
 *         description: Click tracked successfully
 */
router.post('/track/:affiliateCode', affiliateController.trackClick);

/**
 * @swagger
 * /api/affiliate/stats/{id}:
 *   get:
 *     summary: Get affiliate statistics
 *     tags: [Affiliate]
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
 *         description: Affiliate statistics
 */
router.get('/stats/:id', verifyToken, affiliateController.getAffiliateStats);

/**
 * @swagger
 * /api/affiliate/{id}:
 *   get:
 *     summary: Get affiliate by ID
 *     tags: [Affiliate]
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
 *         description: Affiliate details
 */
router.get('/:id', verifyToken, affiliateController.getAffiliateById);

/**
 * @swagger
 * /api/affiliate/approve/{id}:
 *   patch:
 *     summary: Approve affiliate
 *     tags: [Affiliate]
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
 *         description: Affiliate approved
 */
router.patch('/approve/:id', verifyToken, authorization('admin'), affiliateController.approveAffiliate);

/**
 * @swagger
 * /api/affiliate/{id}:
 *   patch:
 *     summary: Update affiliate
 *     tags: [Affiliate]
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
 *         description: Affiliate updated
 */
router.patch('/:id', verifyToken, authorization('admin'), affiliateController.updateAffiliate);

module.exports = router;
