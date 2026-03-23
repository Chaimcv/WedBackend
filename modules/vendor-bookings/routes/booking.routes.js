const express = require('express');
const router = express.Router();
const { requestBooking, updateStatus, getMyBookings } = require('../controller/bookingController');
const { protect, authorize } = require('../../../middleware/authMiddleware');

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Book a vendor for an event
 *     tags: [Bookings]
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
 *               - vendorId
 *               - serviceType
 *             properties:
 *               weddingId:
 *                 type: string
 *               vendorId:
 *                 type: string
 *               serviceType:
 *                 type: string
 *               bookingDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Booking request sent
 */
router.post('/', protect, requestBooking);

/**
 * @swagger
 * /api/bookings/{id}/status:
 *   put:
 *     summary: Update booking status
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, completed]
 *     responses:
 *       200:
 *         description: Status updated
 */
router.put('/:id/status', protect, authorize('vendor', 'admin'), updateStatus);

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get user or freelancer bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: weddingId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of bookings
 */
router.get('/', protect, getMyBookings);

module.exports = router;
