const express = require('express');
const router = express.Router();
// internal
const productController = require('../controller/product.controller');

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management
 */

/**
 * @swagger
 * /api/product/add:
 *   post:
 *     summary: Add a new product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - price
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post('/add', productController.addProduct);

/**
 * @swagger
 * /api/product/add-all:
 *   post:
 *     summary: Add multiple products
 *     tags: [Product]
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
 *         description: Products created successfully
 */
router.post('/add-all', productController.addAllProducts);

/**
 * @swagger
 * /api/product/all:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/all', productController.getAllProducts);

/**
 * @swagger
 * /api/product/offer:
 *   get:
 *     summary: Get products with active offers
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of offer products
 */
router.get('/offer', productController.getOfferTimerProducts);

/**
 * @swagger
 * /api/product/top-rated:
 *   get:
 *     summary: Get top rated products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of top rated products
 */
router.get('/top-rated', productController.getTopRatedProducts);

/**
 * @swagger
 * /api/product/review-product:
 *   get:
 *     summary: Get products with reviews
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of reviewed products
 */
router.get('/review-product', productController.reviewProducts);

/**
 * @swagger
 * /api/product/popular/{type}:
 *   get:
 *     summary: Get popular products by type
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of popular products
 */
router.get('/popular/:type', productController.getPopularProductByType);

/**
 * @swagger
 * /api/product/related-product/{id}:
 *   get:
 *     summary: Get related products
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of related products
 */
router.get('/related-product/:id', productController.getRelatedProducts);

/**
 * @swagger
 * /api/product/single-product/{id}:
 *   get:
 *     summary: Get single product details
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 */
router.get("/single-product/:id", productController.getSingleProduct);

/**
 * @swagger
 * /api/product/stock-out:
 *   get:
 *     summary: Get out of stock products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of out of stock products
 */
router.get("/stock-out", productController.stockOutProducts);

/**
 * @swagger
 * /api/product/edit-product/{id}:
 *   patch:
 *     summary: Update product
 *     tags: [Product]
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
 *         description: Product updated successfully
 */
router.patch("/edit-product/:id", productController.updateProduct);

/**
 * @swagger
 * /api/product/{type}:
 *   get:
 *     summary: Get products by type
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of products by type
 */
router.get('/:type', productController.getProductsByType);

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Product]
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
 *         description: Product deleted successfully
 */
router.delete('/:id', productController.deleteProduct);

module.exports = router;