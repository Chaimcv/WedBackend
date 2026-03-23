const eventService = require('../service/eventService');

const addEvent = async (req, res, next) => {
  try {
    const event = await eventService.createEvent(req.body);
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

const getWeddingEvents = async (req, res, next) => {
  try {
    const events = await eventService.getEventsByWedding(req.params.weddingId);
    res.json(events);
  } catch (error) {
    next(error);
  }
};

module.exports = { addEvent, getWeddingEvents };
