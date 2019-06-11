const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  phoneNumber: { type: String },
  email: String,
  sex: {
    type: String,
    enum: ['Male', 'Female']
  },
  category: { type: Schema.ObjectId, ref: 'CustomerCategory' },
  dateOfBirth: Date,
  fax: String,
  taxCode: String,
  note: String,
  address: String,
  district: Number,
  status: {
    type: String,
    enum: ['active', 'delete']
  }
});

module.exports = mongoose.model('Customer', CustomerSchema);
