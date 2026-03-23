const mongoose = require('mongoose');

const weddingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    weddingTitle: {
      type: String,
      required: [true, 'Wedding title is required'],
      trim: true,
    },
    brideName: {
      type: String,
      required: [true, 'Bride name is required'],
      trim: true,
    },
    groomName: {
      type: String,
      required: [true, 'Groom name is required'],
      trim: true,
    },
    weddingDate: {
      type: Date,
      required: [true, 'Wedding date is required'],
      index: true,
    },
    weddingLocation: {
      type: String,
      required: [true, 'Wedding location is required'],
      trim: true,
      index: true,
    },
    totalBudget: {
      type: Number,
      default: 0,
    },
    weddingType: {
      type: String,
      enum: ['destination', 'traditional', 'luxury'],
      required: true,
    },
    status: {
      type: String,
      enum: ['planning', 'confirmed', 'completed'],
      default: 'planning',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual relationships
weddingSchema.virtual('guests', {
  ref: 'Guest',
  localField: '_id',
  foreignField: 'weddingId',
});

weddingSchema.virtual('vendors', {
  ref: 'VendorBooking',
  localField: '_id',
  foreignField: 'weddingId',
});

weddingSchema.virtual('packages', {
  ref: 'Package',
  localField: '_id',
  foreignField: 'weddingId', // Assuming packages can be linked to weddings
});

weddingSchema.virtual('timeline', {
  ref: 'Timeline',
  localField: '_id',
  foreignField: 'weddingId',
});

weddingSchema.virtual('budget', {
  ref: 'Budget',
  localField: '_id',
  foreignField: 'weddingId',
});

const Wedding = mongoose.model('Wedding', weddingSchema);

module.exports = Wedding;
