const Wedding = require('../model/wedding.model');
const Event = require('../../events/model/Event');

const createWedding = async (userId, data) => {
  return await Wedding.create({ userId, ...data });
};

const getUserWeddings = async (userId) => {
  return await Wedding.find({ userId });
};

const getWeddingDetails = async (id) => {
  const wedding = await Wedding.findById(id);
  const events = await Event.find({ weddingId: id });
  return { wedding, events };
};

module.exports = { createWedding, getUserWeddings, getWeddingDetails };
