const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const ActionTypeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  deviceType: { type: Schema.ObjectId, ref: 'DeviceType' },
});

module.exports = mongoose.model('ActionType', ActionTypeSchema);
