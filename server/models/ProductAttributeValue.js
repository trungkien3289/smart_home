const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const ProductAttributeValueSchema = new Schema({
  value: { type: String, required: true }
});

module.exports = mongoose.model(
  ProductAttributeValueSchema,
  'ProductAttributeValue'
);
