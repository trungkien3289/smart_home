const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const PingNetworkResultSchema = new Schema({
  host: { type: String, required: true },
  datetime: { type: String, required: true },
  averageTime: { type: String, required: true },
});

module.exports = mongoose.model('PingNetworkResult', PingNetworkResultSchema);
