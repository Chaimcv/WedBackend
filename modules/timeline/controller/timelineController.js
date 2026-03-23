const Timeline = require('../model/timeline.model');

const createTimelineTask = async (req, res, next) => {
  try {
    const task = await Timeline.create({ ...req.body, userId: req.user.id });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

const getWeddingTimeline = async (req, res, next) => {
  try {
    const tasks = await Timeline.find({ weddingId: req.params.weddingId });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

module.exports = { createTimelineTask, getWeddingTimeline };
