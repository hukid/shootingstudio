const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SceneSchema = new mongoose.Schema({
  seq: Number,
  stage: { id: Schema.Types.ObjectId, name: String },
  environment: Number,
  actors: [{ id: Schema.Types.ObjectId, name: String }],
});

module.exports = mongoose.model('Scene', SceneSchema);
