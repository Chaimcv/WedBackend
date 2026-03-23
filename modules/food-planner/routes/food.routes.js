const express = require('express');
const router = express.Router();
const { saveFoodPlan, getWeddingFoodPlans } = require('../controller/foodController');
const { protect } = require('../../../middleware/authMiddleware');

/**
 * @swagger
 * /api/food-planner:
 *   post:
 *     summary: Save or update food plan for an event
 *     tags: [Food Planner]
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
 *               - eventId
 *               - pricePerPlate
 *             properties:
 *               weddingId:
 *                 type: string
 *               eventId:
 *                 type: string
 *               cuisine:
 *                 type: string
 *               mealType:
 *                 type: string
 *                 enum: [Veg, Non-Veg, Both]
 *               pricePerPlate:
 *                 type: number
 *               guestCount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Food plan saved
 */
router.post('/', protect, saveFoodPlan);

/**
 * @swagger
 * /api/food-planner/wedding/{weddingId}:
 *   get:
 *     summary: Get all food plans for a wedding
 *     tags: [Food Planner]
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
 *         description: List of food plans
 */
router.get('/wedding/:weddingId', protect, getWeddingFoodPlans);

module.exports = router;
