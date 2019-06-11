const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  phoneNumber: { type: String },
  email: String,
  sex: {
    type: String,
    enum: ['Male', 'Female']
  },
  category: { type: Schema.ObjectId, ref: 'SupplierCategory' },
  dateOfBirth: Date,
  fax: String,
  taxCode: String,
  note: String,
  address: String
});

module.exports = mongoose.model(SupplierSchema, 'Supplier');
