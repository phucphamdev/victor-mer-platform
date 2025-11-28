const express = require("express");
const router = express.Router();
const { addReview, deleteReviews} = require("../controller/review.controller");

/**
 * @swagger
 * tags:
 *   name: Review
 *   description: Product review management
 */

/**
 * @swagger
 * /api/review/add:
 *   post:
 *     summary: Add a product review
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - rating
 *               - comment
 *             properties:
 *               productId:
 *                 type: string
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review added successfully
 */
router.post("/add", addReview);

/**
 * @swagger
 * /api/review/delete/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Review]
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
 *         description: Review deleted successfully
 */
router.delete("/delete/:id", deleteReviews);

module.exports = router;
