const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const SupplierCategorySchema = new Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model(SupplierCategorySchema, 'SupplierCategory');
