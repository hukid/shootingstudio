
const mongoose = require('mongoose');

const StageSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model('Stage', StageSchema);
