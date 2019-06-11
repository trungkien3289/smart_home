/* eslint-disable prefer-destructuring */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CitySchema = new Schema({
  id:{type: Number, required: true},
  name: { type: String, required: true },
});

module.exports = mongoose.model('City', CitySchema);
