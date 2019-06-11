const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const CustomerCategorySchema = new Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('CustomerCategory', CustomerCategorySchema);
