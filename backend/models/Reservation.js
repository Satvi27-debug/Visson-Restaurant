const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table',
    required: true,
  },
  date: {
    type: String, // Storing as YYYY-MM-DD string for simplicity
    required: true,
  },
  timeSlot: {
    type: String, // e.g., "18:00"
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Booked', 'Cancelled', 'Completed'],
    default: 'Booked',
  }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
