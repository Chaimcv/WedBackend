const Accommodation = require('../model/accommodation.model');

const createAccommodation = async (req, res, next) => {
  try {
    const accommodation = await Accommodation.create(req.body);
    res.status(201).json(accommodation);
  } catch (error) {
    next(error);
  }
};

const getAllAccommodations = async (req, res, next) => {
  try {
    const accommodations = await Accommodation.find();
    res.json(accommodations);
  } catch (error) {
    next(error);
  }
};

module.exports = { createAccommodation, getAllAccommodations };
