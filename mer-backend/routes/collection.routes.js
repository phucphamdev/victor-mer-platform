const express = require('express');
const router = express.Router();
const collectionController = require('../controller/collection.controller');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');

/**
 * @swagger
 * tags:
 *   name: Collection
 *   description: Product collection management
 */

router.post('/add', verifyToken, authorization('admin'), collectionController.createCollection);
router.get('/all', collectionController.getAllCollections);
router.get('/slug/:slug', collectionController.getCollectionBySlug);
router.get('/:id', collectionController.getCollectionById);
router.patch('/:id', verifyToken, authorization('admin'), collectionController.updateCollection);
router.delete('/:id', verifyToken, authorization('admin'), collectionController.deleteCollection);

module.exports = router;
