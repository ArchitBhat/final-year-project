const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  roomNo: String,
  customerName: String,
  phoneNo: String,
  idCardNo: String,
  age: Number,
  peopleCount: Number,
  hours: Number, // ✅ number of hours booked
  checkInTime: {
    type: Date,
    default: Date.now
  },
  checkOutTime: Date // ✅ define this field explicitly
});

// Automatically calculate checkOutTime before saving
bookingSchema.pre('save', function (next) {
  this.checkOutTime = new Date(this.checkInTime.getTime() + this.hours * 60 * 60 * 1000); // ✅ use hours
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
