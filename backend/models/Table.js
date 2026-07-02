const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tableNumber: {
    type: String,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
    enum: [2, 3, 4],
  },
}, { timestamps: true });

module.exports = mongoose.model('Table', tableSchema);
