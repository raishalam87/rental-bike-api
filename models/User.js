const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: String,
    password: String,
    isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
