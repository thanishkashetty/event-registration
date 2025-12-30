const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['technical', 'cultural', 'sports', 'workshop', 'other'] 
  },
  maxParticipants: { type: Number, required: true },
  currentParticipants: { type: Number, default: 0 },
  rules: { type: [String], default: [] },
  registrationFee: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);