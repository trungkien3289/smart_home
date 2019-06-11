/* eslint-disable prefer-destructuring */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const DistrictSchema = new Schema({
  id:{type: Number, required: true },
  name: { type: String, required: true },
  cityId: { type: Number, required: true },
  cityName: {type: String} 
});

module.exports = mongoose.model('District', DistrictSchema);
