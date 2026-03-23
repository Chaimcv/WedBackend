const Rating = require('../model/rating.model');

const createRating = async (req, res, next) => {
  try {
    const rating = await Rating.create({ ...req.body, userId: req.user.id });
    res.status(201).json(rating);
  } catch (error) {
    next(error);
  }
};

const getVendorRatings = async (req, res, next) => {
  try {
    const ratings = await Rating.find({ vendorId: req.params.vendorId });
    res.json(ratings);
  } catch (error) {
    next(error);
  }
};

module.exports = { createRating, getVendorRatings };
