const express = require('express');
const router = express.Router();
const { getAllDestinations, createActivity, getActivities } = require('../controller/destinationController');
const { protect } = require('../../../middleware/authMiddleware');

/**
 * @swagger
 * /api/destinations:
 *   get:
 *     summary: Get all destinations
 *     tags: [Destinations]
 *     responses:
 *       200:
 *         description: List of destinations
 */
router.get('/', getAllDestinations);

/**
 * @swagger
 * /api/destinations/activity:
 *   post:
 *     summary: Add an exploration activity to a wedding
 *     tags: [Destinations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - weddingId
 *               - activityName
 *             properties:
 *               weddingId:
 *                 type: string
 *               activityName:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [City Tour, Beach Trip, Temple Visit, Shopping, Adventure, Other]
 *               vehicleRequired:
 *                 type: boolean
 *               guideRequired:
 *                 type: boolean
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Activity added
 */
router.post('/activity', protect, createActivity);

/**
 * @swagger
 * /api/destinations/activities/{weddingId}:
 *   get:
 *     summary: Get all activities for a wedding
 *     tags: [Destinations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: weddingId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of activities
 */
router.get('/activities/:weddingId', protect, getActivities);

module.exports = router;
