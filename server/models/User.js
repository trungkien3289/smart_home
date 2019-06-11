/* eslint-disable prefer-destructuring */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  userName:{type: String, required: true, max:200 },
  email: { type: String, required: true, max: 100 },
  passwordHask: { type: String, required: true },
  phoneNumber: String,
  active: Boolean,
  role: { type: Schema.ObjectId, ref: 'Role', required: true }
});

module.exports = mongoose.model('User', UserSchema);
