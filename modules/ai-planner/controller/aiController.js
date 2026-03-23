const aiService = require('../service/aiService');

const generatePlan = async (req, res, next) => {
  try {
    const plan = await aiService.generateWeddingPlan(req.body);
    res.json(plan);
  } catch (error) {
    next(error);
  }
};

const getBudgetSuggestions = async (req, res, next) => {
  try {
    const suggestions = await aiService.suggestBudget(req.params.weddingId, req.body.totalBudget);
    res.json(suggestions);
  } catch (error) {
    next(error);
  }
};

module.exports = { generatePlan, getBudgetSuggestions };
