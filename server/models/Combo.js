const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const ComboSchema = new Schema({
  name: { type: String, required: true },
  comboItems: [{ type: Schema.ObjectId, ref: 'ComboItem' }],
  code: { type: String, required: true },
  barCode: { type: String, required: true },
  images: [String],
  status: {
    type: String,
    enum: ['Avtive', 'Disable', 'Delete']
  }
});

module.exports = mongoose.model(ComboSchema, 'Combo');
