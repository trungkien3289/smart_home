const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const ComboItemSchema = new Schema({
  combo: { type: Schema.ObjectId, ref: 'Combo' },
  quantity: { type: Number, required: true },
  retailPrice: { type: Number, required: true },
  wholeSalePrices: { type: Number, required: true },
  product: { type: Schema.ObjectId, ref: 'Product' }
});

module.exports = mongoose.model(ComboItemSchema, 'ComboItem');
