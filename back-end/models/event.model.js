const mongoose = require("mongoose");
const EventSchema = require("../schemas/event.schema");
const EventModel = mongoose.model("Events", EventSchema);
module.exports = EventModel;