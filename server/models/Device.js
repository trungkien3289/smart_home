const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String, required: true },
  owner: {type: Schema.ObjectId, ref: 'User'},
  createdDate: {type: Date},
  isActive: {type: Boolean}
});

module.exports = mongoose.model('Device', DeviceSchema);