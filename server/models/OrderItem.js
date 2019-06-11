const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
  product: { type: Schema.ObjectId, ref: 'Product' },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  tax: { type: Number, default: 0 }
});

module.exports = mongoose.model(OrderItemSchema, 'OrderItem');
