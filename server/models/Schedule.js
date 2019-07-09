const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  expression: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  createdDate: {type: String},
  actions: [{ type: Schema.ObjectId, ref: 'Action' }]
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
