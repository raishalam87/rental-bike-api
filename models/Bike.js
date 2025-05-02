const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  model: String,
  type: String, // cruiser, sport, scooter
  image: String,
  pricePerHour: Number,
  pricePerDay: Number,
  location: String,
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Bike', bikeSchema);
