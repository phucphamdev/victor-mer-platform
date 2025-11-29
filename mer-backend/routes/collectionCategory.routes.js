const express = require('express');
const router = express.Router();
const collectionCategoryController = require('../controller/collectionCategory.controller');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization');

router.post('/', verifyToken, authorization('admin'), collectionCategoryController.createCollectionCategory);
router.get('/', collectionCategoryController.getAllCollectionCategories);
router.get('/:id', collectionCategoryController.getCollectionCategoryById);
router.patch('/:id', verifyToken, authorization('admin'), collectionCategoryController.updateCollectionCategory);
router.delete('/:id', verifyToken, authorization('admin'), collectionCategoryController.deleteCollectionCategory);

module.exports = router;
