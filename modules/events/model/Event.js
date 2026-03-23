const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    weddingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wedding',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      // Haldi, Mehendi, Sangeet, Wedding, Reception, etc.
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
    },
    venue: {
      type: String,
    },
    description: {
      type: String,
    },
    vendors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
