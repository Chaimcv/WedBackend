const mongoose = require('mongoose');

const explorationSchema = new mongoose.Schema(
  {
    weddingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wedding',
      required: true,
      index: true,
    },
    activityName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['City Tour', 'Beach Trip', 'Temple Visit', 'Shopping', 'Adventure', 'Other'],
    },
    vehicleRequired: {
      type: Boolean,
      default: false,
    },
    guideRequired: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Exploration = mongoose.model('Exploration', explorationSchema);

module.exports = Exploration;
