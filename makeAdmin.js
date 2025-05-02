// temporary script to make user admin
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const user = await User.findOne({ email: 'ravi@example.com' });
  if (user) {
    user.isAdmin = true;
    await user.save();
    console.log('User is now admin');
  }
  mongoose.disconnect();
});
