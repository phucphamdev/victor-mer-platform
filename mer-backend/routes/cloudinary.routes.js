const express = require('express');
const router = express.Router();
// internal
const { cloudinaryController } = require('../controller/cloudinary.controller');
const multer = require('multer');

const upload = multer();

/**
 * @swagger
 * tags:
 *   name: Cloudinary
 *   description: Image upload and management via Cloudinary
 */

/**
 * @swagger
 * /api/cloudinary/add-img:
 *   post:
 *     summary: Upload a single image to Cloudinary
 *     tags: [Cloudinary]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 */
router.post('/add-img',upload.single('image'), cloudinaryController.saveImageCloudinary);

/**
 * @swagger
 * /api/cloudinary/add-multiple-img:
 *   post:
 *     summary: Upload multiple images to Cloudinary (max 5)
 *     tags: [Cloudinary]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 maxItems: 5
 *     responses:
 *       200:
 *         description: Images uploaded successfully
 */
router.post('/add-multiple-img',upload.array('images',5), cloudinaryController.addMultipleImageCloudinary);

/**
 * @swagger
 * /api/cloudinary/img-delete:
 *   delete:
 *     summary: Delete image from Cloudinary
 *     tags: [Cloudinary]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - publicId
 *             properties:
 *               publicId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Image deleted successfully
 */
router.delete('/img-delete', cloudinaryController.cloudinaryDeleteController);

module.exports = router;