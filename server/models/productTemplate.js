const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const ProductTemplateSchema = new Schema({
  name: { type: String, required: true },
  category: { type: Schema.ObjectId, ref: 'ProductCategory' },
  attributes: [{ type: Schema.ObjectId, ref: 'ProductAttribute' }]
});

module.exports = mongoose.model(ProductTemplateSchema, 'ProductTemplate');
