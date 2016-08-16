
const mongoose = require('mongoose');
const planSheetSchema = require('./planSheet').schema;

const ProjectSchema = new mongoose.Schema({
  name: String,
  planSheets: [planSheetSchema],
});

module.exports = mongoose.model('Project', ProjectSchema);
