const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  painLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  energyLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Track', trackSchema);