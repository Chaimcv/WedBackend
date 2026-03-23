const mongoose = require('mongoose');

const freelancerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Photographer', 'Makeup Artist', 'Decorator', 'DJ', 'Caterer', 'Wedding Planner'],
      index: true,
    },
    portfolio: [
      {
        url: String,
        title: String,
      },
    ],
    pricing: {
      min: Number,
      max: Number,
      unit: { type: String, default: 'per day' },
    },
    city: {
      type: String,
      required: true,
      index: true,
    },
    state: {
      type: String,
    },
    bio: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Freelancer = mongoose.model('Freelancer', freelancerSchema);

module.exports = Freelancer;
