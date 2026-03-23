const mongoose = require('mongoose');

const authSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    refreshToken: {
      type: String,
    },
    otpCode: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    loginMethod: {
      type: String,
      enum: ['email', 'google', 'phone'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Auth = mongoose.model('Auth', authSchema);

module.exports = Auth;
