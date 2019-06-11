const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  productVersion: { type: Schema.ObjectId, ref: 'ProductVersion' },
  retailPrice: { type: Number, required: true },
  wholeSalePrices: { type: Number, required: true },
  amountConverted: { type: Number, required: true },
  code: { type: String, required: true },
  barCode: { type: String, required: true },
  weight: { type: Number },
  width: { type: Number },
  height: { type: Number },
  length: { type: Number },
  images: [String],
  unit: String,
  status: {
    type: String,
    enum: ['Avtive', 'Disabled', 'Deleted']
  }
});

module.exports = mongoose.model(ProductSchema, 'Product');
