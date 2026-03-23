const express = require('express');
const router = express.Router();
const { updateProfile, getAllFreelancers, getFreelancer } = require('../controller/freelancerController');
const { protect, authorize } = require('../../../middleware/authMiddleware');

/**
 * @swagger
 * /api/freelancers:
 *   get:
 *     summary: Get all approved freelancers
 *     tags: [Freelancers]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of freelancers
 */
router.get('/', getAllFreelancers);

/**
 * @swagger
 * /api/freelancers/{id}:
 *   get:
 *     summary: Get freelancer by ID
 *     tags: [Freelancers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Freelancer details
 */
router.get('/:id', getFreelancer);

/**
 * @swagger
 * /api/freelancers/profile:
 *   post:
 *     summary: Update freelancer profile
 *     tags: [Freelancers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *               portfolio:
 *                 type: array
 *                 items:
 *                   type: object
 *               pricing:
 *                 type: object
 *               city:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated
 */
router.post('/profile', protect, authorize('freelancer'), updateProfile);

module.exports = router;
