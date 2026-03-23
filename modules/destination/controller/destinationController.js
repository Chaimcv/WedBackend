const destinationService = require('../service/destinationService');

const getAllDestinations = async (req, res, next) => {
  try {
    const destinations = await destinationService.getDestinations();
    res.json(destinations);
  } catch (error) {
    next(error);
  }
};

const createActivity = async (req, res, next) => {
  try {
    const activity = await destinationService.addActivity(req.body);
    res.status(201).json(activity);
  } catch (error) {
    next(error);
  }
};

const getActivities = async (req, res, next) => {
  try {
    const activities = await destinationService.getWeddingActivities(req.params.weddingId);
    res.json(activities);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllDestinations, createActivity, getActivities };
