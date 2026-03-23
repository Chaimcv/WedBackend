const mongoose = require('mongoose');

const foodPlanSchema = new mongoose.Schema(
  {
    weddingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wedding',
      required: true,
      index: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    cuisine: {
      type: String, // e.g., "North Indian", "South Indian", "Continental"
    },
    mealType: {
      type: String,
      enum: ['Veg', 'Non-Veg', 'Both'],
    },
    pricePerPlate: {
      type: Number,
      default: 0,
    },
    guestCount: {
      type: Number,
    },
    totalCost: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

foodPlanSchema.pre('save', function (next) {
  this.totalCost = this.pricePerPlate * (this.guestCount || 0);
  next();
});

const FoodPlan = mongoose.model('FoodPlan', foodPlanSchema);

module.exports = FoodPlan;
