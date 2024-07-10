const HallSchema = require("../schemas/hall.schema");
const mongoose = require("mongoose");
const HallModel = mongoose.model("Halls", HallSchema);
module.exports = HallModel;