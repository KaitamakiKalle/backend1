const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, maxLength: 50, required: true, unique: true },
  password: { type: String, required: true },
  isadmin: { type: Boolean, required: true },
});

const model = mongoose.model('User', UserSchema);
module.exports = model;
