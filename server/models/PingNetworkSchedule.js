const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const PingNetworkScheduleSchema = new Schema({
  name: { type: String, required: true },
  expression: { type: String, required: true },
  active: { type: Boolean, required: true },
  createdDate: {type: Date}
});

module.exports = mongoose.model('PingNetworkSchedule', PingNetworkScheduleSchema);
