const FoodPlan = require('../model/FoodPlan');

const upsertFoodPlan = async (data) => {
  let plan = await FoodPlan.findOne({ eventId: data.eventId });
  if (plan) {
    Object.assign(plan, data);
    return await plan.save();
  }
  return await FoodPlan.create(data);
};

const getFoodPlansByWedding = async (weddingId) => {
  return await FoodPlan.find({ weddingId }).populate('eventId', 'name date');
};

module.exports = { upsertFoodPlan, getFoodPlansByWedding };
