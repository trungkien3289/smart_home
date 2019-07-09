const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const ActionParameterSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  actionType: { type: Schema.ObjectId, ref: 'ActionType' },
  dataType: {
    type: String,
    enum: ['Boolean', 'Date', '']
  },
  isRequired: Boolean
});

module.exports = mongoose.model('ActionParameter', ActionParameterSchema);
