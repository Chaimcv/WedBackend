const express = require('express');
const router = express.Router();
const { createNewWedding, getMyWeddings, getWeddingById } = require('../controller/weddingController');
const { protect } = require('../../../middleware/authMiddleware');

/**
 * @swagger
 * /api/weddings:
 *   post:
 *     summary: Create a new wedding
 *     tags: [Weddings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - weddingTitle
 *               - brideName
 *               - groomName
 *               - weddingDate
 *               - weddingLocation
 *               - weddingType
 *             properties:
 *               weddingTitle:
 *                 type: string
 *               brideName:
 *                 type: string
 *               groomName:
 *                 type: string
 *               weddingDate:
 *                 type: string
 *                 format: date
 *               weddingLocation:
 *                 type: string
 *               totalBudget:
 *                 type: number
 *               weddingType:
 *                 type: string
 *                 enum: [destination, traditional, luxury]
 *     responses:
 *       201:
 *         description: Wedding created
 */
router.post('/', protect, createNewWedding);

/**
 * @swagger
 * /api/weddings:
 *   get:
 *     summary: Get all weddings for the logged-in user
 *     tags: [Weddings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of weddings
 */
router.get('/', protect, getMyWeddings);

/**
 * @swagger
 * /api/weddings/{id}:
 *   get:
 *     summary: Get wedding details with events
 *     tags: [Weddings]
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
 *         description: Wedding details
 */
router.get('/:id', protect, getWeddingById);

module.exports = router;
