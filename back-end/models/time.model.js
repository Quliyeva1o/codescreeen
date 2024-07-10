const mongoose = require("mongoose");
const timeSchema = require('../schemas/time.schema');

const TimeModel = mongoose.model("Times", timeSchema);

module.exports = TimeModel;