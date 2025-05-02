const Bike = require('../models/Bike');

// Create bike (Admin)
exports.createBike = async (req, res) => {
  try {
    const bike = new Bike(req.body);
    await bike.save();
    res.status(201).json({ message: 'Bike added successfully', bike });
  } catch (err) {
    res.status(500).json({ message: 'Error adding bike' });
  }
};

// Get all bikes (Public)
exports.getAllBikes = async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.status(200).json(bikes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bikes' });
  }
};

// Get one bike by ID
exports.getBikeById = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike) return res.status(404).json({ message: 'Bike not found' });
    res.status(200).json(bike);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bike' });
  }
};

// Update bike (Admin)
exports.updateBike = async (req, res) => {
  try {
    const updated = await Bike.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Bike updated', bike: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating bike' });
  }
};

// Delete bike (Admin)
exports.deleteBike = async (req, res) => {
  try {
    await Bike.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Bike deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting bike' });
  }
};
