// controllers/adminController.js

const Booking = require('../models/Booking');

// 1. Approve/Reject Booking
exports.updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = status;
    await booking.save();

    res.status(200).json({ message: `Booking ${status}`, booking });
  } catch (err) {
    res.status(500).json({ message: 'Error updating booking status' });
  }
};

// 2. View All Bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email phone')
      .populate('bike', 'model location');

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};

// 3. Total Bookings Count
exports.getTotalBookings = async (req, res) => {
  const count = await Booking.countDocuments();
  res.json({ totalBookings: count });
};

// 4. Most Popular Bikes
exports.getTopBikes = async (req, res) => {
  const top = await Booking.aggregate([
    { $group: { _id: "$bike", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ]);

  res.json(top);
};

// 5. Total Earnings
exports.getEarnings = async (req, res) => {
  const earnings = await Booking.aggregate([
    { $group: { _id: null, total: { $sum: "$totalPrice" } } }
  ]);

  res.json({ totalEarnings: earnings[0]?.total || 0 });
};
