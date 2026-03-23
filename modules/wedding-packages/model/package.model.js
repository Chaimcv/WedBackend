const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
  {
    packageName: {
      type: String,
      required: [true, 'Package name is required'],
      trim: true,
    },
    packageType: {
      type: String,
      enum: ['budget', 'premium', 'luxury'],
      required: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    includedServices: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      trim: true,
    },
    recommendedFor: {
      type: String,
      enum: ['small', 'medium', 'grand wedding'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const WeddingPackage = mongoose.model('WeddingPackage', packageSchema);

module.exports = WeddingPackage;
