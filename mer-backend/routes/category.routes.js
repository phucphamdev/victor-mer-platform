const express = require('express');
const router = express.Router();
// internal
const categoryController = require('../controller/category.controller');

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management
 */

/**
 * @swagger
 * /api/category/get/{id}:
 *   get:
 *     summary: Get single category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category details
 */
router.get('/get/:id', categoryController.getSingleCategory);

/**
 * @swagger
 * /api/category/add:
 *   post:
 *     summary: Add new category
 *     tags: [Category]
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
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 */
router.post('/add', categoryController.addCategory);

/**
 * @swagger
 * /api/category/add-all:
 *   post:
 *     summary: Add multiple categories
 *     tags: [Category]
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
 *         description: Categories created
 */
router.post('/add-all', categoryController.addAllCategory);

/**
 * @swagger
 * /api/category/all:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get('/all', categoryController.getAllCategory);

/**
 * @swagger
 * /api/category/show/{type}:
 *   get:
 *     summary: Get categories by product type
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categories by type
 */
router.get('/show/:type', categoryController.getProductTypeCategory);

/**
 * @swagger
 * /api/category/show:
 *   get:
 *     summary: Get visible categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of visible categories
 */
router.get('/show', categoryController.getShowCategory);

/**
 * @swagger
 * /api/category/delete/{id}:
 *   delete:
 *     summary: Delete category
 *     tags: [Category]
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
 *         description: Category deleted
 */
router.delete('/delete/:id', categoryController.deleteCategory);

/**
 * @swagger
 * /api/category/edit/{id}:
 *   patch:
 *     summary: Update category
 *     tags: [Category]
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
 *         description: Category updated
 */
router.patch('/edit/:id', categoryController.updateCategory);

module.exports = router;