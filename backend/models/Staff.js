const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  phone: String,
  idProof: String,
  gender: { type: String, enum: ['Male', 'Female'] },
  salary: Number,
  position: { type: String, enum: ['Manager', 'Cleaner', 'Room Boy'] },
});

module.exports = mongoose.model('Staff', staffSchema);
