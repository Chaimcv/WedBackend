const foodService = require('../service/foodService');

const saveFoodPlan = async (req, res, next) => {
  try {
    const plan = await foodService.upsertFoodPlan(req.body);
    res.json(plan);
  } catch (error) {
    next(error);
  }
};

const getWeddingFoodPlans = async (req, res, next) => {
  try {
    const plans = await foodService.getFoodPlansByWedding(req.params.weddingId);
    res.json(plans);
  } catch (error) {
    next(error);
  }
};

module.exports = { saveFoodPlan, getWeddingFoodPlans };
