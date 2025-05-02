const Booking = require('../models/Booking');
const Bike = require('../models/Bike');
const mongoose = require('mongoose');

// Utility to calculate duration
function calculateDurationHours(start, end) {
  return (new Date(end) - new Date(start)) / (1000 * 60 * 60);
}

exports.createBooking = async (req, res) => {
  try {
    const { bikeId, startTime, endTime } = req.body;

    // Validate bike
    const bike = await Bike.findById(bikeId);
    if (!bike) return res.status(404).json({ message: 'Bike not found' });

    const hours = calculateDurationHours(startTime, endTime);
    let totalPrice = 0;

    if (hours < 24) {
      totalPrice = Math.ceil(hours) * 300;
    } else if (hours < 24 * 7) {
      totalPrice = Math.ceil(hours / 24) * 500;
    } else if (hours < 24 * 30) {
      totalPrice = Math.ceil(hours / (24 * 7)) * 1000;
    } else {
      totalPrice = Math.ceil(hours / (24 * 30)) * 4000;
    }

    const booking = new Booking({
      user: req.user.userId,
      bike: bikeId,
      startTime,
      endTime,
      totalPrice
    });

    await booking.save();
    res.status(201).json({ message: 'Booking successful', booking });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Booking failed' });
  }
};
