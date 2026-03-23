const express = require('express');
const router = express.Router();
const { createWeddingPackage, getAllPackages, getPackage } = require('../controller/packageController');
const { protect, authorize } = require('../../../middleware/authMiddleware');

/**
 * @swagger
 * /api/packages:
 *   get:
 *     summary: Get all wedding packages
 *     tags: [Wedding Packages]
 *     responses:
 *       200:
 *         description: List of packages
 */
router.get('/', getAllPackages);

/**
 * @swagger
 * /api/packages/{id}:
 *   get:
 *     summary: Get package by ID
 *     tags: [Wedding Packages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Package details
 */
router.get('/:id', getPackage);

/**
 * @swagger
 * /api/packages:
 *   post:
 *     summary: Create a wedding package (Admin only)
 *     tags: [Wedding Packages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - destination
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               destination:
 *                 type: string
 *               days:
 *                 type: number
 *               guestCount:
 *                 type: number
 *               price:
 *                 type: number
 *               events:
 *                 type: array
 *                 items:
 *                   type: string
 *               includedServices:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Package created
 */
router.post('/', protect, authorize('admin'), createWeddingPackage);

module.exports = router;
