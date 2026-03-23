const mongoose = require('mongoose');

const checklistSchema = new mongoose.Schema(
  {
    weddingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wedding',
      required: true,
      index: true,
    },
    task: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    dueDate: {
      type: Date,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Checklist = mongoose.model('Checklist', checklistSchema);

module.exports = Checklist;
