const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNo: String,
  type: String, // AC / Non-AC
  price: Number,
});

module.exports = mongoose.model('Room', roomSchema);