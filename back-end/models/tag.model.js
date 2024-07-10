const mongoose = require("mongoose");
const tagSchema = require('../schemas/tag.schema');

const TagModel = mongoose.model("Tags", tagSchema);

module.exports = TagModel;