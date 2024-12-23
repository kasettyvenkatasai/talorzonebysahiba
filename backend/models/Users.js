const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  accountStatus: { type: String, default: 'open' }, 
  phone: { type: String, default: 'not available' },
});




module.exports = mongoose.model('User', UserSchema);