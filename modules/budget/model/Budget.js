const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema(
  {
    weddingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wedding',
      required: true,
      index: true,
    },
    category: {
      type: String, // e.g., "Venue", "Catering", "Decor"
      required: true,
    },
    estimatedAmount: {
        type: Number,
        default: 0
    },
    actualAmount: {
        type: Number,
        default: 0
    },
    paidAmount: {
        type: Number,
        default: 0
    }
  },
  {
    timestamps: true,
  }
);

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;
