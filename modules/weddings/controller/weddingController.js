const weddingService = require('../service/weddingService');

const createNewWedding = async (req, res, next) => {
  try {
    const wedding = await weddingService.createWedding(req.user.id, req.body);
    res.status(201).json(wedding);
  } catch (error) {
    next(error);
  }
};

const getMyWeddings = async (req, res, next) => {
  try {
    const weddings = await weddingService.getUserWeddings(req.user.id);
    res.json(weddings);
  } catch (error) {
    next(error);
  }
};

const getWeddingById = async (req, res, next) => {
  try {
    const details = await weddingService.getWeddingDetails(req.params.id);
    res.json(details);
  } catch (error) {
    next(error);
  }
};

module.exports = { createNewWedding, getMyWeddings, getWeddingById };
