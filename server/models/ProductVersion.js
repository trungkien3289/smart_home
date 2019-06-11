const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const ProductVersionSchema = new Schema({
  name: { type: String, required: true },
  product: { type: Schema.ObjectId, ref: 'Product' },
  attributeValues: [{ type: Schema.ObjectId, ref: 'ProductAttributeValue' }],
  products: [{ type: Schema.ObjectId, ref: 'Product' }],
  quantity: { type: Number, required: true }
});

module.exports = mongoose.model(ProductVersionSchema, 'ProductVersion');
