
const mongoose = require('mongoose');
const planSheetSchema = require('./planSheet').schema;
const actorSchema = require('./actor').schema;
const stageSchema = require('./stage').schema;

const ProjectSchema = new mongoose.Schema({
  name: String,
  planSheets: [planSheetSchema],
  actors: [actorSchema],
  stages: [stageSchema],
});

module.exports = mongoose.model('Project', ProjectSchema);
