const express = require('express');
const router = express.Router();
const { getUsers, getFreelancers, approveVendor } = require('../controller/adminController');
const { protect, authorize } = require('../../../middleware/authMiddleware');

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/users', protect, authorize('admin'), getUsers);

/**
 * @swagger
 * /api/admin/freelancers:
 *   get:
 *     summary: Get all freelancers (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of freelancers
 */
router.get('/freelancers', protect, authorize('admin'), getFreelancers);

/**
 * @swagger
 * /api/admin/freelancers/{id}/approve:
 *   put:
 *     summary: Approve a freelancer (Admin only)
 *     tags: [Admin]
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
 *         description: Freelancer approved
 */
router.put('/freelancers/:id/approve', protect, authorize('admin'), approveVendor);

module.exports = router;
