const express = require('express');
const router = express.Router();
const pageController = require('../controller/page.controller');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');

/**
 * @swagger
 * tags:
 *   name: Page
 *   description: CMS page management
 */

/**
 * @swagger
 * /api/page:
 *   post:
 *     summary: Create page
 *     tags: [Page]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Page created
 *   get:
 *     summary: Get all pages
 *     tags: [Page]
 *     responses:
 *       200:
 *         description: List of pages
 */
router.post('/', verifyToken, authorization('admin'), pageController.createPage);
router.get('/', pageController.getAllPages);

/**
 * @swagger
 * /api/page/slug/{slug}:
 *   get:
 *     summary: Get page by slug
 *     tags: [Page]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Page details
 */
router.get('/slug/:slug', pageController.getPageBySlug);

/**
 * @swagger
 * /api/page/{id}/publish:
 *   patch:
 *     summary: Publish page
 *     tags: [Page]
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
 *         description: Page published
 */
router.patch('/:id/publish', verifyToken, authorization('admin'), pageController.publishPage);

/**
 * @swagger
 * /api/page/{id}:
 *   patch:
 *     summary: Update page
 *     tags: [Page]
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
 *         description: Page updated
 *   delete:
 *     summary: Delete page
 *     tags: [Page]
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
 *         description: Page deleted
 */
router.patch('/:id', verifyToken, authorization('admin'), pageController.updatePage);
router.delete('/:id', verifyToken, authorization('admin'), pageController.deletePage);

module.exports = router;
