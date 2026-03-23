const express = require('express');
const router = express.Router();
const { createGuest, getAllGuests, sendManualReminder } = require('../controller/guestController');
const { protect } = require('../../../middleware/authMiddleware');

/**
 * @swagger
 * /api/guests:
 *   post:
 *     summary: Add a guest to a wedding
 *     tags: [Guests]
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
 *               - guestName
 *               - phoneNumber
 *               - category
 *             properties:
 *               weddingId:
 *                 type: string
 *               guestName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [family, friends, VIP, colleagues]
 *     responses:
 *       201:
 *         description: Guest added
 */
router.post('/', protect, createGuest);

/**
 * @swagger
 * /api/guests/wedding/{weddingId}:
 *   get:
 *     summary: Get all guests for a wedding
 *     tags: [Guests]
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
 *         description: List of guests
 */
router.get('/wedding/:weddingId', protect, getAllGuests);

/**
 * @swagger
 * /api/guests/reminder:
 *   post:
 *     summary: Send a manual WhatsApp reminder
 *     tags: [Guests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - guestId
 *               - message
 *             properties:
 *               guestId:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reminder sent
 */
router.post('/reminder', protect, sendManualReminder);

module.exports = router;
