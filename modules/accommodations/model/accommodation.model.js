const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema(
  {
    hotelName: {
      type: String,
      required: [true, 'Hotel name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      index: true,
      trim: true,
    },
    pricePerNight: {
      type: Number,
      required: [true, 'Price per night is required'],
    },
    totalRooms: {
      type: Number,
      required: true,
    },
    amenities: {
      type: [String],
      default: [],
    },
    images: [String],
    contactNumber: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = Accommodation;
