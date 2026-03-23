const express = require('express');
const router = express.Router();
const { addEvent, getWeddingEvents } = require('../controller/eventController');
const { protect } = require('../../../middleware/authMiddleware');

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Add an event to a wedding
 *     tags: [Events]
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
 *               - name
 *               - date
 *             properties:
 *               weddingId:
 *                 type: string
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *               venue:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Event added
 */
router.post('/', protect, addEvent);

/**
 * @swagger
 * /api/events/wedding/{weddingId}:
 *   get:
 *     summary: Get all events for a specific wedding
 *     tags: [Events]
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
 *         description: List of events
 */
router.get('/wedding/:weddingId', protect, getWeddingEvents);

module.exports = router;
