const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    weddingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wedding',
      required: true,
      index: true,
    },
    category: {
      type: String,
      enum: ['venue', 'food', 'decoration', 'photography', 'travel'],
      required: true,
    },
    plannedAmount: {
      type: Number,
      default: 0,
    },
    spentAmount: {
      type: Number,
      default: 0,
    },
    remainingAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to calculate remaining amount
budgetSchema.pre('save', function (next) {
  this.remainingAmount = this.plannedAmount - this.spentAmount;
  next();
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;
