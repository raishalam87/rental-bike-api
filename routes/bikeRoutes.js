const express = require('express');
const router = express.Router();
const {
  createBike,
  getAllBikes,
  getBikeById,
  updateBike,
  deleteBike
} = require('../controllers/bikeController');

const { protect, isAdmin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllBikes);
router.get('/:id', getBikeById);

// Admin routes
router.post('/', protect, isAdmin, createBike);
router.put('/:id', protect, isAdmin, updateBike);
router.delete('/:id', protect, isAdmin, deleteBike);

module.exports = router;
