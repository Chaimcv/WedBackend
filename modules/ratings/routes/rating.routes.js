const express = require('express');
const router = express.Router();
const { addReview, getTargetReviews } = require('../service/ratingService');
const { protect } = require('../../../middleware/authMiddleware');

/**
 * @swagger
 * /api/ratings:
 *   post:
 *     summary: Submit a review
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vendorId
 *               - weddingId
 *               - rating
 *             properties:
 *               vendorId:
 *                 type: string
 *               weddingId:
 *                 type: string
 *               rating:
 *                 type: number
 *               reviewText:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review submitted
 */
router.post('/', protect, async (req, res, next) => {
  try {
    const review = await addReview({ userId: req.user.id, ...req.body });
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/ratings/{targetId}:
 *   get:
 *     summary: Get reviews for a target
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: targetId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reviews
 */
router.get('/:targetId', async (req, res, next) => {
  try {
    const reviews = await getTargetReviews(req.params.targetId);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
