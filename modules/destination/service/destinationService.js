const Destination = require('../model/destination.model');
const Exploration = require('../../exploration/model/Exploration');

const getDestinations = async () => {
  return await Destination.find();
};

const addActivity = async (data) => {
  return await Exploration.create(data);
};

const getWeddingActivities = async (weddingId) => {
  return await Exploration.find({ weddingId });
};

module.exports = { getDestinations, addActivity, getWeddingActivities };
