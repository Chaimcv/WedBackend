const express = require('express');
const router = express.Router();
const { generatePlan, getBudgetSuggestions } = require('../controller/aiController');
const { protect } = require('../../../middleware/authMiddleware');

/**
 * @swagger
 * /api/ai/generate-plan:
 *   post:
 *     summary: Generate an AI wedding plan
 *     tags: [AI Planner]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - destination
 *               - days
 *               - guestCount
 *             properties:
 *               title:
 *                 type: string
 *               destination:
 *                 type: string
 *               days:
 *                 type: number
 *               guestCount:
 *                 type: number
 *               style:
 *                 type: string
 *     responses:
 *       200:
 *         description: AI plan generated
 */
router.post('/generate-plan', protect, generatePlan);

/**
 * @swagger
 * /api/ai/budget/{weddingId}:
 *   post:
 *     summary: Get AI budget suggestions
 *     tags: [AI Planner]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: weddingId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - totalBudget
 *             properties:
 *               totalBudget:
 *                 type: number
 *     responses:
 *       200:
 *         description: Budget suggestions
 */
router.post('/budget/:weddingId', protect, getBudgetSuggestions);

module.exports = router;
