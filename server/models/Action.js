const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const ActionSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  deviceType: {type: String, required: true},
  schedule: { type: Schema.ObjectId, ref: 'ActionType' },
  parameters: [{type: Object}]
});

module.exports = mongoose.model('Action', ActionSchema);
