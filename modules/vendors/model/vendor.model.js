const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema(
  {
    vendorName: {
      type: String,
      required: [true, 'Vendor name is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['photographer', 'makeup', 'decorator', 'caterer', 'planner'],
      required: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      index: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    serviceLocations: {
      type: [String],
      index: true,
    },
    priceRange: {
      type: String,
    },
    portfolioImages: [String],
    rating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
