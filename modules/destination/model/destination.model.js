const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema(
  {
    destinationName: {
      type: String,
      required: [true, 'Destination name is required'],
      unique: true,
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      index: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    popularVenues: {
      type: [String],
      default: [],
    },
    bestSeason: {
      type: String,
    },
    averageBudget: {
      type: Number,
    },
    images: [String],
  },
  {
    timestamps: true,
  }
);

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
