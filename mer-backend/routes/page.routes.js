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

router.post('/add', verifyToken, authorization('admin'), pageController.createPage);
router.get('/all', pageController.getAllPages);
router.get('/slug/:slug', pageController.getPageBySlug);
router.patch('/publish/:id', verifyToken, authorization('admin'), pageController.publishPage);
router.patch('/:id', verifyToken, authorization('admin'), pageController.updatePage);
router.delete('/:id', verifyToken, authorization('admin'), pageController.deletePage);

module.exports = router;
