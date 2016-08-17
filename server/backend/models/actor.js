
const mongoose = require('mongoose');

const ActorSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model('Actor', ActorSchema);
