const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SceneSchema = new mongoose.Schema({
  seq: Number,
  stage_id: Schema.Types.ObjectId,
  environment: Number,
  actors: [{ _id: Schema.Types.ObjectId }],
});

module.exports = mongoose.model('Scene', SceneSchema);
