// routes/adminRoutes.js
const express = require('express');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const {
  updateBookingStatus,
  getAllBookings,
  getTotalBookings,
  getTopBikes,
  getEarnings,
} = require('../controllers/adminController');

const router = express.Router();

// Admin: Approve or reject booking
router.put('/booking/:id/status', protect, isAdmin, updateBookingStatus);

// Admin: View all bookings
router.get('/bookings', protect, isAdmin, getAllBookings);

// Admin: Analytics
router.get('/analytics/total-bookings', protect, isAdmin, getTotalBookings);
router.get('/analytics/top-bikes', protect, isAdmin, getTopBikes);
router.get('/analytics/earnings', protect, isAdmin, getEarnings);

module.exports = router;
