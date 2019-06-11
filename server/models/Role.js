const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Role', RoleSchema);
