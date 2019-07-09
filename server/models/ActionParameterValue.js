const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const ActionParameterValueSchema = new Schema({
  value: { type: String },
  action: { type: Schema.ObjectId, ref: 'Action' },
  parameter: { type: Schema.ObjectId, ref: 'Parameter' },
});

module.exports = mongoose.model('ActionParameterValueType', ActionParameterValueSchema);
