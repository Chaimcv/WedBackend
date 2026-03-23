const Budget = require('../model/budget.model');

const createBudgetEntry = async (req, res, next) => {
  try {
    const entry = await Budget.create({ ...req.body, userId: req.user.id });
    res.status(201).json(entry);
  } catch (error) {
    next(error);
  }
};

const getWeddingBudget = async (req, res, next) => {
  try {
    const budget = await Budget.find({ weddingId: req.params.weddingId });
    res.json(budget);
  } catch (error) {
    next(error);
  }
};

module.exports = { createBudgetEntry, getWeddingBudget };
