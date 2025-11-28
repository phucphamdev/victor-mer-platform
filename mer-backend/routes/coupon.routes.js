const express = require('express');
const router = express.Router();
const {
  addCoupon,
  addAllCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
} = require('../controller/coupon.controller');

/**
 * @swagger
 * tags:
 *   name: Coupon
 *   description: Coupon management
 */

/**
 * @swagger
 * /api/coupon/add:
 *   post:
 *     summary: Add a new coupon
 *     tags: [Coupon]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - discount
 *             properties:
 *               code:
 *                 type: string
 *               discount:
 *                 type: number
 *               expiryDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Coupon created successfully
 */
router.post('/add', addCoupon);

/**
 * @swagger
 * /api/coupon/all:
 *   post:
 *     summary: Add multiple coupons
 *     tags: [Coupon]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *     responses:
 *       201:
 *         description: Coupons created successfully
 */
router.post('/all', addAllCoupon);

/**
 * @swagger
 * /api/coupon:
 *   get:
 *     summary: Get all coupons
 *     tags: [Coupon]
 *     responses:
 *       200:
 *         description: List of coupons
 */
router.get('/', getAllCoupons);

/**
 * @swagger
 * /api/coupon/{id}:
 *   get:
 *     summary: Get coupon by ID
 *     tags: [Coupon]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coupon details
 *       404:
 *         description: Coupon not found
 */
router.get('/:id', getCouponById);

/**
 * @swagger
 * /api/coupon/{id}:
 *   patch:
 *     summary: Update coupon
 *     tags: [Coupon]
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
 *     responses:
 *       200:
 *         description: Coupon updated successfully
 */
router.patch('/:id', updateCoupon);

/**
 * @swagger
 * /api/coupon/{id}:
 *   delete:
 *     summary: Delete coupon
 *     tags: [Coupon]
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
 *         description: Coupon deleted successfully
 */
router.delete('/:id', deleteCoupon);

module.exports = router;
