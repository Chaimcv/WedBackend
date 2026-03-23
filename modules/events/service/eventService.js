const Event = require('../model/Event');

const createEvent = async (data) => {
  return await Event.create(data);
};

const getEventsByWedding = async (weddingId) => {
  return await Event.find({ weddingId });
};

const updateEvent = async (id, data) => {
  return await Event.findByIdAndUpdate(id, data, { new: true });
};

module.exports = { createEvent, getEventsByWedding, updateEvent };
