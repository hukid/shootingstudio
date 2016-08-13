const mongoose = require('mongoose');
const sceneSchema = require('./scene').schema;

const PlanSheetSchema = new mongoose.Schema({
  scenes: [sceneSchema],
});

module.exports = mongoose.model('PlanSheet', PlanSheetSchema);
