const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const OrderInvoiceSchema = new Schema({
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  userCreated: { type: Schema.ObjectId, ref: 'User' },
  userUpdated: { type: Schema.ObjectId, ref: 'User' },
  customer: { type: Schema.ObjectId, ref: 'Customer' },
  note: { type: String },
  items: [{ type: Schema.Id, ref: 'OrderItem' }],
  status: {
    type: String,
    enum: ['Active', 'Disable', 'Delete']
  },
  orderStatus: {
    type: String,
    enum: ['Processing', 'Complete', 'Cancel']
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'NotPaid']
  }
});
module.exports = mongoose.model(OrderInvoiceSchema, 'OrderInvoice');
