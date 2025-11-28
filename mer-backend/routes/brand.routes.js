const express = require('express');
const router = express.Router();
// internal
const brandController = require('../controller/brand.controller');
const brandValidators = require('../validators/brand.validator');
const { validateRequest } = require('../middleware/validation');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');

/**
 * @swagger
 * tags:
 *   name: Brand
 *   description: Brand management
 */

/**
 * @swagger
 * /api/brand/add:
 *   post:
 *     summary: Add a new brand
 *     tags: [Brand]
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
 *             properties:
 *               name:
 *                 type: string
 *               logo:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Brand created successfully
 */
router.post('/add', verifyToken, authorization('admin'), brandValidators.create, validateRequest, brandController.addBrand);

/**
 * @swagger
 * /api/brand/add-all:
 *   post:
 *     summary: Add multiple brands
 *     tags: [Brand]
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
 *         description: Brands created successfully
 */
router.post('/add-all', verifyToken, authorization('admin'), brandController.addAllBrand);

/**
 * @swagger
 * /api/brand/active:
 *   get:
 *     summary: Get active brands
 *     tags: [Brand]
 *     responses:
 *       200:
 *         description: List of active brands
 */
router.get('/active', brandValidators.list, validateRequest, brandController.getActiveBrands);

/**
 * @swagger
 * /api/brand/all:
 *   get:
 *     summary: Get all brands
 *     tags: [Brand]
 *     responses:
 *       200:
 *         description: List of all brands
 */
router.get('/all', brandValidators.list, validateRequest, brandController.getAllBrands);

/**
 * @swagger
 * /api/brand/delete/{id}:
 *   delete:
 *     summary: Delete brand
 *     tags: [Brand]
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
 *         description: Brand deleted successfully
 */
router.delete('/delete/:id', verifyToken, authorization('admin'), brandValidators.delete, validateRequest, brandController.deleteBrand);

/**
 * @swagger
 * /api/brand/get/{id}:
 *   get:
 *     summary: Get single brand
 *     tags: [Brand]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Brand details
 *       404:
 *         description: Brand not found
 */
router.get('/get/:id', brandValidators.getById, validateRequest, brandController.getSingleBrand);

/**
 * @swagger
 * /api/brand/edit/{id}:
 *   patch:
 *     summary: Update brand
 *     tags: [Brand]
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
 *         description: Brand updated successfully
 */
router.patch('/edit/:id', verifyToken, authorization('admin'), brandValidators.update, validateRequest, brandController.updateBrand);

module.exports = router;