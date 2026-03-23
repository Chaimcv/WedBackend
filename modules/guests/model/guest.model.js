const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema(
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
    guestName: {
      type: String,
      required: [true, 'Guest name is required'],
      trim: true,
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
    invitationStatus: {
      type: String,
      enum: ['sent', 'pending', 'confirmed'],
      default: 'pending',
    },
    reminderStatus: {
      type: String,
      default: 'none',
    },
    category: {
      type: String,
      enum: ['family', 'friends', 'VIP', 'colleagues'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;
